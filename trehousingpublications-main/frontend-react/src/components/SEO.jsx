import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_SEO = {
  title: 'TRE Housing Publications - BPSC TRE Exam Notes, PYQs & Test Series',
  description: 'Free study materials, BPSC TRE previous year papers, syllabus PDFs, job vacancy updates, and interactive mock test series for teaching recruitment exams.',
  keywords: 'BPSC TRE, Teacher Recruitment Exam, Bihar Teacher Vacancy, PYQ, Solved Papers, Mock Test Series, Answer Keys, Study Material',
  image: '/logo.png',
  type: 'website'
};

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}) {
  const metaTitle = title 
    ? (title.includes('TRE Housing') ? title : `${title} | TRE Housing Publications`) 
    : DEFAULT_SEO.title;
    
  const metaDesc = description || DEFAULT_SEO.description;
  const metaKeywords = keywords || DEFAULT_SEO.keywords;
  const metaImage = image || DEFAULT_SEO.image;
  const metaUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content="TRE Housing Publications" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}
