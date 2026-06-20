import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './RedTable.css';

export default function RedTable() {
  const [examPatterns, setExamPatterns] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchExamPatterns();
  }, [location.search]);

  const fetchExamPatterns = async () => {
    const urlParams = new URLSearchParams(location.search);
    const courseId = urlParams.get('course_id');
    const subjectId = urlParams.get('subject_id');

    if (!courseId || !subjectId) return;

    try {
      const res = await fetch(
        `/api/v1/?course_id=${courseId}&subject_id=${subjectId}`
      );
      const data = await res.json();
      setExamPatterns(data?.course?.subjects?.[0]?.exam_patterns || []);
    } catch (error) {
      console.error("Failed to fetch exam patterns:", error);
    }
  };

  const parsePattern = (pattern) => {
    if (!pattern) return [];
    const subTopics = (pattern.sub_topics || "").split(",");
    const no_of_questions = (pattern.no_of_questions || "").split(",");
    const maximum_marks = (pattern.maximum_marks || "").split(",");

    return subTopics.map((sub, index) => ({
      sub_topic: sub.trim(),
      no_of_questions: no_of_questions[index]?.trim() || "-",
      maximum_marks: maximum_marks[index]?.trim() || "-",
    }));
  };

  if (!examPatterns.length) return null;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Subject</th>
            <th>Total Questions</th>
            <th>Total Marks</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {examPatterns.map((pattern, index) => {
            const parsed = parsePattern(pattern);
            return parsed.map((item, i) => (
              <tr key={`${index}-${i}`}>
                {i === 0 && <td rowSpan={parsed.length}>{pattern.topics}</td>}
                <td>{item.sub_topic}</td>
                <td>{item.no_of_questions}</td>
                <td>{item.maximum_marks}</td>
                {i === 0 && <td rowSpan={parsed.length}>{pattern.duration}hr</td>}
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}