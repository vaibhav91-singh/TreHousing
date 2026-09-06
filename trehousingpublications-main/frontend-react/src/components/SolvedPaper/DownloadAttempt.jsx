import React, { useState, useEffect } from 'react';
import './DownloadAttempt.css';
import { extractArrayData } from '../../apiConfig.js';

export default function DownloadAttempt() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const API_URL = '/api/v1/solved-papers/';

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        const list = extractArrayData(res);
        setPapers(list);
        setErrorMsg(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="attemptpaper">
      <h7 className="text-red-500">this is DownloadAttempts.jsx file</h7>
      <div className="previous centered-banner">
        <h2>All Previous Year Solved Papers</h2>
        <p>Total Papers Available: {papers.length}</p>
      </div>

      <div className="downloadpapers">
        {errorMsg && (
          <div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>
            <strong>Error:</strong> {errorMsg} <br />
            <small>Tip: Check the browser console for more details.</small>
          </div>
        )}

        <div className="card-section">
          {loading ? <p>Loading...</p> : 
           papers.length > 0 ? papers.map((paper) => (
            <div className="paper-card" key={paper.id}>
              <h4>{paper.title}</h4>
              <p>Subject: {paper.subject_title}</p>
              <p>Year: {paper.year}</p>
              <a href={paper.paper_link} target="_blank" rel="noopener noreferrer">Download PDF</a>
            </div>
          )) : !errorMsg && <p>No papers found.</p>}
        </div>
      </div>
    </div>
  );
}