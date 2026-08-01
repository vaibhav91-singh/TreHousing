import React from 'react';

export default function QuickLinksSection() {
  const links = [
    { title: 'Previous Papers', subtitle: 'Download PDF', icon: 'bi-file-earmark-text', href: '/solved-papers' },
    { title: 'Answer Keys', subtitle: 'Official updates', icon: 'bi-check2-square', href: '/answer-keys' },
    { title: 'Job Alerts', subtitle: 'Real-time sync', icon: 'bi-bell', href: '/jobs' },
    { title: 'MCQ Quizzes', subtitle: 'Topic-wise', icon: 'bi-journal-check', href: '/quiz' },
  ];

  return (
    <section className="hp-section" style={{ paddingTop: '0' }}>
      <div className="hp-quick-links">
        {links.map((link, idx) => (
          <a key={idx} href={link.href} className="hp-card hp-link-card">
            <i className={`bi ${link.icon} hp-link-icon`}></i>
            <div>
              <div style={{ fontWeight: '700', color: 'var(--hp-text)' }}>{link.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hp-text-muted)' }}>{link.subtitle}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
