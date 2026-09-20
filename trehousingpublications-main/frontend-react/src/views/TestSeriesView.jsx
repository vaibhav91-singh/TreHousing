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

  const testSeriesSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": selectedSubject ? `Free Online Mock Test: ${selectedSubject}` : "Free Online Mock Test Series 2026 - UPSC, BPSC, SSC, Railway, Bank & CTET",
    "description": "Attempt live online mock tests and practice sets with real timer, instant scorecard, AIR rank analytics, and detailed step-by-step solution keys for all Indian competitive exams.",
    "educationalAlignment": {
      "@type": "AlignmentObject",
      "alignmentType": "educationalSubject",
      "educationalFramework": "Govt Competitive Exams India"
    }
  };

  return (
    <div className="test-series-view">
      <SEO 
        title={selectedSubject ? `Free Online Mock Test: ${selectedSubject} 2026` : "Free Online Mock Test Series 2026 - BPSC TRE, UPSC, SSC, Railways, Bank & CTET"}
        description={selectedSubject ? `Attempt free live online practice mock test for ${selectedSubject} with real exam timer, instant score analysis, negative marking, and detailed step-by-step solutions.` : "Attempt 1000+ free online mock test series, speed tests, chapterwise quizzes, and full length practice sets for BPSC TRE 4.0, UPSC IAS, SSC CGL/CHSL, RRB NTPC, IBPS PO, CTET & Police exams."}
        keywords={selectedSubject ? `Mock Test ${selectedSubject}, Online Quiz ${selectedSubject}, Practice Set ${selectedSubject}, Free Test Series` : "Free Online Mock Test 2026, Mock Test Series PDF, BPSC TRE Mock Test Free, SSC CGL Practice Set, RRB NTPC Online Test Series, UPSC IAS Mock Test, IBPS Bank Mock Test, CTET Practice Quiz, Bihar Police Test Series"}
        schema={testSeriesSchema}
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
