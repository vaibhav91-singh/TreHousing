import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewHeroSection() {
  const navigate = useNavigate();
  const [studentCount, setStudentCount] = useState(0);
  const [liveUsers, setLiveUsers] = useState(1420);
  const [passRate, setPassRate] = useState(0);

  // Animated count-up effect on mount
  useEffect(() => {
    const targetCount = 125480;
    const targetPassRate = 98.4;
    const duration = 1800; // 1.8 seconds
    const frameRate = 1000 / 60;
    const totalFrames = Math.floor(duration / frameRate);

    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

      setStudentCount(Math.floor(targetCount * easeOut));
      setPassRate((targetPassRate * easeOut).toFixed(1));

      if (frame >= totalFrames) {
        clearInterval(timer);
        setStudentCount(targetCount);
        setPassRate(targetPassRate);
      }
    }, frameRate);

    // Dynamic Live Users fluctuation every 4 seconds
    const tickerInterval = setInterval(() => {
      setLiveUsers(prev => prev + (Math.floor(Math.random() * 9) - 4));
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(tickerInterval);
    };
  }, []);

  return (
    <section className="hp-section hp-hero">
      <div className="hp-hero-content">
        <span className="hp-pill">
          <span className="hp-live-dot"></span>
          <strong>{liveUsers.toLocaleString()}</strong> Students Practicing Live Now
        </span>
        <h1 className="hp-title">
          Elevate Your <br />
          <span className="hp-title-highlight">Career Aspirations</span>
        </h1>
        <p className="hp-subtitle">
          The most intuitive ecosystem for BPSC, SSC, and UPSC candidates. We bridge the gap between hard work and selection.
        </p>
        <div className="hp-hero-buttons">
          <button onClick={() => navigate('/testseries')} className="hp-btn hp-btn-primary">
            Start Prep Now
          </button>
          <button onClick={() => navigate('/study-materials')} className="hp-btn hp-btn-secondary" style={{ fontFamily: 'inherit' }}>
            Explore Materials
          </button>
        </div>
      </div>
      
      <div className="hp-hero-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(250, 204, 21, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--hp-primary)', fontSize: '24px' }}>
            <i className="bi bi-people-fill"></i>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="hp-stat-label">ACTIVE STUDENTS</div>
            <div className="hp-stat-value">
              {studentCount.toLocaleString()}+
            </div>
          </div>
        </div>
        
        <div className="hp-progress-bar">
          <div className="hp-progress-fill" style={{ width: `${passRate}%`, transition: 'width 1.8s ease-out' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.85rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>
            Selection Rate Accuracy
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffca28' }}>
            {passRate}%
          </div>
        </div>
      </div>
    </section>
  );
}
