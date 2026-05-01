import React from 'react';
import './AboutUs.css';
import aboutUsImg from '../../assets/Homepage/AboutUs.png';

export default function AboutUs() {
  return (
    <div className="about-us-wrapper p-md-5 p-2">
      <div className="heading mx-md-5 mx-sm-3 mx-4">
        <h2 className="about-title">
          About Us <span className="accent-bar"></span>
        </h2>
      </div>

      <div className="parent d-flex flex-column flex-lg-row justify-content-between align-items-center h-auto px-4">
        <div className="para container h-auto w-70 flex-grow-1 mb-4 mb-md-0">
          <p
            className="about-description fw-normal"
            style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}
          >
            TRE Housing Publication Private Limited, established on 19th March
            2024, is a forward-thinking Indian Private Limited Company dedicated
            to advancing education through quality publishing. Specializing in the
            publishing, printing, and distribution of educational books, the
            company operates seamlessly across both online and offline platforms.
            TRE Housing Publication is committed to delivering well-researched,
            accessible, and affordable educational content that empowers learners
            and institutions nationwide. By combining traditional publishing
            excellence with modern distribution strategies, the company aspires to
            set new benchmarks in the educational sector. TRE Housing Publication
            stands as a trusted partner in fostering academic growth and lifelong
            learning.
          </p>

          <div className="mt-4">
            <button className="how-it-works-btn">
              How it works
            </button>
          </div>
        </div>

        <div className="modern-image-container">
          <div className="floating-ui-container">
            <div className="ui-overlay-glass">
              <img
                src={aboutUsImg}
                alt="About Us Image"
                className="featured-student-img"
              />
            </div>
            <div className="edu-icon icon-1"><i className="bi bi-book"></i></div>
            <div className="edu-icon icon-2"><i className="bi bi-globe"></i></div>
            <div className="edu-icon icon-3"><i className="bi bi-gear"></i></div>
            <div className="edu-background-pattern"></div>
          </div>
        </div>
      </div>
    </div>
  );
}