
// src/components/TestSeries/Performance.jsx

import React, { useState, useEffect } from "react";
import "./Performance.css";

const Performance = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("quizHistory") || "[]"
    );
    setHistory(data);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("quizHistory");
    setHistory([]);
  };

  if (history.length === 0) {
    return (
      <div className="performance-container">
        <h2>No Test Data Found</h2>
        <p>
          Complete a quiz to unlock your performance
          dashboard and analytics.
        </p>
      </div>
    );
  }

  const totalTests = history.length;

  const totalScore = history.reduce(
    (sum, item) => sum + item.score,
    0
  );

  const totalPossible = history.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const avgScore = (
    totalScore / totalTests
  ).toFixed(1);

  const accuracy = (
    (totalScore / totalPossible) * 100
  ).toFixed(1);

  const bestScore = Math.max(
    ...history.map(
      (item) => (item.score / item.total) * 100
    )
  ).toFixed(1);

  const firstPercent =
    history.length > 0
      ? (history[0].score / history[0].total) * 100
      : 0;

  const latestPercent =
    history.length > 1
      ? (history[history.length - 1].score /
          history[history.length - 1].total) *
        100
      : firstPercent;

  const improvement = (
    latestPercent - firstPercent
  ).toFixed(1);

  let grade = "D";

  if (accuracy >= 90) grade = "A+";
  else if (accuracy >= 80) grade = "A";
  else if (accuracy >= 70) grade = "B";
  else if (accuracy >= 60) grade = "C";

  return (
    <div className="performance-container">

      <h2>Your Performance Dashboard</h2>

      {/* Top Cards */}

      <div className="stats-cards">

        <div className="card">
          <h4>Tests Taken</h4>
          <h2>{totalTests}</h2>
        </div>

        <div className="card">
          <h4>Average Score</h4>
          <h2>{avgScore}</h2>
        </div>

        <div className="card">
          <h4>Accuracy</h4>
          <h2>{accuracy}%</h2>
        </div>

        <div className="card">
          <h4>Best Score</h4>
          <h2>{bestScore}%</h2>
        </div>

      </div>

      {/* Performance Index */}

      <div className="analytics-card">

        <h3>Performance Index</h3>

        <div className="performance-grid">

          <div className="metric-box">
            <span>Grade</span>
            <strong>{grade}</strong>
          </div>

          <div className="metric-box">
            <span>Improvement</span>
            <strong
              className={
                Number(improvement) >= 0
                  ? "positive"
                  : "negative"
              }
            >
              {improvement}%
            </strong>
          </div>

        </div>

      </div>

      {/* Accuracy Meter */}

      <div className="analytics-card">

        <h3>Overall Accuracy</h3>

        <div className="progress-wrapper">

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${accuracy}%`,
              }}
            />
          </div>

          <span>{accuracy}%</span>

        </div>

      </div>

      {/* Trend */}

      <div className="analytics-card">

        <h3>Recent Performance Trend</h3>

        <div className="trend-bars">

          {history.map((item, index) => {
            const percent = (
              (item.score / item.total) *
              100
            ).toFixed(1);

            return (
              <div
                key={index}
                className="trend-item"
              >
                <div
                  className="trend-bar"
                  style={{
                    height: `${percent}%`,
                  }}
                />

                <span>
                  T{index + 1}
                </span>
              </div>
            );
          })}

        </div>

      </div>

      {/* AI Insight */}

      <div className="analytics-card">

        <h3>Performance Insight</h3>

        <p>
          {Number(improvement) > 10
            ? "Excellent progress. Your recent performance shows strong improvement."
            : Number(improvement) > 0
            ? "You are improving steadily. Continue taking tests regularly."
            : "Your recent performance is lower than previous attempts. Review mistakes and focus on weak areas."}
        </p>

      </div>

      {/* History */}

      <div className="table-wrapper">

        <table className="history-table">

          <thead>
            <tr>
              <th>Test Title</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>

                <td>
                  {item.score} / {item.total}
                </td>

                <td>{item.date}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <button
        className="btn-clear"
        onClick={clearHistory}
      >
        Clear History
      </button>

    </div>
  );
};

export default Performance;

