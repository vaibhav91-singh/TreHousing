
import React from 'react';
import JobPage from '../components/JobVacancy/MainPage';
import Header from '../components/Homepage/HeaderSec';
import FooterSec from '../components/Homepage/FooterSec';

import SEO from '../components/SEO';

const JobVacancy = () => {
  return (
    <div>
      <SEO 
        title="Latest Teacher Recruitment & Job Vacancies 2026" 
        description="Latest Bihar Teacher, BPSC TRE, NVS, KVS, and State Govt teaching job recruitment notifications, online application links, eligibility, and deadline details."
      />
      <Header/>
      <JobPage />
      <FooterSec/>
    </div>
  );
};

export default JobVacancy;