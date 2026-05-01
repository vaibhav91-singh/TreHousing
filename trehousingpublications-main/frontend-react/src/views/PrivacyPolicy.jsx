import React from 'react';
import HeaderSec from "../components/Homepage/HeaderSec.jsx";
import FooterSec from "../components/Homepage/FooterSec.jsx";
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  const policySections = [
    {
      title: "INTRODUCTION",
      content: `
        <p class="privacy-text">This Privacy Notice for TRE HOUSING PUBLICATION PVT LTD (doing business as TRE PUBLICATION) ('we', 'us', or 'our'), describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you:	</p>
        <ul class="privacy-list">
          <li>Visit our website at trehousingpublication.com, or any website of ours that links to this Privacy Notice</li>
          <li>Use Our Mission is Provides Notification, Syllabus, Previous Year Question Paper and Solved Paper to Aspirant whose preparation government school teacher for class 1-12 in India.</li>
          <li>Engage with us in other related ways, including any sales, marketing, or events</li>
        </ul>
        <p class="privacy-text">Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services.	</p>
      `,
    },
    {
      title: "SUMMARY OF KEY POINTS",
      content: `
        <p class="privacy-text">This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.	<br><br>
        What personal information do we process? When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.<br><br>
        Do we process any sensitive personal information? We do not process sensitive personal information.<br><br>
        Do we collect any information from third parties? We do not collect any information from third parties.	<br><br>
        How do we process your information? We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.<br><br>
        In what situations and with which parties do we share personal information? We may share information in specific situations and with specific third parties.
      </p>
      `,
    },
    {
      title: "How do we keep your information safe?",
      content: `
        <p class="privacy-text">We have adequate organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security.<br><br>
        What are your rights? Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.<br><br>
        How do you exercise your rights? The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
      </p>
      `,
    },
    {
      title: "Table of Contents",
      content: `
        <ol class="privacy-toc-list">
          <li> WHAT INFORMATION DO WE COLLECT?</li>
          <li> HOW DO WE PROCESS YOUR INFORMATION?</li>
          <li> WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</li>
          <li> WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</li>
          <li> DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</li>
          <li> HOW DO WE HANDLE YOUR SOCIAL LOGINS?</li>
          <li> HOW LONG DO WE KEEP YOUR INFORMATION?</li>
          <li> HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
          <li> WHAT ARE YOUR PRIVACY RIGHTS?</li>
          <li> CONTROLS FOR DO-NOT-TRACK FEATURES</li>
          <li> DO WE MAKE UPDATES TO THIS NOTICE?</li>
          <li> HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</li>
          <li> HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</li>
        </ol>
      `,
    },
  ];

  return (
    <>
      <HeaderSec />
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Notice</h1>
        {policySections.map((section, index) => (
          <section key={index} className="privacy-section">
            <h2 className="privacy-section-title">{section.title}</h2>
            <div className="privacy-section-content" dangerouslySetInnerHTML={{ __html: section.content }}></div>
          </section>
        ))}
      </div>
      <FooterSec />
    </>
  );
}