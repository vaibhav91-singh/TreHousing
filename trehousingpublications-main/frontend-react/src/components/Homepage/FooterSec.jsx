import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import './FooterSec.css';

export default function FooterSec() {
  const navigate = useNavigate();
  const redirectHome = () => navigate("/");

  return (
    <footer className="hp-footer">
      <div className="hp-footer-content">
        <div>
          <img
            src={logo}
            alt="Logo"
            onClick={redirectHome}
            className="modern-logo"
          />
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Address:</strong> TRE HOUSING PUBLICATION PRIVATE LIMITED <br />
              B-144, SECTOR XU 3, GREATER NOIDA, GB NAGAR, UP-201310
            </p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Phone No:</strong> 9458846730</p>
            <p><strong>Email:</strong> trehousingpublication@gmail.com</p>
          </div>
          <div className="social-icons">
            <a href="https://twitter.com/trepublication" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://wa.me/9458846730" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-whatsapp"></i>
            </a>
            <a href="https://t.me/trehousingpublication" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-telegram"></i>
            </a>
            <a href="https://www.youtube.com/@trehousingpublication" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>
        
        <div className="hp-footer-links">
          <h4>Previous Year Paper</h4>
          <ul>
            <li><Link to="/PYQ?course_id=1&sub_courses=1">BPSC TRE 1.0</Link></li>
            <li><Link to="/PYQ?course_id=1&sub_courses=2">BPSC TRE 2.0</Link></li>
            <li><Link to="/PYQ?course_id=1&sub_courses=3">BPSC TRE 3.0</Link></li>
          </ul>
        </div>
        
        <div className="hp-footer-links">
          <h4>Syllabus</h4>
          <ul>
            <li><Link to="/syllabus?course_id=1&subject_id=17">BPSC TRE (1-5)</Link></li>
            <li><Link to="/syllabus?course_id=1&subject_id=16">BPSC TRE (6-8)</Link></li>
            <li><Link to="/syllabus?course_id=1&subject_id=15">BPSC TRE (9-10)</Link></li>
            <li><Link to="/syllabus?course_id=1&subject_id=14">BPSC TRE (11-12)</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="hp-footer-bottom">
        <div>
          <Link to="/privacy-policy" style={{ marginRight: '20px' }}>Privacy Policy</Link>
          <a href="#" style={{ marginRight: '20px' }}>Cookies Policy</a>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
        </div>
        <div>
          © 2024 TREhousing Educational Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}