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
  const syllabusSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Indian Govt Exams & BPSC TRE Exam Syllabus 2026",
    "description": "Download free latest official exam syllabus PDFs, subject-wise weightage, marking scheme, selection process, and topic breakdown for BPSC TRE 4.0, UPSC, SSC CGL/CHSL, Railways RRB NTPC, Banking IBPS, CTET & State Exams.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "TRE Housing Publications",
      "sameAs": "https://trehousingpublications.com"
    }
  };

  return (
    <div className="syllabus-view">
      <SEO 
        title="Govt Exam Syllabus 2026 PDF Download - BPSC TRE, UPSC, SSC, Railways, Bank & CTET" 
        description="Download latest official exam syllabus PDFs, subject-wise marks weightage, exam pattern, marking scheme, and topic breakdowns for BPSC TRE 4.0 (Primary, Middle, High School), UPSC, SSC CGL, RRB NTPC, IBPS PO & CTET exams."
        keywords="Exam Syllabus 2026 PDF, BPSC TRE Syllabus, BPSC TRE 4.0 Pattern, UPSC IAS Syllabus, SSC CGL Syllabus PDF, SSC CHSL Exam Pattern, RRB NTPC Syllabus, IBPS PO Syllabus, CTET Syllabus 2026, Bihar Teacher Syllabus, Govt Exam Pattern Download"
        schema={syllabusSchema}
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