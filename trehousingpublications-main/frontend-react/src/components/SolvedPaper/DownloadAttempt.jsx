import React from 'react';
import './DownloadAttempt.css';

// is part ke jsx ko backend se connect baki h----
//  download previous year solved papers wala section h ye.

export default function DownloadAttempt() {
  return (
    <div className="attemptpaper">
      
{/* 1. Top Section - Premium Centered Banner with Floating Glowing Circles */}
<div className="previous centered-banner">
  {/* Decorative Ambient Orbs for 3D depth */}
  <div className="orb orb-1"></div>
  <div className="orb orb-2"></div>
  
  <div className="banner-content">
    <h2>BPSC Previous Year Solved Papers - Download & Attempt</h2>
    
    <div className="ratings-wrapper centered-row">
      <p className="stars-line">
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-half"></i>
      </p>
      <span className="ratings-count">4.5 (92,441 ratings)</span>
    </div>
    
    <p className="papers-count">Total Previous Year Paper Available: <span className="highlight-count">3</span></p>
    
    <div className="centered-content language-tag">
      <i className="bi bi-globe"></i>
      <span>Hindi, English</span>
    </div>
  </div>
</div>

      {/* 2. Lower Grid Section - Cards Matrix */}
      <div className="downloadpapers">
        <h3>Download Previous Year Solved Papers</h3>
        <div className="card-section">
          {[...Array(3)].map((_, index) => (
            <div className="paper-card" key={index}>
              <h4>BPSC 2021 Previous Year Paper</h4>
              
              {/* Detailed Metrics */}
              <div className="info-row">
                <div className="info-line">
                  <p><i className="bi bi-clock"></i> 120 Minutes</p>
                  <p><i className="bi bi-list-task"></i> 200 Questions</p>
                </div>
                <div className="info-line">
                  <p><i className="bi bi-pencil-square"></i> 200 Marks</p>
                </div>
              </div>
              
              <hr className="card-divider-line" />
              
              {/* Premium 3D Light Blue Glowing Button */}
              <button className="purchase-btn">
                <i className="bi bi-lock-fill"></i>
                <span>Buy All Exam Mock Test @Rs.199</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}