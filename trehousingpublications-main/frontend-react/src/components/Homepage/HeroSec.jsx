import React, { useState, useEffect } from 'react';
import './HeroSec.css';
import hero1 from '../../assets/Trehousingpublications_UI/hero.png';
import hero2 from '../../assets/Trehousingpublications_UI/hero2.png';
import hero3 from '../../assets/Trehousingpublications_UI/hero3.jpg';
import hero4 from '../../assets/Trehousingpublications_UI/hero4.png';

export default function HeroSec() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Get ready for 100+ government exams, covering both central and state opportunities.",
      description: "Access comprehensive resources designed for a wide range of exams including SSC, UPSC, Bihar Govt, and more. Stay updated with the latest syllabus.",
      image: hero1,
    },
    {
      title: "Ace your exams with expert guidance from top teachers.",
      description: "Learn from experienced educators through detailed courses, video tutorials, and step-by-step solutions. Our expert guidance ensures you understand key concepts.",
      image: hero2,
    },
    {
      title: "Comprehensive study materials for your success.",
      description: "Explore well-researched books, updated syllabi, and previous year question papers to strengthen your preparation.",
      image: hero3,
    },
    {
      title: "Join the best preparation platform for a brighter future.",
      description: "Be part of a thriving community focused on success through mock tests, live quizzes, and continuous support.",
      image: hero4,
    },
  ];

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const highlightTitle = (title) => {
    if (title.includes("Ace your exams")) {
      const parts = title.split("Ace your exams");
      return (
        <>
          {parts[0]}<span className="text-blue">Ace your exams</span>{parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <div className="hero-section">

      <div className="carousel">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide"
            style={{ display: currentSlide === index ? 'flex' : 'none' }}
          >
            <div className="content">
              <p className="subtitle">Examinations: The Key to Unlocking Your Future</p>
              <h1 className="title">{highlightTitle(slide.title)}</h1>
              <p className="description">{slide.description}</p>
              <button className="cta">Start Preparation</button>
            </div>

            <div className="image-container">
              <div className="orbital-background">
                <div className="main-image-wrapper">
                  <img src={slide.image} className="main-image" alt="Student studying" />
                </div>
                
                <div className="floating-icon icon-cap"><i className="bi bi-mortarboard-fill"></i></div>
                <div className="floating-icon icon-book"><i className="bi bi-book-half"></i></div>
                <div className="floating-icon icon-bulb"><i className="bi bi-lightbulb-fill"></i></div>
                <div className="orbital-ring"></div>
              </div>
            </div>
          </div>
        ))}

        <button className="nav left" onClick={prevSlide}>&#10094;</button>
        <button className="nav right" onClick={nextSlide}>&#10095;</button>

        <div className="dots-container">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`dot ${currentSlide === i ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
            ></span>
          ))}
        </div>
      </div>
       
    </div>
  );
}