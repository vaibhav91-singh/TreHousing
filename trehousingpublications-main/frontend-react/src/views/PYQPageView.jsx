import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import PYQCategories from '../components/SolvedPaper/PYQCategories.jsx';

import SEO from "../components/SEO.jsx";

export default function PYQPageView() {
  const pyqSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Previous Year Solved Question Papers (PYQ PDFs)",
    "description": "Download free previous year question papers with detailed step-by-step solution keys for BPSC TRE 1.0, 2.0, 3.0, UPSC IAS, SSC CGL/CHSL/MTS, RRB NTPC, Banking IBPS/SBI, CTET, and Police exams.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "BPSC TRE Solved Papers PDF (Primary, Middle, Secondary)"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "SSC CGL & CHSL Previous Year Question Papers"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Railway RRB NTPC & Group D Solved Papers"
      }
    ]
  };

  return (
    <div className="pyq-page-view">
      <SEO 
        title="Previous Year Question Papers (PYQ PDF) & Solved Papers with Answer Keys" 
        description="Download free Previous Year Question Papers (PYQ PDF) with step-by-step answer key solutions for BPSC TRE (1.0, 2.0, 3.0, 4.0), UPSC Prelims, SSC CGL, CHSL, MTS, RRB NTPC, Group D, IBPS PO, SBI Clerk, CTET & State Exams."
        keywords="Previous Year Question Papers PDF, PYQ Solved Papers, BPSC TRE Previous Year Paper, BPSC Solved Paper PDF, SSC CGL PYQ PDF, RRB NTPC Question Paper, UPSC Prelims Solved Papers, CTET Previous Papers, Govt Exam Question Bank, Solved Answer Keys"
        schema={pyqSchema}
      />

      <Header />
      <PYQCategories />
      <Footer />
    </div>
  );
}
