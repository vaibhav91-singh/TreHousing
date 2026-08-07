// src/components/Header/HeaderSec.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import ThemeToggle from '../ThemeToggle';
import './HeaderSec.css';

export default function HeaderSec() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  
  const [menuItems, setMenuItems] = useState([
    { name: "Home", path: "/" },
    { name: "Syllabus", submenu: [], path: "/syllabus" },
    { name: "Solved Paper", path: "/solvedpaper" },
    { name: "Mock Test", path: "/testseries" },
    { name: "Job Vacancy", path: "/job" },
    { name: "Performance", path: "/performance" }
  ]);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    if (isMenuActive) {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }
  };

  const closeMenu = () => {
    setIsMenuActive(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const fetchSyllabusData = async () => {
    try {
      const response = await fetch("/api/v1/");
      const apiData = await response.json();
      if (!Array.isArray(apiData)) return [];
      return apiData.map((item) => ({
        name: item.title,
        courseId: item.id,
        submenu: Array.isArray(item.subjects) ? item.subjects.map((subject) => ({
          name: subject.title,
          id: subject.id,
        })) : [],
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const fetchPyqpData = async () => {
    try {
      const response = await fetch("/api/v2/?course_id=1");
      const apiData = await response.json();
      const formatted = [];
      for (const category in apiData) {
        if (Array.isArray(apiData[category])) {
          formatted.push({
            name: category,
            courseId: 1,
            submenu: apiData[category].map((item) => ({
              name: item.title,
              id: item.id,
            })),
          });
        }
      }
      return formatted;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const toggleDropdown = async (index) => {
    const clickedItem = menuItems[index];

    // Special Handling for Performance: Direct Navigation
    if (clickedItem.name === "Performance") {
      navigate(clickedItem.path);
      closeMenu();
      return;
    }

    const newMenuItems = [...menuItems];

    if (clickedItem.name === "Syllabus" && clickedItem.submenu.length === 0) {
      const syllabusData = await fetchSyllabusData();
      newMenuItems[index].submenu = syllabusData;
      setMenuItems(newMenuItems);
    }

    if (clickedItem.name === "PYQP & Answer Key" && clickedItem.submenu.length === 0) {
      const pyqpData = await fetchPyqpData();
      newMenuItems[index].submenu = pyqpData;
      setMenuItems(newMenuItems);
    }

    if (!clickedItem.submenu || clickedItem.submenu.length === 0) {
      if (clickedItem.path) {
        navigate(clickedItem.path);
        closeMenu();
        return;
      }
    }

    if (activeDropdown === index) {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    } else {
      setActiveDropdown(index);
      if (clickedItem.submenu && clickedItem.submenu.length > 0) {
        setActiveSubDropdown(0);
      } else {
        setActiveSubDropdown(null);
      }
    }
  };

  const handleItemClick = (courseId, subjectId) => {
    if (!courseId) return;
    const activeItem = menuItems[activeDropdown];
    const routePath = activeItem && activeItem.name === "PYQP & Answer Key" ? "/PYQ" : "/syllabus";

    if (subjectId) {
      if (activeItem.name === "PYQP & Answer Key") {
        navigate(`${routePath}?course_id=${courseId}&sub_courses=${subjectId}`);
      } else {
        navigate(`${routePath}?course_id=${courseId}&subject_id=${subjectId}`);
      }
    }
    closeMenu();
  };

  return (
    <div className="header-container">
     
      <nav className="navbar-main">
        <div className="logo" onClick={() => { navigate("/"); closeMenu(); }}>
          <img src={logo} alt="Logo" />
        </div>

        <div className="navbar-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="menu-icon" onClick={toggleMenu}>
            <div className={isMenuActive ? 'bar1 active' : 'bar1'}></div>
            <div className={isMenuActive ? 'bar2 active' : 'bar2'}></div>
            <div className={isMenuActive ? 'bar3 active' : 'bar3'}></div>
          </div>

        <ul className={`nav-links ${isMenuActive ? 'active' : ''}`}>
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item-root">
              <a
                href="#"
                className="nav-link-anchor"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(index);
                }}
              >
                {item.name}
                {item.submenu && item.submenu.length > 0 && (
                  <span className={`dropdown-icon ${activeDropdown === index ? 'rotated' : ''}`}>
                    <i className="bi bi-caret-down-fill"></i>
                  </span>
                )}
              </a>

              {item.submenu && item.submenu.length > 0 && activeDropdown === index && (
                <div className="mega-menu-container">
                  <div className="mega-sidebar">
                    {item.submenu.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className={`sidebar-item ${activeSubDropdown === subIndex ? 'active' : ''}`}
                        onMouseEnter={() => setActiveSubDropdown(subIndex)}
                      >
                        {subItem.name}
                        <i className="bi bi-chevron-right"></i>
                      </div>
                    ))}
                  </div>

                  <div className="mega-grid">
                    {item.submenu[activeSubDropdown]?.submenu?.map((subSubItem, subSubIndex) => (
                      <div
                        key={subSubIndex}
                        className="grid-cell"
                        onClick={() => handleItemClick(item.submenu[activeSubDropdown].courseId, subSubItem.id)}
                      >
                        {subSubItem.name}
                      </div>
                    ))}
                    {(!item.submenu[activeSubDropdown]?.submenu || item.submenu[activeSubDropdown]?.submenu.length === 0) && (
                      <div className="mega-menu-empty">No exams available found for this stream.</div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
          </ul>

          <ThemeToggle />
        </div>
      </nav>
      
    </div>
    
  );
}