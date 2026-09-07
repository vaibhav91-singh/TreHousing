import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { extractArrayData } from '../../apiConfig.js';
import SkeletonCard from '../common/SkeletonCard.jsx';

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
      <div className="hp-section-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Active Recruitment</div>
        <a href="/jobs" style={{ fontSize: '0.875rem', color: 'var(--hp-primary)', textDecoration: 'none', border: '1px solid rgba(250, 204, 21, 0.3)', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(250, 204, 21, 0.1)' }}>Explore All</a>
      </div>

      {loading ? (
        <SkeletonCard count={3} />
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
          {jobs.map((job) => {
            // Determine badge based on job data or randomly for design
            const isClosingSoon = new Date(job.last_date).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;
            return (
              <div key={job.id} className="hp-card">
                <div className="hp-job-header">
                  <div className="hp-job-icon"><i className="bi bi-briefcase"></i></div>
                  {isClosingSoon ? (
                    <span className="hp-badge hp-badge-closing">Closing Soon</span>
                  ) : (
                    <span className="hp-badge hp-badge-new">New Opening</span>
                  )}
                </div>
                <div className="hp-job-title">{job.title}</div>
                <div className="hp-job-desc">{job.description}</div>
                <div className="hp-job-footer">
                  <div className="hp-job-meta">
                    <div>Last Date</div>
                    <strong>{job.last_date ? new Date(job.last_date).toLocaleDateString() : 'N/A'}</strong>
                  </div>
                  <div className="hp-job-meta" style={{ textAlign: 'center' }}>
                    <div>Vacancies</div>
                    <strong>{job.vacancies || 'N/A'}</strong>
                  </div>
                  <a href={`/job/${job.id}`} className="hp-btn hp-btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Details</a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
