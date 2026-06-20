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

        // Return a clean object with the download link
        return {
          subject,
          filename: file,
          // This link goes back to the backend to actually download the specific file
          link: `/api/v1/?course_id=${courseId}&subject_id=${subjectId}&syllabus=${file}`,
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