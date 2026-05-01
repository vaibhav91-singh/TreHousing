import React, { useState, useEffect } from 'react';
import './HeaderDropdown.css';

export default function HeaderDropdown() {
  const [dropdowns, setDropdowns] = useState({
    previousYearPaper: false,
    exams: false,
    onlineCourse: false,
    mockTest: false,
    allCourses: false,
  });

  const toggleDropdown = (menu) => {
    setDropdowns(prev => {
      const newState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = key === menu ? !prev[key] : false;
      });
      return newState;
    });
  };

  const closeDropdowns = (event) => {
    if (!event.target.closest(".dropdown")) {
      setDropdowns({
        previousYearPaper: false,
        exams: false,
        onlineCourse: false,
        mockTest: false,
        allCourses: false,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, []);

  return (
    <nav className="header">
      <ul className="menu">
        <li className="dropdown" onClick={(e) => e.stopPropagation()}>
          <span onClick={() => toggleDropdown('previousYearPaper')}>
            <i className="bi bi-newspaper"></i>Previous Year Paper
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="14px" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
          {dropdowns.previousYearPaper && (
            <ul className="dropdown-menu">
              <li><a href="#">2024 Papers</a></li>
              <li><a href="#">2023 Papers</a></li>
              <li><a href="#">2022 Papers</a></li>
            </ul>
          )}
        </li>
        <li className="dropdown" onClick={(e) => e.stopPropagation()}>
          <span onClick={() => toggleDropdown('exams')}>
            <i className="bi bi-pencil-square"></i>Exams
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="14px" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
          {dropdowns.exams && (
            <ul className="dropdown-menu">
              <li><a href="#">Upcoming Exams</a></li>
              <li><a href="#">Past Exam Results</a></li>
            </ul>
          )}
        </li>
        {/* Other menu items... */}
      </ul>
    </nav>
  );
}