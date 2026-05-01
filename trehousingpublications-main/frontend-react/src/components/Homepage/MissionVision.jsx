import React, { useState, useEffect } from 'react';
import './MissionVision.css';

export default function MissionVision() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 725);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 725);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="box-container bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl text-center">
        <div className="exam-section-card">
          <h2 className="exam-title">Government Competitive Exam Held</h2>
          
          <div className="button-container">
            <div className="nav-btn syllabus-btn">
              <span className="btn-text">SYLLABUS</span>
              <span className="icon">📖</span>
              <div className="syllabus">
                <ul>
                  <li><a href="#">BPSC</a></li>
                  <li><a href="#">BSSC</a></li>
                  <li><a href="#">SSC</a></li>
                  <li><a href="#">Railway</a></li>
                  <li><a href="#">Police</a></li>
                  <li><a href="#">More...</a></li>
                </ul>
              </div>
            </div>

            <div className="nav-btn pyqs-btn">
              <span className="btn-text">PYQs</span>
              <span className="icon">📝</span>
              <div className="pyqs">
                <ul>
                  <li><a href="#">BPSC</a></li>
                  <li><a href="#">BSSC</a></li>
                  <li><a href="#">SSC</a></li>
                  <li><a href="#">Railway</a></li>
                  <li><a href="#">Police</a></li>
                  <li><a href="#">More...</a></li>
                </ul>
              </div>
            </div>

            <div className="nav-btn mocktest-btn">
              <span className="btn-text">Mock Test</span>
              <span className="icon">💡</span>
              <div className="mocktest">
                <ul>
                  <li><a href="#">BPSC</a></li>
                  <li><a href="#">BSSC</a></li>
                  <li><a href="#">SSC</a></li>
                  <li><a href="#">Railway</a></li>
                  <li><a href="#">Police</a></li>
                  <li><a href="#">More...</a></li>
                </ul>
              </div>
            </div>
          </div>
          <p className="footer-text">Explore available resources for your competitive exam preparation. <span>⌄</span></p>
        </div>
      </div>
    </section>
  );
}