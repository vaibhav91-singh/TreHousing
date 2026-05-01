import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './syllabusPdf.css';

export default function SyllabusPdf() {
  const [pdfContent, setPdfContent] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchPdfContent();
  }, [location.search]);

  const fetchPdfContent = async () => {
    const urlParams = new URLSearchParams(location.search);
    const courseId = urlParams.get('course_id');
    const subjectId = urlParams.get('subject_id');

    if (!courseId || !subjectId) {
      setError("Missing course_id or subject_id in URL");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://cms.trehousingpublication.com/api/v1/?course_id=${courseId}&subject_id=${subjectId}&syllabus_list=true`
      );
      const data = await res.json();

      if (!data.syllabus_list || !Array.isArray(data.syllabus_list)) {
        setError("No syllabus PDF found.");
        setPdfContent([]);
        return;
      }

      const formatted = data.syllabus_list.map((file) => {
        let subject = "Unknown";
        const nameWithoutExtension = file.replace(/\.[^/.]+$/, "");
        const dashParts = nameWithoutExtension.split("-");
        if (dashParts.length > 1) {
          subject = dashParts.slice(1).join("-").replace(/_/g, " ");
        }

        return {
          subject,
          filename: file,
          link: `https://cms.trehousingpublication.com/api/v1/?course_id=${courseId}&subject_id=${subjectId}&syllabus=${file}`,
        };
      });

      setPdfContent(formatted);
      if (!formatted.length) setError("No syllabus PDF found.");
    } catch (err) {
      console.error("Error fetching syllabus list:", err);
      setError("Failed to fetch syllabus list.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box">
      {pdfContent.length > 0 ? (
        <>
          <h3 className="table-head">Download Subject PDFs</h3>
          <hr className="horiz-line" />
          <div className="table-wrapper">
            <table className="table-data">
              <thead>
                <tr className="imp-link">
                  <th>Subject</th>
                  <th>Download Link</th>
                </tr>
              </thead>
              <tbody>
                {pdfContent.map((pdf, index) => (
                  <tr className="rowData" key={index}>
                    <td>{pdf.subject}</td>
                    <td>
                      <a href={pdf.link} target="_blank" rel="noopener noreferrer" className="pdf-link">
                        {pdf.filename}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>
          {error ? (
            <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
              {error}
            </p>
          ) : (
            loading && (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}