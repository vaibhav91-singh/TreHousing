import React, { useState, useEffect } from 'react';
import './PopularTest.css';
import Loader from '../common/Loader.jsx';
import irbLogo from '../../assets/TestSeries/IRB.png';
import { extractArrayData } from '../../apiConfig.js';

const formatExamTitle = (title) => {
  if (!title) return 'Mock Test Series';
  const trimmed = title.trim();
  if (trimmed.length <= 5) return trimmed.toUpperCase() + ' Test Series';
  return trimmed.replace(/\b\w/g, c => c.toUpperCase());
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
        {quizzes.map((item) => (
          <div className="cardDesign" key={item.id}>
            <div className="card-top-bar">
              <div className="logo-ring">
                <img src={item.subject_banner || irbLogo} alt="Logo" loading="lazy" decoding="async" />
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
        ))}
      </div>
    </div>
  );
}