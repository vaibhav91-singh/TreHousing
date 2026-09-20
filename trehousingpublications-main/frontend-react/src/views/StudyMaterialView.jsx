import React from 'react';
import Header from '../components/Homepage/HeaderSec.jsx';
import Footer from '../components/Homepage/FooterSec.jsx';
import StudyMaterialCategories from '../components/StudyMaterial/StudyMaterialCategories.jsx';

import SEO from '../components/SEO.jsx';

export default function StudyMaterialView() {
  const studySchema = {
    "@context": "https://schema.org",
    "@type": "EducationalDataCatalog",
    "name": "Free Study Notes, E-Books & Revision Material 2026",
    "description": "Free PDF download of comprehensive study notes, formula sheets, NCERT summaries, current affairs, and e-books for BPSC TRE, UPSC, SSC, Railways, Bank & State Exams."
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SEO 
        title="Free Study Material PDF Download - Revision Notes, E-Books & Formula Sheets" 
        description="Download free revision notes PDFs, NCERT chapter summaries, e-books, formula cheat-sheets, and monthly Current Affairs PDFs for BPSC TRE 4.0, UPSC, SSC CGL, RRB NTPC, IBPS PO & CTET exams."
        keywords="Free Study Material PDF, BPSC TRE Notes PDF, UPSC Study Notes Download, SSC CGL Revision Notes, NCERT Summary PDF, Monthly Current Affairs PDF 2026, Formula Sheet PDF, Free Exam Ebooks"
        schema={studySchema}
      />

      <Header />
      <div style={{ flex: 1, backgroundColor: 'var(--bg-color)' }}>
        <StudyMaterialCategories />
      </div>
      <Footer />
    </div>
  );
}
