import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../common/Loader.jsx';
import { useLocation } from 'react-router-dom';
import './BctsExam.css';



export default function BctsExam() {
  const [course, setCourse] = useState(null);
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuItems, setMenuItems] = useState([
    {
      text: "All subject Syllabus",
      isOpen: false,
      subMenu: [
        { text: "Sub Item 1", link: "#", courseId: 1, subjectId: 1 },
        { text: "Sub Item 2", link: "#", courseId: 1, subjectId: 2 },
      ],
    },
    {
      text: "Bihar Computer Teacher",
      isOpen: false,
      subMenu: [
        { text: "Sub Item 1", link: "#", courseId: 2, subjectId: 1 },
        { text: "Sub Item 2", link: "#", courseId: 2, subjectId: 2 },
      ],
    },
  ]);

  const [newsLinks] = useState([
    {
      id: 1,
      title: "REET 2025 Notification",
      links: [
        { id: 1, text: "Exam Information of REET", courseId: 8, subjectId: 1 },
      ],
    },
  ]);

  const location = useLocation();

  useEffect(() => {
    fetchSyllabus();
  }, [location.search]);

  const fetchSyllabus = async () => {
    setLoading(true);
    try {
      const urlParams = new URLSearchParams(location.search);
      const courseId = urlParams.get('course_id') || 1;
      const subjectId = urlParams.get('subject_id') || 1;
      
      const res = await fetch(
        `/api/v1/?course_id=${courseId}&subject_id=${subjectId}`
      );
      const data = await res.json();

      if (data && data.course && data.course.subjects && data.course.subjects.length > 0) {
        setCourse(data.course);
        setSubject(data.course.subjects[0]);
      }
    } catch (err) {
      console.error("Failed to fetch syllabus:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFullUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${path}`;
  };

  const toggleSyllabusDropdown = (index) => {
    setMenuItems(prev => prev.map((item, i) => ({
      ...item,
      isOpen: i === index ? !item.isOpen : false
    })));
  };

  const toggleNewsDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const handleMenuItemClick = async (subItem) => {
    if (subItem.courseId && subItem.subjectId) {
      try {
        const response = await axios.get(
          `/api/v1/?course_id=${subItem.courseId}&subject_id=${subItem.subjectId}`
        );
        if (response.data && response.data.course && response.data.course.subjects?.length > 0) {
          window.location.search = `?course_id=${subItem.courseId}&subject_id=${subItem.subjectId}`;
        } else {
          showPopupMessage("Will be available soon");
        }
      } catch (error) {
        showPopupMessage("Will be available soon");
      }
    } else {
      showPopupMessage("Will be available soon");
    }
  };

  if (loading) return <Loader fullPage={true} text="Loading Syllabus..." />;

  return (
    // <div className="container">
    <>
    <h3>BCTS.JSX</h3> file name
    <div className="main-container">
      <div className="content">
        {course && subject ? (
          <>
            <h1 className="course-title">{course.title}</h1>
            <p className="course-description">{course.description}</p>
            <div className="image-section">
              <img src={getFullUrl(course.banner)} alt="Course Banner" className="course-banner" />
            </div>
            <div className="download-section">
              <h2>{subject.title}</h2>
              <p>{subject.description}</p>
              <a href={getFullUrl(subject.pdf_link)} target="_blank" rel="noopener noreferrer">
                <button className="download-btn">Download PDF</button>
              </a>
            </div>
          </>
        ) : (
          <div className="no-data">Syllabus not found</div>
        )}
      </div>
</div>
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Notification</h3>
              <button className="close-btn" onClick={() => setShowPopup(false)}>&times;</button>
            </div>
            <div className="popup-body">
              <p>{popupMessage}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}