// src/components/TestSeries/PopularTest.jsx
import React, { useState, useEffect } from 'react';
import './PopularTest.css';

export default function PopularTest({ onSelectTest }) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Live backend data call
  useEffect(() => {
    fetch(`api/v1/quiz/`) // Aapka dynamic Quiz List endpoint
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching admin quizzes:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="main-container" style={{ textAlign: 'center', padding: '20px' }}>Loading Active Tests...</div>;
  if (quizzes.length === 0) return <div className="main-container" style={{ textAlign: 'center', padding: '20px' }}>Abhi admin ne koi quiz add nahi kiya hai.</div>;

  return (
    <div className="main-container">
      <p className="head-title">Popular Test Series</p>
      <div className="cards-portion">
        {quizzes.map((item) => (
          <div className="cardDesign" key={item.id}>
            {/* Banner/Logo image load loop */}
            <img src={item.subject_banner || "https://via.placeholder.com/53"} alt="Logo" />

            <p className="views">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCB00" viewBox="0 0 24 24" width="16" height="16">
                <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
              <span id="user">900K+ Users</span>
            </p>

            {/* Admin panel ka dynamic test title */}
            <p id="heading">{item.title}</p>

            {/* Dynamic Total Questions counting linked with your Subject Model */}
            <p>
              {item.questions ? item.questions.length : 0} Questions
              <span id="free"> | 3 Free Tests</span>
            </p>
            <hr />
            <p id="lang">
              <span><i className="bi bi-translate"></i></span>
              English, Hindi
            </p>
            <hr />

            <ul>
              <li>{item.description || "No description provided."}</li>
              {item.subject_title && <li>Subject Category: {item.subject_title}</li>}
            </ul>

            {/* Strict Connection: Yahan se unique Quiz ID pass ho rahi hai */}
            {/* PopularTest.jsx ke andar */}
            <button
              className="btn-view"
              onClick={() => onSelectTest && onSelectTest(item.title)} // id ke badle title bheja
            >
              View Test Series
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}