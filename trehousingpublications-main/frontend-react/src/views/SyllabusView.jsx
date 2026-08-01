import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import SyllabusHigherSecondary from "../components/syllabus/SyllabusHigherSecondary.jsx";
import SyllabusPdf from "../components/syllabus/syllabusPdf.jsx";
import PastPapersAndMocks from "../components/syllabus/PastPapersAndMocks.jsx";
import BctsExam from "../components/syllabus/BctsExam.jsx";
import RedTable from "../components/syllabus/RedTable.jsx";


export default function SyllabusView() {
  return (
    <div className="syllabus-view">
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