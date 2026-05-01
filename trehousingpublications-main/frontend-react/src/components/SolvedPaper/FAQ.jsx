import React, { useState } from 'react';
import './FAQ.css';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    { question: "Why you should book airtickets from WebsiteName website?", answer: "WebsiteName offers best deals and customer support." },
    { question: "What is the best possible way to buy air tickets at a reasonable cost?", answer: "Book in advance, compare prices, and use discount codes." },
    { question: "Do you offer last-minute airtickets?", answer: "Yes, last-minute deals are available based on seat availability." },
    { question: "How to search for the best deal or find the latest offer on WebsiteName?", answer: "Use the search feature and subscribe to our newsletter for updates." },
    { question: "Can I book round-trip or one-way air tickets?", answer: "Yes, you can book Lorem ipsum dolor sit amet" },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-main">
      <div className="faq">
        <div className="faq-title">
          <h1>FAQ's</h1>
        </div>
        <div className="accordion">
          {faqs.map((item, index) => (
            <div key={index} className="accordion-item">
              <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                <h2>{item.question}</h2>
                <div className="arrow-icon">
                  <span className={`arrow ${activeIndex === index ? 'up' : 'down'}`}></span>
                </div>
              </div>
              <div className={`accordion-content ${activeIndex === index ? 'active' : ''}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}