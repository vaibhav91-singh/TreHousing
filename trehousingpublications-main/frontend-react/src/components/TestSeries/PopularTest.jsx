import React, { useState, useEffect } from 'react';
import './PopularTest.css';
import Loader from '../common/Loader.jsx';
import { extractArrayData } from '../../apiConfig.js';

const formatExamTitle = (title) => {
  if (!title) return 'Mock Test Series';
  const trimmed = title.trim();
  if (trimmed.length <= 5) return trimmed.toUpperCase() + ' Test Series';
  return trimmed.replace(/\b\w/g, c => c.toUpperCase());
};

const getExamIconMeta = (title = '', category = '') => {
  const text = `${title} ${category}`.toLowerCase();
  
  if (text.includes('math') || text.includes('ganit') || text.includes('aptitude') || text.includes('reasoning')) {
    return { icon: 'bi-calculator-fill', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.35)' };
  }
  if (text.includes('gate') || text.includes('engineer') || text.includes('tech') || text.includes('civil') || text.includes('mech')) {
    return { icon: 'bi-gear-wide-connected', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.35)' };
  }
  if (text.includes('upsc') || text.includes('ias') || text.includes('civil service') || text.includes('polity') || text.includes('history')) {
    return { icon: 'bi-bank2', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.15)', border: 'rgba(192, 132, 252, 0.35)' };
  }
  if (text.includes('bpsc') || text.includes('tre') || text.includes('teacher') || text.includes('ctet') || text.includes('bed')) {
    return { icon: 'bi-mortarboard-fill', color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.35)' };
  }
  if (text.includes('railway') || text.includes('rrb') || text.includes('ntpc')) {
    return { icon: 'bi-train-front-fill', color: '#f87171', bg: 'rgba(248, 113, 113, 0.15)', border: 'rgba(248, 113, 113, 0.35)' };
  }
  if (text.includes('ssc') || text.includes('cgl') || text.includes('chsl')) {
    return { icon: 'bi-award-fill', color: '#f472b6', bg: 'rgba(244, 114, 182, 0.15)', border: 'rgba(244, 114, 182, 0.35)' };
  }
  
  return { icon: 'bi-journal-code', color: '#FFB300', bg: 'rgba(255, 179, 0, 0.15)', border: 'rgba(255, 179, 0, 0.35)' };
};

export default function PopularTest({ onSelectTest }) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/quiz/')
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(extractArrayData(data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching admin quizzes:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader text="Loading Active Tests..." />;
  if (quizzes.length === 0) return null;

  return (
    <div className="main-container">
      <div className="popular-header">
        <h2 className="head-title">🔥 Popular Test Series</h2>
        <span className="pop-badge">Top Choice for 2026</span>
      </div>

      <div className="cards-portion">
        {quizzes.map((item) => {
          const iconMeta = getExamIconMeta(item.title, item.category);
          return (
            <div className="cardDesign" key={item.id}>
              <div className="card-top-bar">
                <div 
                  className="logo-ring" 
                  style={{ 
                    backgroundColor: iconMeta.bg, 
                    borderColor: iconMeta.border 
                  }}
                >
                  {item.subject_banner ? (
                    <img src={item.subject_banner} alt="Logo" loading="lazy" decoding="async" />
                  ) : (
                    <i className={`bi ${iconMeta.icon}`} style={{ color: iconMeta.color, fontSize: '1.4rem' }}></i>
                  )}
                </div>
                <div className="views-pill">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#FFB300" viewBox="0 0 24 24" width="13" height="13">
                    <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                  <span>900K+ Users</span>
                </div>
              </div>

              <div className="card-body-content">
                <h3 className="exam-card-title">{formatExamTitle(item.title)}</h3>
                {item.description && (
                  <p className="exam-card-desc">{item.description}</p>
                )}
                
                <div className="card-meta-chips">
                  <span className="chip"><i className="bi bi-question-circle"></i> {item.questions ? item.questions.length : '50+'} Questions</span>
                  <span className="chip highlight"><i className="bi bi-lightning-charge-fill"></i> 3 Free Mocks</span>
                </div>

                <div className="card-lang-tag">
                  <i className="bi bi-translate"></i> English, Hindi
                </div>
              </div>

              <button
                className="btn-view"
                onClick={() => onSelectTest && onSelectTest(item.title)}
              >
                <span>Start Mock Test</span>
                <i className="bi bi-arrow-right-short btn-icon"></i>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}