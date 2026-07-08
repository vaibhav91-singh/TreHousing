import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import PyqSyPdf from "../components/PYQ/PyqSyPdf.jsx";
import TextTable from "../components/PYQ/TextTable.jsx";
import PyqOverview from "../components/PYQ/PyqOverview.jsx";
import PYQup from "../components/PYQ/PYQup.jsx";
import BiharSyllabusComponent from "../components/PYQ/BiharSyllabusComponent.jsx";
import './PYQPageView.css';

export default function PYQPageView() {
  return (
    <div className="pyq-page-view">
      <Header />
      {/* <PYQup /> */}
      {/* <PyqOverview /> */}
      <TextTable />
      <BiharSyllabusComponent />
      <PyqSyPdf />
      <Footer />
    </div>
  );
}