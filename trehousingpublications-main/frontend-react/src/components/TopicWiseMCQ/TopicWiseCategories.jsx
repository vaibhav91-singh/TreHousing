import React, { useState, useEffect, useRef } from 'react';
import './TopicWiseCategories.css';
import Loader from '../common/Loader.jsx';
import { extractArrayData } from '../../apiConfig.js';

// Module-level in-memory cache to persist across re-renders
const topicQuestionsCache = {};
let categoryHierarchyCache = null;

function renderFormattedMath(text) {
  if (!text || typeof text !== 'string') return text;
  if (!text.includes('$') && !text.includes('\\')) return text;

  let formatted = text
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\pm/g, '±')
    .replace(/\\infty/g, '∞')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\theta/g, 'θ')
    .replace(/\\pi/g, 'π')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\sum/g, '∑')
    .replace(/\\int/g, '∫')
    .replace(/\\neq/g, '≠')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\approx/g, '≈')
    .replace(/\\det/g, 'det')
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\^4/g, '⁴')
    .replace(/\^n/g, 'ⁿ')
    .replace(/\^0/g, '⁰')
    .replace(/\^1/g, '¹');

  formatted = formatted.replace(/\$(.*?)\$/g, '$1');

  return formatted;
}

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
    if (!items || !Array.isArray(items)) return [];
    if (!debouncedSearchTerm) return items;
    return items.filter(item =>
      item && item[key] && item[key].toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
      try { sessionStorage.removeItem('topic_mcq_active_session'); } catch (e) { }
    } else if (level === 'subject') {
      setSelectedSubject(null);
      setSelectedTopic(null);
      setTopicQuestions([]);
      setSearchTerm('');
      try { sessionStorage.removeItem('topic_mcq_active_session'); } catch (e) { }
    } else if (level === 'topic') {
      setSelectedTopic(null);
      setTopicQuestions([]);
      setSearchTerm('');
      try { sessionStorage.removeItem('topic_mcq_active_session'); } catch (e) { }
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
    } catch (e) { }

    const cacheKey = `${topic.id}_page_${pageNum}`;

    // Check in-memory cache for 0ms instant loading (only if questions exist)
    if (topicQuestionsCache[cacheKey]) {
      const cached = topicQuestionsCache[cacheKey];
      if (cached.questions && cached.questions.length > 0) {
        setTopicQuestions(cached.questions);
        setTotalPages(cached.total_pages);
        setTotalQuestions(cached.total_questions);
        setCurrentPage(cached.current_page);
        return;
      }
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
      .catch(() => { });
  };

  const triggerHapticFeedback = () => {
    if (typeof window !== 'undefined' && 'navigator' in window && typeof window.navigator.vibrate === 'function') {
      try {
        window.navigator.vibrate(20);
      } catch (e) { }
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
        <div className="topic-hero-header">
          <span className="topic-hero-badge"><i className="bi bi-lightning-charge-fill"></i> TOPIC-WISE MCQS</span>
          <h1 className="topic-hero-title">Select Exam Category</h1>
          <p className="topic-hero-subtitle">Choose an exam to practice subject-wise & chapter-wise objective questions with solutions</p>

          <div className="topic-search-wrapper">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              placeholder="Search exams (e.g. GATE, BPSC, SSC)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="topic-grid">
          {filteredExams.map((exam, index) => (
            <div
              key={exam.id}
              className="topic-card exam-card"
              onClick={() => { setSelectedExam(exam); setSearchTerm(''); }}
            >
              <div className="card-icon-avatar exam-avatar">
                <i className="bi bi-award-fill"></i>
              </div>
              <div className="card-content">
                <h3 className="card-title">{exam.name}</h3>
                <span className="card-meta-pill">
                  <i className="bi bi-journals"></i> {exam.subjects?.length || 0} Subjects
                </span>
              </div>
              <div className="card-arrow">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          ))}

          {filteredExams.length === 0 && (
            <div className="topic-empty-state">
              <i className="bi bi-folder-x"></i>
              <p>No exams found matching "{searchTerm}"</p>
            </div>
          )}
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
          <span onClick={() => resetSelection('exam')}>
            <i className="bi bi-grid-fill"></i> All Exams
          </span>
          <i className="bi bi-chevron-right separator"></i>
          <span className="active">{selectedExam.name}</span>
        </div>

        <div className="topic-hero-header">
          <span className="topic-hero-badge"><i className="bi bi-award"></i> {selectedExam.name}</span>
          <h1 className="topic-hero-title">Select Subject</h1>
          <p className="topic-hero-subtitle">Pick a subject to explore topic-wise practice sets & MCQs</p>

          <div className="topic-search-wrapper">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              placeholder={`Search subjects in ${selectedExam.name}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="topic-grid">
          {filteredSubjects.map((sub, index) => (
            <div
              key={sub.id}
              className="topic-card subject-card"
              onClick={() => { setSelectedSubject(sub); setSearchTerm(''); }}
            >
              <div className="card-icon-avatar subject-avatar">
                <i className="bi bi-book-half"></i>
              </div>
              <div className="card-content">
                <h3 className="card-title">{sub.name}</h3>
                <span className="card-meta-pill">
                  <i className="bi bi-layers-half"></i> {sub.topics?.length || 0} Topics
                </span>
              </div>
              <div className="card-arrow">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          ))}

          {filteredSubjects.length === 0 && (
            <div className="topic-empty-state">
              <i className="bi bi-folder-x"></i>
              <p>No subjects found for "{searchTerm}"</p>
            </div>
          )}
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
          <span onClick={() => resetSelection('exam')}>
            <i className="bi bi-grid-fill"></i> All Exams
          </span>
          <i className="bi bi-chevron-right separator"></i>
          <span onClick={() => resetSelection('subject')}>{selectedExam.name}</span>
          <i className="bi bi-chevron-right separator"></i>
          <span className="active">{selectedSubject.name}</span>
        </div>

        <div className="topic-hero-header">
          <span className="topic-hero-badge"><i className="bi bi-book-half"></i> {selectedSubject.name}</span>
          <h1 className="topic-hero-title">Select Topic</h1>
          <p className="topic-hero-subtitle">Select a topic to start practicing MCQs with detailed explanations</p>

          <div className="topic-search-wrapper">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              placeholder={`Search topics in ${selectedSubject.name}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="topic-grid">
          {filteredTopics.map((topic, index) => (
            <div
              key={topic.id}
              className="topic-card topic-card-item"
              onMouseEnter={() => prefetchTopic(topic)}
              onClick={() => handleTopicClick(topic, 1)}
            >
              <div className="card-icon-avatar topic-avatar">
                <i className="bi bi-file-earmark-text-fill"></i>
              </div>
              <div className="card-content">
                <h3 className="card-title">{topic.name}</h3>
                <span className="card-action-tag">
                  Practice Set <i className="bi bi-arrow-right-short"></i>
                </span>
              </div>
              <div className="card-arrow">
                <i className="bi bi-play-circle-fill"></i>
              </div>
            </div>
          ))}

          {filteredTopics.length === 0 && (
            <div className="topic-empty-state">
              <i className="bi bi-journal-x"></i>
              <p>No topics available yet for this subject.</p>
            </div>
          )}
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
        <span onClick={() => resetSelection('exam')}>
          <i className="bi bi-grid-fill"></i> All Exams
        </span>
        <i className="bi bi-chevron-right separator"></i>
        <span onClick={() => resetSelection('subject')}>{selectedExam.name}</span>
        <i className="bi bi-chevron-right separator"></i>
        <span onClick={() => resetSelection('topic')}>{selectedSubject.name}</span>
        <i className="bi bi-chevron-right separator"></i>
        <span className="active">{selectedTopic.name}</span>
      </div>

      <div className="topic-hero-header questions-hero">
        <span className="topic-hero-badge"><i className="bi bi-check2-square"></i> PRACTICE MODE</span>
        <h1 className="topic-hero-title">{selectedTopic.name}</h1>
        <div className="questions-stats-bar">
          <span><i className="bi bi-question-circle-fill"></i> {totalQuestions} Questions</span>
          <span><i className="bi bi-file-text"></i> Page {currentPage} of {totalPages}</span>
        </div>
      </div>

      <div className="topic-questions-wrapper">
        {questions.map((q, index) => {
          const answered = answers[q.id];
          const qNum = (currentPage - 1) * LIMIT + index + 1;

          return (
            <div key={q.id} className="mcq-question-card">
              <div className="mcq-question-header">
                <span className="q-badge">Question {qNum}</span>
              </div>

              <div className="mcq-question-text">
                {renderFormattedMath(q.text)}
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
                      <span className="option-letter">{opt}</span>
                      <span className="option-text">{renderFormattedMath(optText)}</span>
                      {answered && opt === q.correct_option && (
                        <i className="bi bi-check-circle-fill opt-icon-correct"></i>
                      )}
                      {answered && opt === answered && opt !== q.correct_option && (
                        <i className="bi bi-x-circle-fill opt-icon-incorrect"></i>
                      )}
                    </div>
                  );
                })}
              </div>

              {answered && q.explanation && (
                <div className="mcq-explanation">
                  <div className="explanation-title">
                    <i className="bi bi-lightbulb-fill"></i> Solution & Explanation
                  </div>
                  <div className="explanation-body">
                    {renderFormattedMath(q.explanation)}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {questions.length === 0 && (
          <div className="topic-empty-state">
            <i className="bi bi-question-square"></i>
            <p>No questions added yet for this topic.</p>
          </div>
        )}

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
  );
}

