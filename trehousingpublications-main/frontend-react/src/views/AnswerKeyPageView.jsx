import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import AnswerKeyCategories from '../components/SolvedPaper/AnswerKeyCategories.jsx';

export default function AnswerKeyPageView() {
  return (
    <div className="pyq-page-view">
      <Header />
      <AnswerKeyCategories />
      <Footer />
    </div>
  );
}
