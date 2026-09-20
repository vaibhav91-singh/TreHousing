import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import AnswerKeyCategories from '../components/SolvedPaper/AnswerKeyCategories.jsx';
import SEO from "../components/SEO.jsx";

export default function AnswerKeyPageView() {
  return (
    <div className="pyq-page-view">
      <SEO 
        title="Official Exam Answer Keys 2026 PDF - Response Sheet & Cut Off Marks" 
        description="Download official exam answer key PDFs, provisional & final answer keys, OMR response sheets, and expected cut off marks for BPSC TRE 4.0, UPSC, SSC CGL/CHSL, RRB NTPC, IBPS & CTET exams."
        keywords="Official Answer Key PDF 2026, BPSC TRE Answer Key, BPSC Answer Sheet PDF, SSC CGL Answer Key Download, RRB NTPC Response Sheet, Cut Off Marks 2026, Answer Key Objection Link"
      />
      <Header />
      <AnswerKeyCategories />
      <Footer />
    </div>
  );
}

