import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BiharSyllabusComponent.css';

export default function BiharSyllabusComponent() {
  const [title, setTitle] = useState('');
  const [syllabusTopics, setSyllabusTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v2/?course_id=1&subject_id=1');
      if (response.data) {
        setTitle(response.data.title || 'Bihar Computer Science Teacher Syllabus');
        setSyllabusTopics(response.data.topics || []);
      }
    } catch (error) {
      console.error('Error fetching syllabus topics:', error);
      setTitle('Bihar Computer Science Teacher Syllabus');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="loading-container"><div className="loading-spinner"></div></div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md ml-3">
      <h2 className="text-xl font-bold mb-4">{title || 'Will be available soon'}</h2>
      {syllabusTopics.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {syllabusTopics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      ) : (
        <div className="no-data-message">
          <p>Syllabus topics will be available soon</p>
        </div>
      )}
    </div>
  );
}