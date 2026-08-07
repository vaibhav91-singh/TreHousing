// src/components/TestSeries/QuizWindow.jsx
import React, { useState, useEffect } from 'react';
import Loader from '../common/Loader.jsx';
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
    fetch('/api/v1/quiz/')
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
    // Allow users to change their selection
    setSelectedChoice(choice.id);
  };

  const handleNext = () => {
    // Check correctness on next/skip
    let earnedPoint = 0;
    if (selectedChoice !== null) {
      const choice = currentQuestion.choices.find(c => c.id === selectedChoice);
      if (choice && choice.is_correct) {
        earnedPoint = 1;
        setScore((prev) => prev + 1);
      }
    }

    setSelectedChoice(null);
    setTimeLeft(120);
    if (currentQuestionIdx + 1 < (quizDetails?.questions.length || 0)) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      saveToHistory(quizDetails.title, score + earnedPoint, quizDetails.questions.length); 
      setCompleted(true);
    }
  };

  if (loading) return <Loader fullPage={true} text="Loading Test Profile..." />;
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
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div className="quiz-progress">
            Q {currentQuestionIdx + 1} / {questions.length}
          </div>
          <div className="timer-badge">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        </div>
      </div>

      <p className="question-text">Q. {currentQuestion.text}</p>

      <div className="choices-list">
        {currentQuestion.choices?.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleOptionClick(choice)}
            className={`choice-button ${selectedChoice === choice.id ? 'selected' : ''}`}
          >
            {choice.text}
          </button>
        ))}
      </div>

      <div className="quiz-footer">
        <button onClick={onBack} className="btn-quit">Quit</button>
        <button onClick={handleNext} className="btn-next">
          {currentQuestionIdx + 1 === questions.length ? 'Finish' : (selectedChoice === null ? 'Skip' : 'Next')}
        </button>
      </div>
    </div>
  );
};

export default QuizWindow;