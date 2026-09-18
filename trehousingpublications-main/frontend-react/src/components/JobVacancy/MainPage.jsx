import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { extractArrayData } from '../../apiConfig.js';
import JobCard from './JobCard';
import SkeletonCard from '../common/SkeletonCard.jsx';
import './MainPage.css';

const JobPage = () => {
  const [govtJobs, setGovtJobs] = useState([]);
  const [privateJobs, setPrivateJobs] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL', 'GOVT', 'PRIVATE'

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        let jobsData = [];

        const endpoints = ['/api/job/', '/api/v1/job/'];
        for (const ep of endpoints) {
          try {
            const res = await axios.get(ep);
            const data = extractArrayData(res.data);
            if (data && data.length > 0) {
              jobsData = data;
              break;
            }
          } catch (e1) {
            if (e1.response && e1.response.status === 404) continue;
          }
        }

        let updatesData = [];
        try {
          const res = await axios.get('/api/recent-updates/');
          updatesData = extractArrayData(res.data);
        } catch (e3) {
          // ignore updates error
        }

        if (!isMounted) return;
        setGovtJobs(jobsData.filter(job => !job.job_type || job.job_type === 'GOVT'));
        setPrivateJobs(jobsData.filter(job => job.job_type === 'PRIVATE'));
        setUpdates(updatesData);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching data:", err);
        setError("Failed to connect with server");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  const totalJobsCount = govtJobs.length + privateJobs.length;

  return (
    <div className="job-page-wrapper">
      <div className="job-page-container">
        {/* Header Section */}
        <div className="hub-header-section">
          <h1 className="hub-title">Career & Exam Hub</h1>
          <p className="hub-subtitle">
            Your personalized gateway to civil services, SSC, central government, and private sector careers.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="job-tabs-container">
          <button 
            className={`job-tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveTab('ALL')}
          >
            <span className="tab-icon">🌐</span> All Jobs
            <span className="tab-badge">{totalJobsCount}</span>
          </button>
          <button 
            className={`job-tab-btn ${activeTab === 'GOVT' ? 'active' : ''}`}
            onClick={() => setActiveTab('GOVT')}
          >
            <span className="tab-icon">🏛️</span> Government Jobs
            <span className="tab-badge">{govtJobs.length}</span>
          </button>
          <button 
            className={`job-tab-btn ${activeTab === 'PRIVATE' ? 'active' : ''}`}
            onClick={() => setActiveTab('PRIVATE')}
          >
            <span className="tab-icon">💼</span> Private Jobs
            <span className="tab-badge">{privateJobs.length}</span>
          </button>
        </div>
        
        {/* Government Jobs Section */}
        {(activeTab === 'ALL' || activeTab === 'GOVT') && (
          <div className="job-category-block">
            <div className="section-header">
              <div className="section-title-wrapper">
                <div className="vertical-bar"></div>
                <h2>Government Jobs</h2>
              </div>
            </div>

            {loading ? (
              <SkeletonCard count={6} />
            ) : (
              <div className="job-grid">
                {govtJobs.length > 0 ? (
                  govtJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))
                ) : (
                  <p className="no-jobs">No government job vacancies available at the moment.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Private Jobs Section */}
        {(activeTab === 'ALL' || activeTab === 'PRIVATE') && (
          <div className="job-category-block" style={{ marginTop: activeTab === 'ALL' ? '40px' : '0px' }}>
            <div className="section-header">
              <div className="section-title-wrapper">
                <div className="vertical-bar" style={{ backgroundColor: '#2563eb' }}></div>
                <h2>Private Jobs</h2>
              </div>
            </div>

            {loading ? (
              <SkeletonCard count={4} />
            ) : (
              <div className="job-grid">
                {privateJobs.length > 0 ? (
                  privateJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))
                ) : (
                  <p className="no-jobs">No private job vacancies available at the moment.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Statistics Section */}
        <div className="stats-row">
          <div className="stat-card">
            <h3 className="stat-number teal">2.5k+</h3>
            <p className="stat-label">ACTIVE JOBS</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number teal">500+</h3>
            <p className="stat-label">MOCK TESTS</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number teal">150+</h3>
            <p className="stat-label">PYQ PAPERS</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number teal">10k+</h3>
            <p className="stat-label">CANDIDATES</p>
          </div>
        </div>

        {/* Recent Updates Section */}
        <div className="section-header" style={{ marginTop: '40px' }}>
          <h2>Recent Updates</h2>
        </div>

        <div className="updates-list">
          {updates.length > 0 ? (
            updates.map((update, index) => (
              <a href={update.link || "#"} className="update-item" key={index}>
                <div className="update-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div className="update-content">
                  <h4 className="update-title">{update.title}</h4>
                  {update.description && <p className="update-desc">{update.description}</p>}
                </div>
                <div className="update-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </a>
            ))
          ) : (
            <p className="no-updates">No recent updates.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPage;