import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import TopicWiseCategories from '../components/TopicWiseMCQ/TopicWiseCategories.jsx';

export default function TopicWiseMCQView() {
  return (
    <div className="pyq-page-view">
      <Header />
      <TopicWiseCategories />
    </div>
  );
}
