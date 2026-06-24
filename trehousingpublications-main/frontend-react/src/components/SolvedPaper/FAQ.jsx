import React, { useState } from 'react';
import './FAQ.css';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  // Data ko tumhare platform ke according dynamic aur real kar diya hai
  const faqs = [
    { 
      question: "How can I access the BPSC Previous Year Solved Papers?", 
      answer: "Once you purchase the pass, all previous year solved papers and premium mock tests will be instantly unlocked in your dashboard profile section." 
    },
    { 
      question: "Are the test series available in both English and Hindi?", 
      answer: "Yes, all our mock tests and previous year papers are fully bilingual. You can switch between Hindi and English languages seamlessly anytime during the test." 
    },
    { 
      question: "What is the validity of the Rs.199 All Exam Mock Test Pass?", 
      answer: "The All Exam Pass comes with a full 1-year (365 days) unlimited access validity from the date of your successful payment." 
    },
    { 
      question: "Can I re-attempt the mock tests multiple times?", 
      answer: "Absolutely! You can download the question paper PDFs and re-attempt the mock tests multiple times to analyze your performance and improve your speed." 
    },
    { 
      question: "Is there an offline download option available for these papers?", 
      answer: "Yes, after purchase, you can download the solved papers and detailed analysis sets directly to your device as high-quality print-friendly PDFs." 
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-main">
      <div className="faq">
        <div className="faq-title">
          <h1>Frequently Asked <span>Questions</span></h1>
          <div className="title-underline"></div>
        </div>
        
        <div className="accordion">
          {faqs.map((item, index) => (
            <div 
              key={index} 
              className={`accordion-item ${activeIndex === index ? 'expanded-item' : ''}`}
            >
              <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                <h2>{item.question}</h2>
                <div className="arrow-icon-wrapper">
                  <i className={`bi bi-chevron-down arrow-chevron ${activeIndex === index ? 'rotate-chevron' : ''}`}></i>
                </div>
              </div>
              
              <div className={`accordion-content ${activeIndex === index ? 'active' : ''}`}>
                <div className="content-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}