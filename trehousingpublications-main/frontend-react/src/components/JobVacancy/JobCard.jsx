import React from 'react';
import './JobCard.css';

const JobCard = ({ job }) => {
  // Defensive programming: agar job object null/undefined ho
  if (!job) return null;

  return (
    <div className="job-card-container">
      {/* Optional Chaining (?) se crash nahi hoga agar field missing ho */}
      <h2 className="job-title">{job?.title?.toUpperCase() || "Title Unavailable"}</h2>
      <p className="job-org">{job?.organization?.toUpperCase() || "Organization Name"}</p>
      
      <div className="job-details">
        <p><strong>Eligibility:</strong> {job?.eligibility || "Not mentioned"}</p>
        <p><strong>Form Fee:</strong> ₹{job?.form_fee || "0"}</p>
        <p><strong>Last Date:</strong> {job?.last_date || "N/A"}</p>
      </div>
      
      <a 
        href={job?.apply_link || "#"} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="apply-btn"
      >
        {job?.apply_link ? "Apply Now" : "Link Expired"}
      </a>
    </div>
  );
};

export default JobCard;