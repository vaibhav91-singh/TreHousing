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
        <marquee behavior="scroll" direction="left">Solved papers of all major exams 2022, including objective and descriptive sections, MCQs, PYQs, and mock tests with clear answers and explanations for effective preparation.</marquee>
        
        {/* Other menu items... */}
      </ul>
    </nav>
  );
}