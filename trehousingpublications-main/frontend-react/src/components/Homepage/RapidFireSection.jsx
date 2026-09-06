import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RapidFireSection() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get('/api/v1/quiz/');
        if (response.data && response.data.length > 0) {
          setQuiz(response.data[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  const handleStartClick = (e) => {
    e.preventDefault();
    if (quiz && quiz.title) {
      navigate(`/testseries?quiz_title=${encodeURIComponent(quiz.title)}`);
    } else {
      navigate('/testseries');
    }
  };

  return (
    <section className="hp-section">
      <div className="hp-challenge">
        <div className="hp-challenge-content">
          <span className="hp-challenge-pill">
            <i className="bi bi-lightning-charge-fill"></i> 10 DAY STREAK
          </span>
          <h2 className="hp-challenge-title">Today's Rapid Fire Challenge</h2>
          
          {loading ? (
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              Loading today's challenge...
            </p>
          ) : quiz ? (
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              Test your knowledge on <strong>{quiz.title}</strong>. {quiz.questions ? quiz.questions.length : 10} questions, 120 seconds. Are you ready to climb the leaderboard?
            </p>
          ) : (
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              Test your knowledge on <strong>Ancient Indian Architecture</strong>. 10 questions, 120 seconds. Are you ready to climb the leaderboard?
            </p>
          )}
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.5rem' }}>
              <span>Current Progress</span>
              <span>78% Goal Reached</span>
            </div>
            <div className="hp-progress-bar" style={{ marginTop: '0', backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
              <div className="hp-progress-fill" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
        
        <div>
          {/* Navigate directly to Mock Test / Test Series page */}
          <button 
            onClick={handleStartClick} 
            className="hp-play-btn"
            title="Start Mock Test Now"
          >
            <span className="play-btn-lets">LET'S</span>
            <span className="play-btn-start">START</span>
            <i className="bi bi-play-fill play-btn-icon"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
