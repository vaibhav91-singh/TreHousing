import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePageView from './views/HomePageView.jsx';
import SyllabusView from './views/SyllabusView.jsx';
import PYQPageView from './views/PYQPageView.jsx';
import SolvedPaperView from './views/SolvedPaperView.jsx';
import TestSeriesView from './views/TestSeriesView.jsx';
import TermsAndConditions from './views/TermsAndConditions.jsx';
import PrivacyPolicy from './views/PrivacyPolicy.jsx';


// Extend the window interface type safety for your custom window property object
if (typeof window !== 'undefined') {
  window.webbot = window.webbot || [];
}

function App() {
  
  // This hook runs exactly once when your student portal loads in the browser
  useEffect(() => {
    const initializeChatbot = () => {
      // Prevent duplicating the script if the component re-renders
      if (window.webbot && window.webbot.init) return;

      window.webbot.load = function(e) {
        var o = document.createElement("script");
        o.type = "text/javascript"; // Fixed the typo from the original snippet
        o.async = true;
        o.crossOrigin = "anonymous";
        o.src = "https://app.botsify.com/web-bot/script/frame/" + e + "/webbot.js";
        
        var n = document.getElementsByTagName("script")[0];
        if (n && n.parentNode) {
          n.parentNode.insertBefore(o, n);
        }
      };

      // Fire the load function with your explicit Botsify token ID
      window.webbot.load('VzkJrwqHZmIpHfrSfIYcPfPvA6s1yYWxM2x4va9w');
    };

    initializeChatbot();
  }, []);

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