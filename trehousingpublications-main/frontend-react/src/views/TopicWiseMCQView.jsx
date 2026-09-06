import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import FooterSec from "../components/Homepage/FooterSec.jsx";
import TopicWiseCategories from '../components/TopicWiseMCQ/TopicWiseCategories.jsx';

export default function TopicWiseMCQView() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', color: 'var(--text-dark)' }}>
      <Header />
      <main style={{ flex: 1, width: '100%' }}>
        <TopicWiseCategories />
      </main>
      <FooterSec />
    </div>
  );
}
