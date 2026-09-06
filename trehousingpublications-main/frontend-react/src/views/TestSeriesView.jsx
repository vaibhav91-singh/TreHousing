import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../components/Homepage/HeaderSec.jsx";
import FooterSec from "../components/Homepage/FooterSec.jsx";
import PopularTest from '../components/TestSeries/PopularTest.jsx';
import SeriesCategories from '../components/TestSeries/SeriesCategories.jsx';
import QuizWindow from '../components/TestSeries/QuizWindow.jsx';
import SEO from "../components/SEO.jsx";
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
      <SEO 
        title={selectedSubject ? `Online Mock Test: ${selectedSubject}` : "Free BPSC TRE Online Mock Test Series & Practice Sets"}
        description={selectedSubject ? `Attempt live practice mock test for ${selectedSubject} with instant score analytics, negative marking, and detailed solutions.` : "Attempt 100+ free online mock tests and topic-wise practice sets for BPSC Teacher Recruitment Exams."}
      />
      <Header />

      <main className="test-series-main">
        {selectedSubject ? (
          <QuizWindow subject={selectedSubject} onBack={() => setSelectedSubject(null)} />
        ) : (
          <>
            <SeriesCategories onSelectTest={handleStartTest} />
            <PopularTest onSelectTest={handleStartTest} />
          </>
        )}
      </main>

      {!selectedSubject && <FooterSec />}
    </div>
  );
}
