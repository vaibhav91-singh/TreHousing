import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import './FooterSec.css';

export default function FooterSec() {
  const navigate = useNavigate();
  const redirectHome = () => navigate("/");

  return (
    <div>
      <footer className="footer">
        <div className="footer-inner">
          <div className="logowithcontect">
            <div className="logo">
              <img
                src={logo}
                alt="Logo"
                onClick={redirectHome}
                className="modern-logo"
              />
            </div>
            <div className="contact-info">
              <p>
                <strong>Address:</strong> TRE HOUSING PUBLICATION PRIVATE LIMITED <br />
                B-144, SECTOR XU 3, GREATER NOIDA, GB NAGAR, UP-201310
              </p>
              <p><strong>Phone No:</strong> 9458846730</p>
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

          <div className="footer-links-grid">
            <div className="link-column">
              <h4 className="section-title">Previous Year Paper</h4>
              <ul>
                <li><Link to="/PYQ?course_id=1&sub_courses=1">BPSC TRE 1.0 <span className="arrow">→</span></Link></li>
                <li><Link to="/PYQ?course_id=1&sub_courses=2">BPSC TRE 2.0 <span className="arrow">→</span></Link></li>
                <li><Link to="/PYQ?course_id=1&sub_courses=3">BPSC TRE 3.0 <span className="arrow">→</span></Link></li>
              </ul>
            </div>

            <div className="link-column">
              <h4 className="section-title">Syllabus</h4>
              <ul>
                <li><Link to="/syllabus?course_id=1&subject_id=17">BPSC TRE (1-5) <span className="arrow">→</span></Link></li>
                <li><Link to="/syllabus?course_id=1&subject_id=16">BPSC TRE (6-8) <span className="arrow">→</span></Link></li>
                <li><Link to="/syllabus?course_id=1&subject_id=15">BPSC TRE (9-10) <span className="arrow">→</span></Link></li>
                <li><Link to="/syllabus?course_id=1&subject_id=14">BPSC TRE (11-12) <span className="arrow">→</span></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-bottom">
        <div className="bottom-inner">
          <div className="left-links">
            <Link to="/privacy-policy" className="bottom-item">Privacy Policy</Link>
            <a href="#" className="bottom-item">Cookies Policy</a>
          </div>
          <div className="right-link">
            <Link to="/terms-and-conditions" className="bottom-item">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  );
}