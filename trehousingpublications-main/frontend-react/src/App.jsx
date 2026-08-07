import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import HomePageView from './views/HomePageView.jsx';
import SyllabusView from './views/SyllabusView.jsx';
import SolvedPaperView from './views/SolvedPaperView.jsx';
import PYQPageView from './views/PYQPageView.jsx';
import AnswerKeyPageView from './views/AnswerKeyPageView.jsx';
import TestSeriesView from './views/TestSeriesView.jsx';
import TopicWiseMCQView from './views/TopicWiseMCQView.jsx';
import TermsAndConditions from './views/TermsAndConditions.jsx';
import PrivacyPolicy from './views/PrivacyPolicy.jsx';
import JobVacancy from './views/JobVacancy.jsx';
import ResultDashbord from './views/ResultDashbord.jsx';
import JobNotificationListener from './components/JobNotificationListener.jsx';
import StudyMaterialView from './views/StudyMaterialView.jsx';
function App() {

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <JobNotificationListener />
      <Routes>
        <Route path="/" element={<HomePageView />} />
        <Route path="/syllabus" element={<SyllabusView />} />
        <Route path="/solvedpaper" element={<PYQPageView />} />
        <Route path="/solved-papers" element={<PYQPageView />} />
        <Route path="/PYQ" element={<PYQPageView />} />
        <Route path="/answer-keys" element={<AnswerKeyPageView />} />
        <Route path="/testseries" element={<TestSeriesView />} />
        <Route path="/quiz" element={<TopicWiseMCQView />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/job" element={<JobVacancy />} />
        <Route path="/jobs" element={<JobVacancy />} />
        <Route path="/performance" element={<ResultDashbord />} />
        <Route path="/study-materials" element={<StudyMaterialView />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;