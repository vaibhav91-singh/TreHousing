
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
      {/* Hero Header */}
      <div className="performance-hero-header">
        <div className="hero-text-content">
          <span className="performance-hero-badge">
            <i className="bi bi-graph-up-arrow"></i> ANALYTICS DASHBOARD
          </span>
          <h1 className="performance-hero-title">Your Performance Dashboard</h1>
          <p className="performance-hero-subtitle">
            Track your mock test accuracy, subject strengths, and progress analytics in real time
          </p>
        </div>

        {/* Data Backup Controls */}
        <div className="performance-actions">
          <button onClick={handleExportData} className="btn-export-pill" title="Backup your performance history to JSON file">
            <i className="bi bi-download"></i> Export Backup
          </button>
          <label className="btn-import-pill" title="Restore performance history from JSON backup">
            <i className="bi bi-upload"></i> Import Backup
            <input type="file" accept=".json" onChange={handleImportData} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Top KPI Metric Cards */}
      <div className="stats-cards-grid">
        <div className="kpi-card card-tests">
          <div className="kpi-icon-avatar avatar-tests">
            <i className="bi bi-journal-check"></i>
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Tests Taken</span>
            <h2 className="kpi-value">{totalTests}</h2>
            <span className="kpi-subtext">Completed attempts</span>
          </div>
        </div>

        <div className="kpi-card card-avg">
          <div className="kpi-icon-avatar avatar-avg">
            <i className="bi bi-percent"></i>
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Average Score</span>
            <h2 className="kpi-value">{avgPercentage}%</h2>
            <span className="kpi-subtext">Across all tests</span>
          </div>
        </div>

        <div className="kpi-card card-accuracy">
          <div className="kpi-icon-avatar avatar-accuracy">
            <i className="bi bi-bullseye"></i>
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Overall Accuracy</span>
            <h2 className="kpi-value">{accuracy}%</h2>
            <span className="kpi-subtext">Precision rate</span>
          </div>
        </div>

        <div className="kpi-card card-best">
          <div className="kpi-icon-avatar avatar-best">
            <i className="bi bi-trophy-fill"></i>
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Best Score</span>
            <h2 className="kpi-value">{bestScore}%</h2>
            <span className="kpi-subtext">Peak performance</span>
          </div>
        </div>
      </div>

      {/* Analytics Grid Section */}
      <div className="analytics-grid-wrapper">
        {/* Performance Index & Grade */}
        <div className="analytics-card grade-analytics-card">
          <div className="card-header-row">
            <h3><i className="bi bi-award"></i> Performance Index</h3>
          </div>
          <div className="performance-grid">
            <div className="grade-box">
              <span className="grade-label">Overall Grade</span>
              <div className={`grade-badge grade-${grade.replace('+', '-plus').toLowerCase()}`}>
                {grade}
              </div>
            </div>

            <div className="improvement-box">
              <span className="grade-label">Overall Improvement</span>
              <div className={`improvement-badge ${Number(improvement) >= 0 ? "positive" : "negative"}`}>
                <i className={`bi ${Number(improvement) >= 0 ? "bi-arrow-up-right-circle-fill" : "bi-arrow-down-right-circle-fill"}`}></i>
                {improvement >= 0 ? `+${improvement}%` : `${improvement}%`}
              </div>
            </div>
          </div>
        </div>

        {/* Accuracy Progress Meter */}
        <div className="analytics-card accuracy-analytics-card">
          <div className="card-header-row">
            <h3><i className="bi bi-speedometer2"></i> Accuracy Rate</h3>
            <span className="accuracy-val-chip">{accuracy}%</span>
          </div>
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subject Wise Performance Breakdown */}
      <div className="analytics-card subject-analytics-card">
        <div className="card-header-row">
          <h3><i className="bi bi-layers"></i> Subject Wise Analysis</h3>
        </div>
        <div className="subject-stats-grid">
          {subjectStats.map((sub, i) => (
            <div key={i} className="subject-metric-card">
              <div className="sub-card-header">
                <span className="sub-title">{sub.title}</span>
                <span className={`sub-acc-tag ${Number(sub.accuracy) >= 70 ? 'tag-high' : 'tag-low'}`}>
                  {sub.accuracy}%
                </span>
              </div>
              <div className="sub-card-footer">
                <span><i className="bi bi-journals"></i> {sub.count} Tests</span>
                <div className="sub-mini-progress">
                  <div className="sub-mini-fill" style={{ width: `${sub.accuracy}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Bar Chart */}
      <div className="analytics-card trend-analytics-card">
        <div className="card-header-row">
          <h3><i className="bi bi-bar-chart-steps"></i> Recent Performance Trend</h3>
        </div>
        <div className="trend-bars-container">
          {history.slice(0, 10).reverse().map((item, index) => {
            const percent = item.total > 0 ? ((item.score / item.total) * 100).toFixed(1) : 0;
            return (
              <div key={index} className="trend-item-column" title={`${item.title}: ${percent}%`}>
                <span className="trend-val">{percent}%</span>
                <div className="trend-bar-wrapper">
                  <div
                    className="trend-bar-fill"
                    style={{ height: `${Math.max(12, percent)}%` }}
                  />
                </div>
                <span className="trend-label">T{index + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Performance Insight */}
      <div className="analytics-card insight-analytics-card">
        <div className="insight-title">
          <i className="bi bi-lightbulb-fill"></i> Performance Insight & Advice
        </div>
        <p className="insight-body">
          {Number(improvement) > 10
            ? "🌟 Excellent progress! Your recent performance shows strong positive growth. Keep taking tests regularly to maintain momentum."
            : Number(improvement) >= 0
            ? "📈 Steady performance. You are maintaining consistency. Focus on weak subjects to boost accuracy above 80%."
            : "⚠️ Your recent score is slightly lower than your initial attempt. Re-evaluate mistakes in detailed solutions and revise core concepts."}
        </p>
      </div>

      {/* History Table */}
      <div className="analytics-card table-analytics-card">
        <div className="card-header-row">
          <h3><i className="bi bi-clock-history"></i> Test Attempt History</h3>
        </div>
        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>#</th>
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
                    <td>#{index + 1}</td>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.score} / {item.total}</td>
                    <td>
                      <span className={`pct-badge ${Number(pct) >= 70 ? 'pct-high' : 'pct-low'}`}>
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
      </div>

      <div className="performance-footer-actions">
        <button className="btn-clear-history" onClick={clearHistory}>
          <i className="bi bi-trash3-fill"></i> Clear History
        </button>
      </div>
    </div>
  );
};

export default Performance;

