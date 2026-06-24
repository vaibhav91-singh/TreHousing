import React from 'react';
import './TestSeriesHeroSection.css';
import testImg from '../../assets/testimg.png';

export default function TestSeriesHeroSection({ onSearchChange, searchValue }) {
  return (
    <div className="hero-section">
      <div className="container">
        <div className="content">
          <h1 className="heading">India's Structured Online Test Series Platform</h1>
          <p className="subheading">
            Boost your exam preparation with Test Series for <br />
            <span className="highlight">Banking, SSC, RRB & All other Govt. Exams</span>
          </p>
          <p className="exam-count">814+ exams covered. Which exam are you preparing for?</p>
        </div>

        <div className="illustration">
          <img src={testImg} alt="Illustration" />
        </div>
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for your Exam" 
          value={searchValue}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
        <span className="search-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
      </div>
    </div>
  );
}