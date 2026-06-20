import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PyqOverview.css';

export default function PyqOverview() {
  const [overviewData, setOverviewData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v2/?course_id=1&subject_id=1');
      setOverviewData(response.data || {});
    } catch (error) {
      console.error('Error fetching overview data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="loading-container"><div className="loading-spinner"></div></div>;

  return (
    <div className="content-box">
      <div className="bpscBook">
        <img src={overviewData.bookImage} alt="BPSC Book" />
      </div>
      <div className="text-content">
        <h2>{overviewData.title}</h2>
        <p>{overviewData.description}</p>
      </div>
    </div>
  );
}