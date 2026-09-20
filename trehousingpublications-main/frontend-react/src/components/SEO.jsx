import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_BASE_URL = 'https://trehousingpublications.com';

const DEFAULT_SEO = {
  title: "India's #1 Govt Exam Prep & Sarkari Jobs Portal | TRE Housing Publications",
  description: "Prepare for UPSC, BPSC, SSC CGL/CHSL, Railways RRB NTPC, Banking IBPS/SBI, State PSC, CTET, Police & Defence exams. Practice 1000+ free online mock tests, download PYQ PDFs & get instant Sarkari job alerts.",
  keywords: "Sarkari Job, Sarkari Result, Free Mock Test 2026, Previous Year Question Papers, PYQ PDF, Exam Syllabus 2026, BPSC TRE 4.0, BPSC Teacher, UPSC IAS Preparation, SSC CGL, SSC CHSL, SSC MTS, RRB NTPC, RRB Group D, Railway Jobs, IBPS PO, SBI Clerk, CTET Exam, Bihar Police, UP Police, Answer Key, Cut Off Marks, Free Online Test Series",
  image: `${SITE_BASE_URL}/trelogo.png`,
  type: 'website'
};

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  canonical,
  type = 'website',
  schema
}) {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const currentFullUrl = url || `${SITE_BASE_URL}${currentPath}`;
  const canonicalUrl = canonical || currentFullUrl;

  const metaTitle = title 
    ? (title.includes('TRE Housing') ? title : `${title} | TRE Housing Publications`) 
    : DEFAULT_SEO.title;
    
  const metaDesc = description || DEFAULT_SEO.description;
  const metaKeywords = keywords ? `${keywords}, ${DEFAULT_SEO.keywords}` : DEFAULT_SEO.keywords;
  const metaImage = image ? (image.startsWith('http') ? image : `${SITE_BASE_URL}${image}`) : DEFAULT_SEO.image;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="TRE Housing Publications" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="hi_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />

      {/* Dynamic JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

