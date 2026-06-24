import React, { useState } from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import PopularTest from '../components/TestSeries/PopularTest.jsx';
import SeriesCategories from '../components/TestSeries/SeriesCategories.jsx';
import QuizWindow from '../components/TestSeries/QuizWindow.jsx';
import './TestSeriesView.css';

export default function TestSeriesView() {
  // Ab state mein sirf true/false nahi, balki selected subject ka naam/id store hoga
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Jab koi card click hoga, tab yeh function call hoga
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
