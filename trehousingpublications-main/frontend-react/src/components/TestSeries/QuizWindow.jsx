// src/components/TestSeries/QuizWindow.jsx
import React, { useState, useEffect, useRef } from 'react';
import Loader from '../common/Loader.jsx';
import './QuizWindow.css';
import { extractArrayData } from '../../apiConfig.js';

const QuizWindow = ({ subject, onBack }) => {
  const [quizDetails, setQuizDetails] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);

  // User answers map: { [questionId]: choiceId }
  const [userAnswers, setUserAnswers] = useState({});
  // Review flags map: { [questionId]: boolean }
  const [reviewFlags, setReviewFlags] = useState({});
  // Visited questions map: { [questionId]: boolean }
  const [visitedMap, setVisitedMap] = useState({});

  // Timer states (in seconds)
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  // Filter view state for detailed result review
  const [reviewFilter, setReviewFilter] = useState('ALL'); // 'ALL' | 'CORRECT' | 'INCORRECT' | 'SKIPPED'

  useEffect(() => {
    let isMounted = true;
    fetch('/api/v1/quiz/')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const list = extractArrayData(data);
        const matchedQuiz = list.find(q => q.title === subject) || list[0];
        if (matchedQuiz) {
          setQuizDetails(matchedQuiz);
          // Set timer from admin defined duration_minutes or dynamic fallback
          const totalSecs = (matchedQuiz.duration_minutes && matchedQuiz.duration_minutes > 0)
            ? (matchedQuiz.duration_minutes * 60)
            : Math.max(600, (matchedQuiz.questions?.length || 10) * 90);
          setTotalTimeLeft(totalSecs);
          
          // Restore cached progress if any
          const savedProgress = localStorage.getItem(`quiz_progress_${matchedQuiz.id}`);
          if (savedProgress) {
            try {
              const parsed = JSON.parse(savedProgress);
              setUserAnswers(parsed.userAnswers || {});
              setReviewFlags(parsed.reviewFlags || {});
              setVisitedMap(parsed.visitedMap || {});
            } catch (e) {
              console.error("Error restoring quiz progress", e);
            }
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Quiz lookup failed:", err);
        setLoading(false);
      });
    return () => { isMounted = false; };
  }, [subject]);

  // Track initial question visit
  useEffect(() => {
    if (quizDetails && quizDetails.questions && quizDetails.questions[currentQuestionIdx]) {
      const qId = quizDetails.questions[currentQuestionIdx].id;
      setVisitedMap(prev => ({ ...prev, [qId]: true }));
    }
  }, [currentQuestionIdx, quizDetails]);

  // Main Timer Countdown & Auto-Submit
  useEffect(() => {
    if (completed || !quizDetails || totalTimeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinalSubmit(); // Auto-submit when time expires
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [completed, quizDetails, totalTimeLeft > 0]);

  // Helper setter for time left
  const setTimeLeft = (updater) => {
    setTotalTimeLeft(updater);
  };

  // LocalStorage Persistence helper
  const saveProgress = (newAnswers, newReviews, newVisited) => {
    if (!quizDetails) return;
    localStorage.setItem(`quiz_progress_${quizDetails.id}`, JSON.stringify({
      userAnswers: newAnswers,
      reviewFlags: newReviews,
      visitedMap: newVisited
    }));
  };

  const handleOptionSelect = (choiceId) => {
    const qId = currentQuestion.id;
    const updatedAnswers = { ...userAnswers, [qId]: choiceId };
    setUserAnswers(updatedAnswers);
    saveProgress(updatedAnswers, reviewFlags, visitedMap);
  };

  const handleClearResponse = () => {
    const qId = currentQuestion.id;
    const updatedAnswers = { ...userAnswers };
    delete updatedAnswers[qId];
    setUserAnswers(updatedAnswers);
    saveProgress(updatedAnswers, reviewFlags, visitedMap);
  };

  const handleToggleReview = () => {
    const qId = currentQuestion.id;
    const updatedReviews = { ...reviewFlags, [qId]: !reviewFlags[qId] };
    setReviewFlags(updatedReviews);
    saveProgress(userAnswers, updatedReviews, visitedMap);
  };

  const handleJumpToQuestion = (idx) => {
    setCurrentQuestionIdx(idx);
    setShowMobilePalette(false); // Auto close mobile palette on select
  };

  const handleFinalSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (quizDetails) {
      localStorage.removeItem(`quiz_progress_${quizDetails.id}`);

      // Calculate final score for history logging
      let correctCount = 0;
      const questions = quizDetails.questions || [];
      questions.forEach((q) => {
        const selectedId = userAnswers[q.id];
        const correctChoice = q.choices?.find(c => c.is_correct);
        if (correctChoice && correctChoice.id === selectedId) {
          correctCount++;
        }
      });

      const newRecord = {
        id: Date.now(),
        title: quizDetails.title,
        score: correctCount,
        total: questions.length,
        timeSpent: timeSpent,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        timestamp: Date.now()
      };

      try {
        const existingHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
        const updatedHistory = [newRecord, ...existingHistory];
        localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
      } catch (e) {
        console.error("Error saving quiz history to localStorage", e);
      }
    }
    setCompleted(true);
  };

  if (loading) return <Loader fullPage={true} text="Loading Test Profile & Questions..." />;
  if (!quizDetails) return <div className="quiz-container">Test configuration not found.</div>;

  const questions = quizDetails.questions || [];
  
  if (questions.length === 0) {
    return (
      <div className="exam-window-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '20px' }}>
        <div style={{ textAlign: 'center', background: 'var(--bg-white)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', maxWidth: '500px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📝</div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-heading)', marginBottom: '10px' }}>No Questions Found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '25px', fontSize: '0.95rem' }}>
            This test currently does not have any questions. Please check back later or select another test.
          </p>
          <button onClick={onBack} className="btn-back-series" style={{ padding: '10px 24px', background: 'var(--primary)', color: '#0F172A', fontWeight: '700', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            ← Back to Test Series
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIdx] || questions[0];

  // Helper to determine question palette button status
  const getQuestionStatus = (q) => {
    if (!q || !q.id) return 'unvisited';
    const qId = q.id;
    const isAnswered = userAnswers[qId] !== undefined;
    const isReview = !!reviewFlags[qId];
    const isVisited = !!visitedMap[qId];

    if (isAnswered && isReview) return 'answered-review';
    if (isReview) return 'review';
    if (isAnswered) return 'answered';
    if (isVisited) return 'unanswered';
    return 'unvisited';
  };


  // Render Graphical Result Analytics Dashboard
  if (completed) {
    let totalQuestions = questions.length;
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    questions.forEach((q) => {
      const selectedId = userAnswers[q.id];
      if (selectedId === undefined) {
        skippedCount++;
      } else {
        const correctChoice = q.choices?.find(c => c.is_correct);
        if (correctChoice && correctChoice.id === selectedId) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const accuracy = (correctCount + incorrectCount) > 0 ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) : 0;
    const avgTimePerQ = totalQuestions > 0 ? Math.round(timeSpent / totalQuestions) : 0;

    // Filter questions for detailed review
    const filteredQuestions = questions.filter(q => {
      const selectedId = userAnswers[q.id];
      const correctChoice = q.choices?.find(c => c.is_correct);
      const isCorrect = correctChoice && correctChoice.id === selectedId;
      const isSkipped = selectedId === undefined;

      if (reviewFilter === 'CORRECT') return isCorrect && !isSkipped;
      if (reviewFilter === 'INCORRECT') return !isCorrect && !isSkipped;
      if (reviewFilter === 'SKIPPED') return isSkipped;
      return true;
    });

    return (
      <div className="analytics-dashboard-container">
        {/* Header */}
        <div className="analytics-header">
          <div className="analytics-title-group">
            <span className="celebration-badge">📊 Test Analytics Report</span>
            <h2>{quizDetails.title}</h2>
          </div>
          <button onClick={onBack} className="btn-back-series">
            ← Back to Test Series
          </button>
        </div>

        {/* Top Metric Cards Grid */}
        <div className="metrics-grid">
          <div className="metric-card score-card">
            <div className="metric-icon">🏆</div>
            <div className="metric-info">
              <span className="metric-label">Total Score</span>
              <h3 className="metric-value">{correctCount} / {totalQuestions}</h3>
              <span className="metric-subtext">{scorePercentage}% Marks Secured</span>
            </div>
          </div>

          <div className="metric-card accuracy-card">
            <div className="metric-icon">🎯</div>
            <div className="metric-info">
              <span className="metric-label">Accuracy Rate</span>
              <h3 className="metric-value">{accuracy}%</h3>
              <span className="metric-subtext">Precision Indicator</span>
            </div>
          </div>

          <div className="metric-card time-card">
            <div className="metric-icon">⏱️</div>
            <div className="metric-info">
              <span className="metric-label">Time Spent</span>
              <h3 className="metric-value">{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</h3>
              <span className="metric-subtext">Avg {avgTimePerQ}s per question</span>
            </div>
          </div>
        </div>

        {/* Accuracy Progress Bar */}
        <div className="progress-breakdown-card">
          <h4>Performance Breakdown</h4>
          <div className="stacked-progress-bar">
            <div className="bar-segment correct" style={{ width: `${(correctCount / totalQuestions) * 100}%` }} title={`Correct: ${correctCount}`} />
            <div className="bar-segment incorrect" style={{ width: `${(incorrectCount / totalQuestions) * 100}%` }} title={`Incorrect: ${incorrectCount}`} />
            <div className="bar-segment skipped" style={{ width: `${(skippedCount / totalQuestions) * 100}%` }} title={`Skipped: ${skippedCount}`} />
          </div>

          <div className="legend-row">
            <div className="legend-item"><span className="dot dot-correct"></span> Correct ({correctCount})</div>
            <div className="legend-item"><span className="dot dot-incorrect"></span> Incorrect ({incorrectCount})</div>
            <div className="legend-item"><span className="dot dot-skipped"></span> Skipped ({skippedCount})</div>
          </div>
        </div>

        {/* Detailed Solutions Section */}
        <div className="detailed-review-section">
          <div className="review-filter-header">
            <h3>Detailed Question Solutions</h3>
            <div className="filter-pills">
              <button className={`pill ${reviewFilter === 'ALL' ? 'active' : ''}`} onClick={() => setReviewFilter('ALL')}>All ({totalQuestions})</button>
              <button className={`pill green ${reviewFilter === 'CORRECT' ? 'active' : ''}`} onClick={() => setReviewFilter('CORRECT')}>Correct ({correctCount})</button>
              <button className={`pill red ${reviewFilter === 'INCORRECT' ? 'active' : ''}`} onClick={() => setReviewFilter('INCORRECT')}>Incorrect ({incorrectCount})</button>
              <button className={`pill gray ${reviewFilter === 'SKIPPED' ? 'active' : ''}`} onClick={() => setReviewFilter('SKIPPED')}>Skipped ({skippedCount})</button>
            </div>
          </div>

          <div className="questions-review-list">
            {filteredQuestions.map((q, idx) => {
              const selectedId = userAnswers[q.id];
              const correctChoice = q.choices?.find(c => c.is_correct);
              const isCorrect = correctChoice && correctChoice.id === selectedId;
              const isSkipped = selectedId === undefined;

              let statusClass = 'skipped';
              let statusLabel = 'Skipped';
              if (!isSkipped) {
                if (isCorrect) {
                  statusClass = 'correct';
                  statusLabel = 'Correct';
                } else {
                  statusClass = 'incorrect';
                  statusLabel = 'Incorrect';
                }
              }

              return (
                <div key={q.id} className={`solution-card ${statusClass}`}>
                  <div className="solution-card-header">
                    <span className="q-number">Q{questions.findIndex(item => item.id === q.id) + 1}</span>
                    <span className={`status-tag ${statusClass}`}>{statusLabel}</span>
                  </div>

                  <p className="solution-question-text">{q.text}</p>

                  <div className="solution-options-grid">
                    {q.choices?.map(c => {
                      let optionState = '';
                      if (c.id === selectedId && c.is_correct) optionState = 'user-correct';
                      else if (c.id === selectedId && !c.is_correct) optionState = 'user-incorrect';
                      else if (c.is_correct) optionState = 'correct-answer';

                      return (
                        <div key={c.id} className={`solution-option ${optionState}`}>
                          <span className="option-bullet">
                            {optionState === 'user-correct' && '✓ '}
                            {optionState === 'user-incorrect' && '✗ '}
                            {optionState === 'correct-answer' && '✔ '}
                          </span>
                          {c.text}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Format seconds to HH:MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="exam-window-wrapper">
      {/* Main Test Container */}
      <div className="exam-main-panel">
        {/* Header Bar */}
        <div className="exam-header">
          <div className="exam-title-badge">
            <h2>{quizDetails.title}</h2>
          </div>

          <div className="exam-header-right">
            <button 
              className="btn-mobile-palette-toggle"
              onClick={() => setShowMobilePalette(!showMobilePalette)}
            >
              📱 Palette ({questions.filter(q => userAnswers[q.id] !== undefined).length}/{questions.length})
            </button>

            <div className="exam-timer-card">
              <span className="timer-icon">⏱️ Time Remaining</span>
              <span className={`timer-clock ${totalTimeLeft < 300 ? 'warning' : ''}`}>
                {formatTime(totalTimeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="question-content-box">
          <div className="question-meta-bar">
            <span className="question-num-tag">Question {currentQuestionIdx + 1} of {questions.length}</span>
            <button onClick={handleToggleReview} className={`btn-review-flag ${currentQuestion && reviewFlags[currentQuestion.id] ? 'active' : ''}`}>
              {currentQuestion && reviewFlags[currentQuestion.id] ? '🚩 Marked for Review' : '🏳️ Mark for Review'}
            </button>
          </div>

          <h3 className="question-prompt">{currentQuestion?.text || "Question Text Unavailable"}</h3>

          <div className="choices-vertical-group">
            {(!currentQuestion?.choices || currentQuestion.choices.length === 0) ? (
              <div style={{ padding: '15px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No option choices found for this question.
              </div>
            ) : (
              currentQuestion.choices.map((choice) => {
                const isSelected = userAnswers[currentQuestion.id] === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleOptionSelect(choice.id)}
                    className={`exam-choice-card ${isSelected ? 'selected' : ''}`}
                  >
                    <span className="choice-indicator">{isSelected ? '●' : '○'}</span>
                    <span className="choice-label-text">{choice.text}</span>
                  </button>
                );
              })
            )}
          </div>

        </div>

        {/* Action Footer */}
        <div className="exam-footer">
          <div className="footer-left-actions">
            <button onClick={handleClearResponse} className="btn-clear-choice">Clear Selection</button>
          </div>

          <div className="footer-right-actions">
            {currentQuestionIdx > 0 && (
              <button onClick={() => setCurrentQuestionIdx(prev => prev - 1)} className="btn-prev-q">
                ← Previous
              </button>
            )}

            {currentQuestionIdx < questions.length - 1 ? (
              <button onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="btn-next-q">
                Next →
              </button>
            ) : (
              <button onClick={handleFinalSubmit} className="btn-submit-exam">
                Submit Test
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question Palette Sidebar */}
      <div className={`exam-sidebar-panel ${showMobilePalette ? 'mobile-open' : ''}`}>
        <div className="palette-header">
          <h3>Question Palette</h3>
          <button className="btn-close-palette-mobile" onClick={() => setShowMobilePalette(false)}>
            ✕
          </button>
        </div>

        {/* Legend */}
        <div className="palette-legend">
          <div className="legend-tag"><span className="badge-icon answered"></span> Answered</div>
          <div className="legend-tag"><span className="badge-icon review"></span> Review</div>
          <div className="legend-tag"><span className="badge-icon answered-review"></span> Answered & Review</div>
          <div className="legend-tag"><span className="badge-icon unanswered"></span> Not Answered</div>
        </div>

        {/* Question Numbers Grid */}
        <div className="palette-numbers-grid">
          {questions.map((q, idx) => {
            const status = getQuestionStatus(q);
            const isCurrent = idx === currentQuestionIdx;

            return (
              <button
                key={q.id}
                onClick={() => handleJumpToQuestion(idx)}
                className={`palette-num-btn ${status} ${isCurrent ? 'current' : ''}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="sidebar-footer-actions">
          <button onClick={handleFinalSubmit} className="btn-finish-test-side">
            Finish Test & Submit
          </button>
          <button onClick={onBack} className="btn-exit-test">
            Exit Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizWindow;