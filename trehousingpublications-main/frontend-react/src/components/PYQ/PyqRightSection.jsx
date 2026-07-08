
import React, { useState, useEffect } from 'react';

import './PyqRightSection.css';

export default function MyComponent() {
  return (
    <>
      <div className="container">


        <div className="content">
          <h2>BPSC TRE 4.0 Previous Year Question Papers PDf Download</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et tenetur fuga repudiandae, non distinctio ea quos aliquam iusto is officia minima nesciunt blanditiis porro qui corporis assumenda voluptatem! Sint tatum amet totam modi! </p>
        </div>


        <div className="sidebar">


          <h3 className="latest-news-title">CSIR NET 2025</h3>
          <ul className="news-list">
            {notification1.map((news) => (
              <li key={news.id} className="dropdown">
                <div
                  className="dropdown-btn"
                  onClick={(e) => toggleDropdown(news.id)(e)}
                >
                  {/* Added a class or style for the rotation logic */}
                  <span className={openDropdown === news.id ? 'rotate' : ''}></span>
                  {news.title}
                </div>

                {/* Conditional rendering based on state */}
                {openDropdown === news.id && (
                  <ul className="dropdown-content">
                    {news.links.map((link) => (
                      <li key={link.id}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Second NOTIFICATION */}
          <h3 className="latest-news-title">CTET 2024 EXAM</h3>
          <ul className="news-list">
            {notification2.map((news) => (
              <li key={news.id} className="dropdown">
                <div
                  className="dropdown-btn"
                  onClick={(e) => toggleDropdown(news.id)(e)}
                >
                  <span className={openDropdown === news.id ? 'rotate' : ''}>&gt;</span>
                  {news.title}
                </div>
                {openDropdown === news.id && (
                  <ul className="dropdown-content">
                    {news.links.map((link) => (
                      <li key={link.id}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>



          <div className="mock-test">
            <div className="test-card blue-card">
              <a href="" target="_blank">
                <img src="@/assets/values.png" alt="BPSC Test 1" />
              </a>
              <p>Mock test series class 11 to12</p>
              <span className="price">Rs. 167.50</span>
            </div>
            <div className="test-card orange-card">
              <a href="" target="_blank">
                <img src="@/assets/values.png" alt="BPSC Test 2" />
              </a>
              <p>Mock test series class 11 to12</p>
              <span className="price">Rs. 167.50</span>
            </div>


          </div>


          {/* Referral Section with Link */}
          <div className="referral">
            <a href="" target="_blank">
              <img src="@/assets/values.png" alt="Refer and Earn" />
            </a>
          </div>

          {/* BPSC Syllabus Section with Link */}
          <div className="syllabus">
            <a href="" target="_blank">
              <img src="@/assets/values.png" alt="BPSC Syllabus 2024" />
            </a>
          </div>



          {/* Recent Posts */}
          <div className="recent-posts">
            <h2>Recent Post</h2>
            <ul>
              <li>
                BPSC TRE 3.0 Scorecard 2025,  <a href="#" target="_blank">Download Link Here</a>
              </li>
              <li>CU Himachal Pradesh Recruitment 2025, Notification Out<a href="#" target="_blank">Apply Link</a>, Salary</li>

              <li>REET Syllabus And Exam Pattern 2025,for Levels 1 and 2  <a href="#" target="_blank">Download Official PDF</a></li>

              <li>REET Previous Year Question Papers,  <a href="#" target="_blank">Download With Solutions</a></li>

              <li>DRDO JRF Recruitment 2025, <a href="#" target="_blank">Check Interview Schedule Here</a></li>

              <li>TS TET Answer Key 2025 Releasing Soon,Paper 1 and 2 Response Sheet</li>

              <li>अलंकार-परिभाषा ,भेद, उदाहरण & प्रकार  Alankar ki Paribhasha</li>

              <li>Railway Teacher Recruitment 2025, <a href="#" target="_blank">Apply Online Link For 753 Posts</a></li>

              <li> स्वर व व्यंजन -परिभाषा ,भेद, और उदाहरण & प्रकार <a href="#" target="_blank">Swar Vyanjan In Hindi PDF</a></li>

              <li> संधि -परिभाषा ,भेद, और उदाहरण & प्रकार <a href="#" target="_blank">Sandhi kise Karte hai</a></li>

            </ul>
          </div>


        </div>


      </div>
    </>
  );
}
