import React, { useState, useEffect, useMemo } from 'react';
import SkeletonCard from '../common/SkeletonCard.jsx';
import './PYQCategories.css';
import { extractArrayData } from '../../apiConfig.js';

let answerKeysCache = null;

// Helper function to format answer key titles nicely
const formatKeyTitle = (title) => {
  if (!title) return 'Official Answer Key';
  const trimmed = title.trim();
  if (trimmed.toLowerCase().includes('key') || trimmed.toLowerCase().includes('answer')) return trimmed;
  return `${trimmed} - Answer Key`;
};

// Smart Auto-Detect Answer Key Icon Meta
const getKeyIconMeta = (title = '', subject = '') => {
  const text = `${title} ${subject}`.toLowerCase();
  
  if (text.includes('computer') || text.includes('cn') || text.includes('network') || text.includes('code')) {
    return { icon: 'bi-file-earmark-code-fill', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.35)' };
  }
  if (text.includes('polity') || text.includes('constitution') || text.includes('upsc') || text.includes('civics')) {
    return { icon: 'bi-patch-check-fill', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.15)', border: 'rgba(192, 132, 252, 0.35)' };
  }
  if (text.includes('ssc') || text.includes('cgl') || text.includes('chsl') || text.includes('exam')) {
    return { icon: 'bi-award-fill', color: '#f472b6', bg: 'rgba(244, 114, 182, 0.15)', border: 'rgba(244, 114, 182, 0.35)' };
  }
  if (text.includes('bpsc') || text.includes('tre') || text.includes('teacher') || text.includes('history')) {
    return { icon: 'bi-check-circle-fill', color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.35)' };
  }
  
  return { icon: 'bi-key-fill', color: '#FFB300', bg: 'rgba(255, 179, 0, 0.15)', border: 'rgba(255, 179, 0, 0.35)' };
};

export default function AnswerKeyCategories() {
  const [keys, setKeys] = useState([]);
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
    if (answerKeysCache) {
      setKeys(answerKeysCache);
      setExamTypes(['All', ...new Set(answerKeysCache.map(item => item.subject_title || 'General'))]);
      setLoading(false);
      return;
    }
    let isMounted = true;
    fetch(`/api/v1/solved-papers/`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const responseData = extractArrayData(data).filter(item => item.answer_key_link);
        answerKeysCache = responseData;
        setKeys(responseData);
        const uniqueCategories = ['All', ...new Set(responseData.map(item => item.subject_title || 'General'))];
        setExamTypes(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error fetching answer keys:", err);
        setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const filteredKeys = useMemo(() => {
    let result = keys;
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
  }, [activeCategory, debouncedSearchTerm, keys]);

  return (
    <div className="pyq-categories">
      <div className="pyq-head-section">
        <div className="pyq-title-wrap">
          <h1>Official Answer Keys</h1>
          <p className="pyq-subtitle">Verify your solutions with verified official answer keys and response sheets</p>
        </div>
        <div className="search-box-wrapper">
          <input 
            type="text" 
            placeholder="Search subject or answer key..." 
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
            >
              <i className="bi bi-folder-fill tab-icon"></i>
              <span>{item}</span>
              <span className="cat-count">
                {item === 'All' ? keys.length : keys.filter(p => p.subject_title === item).length}
              </span>
            </p>
          ))}
        </div>

        <div className="pyq-cards-portion">
          {loading ? (
            <SkeletonCard count={6} />
          ) : filteredKeys.length === 0 ? (
            <div className="empty-pyq-state">
              <i className="bi bi-file-earmark-x empty-icon"></i>
              <h3>No Answer Keys Found</h3>
              <p>Try searching for a different subject or keyword.</p>
            </div>
          ) : (
            filteredKeys.map((item) => {
              const iconMeta = getKeyIconMeta(item.title, item.subject_title);
              return (
                <div className="pyq-cardDesign" key={item.id}>
                  <div className="pyq-card-top-bar">
                    <div 
                      className="pyq-logo-ring"
                      style={{ 
                        backgroundColor: iconMeta.bg, 
                        borderColor: iconMeta.border 
                      }}
                    >
                      <i className={`bi ${iconMeta.icon}`} style={{ color: iconMeta.color, fontSize: '1.4rem' }}></i>
                    </div>
                    {item.year && (
                      <span className="pyq-year-pill">
                        <i className="bi bi-calendar-event me-1"></i> {item.year}
                      </span>
                    )}
                  </div>

                  <div className="pyq-card-body">
                    <h3 className="pyq-card-title">{formatKeyTitle(item.title)}</h3>
                    {item.subject_title && (
                      <div className="pyq-sub-chip">
                        <i className="bi bi-tag-fill me-1"></i>
                        <span>{item.subject_title}</span>
                      </div>
                    )}
                  </div>

                  <div className="pyq-card-footer">
                    <a 
                      href={item.answer_key_link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-pyq-main" 
                    >
                      <span>View Answer Key</span>
                      <i className="bi bi-key-fill btn-icon"></i>
                    </a>
                    {item.paper_link && (
                      <a 
                        href={item.paper_link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-pyq-sub"
                      >
                        <span>View Question Paper</span>
                        <i className="bi bi-arrow-right-short btn-icon"></i>
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
