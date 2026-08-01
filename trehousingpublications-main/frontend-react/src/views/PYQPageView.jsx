import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import PYQCategories from '../components/SolvedPaper/PYQCategories.jsx';

export default function PYQPageView() {
  return (
    <div className="pyq-page-view">
      <Header />
      <PYQCategories />
      <Footer />
    </div>
  );
}
