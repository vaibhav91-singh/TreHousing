import React from 'react';
import './PopularTest.css';

// Import logos
import rrbLogo from '../../assets/TestSeries/rrb.png';
import rpfLogo from '../../assets/TestSeries/rpf.png';
import sscLogo from '../../assets/TestSeries/ssc.png';
import sbiLogo from '../../assets/TestSeries/sbi.png';

export default function PopularTest() {
  const seriesData = [
    { title: "RRB Group D Mock Test Series 2024-25", users: "900.5K", num_test: 934, price: "7", lang: "7", content: ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'], logo: rrbLogo },
    { title: "RPF Constable Mock Test Series 2024", users: "1587.9K", num_test: 835, price: "9", lang: "7", content: ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'], logo: rpfLogo },
    { title: "RRB NTPC (CBT 1 + CBT 2) 2024 Mock Test Series", users: "1527.2K", num_test: 1284, price: "11", lang: "6", content: ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'], logo: rrbLogo },
    { title: "SSC GD Constable 2025 Mock Test Series", users: "923.2K", num_test: 1256, price: "5", lang: "5", content: ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'], logo: sscLogo },
    { title: "SBI Clerk Mock Test Series 2025 (Pre + Mains)", users: "413.1K", num_test: 296, price: "6", lang: "7", content: ['3 Free Tests', '159 Latest TCS Exam 2024', '26 General Science Special', '+746 more test'], logo: sbiLogo },
  ];

  return (
    <div className="main-container">
      <p className="head-title">Popular Test Series</p>
      <div className="cards-portion">
        {seriesData.map((item, index) => (
          <div className="cardDesign" key={index}>
            <img src={item.logo} alt="Logo" />
            <p className="views">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCB00" viewBox="0 0 24 24" width="16" height="16">
                <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
              <span id="user">{item.users}</span>
            </p>
            <p id="heading">{item.title}</p>
            <p>{item.num_test} Total Tests<span id="free"> | {item.price} Free Tests</span></p>
            <hr />
            <p id="lang">
              <span><i className="bi bi-translate"></i></span>
              English, Hindi + {item.lang} More
            </p>
            <hr />
            <ul>
              {item.content.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <button className="btn-view">View Test Series</button>
          </div>
        ))}
      </div>
    </div>
  );
}