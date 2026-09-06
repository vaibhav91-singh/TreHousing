import React from 'react';

export default function QuickLinksSection() {
  const links = [
    { title: 'Previous Papers', subtitle: 'Download PDF', icon: 'bi-file-earmark-text-fill', href: '/solved-papers' },
    { title: 'Answer Keys', subtitle: 'Official updates', icon: 'bi-check2-square', href: '/answer-keys' },
    { title: 'Job Alerts', subtitle: 'Real-time sync', icon: 'bi-bell-fill', href: '/jobs' },
    { title: 'MCQ Quizzes', subtitle: 'Topic-wise', icon: 'bi-journal-check', href: '/quiz' },
  ];

  return (
    <section className="hp-section" style={{ paddingTop: '0' }}>
      <div className="hp-quick-links">
        {links.map((link, idx) => (
          <a key={idx} href={link.href} className="hp-card hp-link-card">
            <div className="hp-link-icon-box">
              <i className={`bi ${link.icon}`}></i>
            </div>
            <div className="hp-link-info">
              <span className="hp-link-title">{link.title}</span>
              <span className="hp-link-subtitle">{link.subtitle}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
