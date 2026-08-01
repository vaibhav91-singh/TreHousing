import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RapidFireSection() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get('/api/v1/quiz/');
        // Pick the first quiz for the rapid fire or a random one
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

  return (
    <section className="hp-section">
      <div className="hp-challenge">
        <div className="hp-challenge-content">
          <span className="hp-challenge-pill">
            <i className="bi bi-lightning-charge-fill"></i> 10 DAY STREAK
          </span>
          <h2 className="hp-challenge-title">Today's Rapid Fire Challenge</h2>
          
          {loading ? (
            <p style={{ color: 'var(--hp-text-muted)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              Loading today's challenge...
            </p>
          ) : quiz ? (
            <p style={{ color: 'var(--hp-text-muted)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              Test your knowledge on <strong>{quiz.title}</strong>. {quiz.questions ? quiz.questions.length : 10} questions, 120 seconds. Are you ready to climb the leaderboard?
            </p>
          ) : (
            <p style={{ color: 'var(--hp-text-muted)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              Test your knowledge on <strong>Ancient Indian Architecture</strong>. 10 questions, 120 seconds. Are you ready to climb the leaderboard?
            </p>
          )}
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--hp-text-muted)', marginBottom: '0.5rem' }}>
              <span>Current Progress</span>
              <span>78% Goal Reached</span>
            </div>
            <div className="hp-progress-bar" style={{ marginTop: '0', backgroundColor: '#1e293b' }}>
              <div className="hp-progress-fill" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
        
        <div>
          {/* Navigate to the quiz page, pass quiz ID if needed */}
          <a href={quiz ? `/quiz/${quiz.id}` : "/quiz"} className="hp-play-btn">
            <span style={{ fontSize: '0.625rem', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>LET'S</span>
            START
            <i className="bi bi-play-fill" style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}></i>
          </a>
        </div>
      </div>
    </section>
  );
}
