import React from 'react';
import './JobCard.css';

const JobCard = ({ job }) => {
  if (!job) return null;

  // Calculate time ago or closing soon
  const getStatusTag = () => {
    if (!job.last_date) return null;
    
    const today = new Date();
    const lastDate = new Date(job.last_date);
    const diffTime = lastDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return <span className="time-ago closed">Closed</span>;
    } else if (diffDays <= 3) {
      return <span className="time-ago closing-soon">⚡ Closing Soon</span>;
    } else {
      const createdDate = new Date(job.apply_date || today);
      const createdDiff = today - createdDate;
      const createdDays = Math.ceil(createdDiff / (1000 * 60 * 60 * 24));
      return <span className="time-ago">🕒 {createdDays > 0 ? `${createdDays}d ago` : 'Today'}</span>;
    }
  };

  return (
    <div className="govt-job-card">
      <div className="card-header-row">
        <span className="category-badge">{job.category_badge || 'GOVT'}</span>
        {getStatusTag()}
      </div>
      
      <div className="card-body">
        <h3 className="job-title">{job.title || "Title Unavailable"}</h3>
        <p className="job-org">{job.organization || "Organization Name"}</p>
        
        <div className="job-tags">
          <div className="job-tag">
            <span>👥</span> {job.vacancy_count || 'Vacancies N/A'}
          </div>
          <div className="job-tag">
            <span>🎓</span> {job.qualification || job.eligibility || 'Graduation'}
          </div>
        </div>
      </div>
      
      <div className="card-footer-row">
        <a 
          href={job.apply_link || "#"} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-apply-now"
        >
          {job.apply_link ? "Apply Now" : "Link Expired"}
        </a>
        <button className="btn-bookmark">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default JobCard;