import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewHeroSection() {
  const navigate = useNavigate();
  return (
    <section className="hp-section hp-hero">
      <div className="hp-hero-content">
        <span className="hp-pill">India's #1 Preparation Hub</span>
        <h1 className="hp-title">
          Elevate Your <br />
          <span className="hp-title-highlight">Career Aspirations</span>
        </h1>
        <p className="hp-subtitle">
          The most intuitive ecosystem for BPSC, SSC, and UPSC candidates. We bridge the gap between hard work and selection.
        </p>
        <div className="hp-hero-buttons">
          <a href="#" className="hp-btn hp-btn-primary">Start Prep Now</a>
          <button onClick={() => navigate('/study-materials')} className="hp-btn hp-btn-secondary" style={{fontFamily: 'inherit'}}>Explore Materials</button>
        </div>
      </div>
      
      <div className="hp-hero-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(250, 204, 21, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--hp-primary)', fontSize: '24px' }}>
            <i className="bi bi-people-fill"></i>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="hp-stat-label">ACTIVE STUDENTS</div>
            <div className="hp-stat-value">125k+</div>
          </div>
        </div>
        <div className="hp-progress-bar">
          <div className="hp-progress-fill"></div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-text-muted)', marginTop: '0.5rem' }}>
          Daily growth in MCQ engagement across all tracks.
        </div>
      </div>
    </section>
  );
}
