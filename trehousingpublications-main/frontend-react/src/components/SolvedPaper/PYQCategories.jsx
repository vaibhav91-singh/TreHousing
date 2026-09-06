import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader.jsx';
import './PYQCategories.css';

export default function PYQCategories() {
  const [papers, setPapers] = useState([]);
  const [examTypes, setExamTypes] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;
    // API Call to fetch PYQ Papers
    fetch(`/api/v1/solved-papers/`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const responseData = data.data || [];
        setPapers(responseData);

        // Extract unique subjects/categories from the papers
        const uniqueCategories = ['All', ...new Set(responseData.map(item => item.subject_title || 'General'))];
        setExamTypes(uniqueCategories);
        
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error fetching solved papers:", err);
        setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  // Filter Logic computed cleanly via useMemo
  const filteredPapers = useMemo(() => {
    let result = papers;

    if (activeCategory !== 'All') {
      result = result.filter(p => p.subject_title === activeCategory);
    }

    if (searchTerm.trim() !== '') {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (p.subject_title && p.subject_title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return result;
  }, [activeCategory, searchTerm, papers]);

  if (loading) return <Loader fullPage={true} text="Loading Previous Year Papers..." />;

  return (
    <div className="pyq-categories">
      <div className="pyq-head-section">
        <h1>Previous Year Question Papers</h1>
        <input 
          type="text" 
          placeholder="Search subject or paper title..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="pyq-sublink-cards">
        {/* Dynamic Tabs: Subjects/Categories */}
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

        {/* PYQ Cards Grid */}
        <div className="pyq-cards-portion">
          {filteredPapers.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>
              No papers found for this selection.
            </div>
          ) : (
            filteredPapers.map((item) => (
              <div className="pyq-cardDesign" key={item.id}>
                {item.year && <span className="year-badge">Year: {item.year}</span>}
                <p id="heading">{item.title}</p>
                <div className="pyq-actions">
                  {item.paper_link && (
                    <a 
                      href={item.paper_link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-pyq-paper"
                    >
                      <i className="bi bi-file-earmark-pdf-fill me-2"></i> View Paper
                    </a>
                  )}
                  {item.answer_key_link && (
                    <a 
                      href={item.answer_key_link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-pyq-answer"
                    >
                      <i className="bi bi-key-fill me-2"></i> Answer Key
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
