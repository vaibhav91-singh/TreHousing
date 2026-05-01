import React, { useState, useEffect } from 'react';
import HeroSec from "@/components/Homepage/HeroSec.jsx";
import RefBook from "@/components/Homepage/RefBook.jsx";
import AboutUs from "@/components/Homepage/AboutUs.jsx";
import NewsLetter from "@/components/Homepage/NewsLetter.jsx";
import Header from "@/components/Homepage/HeaderSec.jsx";
import Footer from "@/components/Homepage/FooterSec.jsx";
import MissionVision from "@/components/Homepage/MissionVision.jsx";
import JobOpportunities from "@/components/Homepage/JobOpportunitiesPage.jsx";
import DownloadApp from "@/components/Homepage/DownloadApp.jsx";
import './HomePageView.css';

export default function HomePageView() {
  // TODO: Convert Vue data(), methods, and mounted() manually
  
  return (
    <>
      <Header />
      <HeroSec />
      {/* <AboutUs /> */}
      <MissionVision />
      <JobOpportunities />
      <RefBook />
      <DownloadApp />
      <NewsLetter />
      <Footer />
    </>
  );
}