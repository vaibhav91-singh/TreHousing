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

  if (loading) {
    return (
      <div className="past-papers-container">
        <div className="papers-loading">
          <div className="spinner"></div>
          <span>Loading past year papers...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="past-papers-container">
      <div className="section-header-wrap">
        <h3 className="table-head">Past Year Papers, Answer Keys & Mocks</h3>
        <div className="horiz-line" />
      </div>
      
      {(!papers || papers.length === 0) ? (
        <div className="past-papers-empty">
          <div className="empty-icon">📂</div>
          <h4>No Past Papers Uploaded Yet</h4>
          <p>Past papers, answer keys, and mock tests for this subject will be updated soon.</p>
        </div>
      ) : (
        <div className="papers-grid">
          {papers.map((paper, index) => (
            <div key={index} className="paper-card pyq-cardDesign">
              <div className="paper-card-header">
                <span className="paper-year-badge">Exam Year: {paper.year}</span>
                <h4 className="paper-title">{paper.title}</h4>
              </div>
              
              <div className="paper-actions">
                <a href={paper.paper_link} target="_blank" rel="noopener noreferrer" className="btn-past-action btn-view-paper">
                  📄 View Question Paper
                </a>
                
                {paper.answer_key_link && (
                  <a href={paper.answer_key_link} target="_blank" rel="noopener noreferrer" className="btn-past-action btn-answer-key">
                    ✅ Official Answer Key
                  </a>
                )}
                
                {paper.linked_mock_title && (
                  <button onClick={() => navigate(`/testseries?quiz_title=${encodeURIComponent(paper.linked_mock_title)}`)} className="btn-past-action btn-start-mock">
                    🎯 Start Practice Mock
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

