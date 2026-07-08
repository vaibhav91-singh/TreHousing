
import React from 'react';
import JobPage from '../components/JobVacancy/MainPage';
import Header from '../components/Homepage/HeaderSec';
import FooterSec from '../components/Homepage/FooterSec';

const JobVacancy = () => {
  return (
    <div>
        <Header/>
      <JobPage />
      <FooterSec/>
    </div>
  );
};

export default JobVacancy;