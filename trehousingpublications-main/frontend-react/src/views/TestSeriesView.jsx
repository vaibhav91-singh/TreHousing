import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import Footer from "../components/Homepage/FooterSec.jsx";
import PopularTest from '../components/TestSeries/PopularTest.jsx';
import SeriesCategories from '../components/TestSeries/SeriesCategories.jsx';
import './TestSeriesView.css';

export default function TestSeriesView() {
  return (
    <div className="test-series-view">
      <Header />
      <PopularTest />
      <SeriesCategories />
      <Footer />
    </div>
  );
}