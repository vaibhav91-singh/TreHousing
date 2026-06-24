import React from 'react';
import './Recomm_mock.css';

export default function Recomm_mock() {
  const Recomm_cards = [
    { title: "BPSC TRE (11-12) Computer SC", link: "#" },
    { title: "BPSC TRE (9-10) Computer SC", link: "#" },
    { title: "BPSC TRE (6-10) Computer SC", link: "#" },
    { title: "BPSC STET PGT Computer SC ", link: "#" },
  ];
  const Mock_cards = [
    { title: "IBPS RRB Scale 2 & 3 Online Course 2025", link: "#" },
    { title: "IBPS RRB Scale 2 & 3 Online Course 2025", link: "#" },
  ];

  return (
    <div className="recomm-mock-section-wrapper">
      
      {/* 1. Recommended Courses Section */}
      <p className="recomm-mock-heading">Recommended Courses For You</p>
      <div className="recomm-mock-cards-container">
        {Recomm_cards.map((card, index) => (
          <div key={index} className="recomm-mock-card course-card-variant">
            <h2 className="recomm-mock-title">{card.title}</h2>
            <a href={card.link} target="_blank" rel="noopener noreferrer" className="recomm-mock-btn-link">
              <button className="recomm-mock-btn yellow-3d-btn">View Details</button>
            </a>
          </div>
        ))}
      </div>
      
      {/* 2. Free Mock Tests Section */}
      <p className="recomm-mock-heading">Free Mock Tests</p>
      <div className="recomm-mock-cards-container">
        {Mock_cards.map((card, index) => (
          <div key={index} className="recomm-mock-card mock-card-variant">
            <h2 className="recomm-mock-title">{card.title}</h2>
            <a href={card.link} target="_blank" rel="noopener noreferrer" className="recomm-mock-btn-link">
              <button className="recomm-mock-btn blue-3d-btn">Start Attempting Free</button>
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}