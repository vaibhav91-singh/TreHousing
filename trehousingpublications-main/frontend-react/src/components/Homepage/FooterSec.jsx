import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/trelogo.png';
import './FooterSec.css';

export default function FooterSec() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = React.useState(null);

  const redirectHome = () => navigate("/");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (sec) => {
    setOpenSection(prev => prev === sec ? null : sec);
  };

  return (
    <footer className="hp-footer">
      <div className="hp-footer-content">
        {/* Company Info & Contact */}
        <div className="hp-footer-brand-col">
          <div className="logo-brand-wrapper" onClick={redirectHome}>
            <img
              src={logo}
              alt="Tre Housing Logo"
              className="modern-logo"
              loading="lazy"
              decoding="async"
            />
            <div className="brand-text">
              <span className="brand-name">TRE HOUSING</span>
              <span className="brand-tagline">PUBLICATION</span>
            </div>
          </div>

          <p className="brand-desc">
            India's trusted educational platform for government exam preparation, free mock test series, solved papers, and career guidance.
          </p>

          <div className="contact-info-list">
            <div className="contact-item">
              <i className="bi bi-geo-alt-fill contact-icon"></i>
              <span>B-144, Sector XU 3, Greater Noida, GB Nagar, UP-201310</span>
            </div>
            <div className="contact-item">
              <i className="bi bi-telephone-fill contact-icon"></i>
              <span>+91 9458846730</span>
            </div>
            <div className="contact-item">
              <i className="bi bi-envelope-fill contact-icon"></i>
              <span>trehousingpublication@gmail.com</span>
            </div>
          </div>

          {/* Social Icons with brand glow */}
          <div className="social-icons">
            <a href="https://wa.me/9458846730" target="_blank" rel="noopener noreferrer" className="social-btn whatsapp" title="WhatsApp">
              <i className="bi bi-whatsapp"></i>
            </a>
            <a href="https://t.me/trehousingpublication" target="_blank" rel="noopener noreferrer" className="social-btn telegram" title="Telegram">
              <i className="bi bi-telegram"></i>
            </a>
            <a href="https://www.youtube.com/@trehousingpublication" target="_blank" rel="noopener noreferrer" className="social-btn youtube" title="YouTube">
              <i className="bi bi-youtube"></i>
            </a>
            <a href="https://twitter.com/trepublication" target="_blank" rel="noopener noreferrer" className="social-btn twitter" title="Twitter / X">
              <i className="bi bi-twitter-x"></i>
            </a>
          </div>
        </div>
        
        {/* Column 1: Navigation */}
        <div className={`hp-footer-links ${openSection === 'explore' ? 'is-open' : ''}`}>
          <h4 onClick={() => toggleSection('explore')}>
            Explore Platform
            <i className="bi bi-chevron-down mobile-accordion-arrow"></i>
          </h4>
          <ul className="footer-links-list">
            <li><Link to="/"><i className="bi bi-chevron-right link-arrow"></i> Home</Link></li>
            <li><Link to="/study-materials"><i className="bi bi-chevron-right link-arrow"></i> Study Materials</Link></li>
            <li><Link to="/testseries"><i className="bi bi-chevron-right link-arrow"></i> Free Test Series</Link></li>
            <li><Link to="/quiz"><i className="bi bi-chevron-right link-arrow"></i> Topic Wise Quiz</Link></li>
            <li><Link to="/jobs"><i className="bi bi-chevron-right link-arrow"></i> Sarkari Job Vacancies</Link></li>
          </ul>
        </div>

        {/* Column 2: Solved Papers */}
        <div className={`hp-footer-links ${openSection === 'pyq' ? 'is-open' : ''}`}>
          <h4 onClick={() => toggleSection('pyq')}>
            Solved Papers
            <i className="bi bi-chevron-down mobile-accordion-arrow"></i>
          </h4>
          <ul className="footer-links-list">
            <li><Link to="/PYQ?course_id=1&sub_courses=1"><i className="bi bi-chevron-right link-arrow"></i> BPSC TRE 1.0 Papers</Link></li>
            <li><Link to="/PYQ?course_id=1&sub_courses=2"><i className="bi bi-chevron-right link-arrow"></i> BPSC TRE 2.0 Papers</Link></li>
            <li><Link to="/PYQ?course_id=1&sub_courses=3"><i className="bi bi-chevron-right link-arrow"></i> BPSC TRE 3.0 Papers</Link></li>
            <li><Link to="/answer-keys"><i className="bi bi-chevron-right link-arrow"></i> Official Answer Keys</Link></li>
          </ul>
        </div>
        
        {/* Column 3: Syllabus & Career */}
        <div className={`hp-footer-links ${openSection === 'syllabus' ? 'is-open' : ''}`}>
          <h4 onClick={() => toggleSection('syllabus')}>
            Syllabus & Career
            <i className="bi bi-chevron-down mobile-accordion-arrow"></i>
          </h4>
          <ul className="footer-links-list">
            <li><Link to="/syllabus?course_id=1&subject_id=17"><i className="bi bi-chevron-right link-arrow"></i> BPSC TRE (Primary 1-5)</Link></li>
            <li><Link to="/syllabus?course_id=1&subject_id=16"><i className="bi bi-chevron-right link-arrow"></i> BPSC TRE (Middle 6-8)</Link></li>
            <li><Link to="/syllabus?course_id=1&subject_id=15"><i className="bi bi-chevron-right link-arrow"></i> BPSC TRE (Secondary 9-10)</Link></li>
            <li><Link to="/syllabus?course_id=1&subject_id=14"><i className="bi bi-chevron-right link-arrow"></i> BPSC TRE (Higher 11-12)</Link></li>
            <li><Link to="/performance"><i className="bi bi-chevron-right link-arrow"></i> Result Dashboard</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom CTA / Telegram Banner inside Footer */}
      <div className="hp-footer-banner">
        <div className="banner-text-group">
          <div className="banner-badge">
            <span className="live-pulse-dot"></span> Join 50,000+ Aspirants
          </div>
          <h3>Prepare Smarter for UPSC, BPSC & SSC Exams</h3>
          <p>Get instant updates on latest Sarkari jobs, free mock tests & exclusive study notes.</p>
        </div>
        <div className="banner-cta-group">
          <a href="https://t.me/trehousingpublication" target="_blank" rel="noopener noreferrer" className="btn-telegram-join">
            <i className="bi bi-telegram"></i> Join Telegram Channel
          </a>
        </div>
      </div>
      
      {/* Footer Bottom Bar */}
      <div className="hp-footer-bottom">
        <div className="legal-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span className="dot-divider">•</span>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
          <span className="dot-divider">•</span>
          <a href="#">Cookies Policy</a>
        </div>

        <div className="copyright-text">
          © {new Date().getFullYear()} TRE Housing Publication. Crafted with <span className="heart-icon">❤️</span> for Students.
        </div>

        <button className="back-to-top-btn" onClick={scrollToTop} title="Back to Top">
          <i className="bi bi-arrow-up-short"></i> Top
        </button>
      </div>
    </footer>
  );
}