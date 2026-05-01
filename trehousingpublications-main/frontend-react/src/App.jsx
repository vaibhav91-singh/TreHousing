import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePageView from './views/HomePageView.jsx';
import SyllabusView from './views/SyllabusView.jsx';
import PYQPageView from './views/PYQPageView.jsx';
import SolvedPaperView from './views/SolvedPaperView.jsx';
import TestSeriesView from './views/TestSeriesView.jsx';
import TermsAndConditions from './views/TermsAndConditions.jsx';
import PrivacyPolicy from './views/PrivacyPolicy.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageView />} />
        <Route path="/syllabus" element={<SyllabusView />} />
        <Route path="/PYQ" element={<PYQPageView />} />
        <Route path="/solvedpaper" element={<SolvedPaperView />} />
        <Route path="/testseries" element={<TestSeriesView />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;