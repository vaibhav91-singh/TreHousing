import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './PastPapersAndMocks.css';

export default function PastPapersAndMocks() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPastPapers();
  }, [location.search]);

  const fetchPastPapers = async () => {
    try {
      const urlParams = new URLSearchParams(location.search);
      const subjectId = urlParams.get('subject_id') || 1;

      const response = await axios.get(`/api/v1/solved-papers/?subject_id=${subjectId}`);
      if (response.data && response.data.success) {
        setPapers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching past papers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-spinner"></div>;

  return (
    <div className="past-papers-container box">
      <h3 className="table-head">Past Year Papers, Answer Keys & Mocks</h3>
      <hr className="horiz-line" />
      
      {(!papers || papers.length === 0) ? (
        <div style={{ padding: '30px', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
          No past papers, answer keys, or mock tests have been uploaded for this subject yet. Please check back later.
        </div>
      ) : (
        <div className="papers-grid">
          {papers.map((paper, index) => (
            <div key={index} className="paper-card">
              <div className="paper-card-header">
                <span className="paper-year-badge">{paper.year}</span>
                <h4 className="paper-title">{paper.title}</h4>
              </div>
              
              <div className="paper-actions">
                <a href={paper.paper_link} target="_blank" rel="noopener noreferrer" className="btn-past-action btn-view-paper">
                  📄 View Paper
                </a>
                
                {paper.answer_key_link && (
                  <a href={paper.answer_key_link} target="_blank" rel="noopener noreferrer" className="btn-past-action btn-answer-key">
                    ✅ Answer Key
                  </a>
                )}
                
                {paper.linked_mock_title && (
                  <button onClick={() => navigate(`/testseries?quiz_title=${encodeURIComponent(paper.linked_mock_title)}`)} className="btn-past-action btn-start-mock">
                    🎯 Start Mock
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
