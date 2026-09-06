import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import PYQCategories from '../components/SolvedPaper/PYQCategories.jsx';

import SEO from "../components/SEO.jsx";

export default function PYQPageView() {
  return (
    <div className="pyq-page-view">
      <SEO 
        title="BPSC TRE Previous Year Papers (PYQ) & Solved Papers PDF" 
        description="Download free BPSC TRE 1.0, 2.0, 3.0 Previous Year Question Papers with detailed solution key and subject-wise PDF downloads."
      />
      <Header />
      <PYQCategories />
      <Footer />
    </div>
  );
}
