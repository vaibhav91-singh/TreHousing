
import React from 'react';
import JobPage from '../components/JobVacancy/MainPage';
import Header from '../components/Homepage/HeaderSec';
import FooterSec from '../components/Homepage/FooterSec';

import SEO from '../components/SEO';

const JobVacancy = () => {
  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Latest Sarkari Jobs & Government Recruitment Notifications 2026",
    "description": "Real-time updates on latest Government job recruitment notifications, Sarkari Naukri application forms, eligibility criteria, admit card dates, and exam schedules.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "BPSC Teacher Recruitment (TRE 4.0) Vacancy 2026"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "SSC CGL & CHSL Govt Job Notifications"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Railway RRB NTPC & Group D Recruitment 2026"
      }
    ]
  };

  return (
    <div>
      <SEO 
        title="Sarkari Job Notification 2026 | Latest Govt Vacancies, Admit Card & Results" 
        description="Latest Govt Job Notifications 2026, Sarkari Naukri updates, Bihar Teacher Recruitment (BPSC TRE 4.0), KVS, NVS, SSC, Railways, Bank PO, Police, Online Application Links, Eligibility & Admit Card details."
        keywords="Sarkari Job 2026, Sarkari Result, Govt Vacancy Updates, Bihar Teacher Vacancy, BPSC TRE 4.0 Recruitment, SSC CGL Job Notification, Railway RRB Vacancy 2026, Bank Job Recruitment, Online Application Form, Sarkari Naukri Alert, Admit Card Download"
        schema={jobSchema}
      />

      <Header/>
      <JobPage />
      <FooterSec/>
    </div>
  );
};

export default JobVacancy;