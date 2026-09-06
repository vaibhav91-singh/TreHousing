import React from 'react';
import './SkeletonCard.css';

export default function SkeletonCard({ count = 3 }) {
  const items = Array.from({ length: count });

  return (
    <div className="skeleton-grid">
      {items.map((_, index) => (
        <div key={index} className="skeleton-card">
          <div>
            <div className="skeleton-header-row">
              <div className="skeleton-block skeleton-circle"></div>
              <div className="skeleton-block skeleton-badge"></div>
            </div>
            <div className="skeleton-block skeleton-title"></div>
            <div className="skeleton-block skeleton-text-line"></div>
            <div className="skeleton-block skeleton-text-short"></div>
          </div>
          <div className="skeleton-footer-row">
            <div className="skeleton-block" style={{ width: '70px', height: '14px' }}></div>
            <div className="skeleton-block skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
