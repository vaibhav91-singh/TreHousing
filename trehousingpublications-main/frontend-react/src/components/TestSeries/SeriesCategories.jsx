import React from 'react';
import './SeriesCategories.css';
import irbLogo from '../../assets/TestSeries/IRB.png';

export default function SeriesCategories() {
  const Examtype = ['All', 'PG Entrance Exam', 'SSC', 'Regulatory Body Exams', 'Teaching Exams', 'AE/Je Exams', 'Judiciary Exams', 'Railways', 'Banking & Insurance'];
  const content = ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'];

  return (
    <div className="catogories">
      <div className="head-section">
        <h1>Test Series by Categories</h1>
        <input type="text" placeholder="Search for your exam" />
      </div>
      <div className="sublink-crads">
        <div className="subcard">
          {Examtype.map(item => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div className="cards-portion">
          {/* We generate 6 identical dummy cards using an array mapped with index */}
          {[...Array(6)].map((_, index) => (
            <div className="cardDesign" key={index}>
              <img src={irbLogo} alt="Logo" />
              
              {/* User count badge with an SVG icon */}
              <p className="views">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCB00" viewBox="0 0 24 24" width="16" height="16">
                  <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
                <span id="user">900.4k Users</span>
              </p>
              
              {/* 
                SECURITY SCANNER NOTE: 
                The scanner flagged "RRB Group D Mock Test 2024" as an "internationalization vulnerability".
                This simply means the text is hardcoded in English and not wrapped in a translation function 
                (like `t('mock_test_title')` from i18next). If you are building an English-only application, 
                you can safely ignore this scanner warning!
              */}
              <p id="heading">RRB Group D Mock Test 2024</p>
              
              <p>934 Total Tests <span id="free">| Free Tests</span></p>
              <hr />
              
              {/* Languages available badge */}
              <p id="lang">
                <span><i className="bi bi-translate"></i></span>
                English, Hindi + 7 more
              </p>
              <hr />
              
              {/* Render the dummy list of bullet points defined at the top */}
              <ul>
                {content.map(item => <li key={item}>{item}</li>)}
              </ul>
              
              <button className="btn-view">View Test Series</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}