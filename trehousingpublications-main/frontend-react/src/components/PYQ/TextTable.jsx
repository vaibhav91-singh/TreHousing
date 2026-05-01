import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TextTable.css';

export default function TextTable() {
  const [examPatterns, setExamPatterns] = useState([]);
  const [pageContent, setPageContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://cms.trehousingpublication.com/api/v1/?course_id=1&subject_id=1");
      if (response.data?.course?.subjects?.[0]) {
        const subject = response.data.course.subjects[0];
        setExamPatterns(subject.exam_patterns || []);
        setPageContent({
          overviewTitle: subject.name,
          overviewDescription: subject.description,
        });
      }
    } catch (error) {
      console.error('Error fetching text table data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const parsePattern = (pattern) => {
    const subTopics = (pattern.sub_topics || "").split(",");
    const questions = (pattern.total_questions || "").split(",");
    const marks = (pattern.total_marks || "").split(",");
    return subTopics.map((sub, index) => ({
      sub_topic: sub.trim(),
      questions: questions[index]?.trim() || "-",
      marks: marks[index]?.trim() || "-",
    }));
  };

  if (isLoading) return null;

  return (
    <div className="syllabus-container">
      <div className="syllabus-overview">
        <h2>{pageContent.overviewTitle}</h2>
        <p>{pageContent.overviewDescription}</p>
      </div>
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
                  <td>{item.questions}</td>
                  <td>{item.marks}</td>
                  {i === 0 && <td rowSpan={parsed.length}>{pattern.duration}hr</td>}
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}