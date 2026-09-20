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
  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the mock test series and PYQ PDFs free on TRE Housing Publications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! TRE Housing Publications provides 100% free online mock test series, chapterwise practice sets, and downloadable previous year question paper PDFs with detailed solution keys for BPSC TRE, UPSC, SSC, Railway, and Banking exams."
        }
      },
      {
        "@type": "Question",
        "name": "Which competitive exams are covered on TRE Housing Publications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major Indian competitive exams including BPSC TRE 4.0, BPSC CCE, UPSC IAS, SSC CGL/CHSL/MTS, Railway RRB NTPC & Group D, IBPS PO/Clerk, SBI PO/Clerk, CTET, STET, Bihar Police, UP Police, and all State Govt job recruitments."
        }
      }
    ]
  };

  return (
    <div className="new-homepage">
      <SEO 
        title="India's #1 Govt Exam Prep & Sarkari Jobs Portal | Free Mock Tests, PYQ & Syllabus" 
        description="Comprehensive exam preparation portal for BPSC TRE 4.0, UPSC, SSC, Railway, Banking, Teaching & State exams. Attempt 1000+ free mock tests, download solved past year papers (PYQ PDF), exam syllabus & real-time Sarkari job alerts."
        keywords="Sarkari Job 2026, Free Mock Test, Previous Year Question Papers, PYQ PDF, Exam Syllabus 2026, BPSC TRE 4.0, UPSC IAS, SSC CGL CHSL MTS, Railway RRB NTPC Group D, IBPS PO SBI Clerk, CTET, Bihar Police, UP Police, Answer Key, Sarkari Result"
        schema={homepageSchema}
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