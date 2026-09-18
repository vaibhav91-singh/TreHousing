import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { extractArrayData } from '../../apiConfig.js';
import SkeletonCard from '../common/SkeletonCard.jsx';
import JobCard from '../JobVacancy/JobCard.jsx';

export default function ActiveRecruitmentSection() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/job/');
        if (!isMounted) return;
        const list = extractArrayData(response.data);
        setJobs(list.slice(0, 3));
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        console.error("Jobs Fetch Error:", err);
        setError("Failed to connect with server");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJobs();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="hp-section">
      <div className="hp-section-header">
        <div className="hp-section-title">Active Recruitment</div>
        <a href="/jobs" className="hp-explore-btn">
          Explore All <i className="bi bi-arrow-right"></i>
        </a>
      </div>

      {loading ? (
        <SkeletonCard count={3} gridClassName="hp-jobs-grid" />
      ) : error ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '1.25rem', 
          color: '#ef4444', 
          backgroundColor: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.25)', 
          borderRadius: '12px',
          maxWidth: '500px',
          margin: '1rem auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          fontSize: '0.95rem',
          fontWeight: '500'
        }}>
          <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '1.2rem' }}></i>
          <span>{error}</span>
        </div>
      ) : jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--hp-text-muted)' }}>No active recruitments at the moment.</div>
      ) : (
        <div className="hp-jobs-grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}
