import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecommendationsSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/v1/');
        if (response.data && Array.isArray(response.data)) {
          setCourses(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Use the first course as the main recommendation, and the next two as side recommendations
  const mainCourse = courses.length > 0 ? courses[0] : null;
  const sideCourses = courses.length > 1 ? courses.slice(1, 3) : [];

  return (
    <section className="hp-section">
      <div className="hp-section-title">Smart Recommendations</div>
      
      {loading ? (
        <div style={{ color: 'var(--hp-text-muted)', textAlign: 'center', padding: '2rem' }}>Loading recommendations...</div>
      ) : courses.length === 0 ? (
        <div style={{ color: 'var(--hp-text-muted)', textAlign: 'center', padding: '2rem' }}>No recommendations available right now.</div>
      ) : (
        <div className="hp-recs">
          {mainCourse && (
            <div className="hp-rec-main">
              <div style={{ position: 'absolute', right: '2rem', top: '2rem', color: 'rgba(255,255,255,0.05)', fontSize: '8rem', lineHeight: 1 }}>
                <i className="bi bi-mortarboard-fill"></i>
              </div>
              <span className="hp-pill" style={{ position: 'relative', zIndex: 1 }}>Curated For you</span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                {mainCourse.title}
              </h3>
              <p style={{ color: 'var(--hp-text-muted)', marginBottom: '2rem', maxWidth: '80%', position: 'relative', zIndex: 1 }}>
                {/* Courses don't always have a short desc, so we can use static text or dynamic if available */}
                A scientific approach to your upcoming exams. Access structured materials and syllabus.
              </p>
              <a href={`/courses?course_id=${mainCourse.id}`} style={{ color: 'var(--hp-primary)', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
                Access Course <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          )}
          
          <div className="hp-rec-side">
            {sideCourses.map((course, idx) => (
              <div key={course.id} className="hp-rec-side-card">
                <div style={{ color: idx % 2 === 0 ? '#60a5fa' : 'var(--hp-primary)', fontSize: '1.5rem' }}>
                  <i className={idx % 2 === 0 ? "bi bi-bank" : "bi bi-journal-text"}></i>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--hp-text-muted)' }}>{idx % 2 === 0 ? 'Trending' : 'Popular'}</span>
                  </div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{course.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--hp-text-muted)', margin: 0 }}>
                    {course.subjects ? `${course.subjects.length} Subjects included` : 'Explore complete syllabus'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
