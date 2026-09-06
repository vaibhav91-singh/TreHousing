
// src/components/Dashbord/Performance.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    if (window.confirm("Are you sure you want to clear your test history?")) {
      localStorage.removeItem("quizHistory");
      setHistory([]);
    }
  };

  // Export progress as JSON file
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `tre_performance_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import progress from uploaded JSON file
  const handleImportData = (event) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (Array.isArray(parsed)) {
            localStorage.setItem("quizHistory", JSON.stringify(parsed));
            setHistory(parsed);
            alert("Performance history imported successfully!");
          } else {
            alert("Invalid backup file format.");
          }
        } catch (error) {
          alert("Error parsing backup JSON file.");
        }
      };
    }
  };

  if (history.length === 0) {
    return (
      <div className="performance-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>No Test Data Found</h2>
        <p style={{ maxWidth: '500px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
          You haven't completed any mock tests yet. Take a test from our Test Series section to unlock detailed performance analytics, accuracy trends, and subject insights!
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/testseries" className="btn-primary" style={{ padding: '12px 28px', fontSize: '1rem' }}>
            Explore Test Series →
          </Link>
          <label className="btn-secondary" style={{ padding: '12px 20px', background: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}>
            📥 Import Backup
            <input type="file" accept=".json" onChange={handleImportData} style={{ display: 'none' }} />
          </label>
        </div>
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

  // Percentage scores per attempt
  const attemptPercentages = history.map(item => item.total > 0 ? (item.score / item.total) * 100 : 0);

  const avgPercentage = (attemptPercentages.reduce((a, b) => a + b, 0) / totalTests).toFixed(1);

  const accuracy = totalPossible > 0 ? ((totalScore / totalPossible) * 100).toFixed(1) : 0;

  const bestScore = Math.max(...attemptPercentages).toFixed(1);

  const firstPercent = attemptPercentages[attemptPercentages.length - 1] || 0; // oldest attempt
  const latestPercent = attemptPercentages[0] || 0; // newest attempt

  const improvement = (latestPercent - firstPercent).toFixed(1);

  let grade = "D";
  if (accuracy >= 90) grade = "A+";
  else if (accuracy >= 80) grade = "A";
  else if (accuracy >= 70) grade = "B";
  else if (accuracy >= 60) grade = "C";

  // Compute Subject Breakdown
  const subjectMap = {};
  history.forEach(item => {
    const title = item.title || "General Quiz";
    if (!subjectMap[title]) {
      subjectMap[title] = { count: 0, score: 0, total: 0 };
    }
    subjectMap[title].count += 1;
    subjectMap[title].score += item.score;
    subjectMap[title].total += item.total;
  });

  const subjectStats = Object.keys(subjectMap).map(title => {
    const sub = subjectMap[title];
    const acc = sub.total > 0 ? ((sub.score / sub.total) * 100).toFixed(1) : 0;
    return { title, count: sub.count, accuracy: acc };
  });

  return (
    <div className="performance-container">

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <h2 style={{ margin: 0 }}>Your Performance Dashboard</h2>

        {/* Data Backup Controls */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleExportData} className="btn-export" title="Backup your performance history to JSON file">
            📤 Backup (JSON)
          </button>
          <label className="btn-import" title="Restore performance history from JSON backup">
            📥 Import
            <input type="file" accept=".json" onChange={handleImportData} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="stats-cards">
        <div className="card">
          <h4>Tests Taken</h4>
          <h2>{totalTests}</h2>
        </div>

        <div className="card">
          <h4>Average Score</h4>
          <h2>{avgPercentage}%</h2>
        </div>

        <div className="card">
          <h4>Overall Accuracy</h4>
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
            <span>Overall Grade</span>
            <strong>{grade}</strong>
          </div>

          <div className="metric-box">
            <span>Overall Improvement</span>
            <strong
              className={
                Number(improvement) >= 0
                  ? "positive"
                  : "negative"
              }
            >
              {improvement >= 0 ? `+${improvement}%` : `${improvement}%`}
            </strong>
          </div>
        </div>
      </div>

      {/* Accuracy Meter */}
      <div className="analytics-card">
        <h3>Accuracy Rate</h3>
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

      {/* Subject Wise Performance Breakdown */}
      <div className="analytics-card">
        <h3>Subject Wise Analysis</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
          {subjectStats.map((sub, i) => (
            <div key={i} className="metric-box" style={{ textAlign: 'left', padding: '16px' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1rem' }}>{sub.title}</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.9rem' }}>
                <span>Tests: <strong>{sub.count}</strong></span>
                <span>Accuracy: <strong style={{ color: Number(sub.accuracy) >= 70 ? '#16a34a' : '#d97706' }}>{sub.accuracy}%</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend */}
      <div className="analytics-card">
        <h3>Recent Performance Trend</h3>
        <div className="trend-bars">
          {history.slice(0, 10).reverse().map((item, index) => {
            const percent = item.total > 0 ? ((item.score / item.total) * 100).toFixed(1) : 0;
            return (
              <div key={index} className="trend-item" title={`${item.title}: ${percent}%`}>
                <div
                  className="trend-bar"
                  style={{
                    height: `${Math.max(10, percent)}%`,
                  }}
                />
                <span>T{index + 1}</span>
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
            ? "🌟 Excellent progress! Your recent performance shows strong positive growth. Keep taking tests regularly to maintain momentum."
            : Number(improvement) >= 0
            ? "📈 Steady performance. You are maintaining consistency. Focus on weak subjects to boost accuracy above 80%."
            : "⚠️ Your recent score is slightly lower than your initial attempt. Re-evaluate mistakes in detailed solutions and revise core concepts."}
        </p>
      </div>

      {/* History Table */}
      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Test Title</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => {
              const pct = item.total > 0 ? ((item.score / item.total) * 100).toFixed(1) : 0;
              return (
                <tr key={index}>
                  <td><strong>{item.title}</strong></td>
                  <td>{item.score} / {item.total}</td>
                  <td>
                    <span style={{ color: Number(pct) >= 70 ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
                      {pct}%
                    </span>
                  </td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
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

