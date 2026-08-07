import React from 'react';
import Header from '../components/Homepage/HeaderSec.jsx';
import Footer from '../components/Homepage/FooterSec.jsx';
import StudyMaterialCategories from '../components/StudyMaterial/StudyMaterialCategories.jsx';

export default function StudyMaterialView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1, backgroundColor: 'var(--bg-color)' }}>
        <StudyMaterialCategories />
      </div>
      <Footer />
    </div>
  );
}
