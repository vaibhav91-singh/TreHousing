import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import PopularTest from '../components/TestSeries/PopularTest.jsx';
import SeriesCategories from '../components/TestSeries/SeriesCategories.jsx';
import QuizWindow from '../components/TestSeries/QuizWindow.jsx';
import './TestSeriesView.css';

export default function TestSeriesView() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const quizTitle = urlParams.get('quiz_title');
    if (quizTitle) {
      setSelectedSubject(quizTitle);
    }
  }, [location.search]);

  const handleStartTest = (subjectName) => {
    setSelectedSubject(subjectName);
  };

  return (
    <div className="test-series-view">
      <Header />

      {selectedSubject ? (
        // Agar subject selected hai toh use window mein bhej do
        <QuizWindow subject={selectedSubject} onBack={() => setSelectedSubject(null)} />
      ) : (
        <>
          {/* Dono components mein click handler prop pass kar di */}
          <PopularTest onSelectTest={handleStartTest} />
          <SeriesCategories onSelectTest={handleStartTest} />
        </>
      )}

      <Footer />
    </div>
  );
}
