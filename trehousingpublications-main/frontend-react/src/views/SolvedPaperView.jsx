import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import FAQ from '../components/SolvedPaper/FAQ.jsx';
import Recomm_mock from '../components/SolvedPaper/Recomm_mock.jsx';
import DownloadAttempt from '../components/SolvedPaper/DownloadAttempt.jsx';
import HeaderDropdown from '../components/SolvedPaper/HeaderDropdown.jsx';
import TestSeriesHeroSection from '../components/SolvedPaper/TestSeriesHeroSection.jsx';
import './SolvedPaperView.css';

export default function SolvedPaperView() {
  return (
    <div className="solved-paper-view">
      <Header />
      <TestSeriesHeroSection />
      <HeaderDropdown />
      <DownloadAttempt />
      <FAQ />
      <Recomm_mock />
      <Footer />
    </div>
  );
}