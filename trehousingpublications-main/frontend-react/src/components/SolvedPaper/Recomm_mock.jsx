// src/components/TestSeries/Recomm_mock.jsx
// not working when i clicked at button reslove it-: 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Recomm_mock.css";

export default function Recomm_mock({ onSelectTest }) {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/quiz/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        return res.json();
      })
      .then((data) => {
        setQuizzes(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Quiz Fetch Error:", error);
        setLoading(false);
      });
  }, []);

  const handleTestClick = (quiz) => {
    // console.log("Selected Quiz:", quiz);

    if (onSelectTest) {
      onSelectTest(quiz.title);
    }
  };

  if (loading) {
    return (
      <section className="recomm-mock-section-wrapper">
        <div className="loading-state">
          Loading Recommended Tests...
        </div>
      </section>
    );
  }

  if (!quizzes.length) {
    return (
      <section className="recomm-mock-section-wrapper">
        <div className="loading-state">
          No Tests Available Right Now
        </div>
      </section>
    );
  }

  const recommendedCourses = quizzes.slice(0, 4);
  const mockTests = quizzes.slice(4);

  return (


    <section className="recomm-mock-section-wrapper">
<h2>Error in this section Recomm_mock.jsx</h2>
      {/* Recommended Courses */}
      <div className="section-block">

        <h2 className="recomm-mock-heading course-heading">
          Recommended Courses For You
        </h2>

        <div className="recomm-mock-cards-container">

          {recommendedCourses.map((quiz) => (
            <div
              key={quiz.id}
              className="recomm-mock-card course-card-variant"
            >
              <h3 className="recomm-mock-title">
                {quiz.title}
              </h3>

              <p className="recomm-card-info">
                {quiz.questions?.length || 0} Questions
              </p>
{/* see here button navigate se resolve hoga */}
              <button
                className="recomm-mock-btn yellow-3d-btn"
                onClick={() => onSelectTest && onSelectTest(quiz.title)}
              >
                View Details
              </button>
            </div>
          ))}

        </div>
      </div>

      {/* Mock Tests */}
      <div className="section-block">

        <h2 className="recomm-mock-heading mock-heading">
          Free Mock Tests
        </h2>

        <div className="recomm-mock-cards-container">

          {mockTests.map((quiz) => (
            <div
              key={quiz.id}
              className="recomm-mock-card mock-card-variant"
            >
              <h3 className="recomm-mock-title">
                {quiz.title}
              </h3>

              <p className="recomm-card-info">
                {quiz.questions?.length || 0} Questions
              </p>

              <button
                className="recomm-mock-btn blue-3d-btn"
                onClick={() => handleTestClick(quiz)}
              >
                Start Attempting Free
              </button>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}