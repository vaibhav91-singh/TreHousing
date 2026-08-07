import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader.jsx';
import './PYQCategories.css'; // Reusing the same CSS for identical layout

export default function AnswerKeyCategories() {
  const [keys, setKeys] = useState([]);
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [examTypes, setExamTypes] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // API Call to fetch Papers (which contain answer keys)
    fetch(`/api/v1/solved-papers/`)
      .then((res) => res.json())
      .then((data) => {
        // Filter out papers that do NOT have an answer key
        const responseData = (data.data || []).filter(item => item.answer_key_link);
        
        setKeys(responseData);
        setFilteredKeys(responseData);

        // Extract unique subjects/categories
        const uniqueCategories = ['All', ...new Set(responseData.map(item => item.subject_title || 'General'))];
        setExamTypes(uniqueCategories);
        
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching answer keys:", err);
        setLoading(false);
      });
  }, []);

  // Filter Logic: Category or Search changes
  useEffect(() => {
    let result = keys;

    if (activeCategory !== 'All') {
      result = result.filter(p => p.subject_title === activeCategory);
    }

    if (searchTerm.trim() !== '') {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (p.subject_title && p.subject_title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      const matchedCategory = examTypes.find(
        type => type.toLowerCase() === searchTerm.toLowerCase() && type !== 'All'
      );
      if (matchedCategory && activeCategory !== matchedCategory) {
         setActiveCategory(matchedCategory);
      }
    }

    setFilteredKeys(result);
  }, [activeCategory, searchTerm, keys, examTypes]);

  if (loading) return <Loader fullPage={true} text="Loading Answer Keys..." />;

  return (
    <div className="pyq-categories">
      <div className="pyq-head-section">
        <h1>Official Answer Keys</h1>
        <input 
          type="text" 
          placeholder="Search subject or answer key..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="pyq-sublink-cards">
        <div className="pyq-subcard">
          {examTypes.map(item => (
            <p 
              key={item} 
              className={activeCategory === item ? 'active-tab' : ''} 
              onClick={() => setActiveCategory(item)}
            >
              {item}
            </p>
          ))}
        </div>

        <div className="pyq-cards-portion">
          {filteredKeys.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>
              No answer keys found for this selection.
            </div>
          ) : (
            filteredKeys.map((item) => (
              <div className="pyq-cardDesign" key={item.id}>
                {item.year && <span className="year-badge">Year: {item.year}</span>}
                <p id="heading">{item.title} - Key</p>
                <div className="pyq-actions">
                  <a 
                    href={item.answer_key_link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-pyq-paper" 
                  >
                    <i className="bi bi-key-fill me-2"></i> View Answer Key
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
