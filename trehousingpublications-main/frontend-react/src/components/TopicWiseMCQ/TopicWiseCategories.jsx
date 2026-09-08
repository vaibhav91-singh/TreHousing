import React, { useState, useEffect, useRef } from 'react';
import './TopicWiseCategories.css';
import Loader from '../common/Loader.jsx';
import { extractArrayData } from '../../apiConfig.js';

// Module-level in-memory cache to persist across re-renders
const topicQuestionsCache = {};
let categoryHierarchyCache = null;

export default function TopicWiseCategories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [topicQuestions, setTopicQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  // Pagination states (30 questions per page)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const LIMIT = 30;

  // Ref to hold current pending HTTP request AbortController
  const abortControllerRef = useRef(null);

  // State to track selected options per question id with sessionStorage persistence
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = sessionStorage.getItem('topic_mcq_answers');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    if (categoryHierarchyCache) {
      setData(categoryHierarchyCache);
      setLoading(false);
      return;
    }
    fetch(`/api/v1/topic-wise-mcq/`)
      .then(res => res.json())
      .then(resData => {
        const extracted = extractArrayData(resData);
        categoryHierarchyCache = extracted;
        setData(extracted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching topic wise MCQs:", err);
        setLoading(false);
      });
  }, []);

  // Cleanup pending request on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleSearch = (items, key = 'name') => {
    if (!debouncedSearchTerm) return items;
    return items.filter(item => 
      item[key].toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  };

  const resetSelection = (level) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setCurrentPage(1);
    setTotalPages(1);
    setTotalQuestions(0);

    if (level === 'exam') {
      setSelectedExam(null);
      setSelectedSubject(null);
      setSelectedTopic(null);
      setTopicQuestions([]);
      setSearchTerm('');
      try { sessionStorage.removeItem('topic_mcq_active_session'); } catch (e) {}
    } else if (level === 'subject') {
      setSelectedSubject(null);
      setSelectedTopic(null);
      setTopicQuestions([]);
      setSearchTerm('');
      try { sessionStorage.removeItem('topic_mcq_active_session'); } catch (e) {}
    } else if (level === 'topic') {
      setSelectedTopic(null);
      setTopicQuestions([]);
      setSearchTerm('');
      try { sessionStorage.removeItem('topic_mcq_active_session'); } catch (e) {}
    }
  };

  const handleTopicClick = (topic, pageNum = 1) => {
    // Abort any pending request from rapid topic clicks
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setSelectedTopic(topic);
    setSearchTerm('');
    setCurrentPage(pageNum);

    try {
      sessionStorage.setItem('topic_mcq_active_session', JSON.stringify({
        exam: selectedExam,
        subject: selectedSubject,
        topic: topic,
        page: pageNum
      }));
    } catch (e) {}

    const cacheKey = `${topic.id}_page_${pageNum}`;

    // Check in-memory cache for 0ms instant loading
    if (topicQuestionsCache[cacheKey]) {
      const cached = topicQuestionsCache[cacheKey];
      setTopicQuestions(cached.questions);
      setTotalPages(cached.total_pages);
      setTotalQuestions(cached.total_questions);
      setCurrentPage(cached.current_page);
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setQuestionsLoading(true);
    fetch(`/api/v1/topic-wise-mcq/?topic_id=${topic.id}&page=${pageNum}&limit=${LIMIT}`, { signal: controller.signal })
      .then(res => res.json())
      .then(resData => {
        const qList = resData.questions || [];
        const tPages = resData.total_pages || 1;
        const tCount = resData.total_questions || qList.length;
        const cPage = resData.current_page || pageNum;

        topicQuestionsCache[cacheKey] = {
          questions: qList,
          total_pages: tPages,
          total_questions: tCount,
          current_page: cPage
        };

        setTopicQuestions(qList);
        setTotalPages(tPages);
        setTotalQuestions(tCount);
        setCurrentPage(cPage);
        setQuestionsLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          // Request was cancelled due to a newer topic click; ignore silently
          return;
        }
        console.error("Error fetching topic questions:", err);
        setTopicQuestions([]);
        setQuestionsLoading(false);
      });
  };

  const prefetchTopic = (topic) => {
    const cacheKey = `${topic.id}_page_1`;
    if (topicQuestionsCache[cacheKey]) return;

    fetch(`/api/v1/topic-wise-mcq/?topic_id=${topic.id}&page=1&limit=${LIMIT}`)
      .then(res => res.json())
      .then(resData => {
        const qList = resData.questions || [];
        topicQuestionsCache[cacheKey] = {
          questions: qList,
          total_pages: resData.total_pages || 1,
          total_questions: resData.total_questions || qList.length,
          current_page: 1
        };
      })
      .catch(() => {});
  };

  const triggerHapticFeedback = () => {
    if (typeof window !== 'undefined' && 'navigator' in window && typeof window.navigator.vibrate === 'function') {
      try {
        window.navigator.vibrate(20);
      } catch (e) {}
    }
  };

  const handleOptionSelect = (questionId, option) => {
    triggerHapticFeedback();
    if (!answers[questionId]) {
      setAnswers(prev => {
        const updated = { ...prev, [questionId]: option };
        try {
          sessionStorage.setItem('topic_mcq_answers', JSON.stringify(updated));
        } catch (e) {
          console.error("Could not save answer to sessionStorage:", e);
        }
        return updated;
      });
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
                onMouseEnter={() => prefetchTopic(topic)}
                onClick={() => handleTopicClick(topic, 1)}
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
  if (questionsLoading) return <Loader fullPage={true} text="Loading Questions..." />;
  const questions = topicQuestions;
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
            const qNum = (currentPage - 1) * LIMIT + index + 1;
            
            return (
              <div key={q.id} className="mcq-question-card">
                <div className="mcq-question-text">
                  Q{qNum}. {q.text}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="topic-pagination">
              <div className="pagination-info">
                Showing {(currentPage - 1) * LIMIT + 1}-{Math.min(currentPage * LIMIT, totalQuestions)} of {totalQuestions} Questions
              </div>
              <div className="pagination-buttons">
                <button 
                  className="pagination-btn"
                  disabled={currentPage <= 1}
                  onClick={() => {
                    handleTopicClick(selectedTopic, currentPage - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <i className="bi bi-chevron-left"></i> Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pNum => (
                  <button
                    key={pNum}
                    className={`pagination-btn ${pNum === currentPage ? 'active' : ''}`}
                    onClick={() => {
                      handleTopicClick(selectedTopic, pNum);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {pNum}
                  </button>
                ))}

                <button 
                  className="pagination-btn"
                  disabled={currentPage >= totalPages}
                  onClick={() => {
                    handleTopicClick(selectedTopic, currentPage + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Next <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
