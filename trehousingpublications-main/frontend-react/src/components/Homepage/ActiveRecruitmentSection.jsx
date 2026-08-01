import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ActiveRecruitmentSection() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/job/');
        // Show up to 3 jobs for the homepage
        setJobs(response.data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="hp-section">
      <div className="hp-section-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Active Recruitment</div>
        <a href="/jobs" style={{ fontSize: '0.875rem', color: 'var(--hp-primary)', textDecoration: 'none', border: '1px solid rgba(250, 204, 21, 0.3)', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(250, 204, 21, 0.1)' }}>Explore All</a>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--hp-text-muted)' }}>Loading jobs...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>
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
