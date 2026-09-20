import React from 'react';
import Header from "../components/Homepage/HeaderSec.jsx";
import FooterSec from "../components/Homepage/FooterSec.jsx";
import TopicWiseCategories from '../components/TopicWiseMCQ/TopicWiseCategories.jsx';
import SEO from "../components/SEO.jsx";

export default function TopicWiseMCQView() {
  const mcqSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "Topic-Wise Subject MCQs & Practice Questions",
    "description": "Practice subject-wise and chapter-wise multiple choice questions (MCQ) for History, Geography, Polity, Science, Maths, Reasoning & General Awareness."
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', color: 'var(--text-dark)' }}>
      <SEO 
        title="Topic-Wise Subject MCQs & Practice Questions 2026 - History, Polity, Science & Maths" 
        description="Practice topic-wise MCQs, chapterwise objective questions, and quiz questions with detailed explanations for UPSC, BPSC TRE, SSC, Railways, Bank, and Teaching exams."
        keywords="Topic Wise MCQ, History MCQ PDF, Indian Polity Questions, General Science MCQ, Reasoning Practice Quiz, Maths Objective Questions, Chapterwise MCQ Practice, Daily Current Affairs Quiz"
        schema={mcqSchema}
      />
      <Header />
      <main style={{ flex: 1, width: '100%' }}>
        <TopicWiseCategories />
      </main>
      <FooterSec />
    </div>
  );
}

