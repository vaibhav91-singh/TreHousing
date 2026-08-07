import React, { useState, useEffect } from 'react';
import './TopicWiseCategories.css';
import Loader from '../common/Loader.jsx';

export default function TopicWiseCategories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // State to track selected options per question id: { questionId: 'A' }
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch(`/api/v1/topic-wise-mcq/`)
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setData(resData.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching topic wise MCQs:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (items, key = 'name') => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item[key].toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const resetSelection = (level) => {
    if (level === 'exam') {
      setSelectedExam(null);
      setSelectedSubject(null);
      setSelectedTopic(null);
      setSearchTerm('');
    } else if (level === 'subject') {
      setSelectedSubject(null);
      setSelectedTopic(null);
      setSearchTerm('');
    } else if (level === 'topic') {
      setSelectedTopic(null);
      setSearchTerm('');
    }
  };

  const handleOptionSelect = (questionId, option) => {
    if (!answers[questionId]) {
      setAnswers(prev => ({ ...prev, [questionId]: option }));
    }
  };

  if (loading) return <Loader fullPage={true} text="Loading Topics..." />;

  // Level 1: Exams
  if (!selectedExam) {
    const filteredExams = handleSearch(data);
    return (
      <div className="topic-wise-container">
        <div className="topic-header">
          <h1>Select Exam</h1>
          <input 
            type="text" 
            placeholder="Search exams..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="topic-layout">
          <div className="topic-main">
            {filteredExams.map(exam => (
              <div 
                key={exam.id} 
                className="topic-list-item"
                onClick={() => { setSelectedExam(exam); setSearchTerm(''); }}
              >
                <span>{exam.name}</span>
                <i className="bi bi-chevron-right"></i>
              </div>
            ))}
            {filteredExams.length === 0 && <div>No exams found.</div>}
          </div>
        </div>
      </div>
    );
  }

  // Level 2: Subjects
  if (!selectedSubject) {
    const filteredSubjects = handleSearch(selectedExam.subjects);
    return (
      <div className="topic-wise-container">
        <div className="topic-breadcrumbs">
          <span onClick={() => resetSelection('exam')}>All Exams</span>
          <i className="bi bi-chevron-right"></i>
          <span className="active">{selectedExam.name}</span>
        </div>
        <div className="topic-header">
          <h1>Select Subject</h1>
          <input 
            type="text" 
            placeholder="Search subjects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="topic-layout">
          <div className="topic-main">
            {filteredSubjects.map(sub => (
              <div 
                key={sub.id} 
                className="topic-list-item"
                onClick={() => { setSelectedSubject(sub); setSearchTerm(''); }}
              >
                <span>{sub.name}</span>
                <i className="bi bi-chevron-right"></i>
              </div>
            ))}
            {filteredSubjects.length === 0 && <div>No subjects found.</div>}
          </div>
        </div>
      </div>
    );
  }

  // Level 3: Topics
  if (!selectedTopic) {
    const filteredTopics = handleSearch(selectedSubject.topics);
    return (
      <div className="topic-wise-container">
        <div className="topic-breadcrumbs">
          <span onClick={() => resetSelection('exam')}>All Exams</span>
          <i className="bi bi-chevron-right"></i>
          <span onClick={() => resetSelection('subject')}>{selectedExam.name}</span>
          <i className="bi bi-chevron-right"></i>
          <span className="active">{selectedSubject.name}</span>
        </div>
        <div className="topic-header">
          <h1>Select Topic</h1>
          <input 
            type="text" 
            placeholder="Search topics..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="topic-layout">
          <div className="topic-main">
            {filteredTopics.map(topic => (
              <div 
                key={topic.id} 
                className="topic-list-item"
                onClick={() => { setSelectedTopic(topic); setSearchTerm(''); }}
              >
                <span>{topic.name}</span>
                <i className="bi bi-chevron-right"></i>
              </div>
            ))}
            {filteredTopics.length === 0 && <div>No topics found.</div>}
          </div>
        </div>
      </div>
    );
  }

  // Level 4: Questions
  const questions = selectedTopic.questions || [];
  return (
    <div className="topic-wise-container">
      <div className="topic-breadcrumbs">
        <span onClick={() => resetSelection('exam')}>All Exams</span>
        <i className="bi bi-chevron-right"></i>
        <span onClick={() => resetSelection('subject')}>{selectedExam.name}</span>
        <i className="bi bi-chevron-right"></i>
        <span onClick={() => resetSelection('topic')}>{selectedSubject.name}</span>
        <i className="bi bi-chevron-right"></i>
        <span className="active">{selectedTopic.name}</span>
      </div>
      
      <div className="topic-header">
        <h1>{selectedTopic.name} MCQs</h1>
      </div>
      
      <div className="topic-layout">
        <div className="topic-main">
          {questions.map((q, index) => {
            const answered = answers[q.id];
            
            return (
              <div key={q.id} className="mcq-question-card">
                <div className="mcq-question-text">
                  Q{index + 1}. {q.text}
                </div>
                <div className="mcq-options">
                  {['A', 'B', 'C', 'D'].map(opt => {
                    const optText = q[`option_${opt.toLowerCase()}`];
                    let optClass = "mcq-option";
                    
                    if (answered) {
                      optClass += " answered-option";
                      if (opt === q.correct_option) optClass += " correct";
                      else if (opt === answered) optClass += " incorrect";
                    }

                    return (
                      <div 
                        key={opt} 
                        className={optClass}
                        onClick={() => handleOptionSelect(q.id, opt)}
                        style={{ pointerEvents: answered ? 'none' : 'auto' }}
                      >
                        {opt}. {optText}
                      </div>
                    );
                  })}
                </div>
                {answered && q.explanation && (
                  <div className="mcq-explanation">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
          {questions.length === 0 && <div>No questions added yet for this topic.</div>}
        </div>
      </div>
    </div>
  );
}
