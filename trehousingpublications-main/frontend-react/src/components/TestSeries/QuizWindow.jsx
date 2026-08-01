// src/components/TestSeries/QuizWindow.jsx
import React, { useState, useEffect } from 'react';
import './QuizWindow.css';

const QuizWindow = ({ subject, onBack }) => {
  const [quizDetails, setQuizDetails] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/quiz/')
      .then((res) => res.json())
      .then((data) => {
        const matchedQuiz = data.find(q => q.title === subject);
        setQuizDetails(matchedQuiz || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lookup filter failed:", err);
        setLoading(false);
      });
  }, [subject]);

  // Timer logic
  useEffect(() => {
    if (completed || selectedChoice !== null || !quizDetails) return;
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, completed, selectedChoice, quizDetails]);

  // Function to save result to localStorage (Anonymous tracking)
  const saveToHistory = (quizTitle, finalScore, total) => {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const newEntry = {
      title: quizTitle,
      score: finalScore,
      total: total,
      date: new Date().toLocaleString()
    };
    history.push(newEntry);
    localStorage.setItem('quizHistory', JSON.stringify(history));
  };

  const handleOptionClick = (choice) => {
    if (selectedChoice !== null) return;
    setSelectedChoice(choice.id);
    if (choice.is_correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedChoice(null);
    setTimeLeft(120);
    if (currentQuestionIdx + 1 < (quizDetails?.questions.length || 0)) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      saveToHistory(quizDetails.title, score, quizDetails.questions.length); // Save here
      setCompleted(true);
    }
  };

  if (loading) return <div className="quiz-container">Loading Test Profile...</div>;
  if (!quizDetails) return <div className="quiz-container">Test not found.</div>;

  const questions = quizDetails.questions || [];
  const currentQuestion = questions[currentQuestionIdx];

  if (!currentQuestion && !completed) {
    return (
      <div className="quiz-container result-card">
        <h2 className="quiz-title">Oops!</h2>
        <p style={{ margin: '20px 0', color: '#666' }}>This mock test doesn't have any questions uploaded yet. Please check back later!</p>
        <button onClick={onBack} className="btn-next">Back to Test Series</button>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="quiz-container result-card">
        <div className="result-icon">🎉</div>
        <h2 className="quiz-title">Quiz Completed!</h2>
        <div className="score-badge">Score: {score} / {questions.length}</div>
        <button onClick={onBack} className="btn-next">Back to Test Series</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3 className="quiz-title">{quizDetails.title}</h3>
        <div className="timer-badge">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
      </div>

      <p className="question-text">Q. {currentQuestion.text}</p>

      <div className="choices-list">
        {currentQuestion.choices?.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleOptionClick(choice)}
            disabled={selectedChoice !== null}
            className={`choice-button ${selectedChoice === choice.id ? 'selected' : ''}`}
          >
            {choice.text}
          </button>
        ))}
      </div>

      <div className="quiz-footer">
        <button onClick={onBack} className="btn-quit">Quit</button>
        <button onClick={handleNext} disabled={selectedChoice === null} className="btn-next">
          {currentQuestionIdx + 1 === questions.length ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizWindow;