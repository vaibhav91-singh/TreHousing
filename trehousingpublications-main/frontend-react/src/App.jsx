import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { HelmetProvider } from 'react-helmet-async';
import Loader from './components/common/Loader.jsx';
import JobNotificationListener from './components/JobNotificationListener.jsx';

// Dynamic lazy imports for Route Code-Splitting
const HomePageView = lazy(() => import('./views/HomePageView.jsx'));
const SyllabusView = lazy(() => import('./views/SyllabusView.jsx'));
const PYQPageView = lazy(() => import('./views/PYQPageView.jsx'));
const AnswerKeyPageView = lazy(() => import('./views/AnswerKeyPageView.jsx'));
const TestSeriesView = lazy(() => import('./views/TestSeriesView.jsx'));
const TopicWiseMCQView = lazy(() => import('./views/TopicWiseMCQView.jsx'));
const TermsAndConditions = lazy(() => import('./views/TermsAndConditions.jsx'));
const PrivacyPolicy = lazy(() => import('./views/PrivacyPolicy.jsx'));
const JobVacancy = lazy(() => import('./views/JobVacancy.jsx'));
const ResultDashbord = lazy(() => import('./views/ResultDashbord.jsx'));
const StudyMaterialView = lazy(() => import('./views/StudyMaterialView.jsx'));

// Configure TanStack Query Client with 5-minute memory cache staleTime
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      gcTime: 10 * 60 * 1000,    // 10 minutes garbage collection time
      refetchOnWindowFocus: false,
    },
  },
});

function App() {

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.15,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <JobNotificationListener />
          <Suspense fallback={<Loader fullPage={true} text="Loading..." />}>
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
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;