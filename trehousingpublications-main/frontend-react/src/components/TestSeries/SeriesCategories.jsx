import React, { useState, useEffect, useMemo } from 'react';
import Loader from '../common/Loader.jsx';
import './SeriesCategories.css';
import irbLogo from '../../assets/TestSeries/IRB.png';
import { extractArrayData } from '../../apiConfig.js';

let seriesCache = null;

// Helper function to format exam titles nicely
const formatExamTitle = (title) => {
  if (!title) return 'Mock Test Series';
  const trimmed = title.trim();
  if (trimmed.length <= 5) return trimmed.toUpperCase() + ' Test Series';
  return trimmed.replace(/\b\w/g, c => c.toUpperCase());
};

export default function SeriesCategories({ onSelectTest }) {
  const [quizzes, setQuizzes] = useState([]);
  const [examTypes, setExamTypes] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (seriesCache) {
      setQuizzes(seriesCache);
      setExamTypes(['All', ...new Set(seriesCache.map(item => item.category || 'General'))]);
      setLoading(false);
      return;
    }
    let isMounted = true;
    fetch(`/api/v1/quiz/`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const list = extractArrayData(data);
        seriesCache = list;
        setQuizzes(list);
        const uniqueCategories = ['All', ...new Set(list.map(item => item.category || 'General'))];
        setExamTypes(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error fetching quizzes:", err);
        setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const filteredQuizzes = useMemo(() => {
    let result = quizzes;
    if (activeCategory !== 'All') {
      result = result.filter(q => q.category === activeCategory);
    }
    if (debouncedSearchTerm.trim() !== '') {
      result = result.filter(q => 
        q.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }
    return result;
  }, [activeCategory, debouncedSearchTerm, quizzes]);

  if (loading) return <Loader fullPage={true} text="Loading Test Series..." />;

  return (
    <div className="catogories">
      <div className="head-section">
        <div className="head-title-wrap">
          <h1>Test Series by Categories</h1>
          <p className="head-subtitle">Select your target exam and start practicing high-yield mock tests</p>
        </div>
        <div className="search-box-wrapper">
          <input 
            type="text" 
            placeholder="Search for your exam (e.g. GATE, BPSC...)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="sublink-crads">
        <div className="subcard">
          <p className="sidebar-label">Exams Categories</p>
          {examTypes.map(item => (
            <p 
              key={item} 
              className={activeCategory === item ? 'active-tab' : ''} 
              onClick={() => setActiveCategory(item)}
              style={{ cursor: 'pointer' }}
            >
              <i className="bi bi-grid-fill tab-icon"></i>
              <span>{item}</span>
              <span className="cat-count">
                {item === 'All' ? quizzes.length : quizzes.filter(q => q.category === item).length}
              </span>
            </p>
          ))}
        </div>

        <div className="cards-portion">
          {filteredQuizzes.length === 0 ? (
            <div className="empty-test-state">
              <i className="bi bi-search-heart empty-icon"></i>
              <h3>No tests found</h3>
              <p>Try searching for a different keyword or category.</p>
            </div>
          ) : (
            filteredQuizzes.map((item) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}