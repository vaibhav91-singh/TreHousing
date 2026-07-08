import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard'; 
import './MainPage.css'; // Standard CSS import

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/job/`);
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load vacancies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="status-message">Loading Vacancies...</div>;
  if (error) return <div className="status-message error">{error}</div>;

  return (
    <div className="job-page-container">
      <h1 className="page-title">Current Job Openings</h1>
      
      <div className="job-grid">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p className="no-jobs">No job vacancies available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default JobPage;