import React, { useState, useEffect, useMemo } from 'react';
import SkeletonCard from '../common/SkeletonCard.jsx';
import './PYQCategories.css';
import { extractArrayData } from '../../apiConfig.js';

let pyqCache = null;

// Helper function to format paper titles nicely
const formatPaperTitle = (title) => {
  if (!title) return 'Solved Question Paper';
  const trimmed = title.trim();
  if (trimmed.length <= 4) return trimmed.toUpperCase() + ' Solved Paper';
  return trimmed.replace(/\b\w/g, c => c.toUpperCase());
};

// Smart Auto-Detect PYQ Icon Meta
const getPYQIconMeta = (title = '', subject = '') => {
  const text = `${title} ${subject}`.toLowerCase();
  
  if (text.includes('computer') || text.includes('cn') || text.includes('network') || text.includes('code')) {
    return { icon: 'bi-pc-display', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.35)' };
  }
  if (text.includes('polity') || text.includes('constitution') || text.includes('upsc') || text.includes('civics')) {
    return { icon: 'bi-bank2', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.15)', border: 'rgba(192, 132, 252, 0.35)' };
  }
  if (text.includes('ssc') || text.includes('cgl') || text.includes('chsl') || text.includes('exam')) {
    return { icon: 'bi-award-fill', color: '#f472b6', bg: 'rgba(244, 114, 182, 0.15)', border: 'rgba(244, 114, 182, 0.35)' };
  }
  if (text.includes('bpsc') || text.includes('tre') || text.includes('teacher') || text.includes('history')) {
    return { icon: 'bi-journal-bookmark-fill', color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.35)' };
  }
  
  return { icon: 'bi-file-earmark-text-fill', color: '#FFB300', bg: 'rgba(255, 179, 0, 0.15)', border: 'rgba(255, 179, 0, 0.35)' };
};

export default function PYQCategories() {
  const [papers, setPapers] = useState([]);
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
    if (pyqCache) {
      setPapers(pyqCache);
      setExamTypes(['All', ...new Set(pyqCache.map(item => item.subject_title || 'General'))]);
      setLoading(false);
      return;
    }
    let isMounted = true;
    fetch(`/api/v1/solved-papers/`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const responseData = extractArrayData(data);
        pyqCache = responseData;
        setPapers(responseData);
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

  const filteredPapers = useMemo(() => {
    let result = papers;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.subject_title === activeCategory);
    }
    if (debouncedSearchTerm.trim() !== '') {
      result = result.filter(p => 
        p.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        (p.subject_title && p.subject_title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
    }
    return result;
  }, [activeCategory, debouncedSearchTerm, papers]);

  return (
    <div className="pyq-categories">
      <div className="pyq-head-section">
        <div className="pyq-title-wrap">
          <h1>Previous Year Question Papers</h1>
          <p className="pyq-subtitle">Download official solved papers, answer keys, and practice sets</p>
        </div>
        <div className="search-box-wrapper">
          <input 
            type="text" 
            placeholder="Search subject or paper title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="pyq-sublink-cards">
        <div className="pyq-subcard">
          <p className="sidebar-label">Subjects / Categories</p>
          {examTypes.map(item => (
            <p 
              key={item} 
              className={activeCategory === item ? 'active-tab' : ''} 
              onClick={() => setActiveCategory(item)}
              style={{ cursor: 'pointer' }}
            >
              <i className="bi bi-folder-fill tab-icon"></i>
              <span>{item}</span>
              <span className="cat-count">
                {item === 'All' ? papers.length : papers.filter(p => p.subject_title === item).length}
              </span>
            </p>
          ))}
        </div>

        <div className="pyq-cards-portion">
          {loading ? (
            <SkeletonCard count={6} />
          ) : filteredPapers.length === 0 ? (
            <div className="empty-pyq-state">
              <i className="bi bi-file-earmark-x empty-icon"></i>
              <h3>No papers found</h3>
              <p>Try searching for a different subject or keyword.</p>
            </div>
          ) : (
            filteredPapers.map((item) => {
              const iconMeta = getPYQIconMeta(item.title, item.subject_title);
              return (
                <div className="pyq-cardDesign" key={item.id}>
                  <div className="pyq-card-top">
                    <div 
                      className="pyq-icon-ring"
                      style={{ 
                        backgroundColor: iconMeta.bg, 
                        borderColor: iconMeta.border 
                      }}
                    >
                      <i className={`bi ${iconMeta.icon}`} style={{ color: iconMeta.color, fontSize: '1.3rem' }}></i>
                    </div>
                    {item.year && <span className="year-badge"><i className="bi bi-calendar-event me-1"></i> Year: {item.year}</span>}
                  </div>

                  <div className="pyq-card-body">
                    <h3 className="pyq-card-title">{formatPaperTitle(item.title)}</h3>
                    {item.subject_title && (
                      <span className="pyq-sub-tag"><i className="bi bi-tag-fill me-1"></i> {item.subject_title}</span>
                    )}
                  </div>

                  <div className="pyq-actions">
                    {item.paper_link && (
                      <a 
                        href={item.paper_link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-pyq-paper"
                      >
                        <span>View Question Paper</span>
                        <i className="bi bi-box-arrow-up-right btn-icon"></i>
                      </a>
                    )}
                    {item.answer_key_link && (
                      <a 
                        href={item.answer_key_link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-pyq-answer"
                      >
                        <span>Official Answer Key</span>
                        <i className="bi bi-key-fill btn-icon"></i>
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
