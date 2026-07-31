import React, { useState, useEffect } from 'react';
import './SeriesCategories.css';
import irbLogo from '../../assets/TestSeries/IRB.png';

export default function SeriesCategories({ onSelectTest }) {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [examTypes, setExamTypes] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // API Call
    fetch(`/api/v1/quiz/`)
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setFilteredQuizzes(data);

        // Backend se aayi hui har quiz ki category ko nikaal kar unique list banao
        const uniqueCategories = ['All', ...new Set(data.map(item => item.category || 'General'))];
        setExamTypes(uniqueCategories);
        
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quizzes:", err);
        setLoading(false);
      });
  }, []);

  // Filter Logic: Category ya Search badalne par data update hoga
  useEffect(() => {
    let result = quizzes;

    if (activeCategory !== 'All') {
      result = result.filter(q => q.category === activeCategory);
    }

    if (searchTerm.trim() !== '') {
      result = result.filter(q => 
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQuizzes(result);
  }, [activeCategory, searchTerm, quizzes]);

  if (loading) return <div className="catogories" style={{textAlign: 'center', padding: '2rem'}}>Loading...</div>;

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
                <img src={item.subject_banner || irbLogo} alt="Logo" />
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