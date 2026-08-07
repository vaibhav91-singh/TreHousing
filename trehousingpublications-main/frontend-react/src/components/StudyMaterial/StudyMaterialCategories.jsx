import React, { useState, useEffect } from 'react';
import './StudyMaterialCategories.css';
import Loader from '../common/Loader.jsx';

export default function StudyMaterialCategories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/study-materials/`)
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setData(resData.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching study materials:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (items, key = 'name') => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item[key].toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const resetSelection = (level) => {
    if (level === 'exam') {
      setSelectedExam(null);
      setSelectedSubject(null);
      setSearchTerm('');
    } else if (level === 'subject') {
      setSelectedSubject(null);
      setSearchTerm('');
    }
  };

  if (loading) return <Loader fullPage={true} text="Loading Study Materials..." />;

  // Level 1: Exams View
  if (!selectedExam) {
    const filteredExams = handleSearch(data);
    return (
      <div className="study-material-container">
        <div className="sm-header">
          <h1>Explore Study Materials</h1>
          <input 
            type="text" 
            placeholder="Search exams... (e.g., UPSC)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="sm-exam-grid">
          {filteredExams.map(exam => (
            <div 
              key={exam.id} 
              className="sm-exam-card"
              onClick={() => { setSelectedExam(exam); setSearchTerm(''); }}
            >
              <div className="sm-exam-icon">
                <i className="bi bi-journal-bookmark-fill"></i>
              </div>
              <div className="sm-exam-title">{exam.name}</div>
              <div style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px'}}>
                {exam.materials_subjects?.length || 0} Subjects
              </div>
            </div>
          ))}
        </div>
        {filteredExams.length === 0 && <div style={{textAlign: 'center', marginTop: '50px'}}>No exams found.</div>}
      </div>
    );
  }

  // Level 2: Subjects View
  if (!selectedSubject) {
    const filteredSubjects = handleSearch(selectedExam.materials_subjects || []);
    return (
      <div className="study-material-container">
        <div className="sm-breadcrumbs">
          <span onClick={() => resetSelection('exam')}>All Exams</span>
          <i className="bi bi-chevron-right"></i>
          <span className="active">{selectedExam.name}</span>
        </div>
        <div className="sm-header">
          <h1>Select Subject</h1>
          <input 
            type="text" 
            placeholder="Search subjects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sm-layout">
          <div className="sm-main">
            {filteredSubjects.map(sub => (
              <div 
                key={sub.id} 
                className="sm-list-item"
                onClick={() => { setSelectedSubject(sub); setSearchTerm(''); }}
              >
                <span>{sub.name}</span>
                <i className="bi bi-chevron-right"></i>
              </div>
            ))}
            {filteredSubjects.length === 0 && <div>No subjects found.</div>}
          </div>
        </div>
      </div>
    );
  }

  // Level 3: Documents View
  const documents = selectedSubject.documents || [];
  return (
    <div className="study-material-container">
      <div className="sm-breadcrumbs">
        <span onClick={() => resetSelection('exam')}>All Exams</span>
        <i className="bi bi-chevron-right"></i>
        <span onClick={() => resetSelection('subject')}>{selectedExam.name}</span>
        <i className="bi bi-chevron-right"></i>
        <span className="active">{selectedSubject.name}</span>
      </div>
      
      <div className="sm-header">
        <h1>{selectedSubject.name} Materials</h1>
      </div>
      
      <div className="sm-layout">
        <div className="sm-main">
          {documents.map((doc) => (
            <div key={doc.id} className="sm-document-card">
              <div className="sm-doc-info">
                <i className="bi bi-file-earmark-pdf-fill sm-doc-icon"></i>
                <div className="sm-doc-title">{doc.title}</div>
              </div>
              <a 
                href={doc.file_link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="sm-download-btn"
              >
                <i className="bi bi-cloud-arrow-down-fill"></i> Download
              </a>
            </div>
          ))}
          {documents.length === 0 && <div>No study materials available for this subject yet.</div>}
        </div>
      </div>
    </div>
  );
}
