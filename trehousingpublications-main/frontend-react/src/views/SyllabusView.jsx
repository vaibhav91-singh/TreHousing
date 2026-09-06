import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import SyllabusHigherSecondary from "../components/syllabus/SyllabusHigherSecondary.jsx";
import SyllabusPdf from "../components/syllabus/syllabusPdf.jsx";
import PastPapersAndMocks from "../components/syllabus/PastPapersAndMocks.jsx";
import BctsExam from "../components/syllabus/BctsExam.jsx";
import RedTable from "../components/syllabus/RedTable.jsx";


import SEO from "../components/SEO.jsx";

export default function SyllabusView() {
  return (
    <div className="syllabus-view">
      <SEO 
        title="BPSC TRE Syllabus 2026 - Primary, Middle & Higher Secondary Pattern" 
        description="Download latest BPSC TRE exam syllabus PDFs, subject-wise weightage, marking scheme, and topic breakdowns for Teacher Recruitment."
      />
      <Header />
      {/* <BctsExam /> */}
      <PastPapersAndMocks />
      <RedTable />
      <SyllabusHigherSecondary />
      <SyllabusPdf />
      
      <Footer />
    </div>
  );
}