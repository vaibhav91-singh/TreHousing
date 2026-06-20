import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import './HeaderSec.css';

export default function HeaderSec() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState({});
  const [menuItems, setMenuItems] = useState([
    { name: "Home", path: "/" },
    { name: "Syllabus", submenu: [], path: "/syllabus" },
    { name: "PYQP & Answer Key", submenu: [], path: "/PYQ" },
    { name: "Solved Paper", path: "/solvedpaper" },
    { name: "Mock Test", path: "/testseries" },
  ]);
  
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    if (isMenuActive) {
      setActiveDropdown(null);
      setActiveSubDropdown({});
    }
  };

  const fetchSyllabusData = async () => {
    try {
      const response = await fetch("/api/v1/");
      const apiData = await response.json();
      return apiData.map((item) => ({
        name: item.title,
        courseId: item.id,
        submenu: item.subjects.map((subject) => ({
          name: subject.title,
          id: subject.id,
        })),
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

    setActiveDropdown(activeDropdown === index ? null : index);
    setActiveSubDropdown({});
  };

  const toggleSubDropdown = (parentIndex, subIndex) => {
    const key = `${parentIndex}-${subIndex}`;
    setActiveSubDropdown(prev => ({
      [key]: !prev[key]
    }));
  };

  const handleClick = (courseId, subjectId) => {
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

  const closeMenu = () => {
    setIsMenuActive(false);
    setActiveDropdown(null);
    setActiveSubDropdown({});
  };

  return (
    <div className="header-container">
      <nav>
        <div className="logo" onClick={() => { navigate("/"); closeMenu(); }}>
          <img src={logo} alt="Logo" />
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={isMenuActive ? 'bar1 active' : 'bar1'}></div>
          <div className={isMenuActive ? 'bar2 active' : 'bar2'}></div>
          <div className={isMenuActive ? 'bar3 active' : 'bar3'}></div>
        </div>

        <ul className={`nav-links ${isMenuActive ? 'active' : ''}`}>
          {menuItems.map((item, index) => (
            <li key={index} className="dropdown">
              <a
                href="#"
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
                <ul className="dropdown-menu show">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex} className="sub-dropdown">
                      <a href="#" onClick={(e) => { e.preventDefault(); toggleSubDropdown(index, subIndex); }}>
                        {subItem.name}
                        {subItem.submenu && (
                          <span className={`sub-dropdown-icon ${activeSubDropdown[`${index}-${subIndex}`] ? 'rotated' : ''}`}>
                            <i className="bi bi-caret-right-fill"></i>
                          </span>
                        )}
                      </a>

                      {subItem.submenu && activeSubDropdown[`${index}-${subIndex}`] && (
                        <ul className="sub-dropdown-menu show">
                          {subItem.submenu.map((subSubItem, subSubIndex) => (
                            <li key={subSubIndex} onClick={() => handleClick(subItem.courseId, subSubItem.id)}>
                              <a href="#" onClick={(e) => e.preventDefault()}>{subSubItem.name}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}