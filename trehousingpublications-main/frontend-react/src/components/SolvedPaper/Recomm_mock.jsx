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
    <>
      <p className="heading">Recommended Courses for you</p>
      <div className="cards-container">
        {Recomm_cards.map((card, index) => (
          <div key={index} className="card">
            <h2>{card.title}</h2>
            <a href={card.link} target="_blank" rel="noopener noreferrer">
              <button>View Details</button>
            </a>
          </div>
        ))}
      </div>
      <p className="heading">Free Mock Tests</p>
      <div className="cards-container">
        {Mock_cards.map((card, index) => (
          <div key={index} className="card">
            <h2>{card.title}</h2>
            <a href={card.link} target="_blank" rel="noopener noreferrer">
              <button>Start Attempting Free</button>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}