import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader.jsx';
import './SeriesCategories.css';
import irbLogo from '../../assets/TestSeries/IRB.png';
import { extractArrayData } from '../../apiConfig.js';

let seriesCache = null;

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
    // API Call
    fetch(`/api/v1/quiz/`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const list = extractArrayData(data);
        seriesCache = list;
        setQuizzes(list);

        // Backend se aayi hui har quiz ki category ko nikaal kar unique list banao
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

  // Filter Logic computed cleanly via useMemo
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
        <h1>Test Series by Categories</h1>
        <input 
          type="text" 
          placeholder="Search for your exam" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="sublink-crads">
        {/* Dynamic Tabs: Yahan backend se aaye subjects/categories dikhenge */}
        <div className="subcard">
          {examTypes.map(item => (
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
            <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>
              No tests found for this selection.
            </div>
          ) : (
            filteredQuizzes.map((item) => (
              <div className="cardDesign" key={item.id}>
                <img src={item.subject_banner || irbLogo} alt="Logo" loading="lazy" decoding="async" />
                <p className="views"><span id="user">900K+ Users</span></p>
                <p id="heading">{item.title}</p>
                <button 
                  className="btn-view"
                  onClick={() => onSelectTest && onSelectTest(item.title)}
                >
                  Start Mock Test
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}