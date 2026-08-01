import React from 'react';

export default function NewFooter() {
  return (
    <footer className="hp-footer">
      <div className="hp-footer-content">
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--hp-primary)', marginBottom: '1rem' }}>
            TREhousing
          </div>
          <p style={{ color: 'var(--hp-text-muted)', fontSize: '0.875rem', maxWidth: '80%', marginBottom: '1.5rem' }}>
            The future of competitive exam preparation. Personalized, digital, and outcome-oriented.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: 'var(--hp-text-muted)', fontSize: '1.25rem' }}><i className="bi bi-twitter"></i></a>
            <a href="#" style={{ color: 'var(--hp-text-muted)', fontSize: '1.25rem' }}><i className="bi bi-envelope"></i></a>
          </div>
        </div>
        
        <div className="hp-footer-links">
          <h4>Platform</h4>
          <ul>
            <li><a href="#">Study Materials</a></li>
            <li><a href="#">Mock Exams</a></li>
            <li><a href="#">Job Board</a></li>
          </ul>
        </div>
        
        <div className="hp-footer-links">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>
        
        <div className="hp-footer-links">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>
      
      <div className="hp-footer-bottom">
        <div>© 2024 TREhousing Educational Platform. All rights reserved.</div>
        <div>Built for the next generation of civil servants.</div>
      </div>
    </footer>
  );
}
