import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import SyllabusHigherSecondary from "../components/syllabus/SyllabusHigherSecondary.jsx";
import SyllabusPdf from "../components/syllabus/syllabusPdf.jsx";
import PastPapersAndMocks from "../components/syllabus/PastPapersAndMocks.jsx";
import RedTable from "../components/syllabus/RedTable.jsx";
import SEO from "../components/SEO.jsx";
import './SyllabusView.css';

export default function SyllabusView() {
  return (
    <div className="syllabus-view">
      <SEO 
        title="BPSC TRE Syllabus 2026 - Primary, Middle & Higher Secondary Pattern" 
        description="Download latest BPSC TRE exam syllabus PDFs, subject-wise weightage, marking scheme, and topic breakdowns for Teacher Recruitment."
      />
      <Header />
      
      <div className="syllabus-hero-banner">
        <div className="syllabus-hero-content">
          <span className="syllabus-hero-badge">📚 Exam Resources & Pattern</span>
          <h1 className="syllabus-hero-title">BPSC TRE Syllabus & Past Papers</h1>
          <p className="syllabus-hero-subtitle">
            Access official subject syllabus PDFs, exam pattern analysis, previous year question papers, answer keys, and online mock tests.
          </p>
        </div>
      </div>

      <main className="syllabus-main-content">
        <PastPapersAndMocks />
        <RedTable />
        <SyllabusHigherSecondary />
        <SyllabusPdf />
      </main>
      
      <Footer />
    </div>
  );
}