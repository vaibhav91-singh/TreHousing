import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './SyllabusHigherSecondary.css';

export default function SyllabusHigherSecondary() {
  const [syllabusData, setSyllabusData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchSyllabus();
  }, [location.search]);

  const fetchSyllabus = async () => {
    try {
      const urlParams = new URLSearchParams(location.search);
      const courseId = urlParams.get('course_id') || 1;
      const subjectId = urlParams.get('subject_id') || 1;

      const res = await axios.get(
        `/api/v1/?course_id=${courseId}&subject_id=${subjectId}`
      );
      const subjects = res.data?.course?.subjects;
      if (subjects && subjects.length > 0) {
        const subjectContents = subjects[0].subject_contents;
        const found = subjectContents.find((content) =>
          content.title.toLowerCase().includes("higher secondary") || 
          content.title.toLowerCase().includes("syllabus")
        );
        setSyllabusData(found || subjectContents[0]);
      }
    } catch (error) {
      console.error("Error fetching syllabus data:", error);
    }
  };

  const parsedDescription = syllabusData?.description
    ? syllabusData.description.split(/\r?\n/).filter(Boolean)
    : [];

  if (!syllabusData) return null;

  return (
    <div className="syllabus-detail-card">
      <div className="syllabus-detail-header">
        <h4 className="syllabus-detail-title">{syllabusData.title}</h4>
      </div>
      <div className="syllabus-detail-content">
        <ul className="syllabus-bullet-list">
          {parsedDescription.map((point, index) => (
            <li key={index} className="syllabus-bullet-item">
              <span className="bullet-dot">•</span>
              <span className="bullet-text">{point}</span>
            </li>
          ))}
          {syllabusData.reference_links && (
            <li className="syllabus-bullet-item ref-link-item">
              <span className="bullet-dot">🔗</span>
              <span className="bullet-text">
                Read official reference:{" "}
                <a href={syllabusData.reference_links} target="_blank" rel="noopener noreferrer">
                  {syllabusData.reference_links}
                </a>
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}