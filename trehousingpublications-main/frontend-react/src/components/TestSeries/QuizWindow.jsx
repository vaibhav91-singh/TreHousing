// src/components/TestSeries/QuizWindow.jsx
import React, { useState, useEffect } from 'react';
import './QuizWindow.css';

const QuizWindow = ({ subject, onBack }) => {
  // Yahan 'subject' prop ke andar ab admin card ki Unique Database ID aa rahi hai
  const [quizDetails, setQuizDetails] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

// QuizWindow.jsx ke andar ka useEffect block aise badal dijiye:
useEffect(() => {
  // Yeh saare quizzes mangayega aur frontend par exact filter query check karega
  fetch('http://127.0.0.1:8000/api/v1/quiz/')
    .then((res) => res.json())
    .then((data) => {
      // Jo title list mein se match karega strictly wahi array profile nikalega
      const matchedQuiz = data.find(q => q.title === subject);
      setQuizDetails(matchedQuiz || null);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Lookup filter failed:", err);
      setLoading(false);
    });
}, [subject]);

  if (loading) return <div className="quiz-container" style={{textAlign: 'center'}}>Loading Strict Verified Test Profile...</div>;
  if (!quizDetails) return <div className="quiz-container">This test profile does not exist on server.</div>;

  const questions = quizDetails.questions || [];
  if (questions.length === 0) return <div className="quiz-container">Admin has not added questions to this test yet.</div>;

  const currentQuestion = questions[currentQuestionIdx];

  const handleOptionClick = (choice) => {
    if (selectedChoice !== null) return; 
    setSelectedChoice(choice.id);
    if (choice.is_correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedChoice(null);
    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="quiz-container result-card">
        <div className="result-icon">🎉</div>
        <h2 className="quiz-title">Quiz Completed!</h2>
        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Test: <strong>{quizDetails.title}</strong></p>
        <div className="score-badge">
          Score: {score} / {questions.length}
        </div>
        <div>
          <button onClick={onBack} className="btn-next">
            Back to Test Series
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3 className="quiz-title">{quizDetails.title}</h3>
        <span className="quiz-progress">
          Question: {currentQuestionIdx + 1} / {questions.length}
        </span>
      </div>

      <p className="question-text">
        Q. {currentQuestion.text}
      </p>

      <div className="choices-list">
        {currentQuestion.choices?.map((choice) => {
          const isSelected = selectedChoice === choice.id;
          return (
            <button
              key={choice.id}
              onClick={() => handleOptionClick(choice)}
              disabled={selectedChoice !== null}
              className={`choice-button ${isSelected ? 'selected' : ''}`}
            >
              {choice.text}
            </button>
          );
        })}
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