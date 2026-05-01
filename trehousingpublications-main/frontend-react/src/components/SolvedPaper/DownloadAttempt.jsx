import React from 'react';
import './DownloadAttempt.css';

export default function DownloadAttempt() {
  return (
    <div className="attemptpaper">
      <div className="previous">
        <h2>BPSC Previous Year Solved Papers - Download & Attempt</h2>
        <p>
          <i className="bi bi-star" id="ratings"></i>
          <i className="bi bi-star" id="ratings"></i>
          <i className="bi bi-star" id="ratings"></i>
          <i className="bi bi-star" id="ratings"></i>
          <i className="bi bi-star" id="ratings"></i>
          4.5(92441)
        </p>
        <p>Total Previous Year Paper Available: 3 </p>
        <div className="centered-content">
          <i className="bi bi-globe"></i>
          Hindi, English
        </div>
      </div>

      <div className="downloadpapers">
        <h3>Download Previous Year Solved Papers</h3>
        <div className="card-section">
          {[...Array(3)].map((_, index) => (
            <div className="paper-card" key={index}>
              <h4>BPSC 2021 Previous Year Paper</h4>
              <div className="info-row">
                <div className="info-line">
                  <p><i className="bi bi-clock"></i>120 Minutes</p>
                  <p><i className="bi bi-list"></i>200 Questions</p>
                </div>
                <div className="info-line">
                  <p><i className="bi bi-pencil-square"></i>200 Marks</p>
                </div>
              </div>
              <hr />
              <button className="purchase-btn">
                <i className="bi bi-lock-fill"></i>Buy All Exam Mock Test @Rs.199
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}