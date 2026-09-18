import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './syllabusPdf.css';

export default function SyllabusPdf() {
  // State to store the list of syllabus PDFs fetched from the backend
  const [pdfContent, setPdfContent] = useState([]);
  
  // State to hold any error messages if the fetch fails or URL params are missing
  const [error, setError] = useState("");
  
  // State to show a loading spinner while data is being fetched
  const [loading, setLoading] = useState(false);
  
  // useLocation hooks gives us the current URL, which we use to extract search parameters (like ?course_id=1)
  const location = useLocation();

  // useEffect triggers whenever the URL parameters (location.search) change.
  // It automatically calls our fetchPdfContent function to get the latest data.
  useEffect(() => {
    fetchPdfContent();
  }, [location.search]);
  // Asynchronous function to fetch data from our Django backend API
  const fetchPdfContent = async () => {
    // 1. Extract course_id and subject_id from the browser URL
    const urlParams = new URLSearchParams(location.search);
    const courseId = urlParams.get('course_id');

    const subjectId = urlParams.get('subject_id');
    

    // 2. Validate that both IDs are present in the URL
    if (!courseId || !subjectId) {
      setError("Missing course_id or subject_id in URL");
      return;
    }

    // 3. Start the loading spinner and clear any previous errors
    setLoading(true);
    setError("");
    
    try {
      // 4. Make an API call to the backend. Because of our Vite proxy, '/api/v1/' points to our Django server
      const res = await fetch(
        `/api/v1/?course_id=${courseId}&subject_id=${subjectId}&syllabus_list=true`
      );
      const data = await res.json();

      // 5. Check if the response contains a valid 'syllabus_list' array
      if (!data.syllabus_list || !Array.isArray(data.syllabus_list)) {
        setError("No syllabus PDF found.");
        setPdfContent([]);
        return;
      }

      // 6. Process the file names to make them look nice for the user
      const formatted = data.syllabus_list.map((file) => {
        let subject = "Unknown";
        
        // Remove the file extension (e.g., '.pdf')
        const nameWithoutExtension = file.replace(/\.[^/.]+$/, "");
        
        // Try to guess the subject name by splitting the filename by dashes
        const dashParts = nameWithoutExtension.split("-");
        if (dashParts.length > 1) {
          subject = dashParts.slice(1).join("-").replace(/_/g, " ");
        }

        const encodedFile = encodeURIComponent(file);

        return {
          subject,
          filename: file,
          viewLink: `/api/v1/?course_id=${courseId}&subject_id=${subjectId}&syllabus=${encodedFile}`,
          downloadLink: `/api/v1/?course_id=${courseId}&subject_id=${subjectId}&syllabus=${encodedFile}&download=true`,
        };
      });

      // 7. Update our component state with the formatted data so React can render the table
      setPdfContent(formatted);
      if (!formatted.length) setError("No syllabus PDF found.");
      
    } catch (err) {
      console.error("Error fetching syllabus list:", err);
      setError("Failed to fetch syllabus list.");
    } finally {
      // 8. Stop the loading spinner whether the request succeeded or failed
      setLoading(false);
    }
  };

  return (
    <div className="syllabus-pdf-container">
      {pdfContent.length > 0 ? (
        <>
          <div className="section-header-wrap">
            <h3 className="table-head">Syllabus PDF Documents</h3>
            <div className="horiz-line" />
          </div>
          <div className="syllabus-grid">
            {pdfContent.map((pdf, index) => (
              <div key={index} className="syllabus-card pyq-cardDesign">
                <div className="syllabus-card-header">
                  <span className="syllabus-badge">📄 Official PDF</span>
                  <h4 className="syllabus-title">{pdf.filename}</h4>
                </div>
                
                <div className="syllabus-actions">
                  <a href={pdf.viewLink} target="_blank" rel="noopener noreferrer" className="btn-syllabus-action btn-view-syllabus">
                    👁️ View Syllabus PDF
                  </a>
                  
                  <a href={pdf.downloadLink} download={pdf.filename} target="_blank" rel="noopener noreferrer" className="btn-syllabus-action btn-download-syllabus">
                    📥 Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="syllabus-pdf-status-wrap">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
              <span>Fetching syllabus documents...</span>
            </div>
          ) : error ? (
            <div className="syllabus-empty-card">
              <div className="syllabus-empty-icon">📄</div>
              <h4 className="syllabus-empty-title">
                {error === "Missing course_id or subject_id in URL" 
                  ? "Select a Course & Subject" 
                  : "No Syllabus PDF Available"}
              </h4>
              <p className="syllabus-empty-text">
                {error === "Missing course_id or subject_id in URL"
                  ? "Use the Syllabus navigation menu at the top to choose a specific subject and view its downloadable syllabus PDF."
                  : error}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}