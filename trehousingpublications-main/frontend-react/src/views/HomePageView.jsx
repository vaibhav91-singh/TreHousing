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
import SEO from '@/components/SEO.jsx';
import './NewHomePage.css';

export default function HomePageView() {
  return (
    <div className="new-homepage">
      <SEO 
        title="BPSC TRE Preparation - Free Test Series, PYQ & Syllabus" 
        description="Comprehensive portal for BPSC Teacher Recruitment Exam (TRE 4.0). Free mock tests, past year solved papers, syllabus PDFs, and official job notifications."
      />
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