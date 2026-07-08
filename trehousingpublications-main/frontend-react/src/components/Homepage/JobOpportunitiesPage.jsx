import React, { useState, useEffect, useRef } from 'react';
import './JobOpportunitiesPage.css';
import JobCard from '../JobVacancy/JobCard';

export default function JobOpportunitiesPage() {
  const jobs = [
    { title: "Government Clerk SHO", location: "Gujarat Government", date: "03-03-2025", salary: "40k to 50k" },
    { title: "BPSC Assistance Vacancy", location: "Patna, Bihar", date: "03-03-2025", salary: "50k to 60k" },
    { title: "Bihar Police Services", location: "Patna, Bihar", date: "03-03-2025", salary: "40k to 50k" },
    { title: "Railway Engineer", location: "New Delhi", date: "03-03-2025", salary: "60k to 80k" },
    { title: "UPSC Civil Services", location: "India", date: "03-03-2025", salary: "70k to 90k" },
    { title: "Paper 6", location: "India", date: "03-03-2025", salary: "70k to 90k" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const startX = useRef(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleJobs = isMobile 
    ? jobs.slice(currentIndex, currentIndex + 1)
    : jobs.slice(currentIndex, currentIndex + 3);

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(jobs.length - (isMobile ? 1 : 3));
    }
  };

  const scrollRight = () => {
    const maxIndex = jobs.length - (isMobile ? 1 : 3);
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const touchMoveX = e.touches[0].clientX;
    const moveDistance = startX.current - touchMoveX;
    if (Math.abs(moveDistance) > 50) {
      moveDistance > 0 ? scrollRight() : scrollLeft();
      startX.current = touchMoveX;
    }
  };

  const viewPreviousYearPaper = (job) => {
    const formattedTitle = job.title.replace(/\s+/g, "-").toLowerCase();
    const url = `https://example.com/previous-year-paper/${formattedTitle}`;
    window.open(url, "_blank");
  };

  return (
    <div className="main-wrapper">
      <h2 className="text-center">
        <u className="underline" style={{ fontSize: '34px', fontWeight: 'bold' }}>Job Opportunities</u>
      </h2>

      <div className="overflow-hidden px-4">
        <div className="job-cards-container-wrapper">
          <button onClick={scrollLeft} className="left-click" aria-label="Previous">
            <span className="arrow-icon"></span>
          </button>

          <div
            className="job-cards-container flex gap-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {visibleJobs.map((job, index) => (
              <div key={index} className="job-card">
                <div className="card-content">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-details">
                    <div className="detail-item">
                      <span className="icon location-icon">📍</span>
                      <span className="detail-text">{job.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="icon date-icon">📅</span>
                      <span className="detail-text date-val">{job.date}</span>
                    </div>
                    <div className="detail-item">
                      <span className="icon salary-icon">💰</span>
                      <span className="detail-text salary-val">{job.salary}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => viewPreviousYearPaper(job)} className="button-text">
                  <span className="view-icon">👁</span> View Previous Year Paper
                </button>
                <div className="card-footer-line"></div>
              </div>
            ))}
          </div>

          <button onClick={scrollRight} className="right-click" aria-label="Next">
            <span className="arrow-icon right"></span>
          </button>
        </div>

        <div className="pagination-dots">
          {jobs.map((_, i) => (
            <span key={i} className={`dot ${currentIndex === i ? 'active' : ''}`}></span>
          ))}
        </div>
      </div>
   
    </div>
  );
}