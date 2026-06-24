// src/components/TestSeries/SeriesCategories.jsx
import React, { useState, useEffect } from 'react';
import './SeriesCategories.css';
import irbLogo from '../../assets/TestSeries/IRB.png';

export default function SeriesCategories({ onSelectTest }) {
  const Examtype = ['All', 'SSC', 'Railways', 'Banking & Insurance', 'PG Entrance Exam', 'Teaching Exams'];
  
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Django API se live quizzes pull karna
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/quiz/')
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setFilteredQuizzes(data); // Initial rendering ke liye saara data save kiya
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category quizzes:", err);
        setLoading(false);
      });
  }, []);

  // Filter and Search System Logic
  useEffect(() => {
    let result = quizzes;

    // 1. Category wise filter (Manually tracking matching keywords in title/description)
    if (activeCategory !== 'All') {
      result = result.filter(q => 
        q.title.toLowerCase().includes(activeCategory.toLowerCase()) || 
        (q.description && q.description.toLowerCase().includes(activeCategory.toLowerCase()))
      );
    }

    // 2. Search Box string match filter
    if (searchTerm.trim() !== '') {
      result = result.filter(q => 
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQuizzes(result);
  }, [activeCategory, searchTerm, quizzes]);

  if (loading) return <div className="catogories" style={{textAlign: 'center', padding: '2rem'}}>Loading Categories Dashboard...</div>;

  return (
    <div className="catogories">
      <div className="head-section">
        <h1>Test Series by Categories</h1>
        {/* Search handler input tab */}
        <input 
          type="text" 
          placeholder="Search for your exam" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="sublink-crads">
        {/* Dynamic Category Sub-menu */}
        <div className="subcard">
          {Examtype.map(item => (
            <p 
              key={item} 
              className={activeCategory === item ? 'active-tab' : ''} 
              onClick={() => setActiveCategory(item)}
              style={{ cursor: 'pointer' }}
            >
              {item}
            </p>
          ))}
        </div>

        <div className="cards-portion">
          {filteredQuizzes.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', width: '100%', color: '#718096' }}>
              Is category ya search term ke liye koi test filhal available nahi hai.
            </div>
          ) : (
            filteredQuizzes.map((item) => (
              <div className="cardDesign" key={item.id}>
                <img src={item.subject_banner || irbLogo} alt="Logo" />
                
                <p className="views">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCB00" viewBox="0 0 24 24" width="16" height="16">
                    <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                  <span id="user">900K+ Users</span>
                </p>
                
                {/* Admin Dynamic title matching */}
                <p id="heading">{item.title}</p>
                
                <p>{item.questions ? item.questions.length : 0} Total Questions <span id="free">| Free Tests</span></p>
                <hr />
                
                <p id="lang">
                  <span><i className="bi bi-translate"></i></span>
                  English, Hindi
                </p>
                <hr />
                
                <ul>
                  <li>{item.description || "Live dynamic exam profile tracker."}</li>
                  <li>Real-time Evaluation Performance Enabled</li>
                </ul>
                
                {/* Strict title binding passed to parent layout controller */}
                <button 
                  className="btn-view"
                  onClick={() => onSelectTest && onSelectTest(item.title)}
                >
                  View Test Series
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}