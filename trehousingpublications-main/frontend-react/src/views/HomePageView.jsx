import React from 'react';
import Header from "@/components/Homepage/HeaderSec.jsx";
import NewHeroSection from "@/components/Homepage/NewHeroSection.jsx";
import QuickLinksSection from "@/components/Homepage/QuickLinksSection.jsx";
import ActiveRecruitmentSection from "@/components/Homepage/ActiveRecruitmentSection.jsx";
import RapidFireSection from "@/components/Homepage/RapidFireSection.jsx";
import RecommendationsSection from "@/components/Homepage/RecommendationsSection.jsx";
import ResourceLibrarySection from "@/components/Homepage/ResourceLibrarySection.jsx";
import FooterSec from "@/components/Homepage/FooterSec.jsx";
import FAQ from '../components/SolvedPaper/FAQ.jsx';
import './NewHomePage.css';

export default function HomePageView() {
  return (
    <div className="new-homepage">
      <Header />
      <NewHeroSection />
      <QuickLinksSection />
      <ActiveRecruitmentSection />
      <RapidFireSection />
      <RecommendationsSection />
      <ResourceLibrarySection />
      <FAQ />
      <FooterSec />
    </div>
  );
}