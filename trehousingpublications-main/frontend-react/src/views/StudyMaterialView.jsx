import React from 'react';
import Header from '../components/Homepage/HeaderSec.jsx';
import Footer from '../components/Homepage/FooterSec.jsx';
import StudyMaterialCategories from '../components/StudyMaterial/StudyMaterialCategories.jsx';

import SEO from '../components/SEO.jsx';

export default function StudyMaterialView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SEO 
        title="Free Study Material & E-Books PDF for BPSC TRE" 
        description="Download free BPSC TRE revision notes, e-books, formula sheets, chapter summaries, and subject guides."
      />
      <Header />
      <div style={{ flex: 1, backgroundColor: 'var(--bg-color)' }}>
        <StudyMaterialCategories />
      </div>
      <Footer />
    </div>
  );
}
