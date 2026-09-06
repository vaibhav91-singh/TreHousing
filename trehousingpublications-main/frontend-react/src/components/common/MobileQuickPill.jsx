import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MobileQuickPill.css';

export default function MobileQuickPill() {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide if dismissed or if user is already inside an active quiz session
  if (dismissed || location.search.includes('quiz_title') || location.pathname === '/quiz') {
    return null;
  }

  return (
    <div className="mobile-quick-pill-container">
      <div className="mobile-pill-left" onClick={() => navigate('/testseries')} style={{ cursor: 'pointer' }}>
        <div className="mobile-pill-badge">
          <i className="bi bi-lightning-charge-fill"></i>
        </div>
        <div className="mobile-pill-text">
          <span className="mobile-pill-title">BPSC TRE Practice</span>
          <span className="mobile-pill-sub">⚡ FREE MOCK TEST</span>
        </div>
      </div>

      <button className="mobile-pill-btn" onClick={() => navigate('/testseries')}>
        Start Test <i className="bi bi-arrow-right-short" style={{ fontSize: '18px' }}></i>
      </button>

      <button className="mobile-pill-close" onClick={() => setDismissed(true)} aria-label="Close bar">
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  );
}
