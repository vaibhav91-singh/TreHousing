import React from 'react';
import './NewsLetter.css';
import newsletterImg from '../../assets/Homepage/NewsLetter.png';

export default function NewsLetter() {
  return (
    <div className="newsletter-section">
      <div className="container text-center my-4">
        <p className="newsletter-heading">View All Educational News</p>
      </div>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 d-flex justify-content-center image-container">
            <img
              src={newsletterImg}
              alt="Newsletter Image"
              className="img-fluid floating-img"
            />
          </div>

          <div className="col-lg-6 text-center text-lg-start my-4 content-box">
            <h2 className="main-title">
              Subscribe to Our Premium<br />Educational Newsletter!!
            </h2>
            <p className="sub-title">
              Unlock curated insights, resource guides, and updates for learners and educators
            </p>

            <div className="form-wrapper">
              <div className="input-group-modern">
                <div className="icon-box">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <input
                  type="email"
                  placeholder="Subscribe to learn"
                  className="modern-input"
                />
              </div>
              <button className="btn-subscribe">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}