import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ResourceLibrarySection() {
  const [pyPapers, setPyPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  // We can keep these static for now until an Answer Key API is added
  const answerKeys = [
    { title: 'TRE 2.0 Final', subtitle: 'Class 9-10 • All Subjects' },
    { title: 'SSC MTS 2023', subtitle: 'Provisional Key • All Shifts' },
    { title: 'BPSC Headmaster', subtitle: 'Education Dept • 2024' },
  ];

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get('/api/v1/solved-papers/');
        if (response.data && response.data.success) {
          setPyPapers(response.data.data.slice(0, 5)); // show up to 5
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching solved papers:", err);
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const [openPyIndex, setOpenPyIndex] = useState(null);
  const [openKeyIndex, setOpenKeyIndex] = useState(null);

  return (
    <section className="hp-section">
      <div className="hp-resources">
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
            Resource<br />Library
          </h2>
          <p style={{ color: 'var(--hp-text-muted)', marginBottom: '2rem' }}>
            Access thousands of verified documents, previous year papers, and official keys curated by experts.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1.25rem', backgroundColor: '#1e293b', borderRadius: '0.75rem', border: '1px solid #374151' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(250, 204, 21, 0.2)', color: 'var(--hp-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
              <i className="bi bi-folder-fill"></i>
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>4.8k+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hp-text-muted)' }}>New PDFs Added</div>
            </div>
          </div>
        </div>

        <div className="hp-resource-lists">
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--hp-text-muted)', marginBottom: '1rem', borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>
              PY PAPERS
            </div>
            {loading ? (
              <div style={{ fontSize: '0.875rem', color: 'var(--hp-text-muted)', padding: '1rem' }}>Loading papers...</div>
            ) : pyPapers.length === 0 ? (
              <div style={{ fontSize: '0.875rem', color: 'var(--hp-text-muted)', padding: '1rem' }}>No papers available.</div>
            ) : pyPapers.map((paper, idx) => (
              <div key={idx} className="hp-accordion-item" onClick={() => setOpenPyIndex(openPyIndex === idx ? null : idx)}>
                <div>
                  <div style={{ fontWeight: 700 }}>{paper.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--hp-text-muted)' }}>{paper.year}</div>
                </div>
                <a href={paper.paper_link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hp-primary)', textDecoration: 'none', padding: '0.5rem' }} onClick={(e) => e.stopPropagation()}>
                  <i className="bi bi-download"></i>
                </a>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--hp-text-muted)', marginBottom: '1rem', borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>
              ANSWER KEYS
            </div>
            {answerKeys.map((keyItem, idx) => (
              <div key={idx} className="hp-accordion-item" onClick={() => setOpenKeyIndex(openKeyIndex === idx ? null : idx)}>
                <div>
                  <div style={{ fontWeight: 700 }}>{keyItem.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--hp-text-muted)' }}>{keyItem.subtitle}</div>
                </div>
                <div style={{ color: 'var(--hp-text-muted)' }}>
                  <i className={`bi ${openKeyIndex === idx ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
