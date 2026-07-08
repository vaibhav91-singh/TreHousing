import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './PyqSyPdf.css';

export default function PyqSyPdf() {
  const [pdfData, setPdfData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchAllData();
  }, [location.search]);

  const fetchAllData = async () => {
    const urlParams = new URLSearchParams(location.search);
    const courseId = parseInt(urlParams.get('course_id'), 10);
    const subCourseId = parseInt(urlParams.get('sub_courses'), 10);

    if (isNaN(courseId) || isNaN(subCourseId)) {
      setPdfData({});
      return;
    }

    setIsLoading(true);
    try {
      const url = `/api/v2/?course_id=${courseId}&sub_courses=${subCourseId}`;
      const response = await axios.get(url);
      setPdfData(response.data);
    } catch (error) {
      console.error("Error fetching PDF data:", error);
      setPdfData({});
    } finally {
      setIsLoading(false);
    }
  };

  const getPdfUrl = (fileName, subjectId) => {
    const urlParams = new URLSearchParams(location.search);
    return `/api/v2/?course_id=${urlParams.get('course_id')}&sub_courses=${urlParams.get('sub_courses')}&subject_id=${subjectId}&file=${encodeURIComponent(fileName)}`;
  };

  const nonIdCategories = (item) => {
    return Object.entries(item)
      .filter(([key]) => key !== "id")
      .reduce((acc, [key, val]) => {
        acc[key] = val;
        return acc;
      }, {});
  };

  if (isLoading) return <div className="loading-container"><div className="loading-spinner"></div></div>;

  return (
    <div className="box">
      <div className="heading-pdf">
        <h4 style={{"color":"yellow"}}>BPSC TRE Question Papers</h4>
      </div>

      {pdfData?.['BPSC TRE'] ? (
        Object.entries(pdfData['BPSC TRE']).map(([versionKey, versions]) => (
          <div key={versionKey} className="version-section">
            <h3 className="version-title text-center mt-2">{versionKey}</h3>

            {versions.map((item) => (
              <div key={item.id} className="category-section">
                {Object.entries(nonIdCategories(item)).map(([categoryName, files]) => (
                  <div key={categoryName}>

                    <h4 className="category-title center-category-title">
                      {categoryName}
                    </h4>
                    <table className="table-data">
                      <thead>
                        <tr>
                  
                          <th>PDF File Name</th>
                          <th>View</th>

                          <th>Answer Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Data Come from Backend Here */}
                        {files.map((file, i) => (
                          <tr key={i}>
                           
                            <td>{file}</td>
                            <td>
                              <a href={getPdfUrl(file, item.id)} target="_blank" rel="noopener noreferrer">
                                View
                              </a>
                            </td>
                            <td>
                              <a href={getPdfUrl(file, item.id)} target="_blank" rel="noopener noreferrer">
                                Answer Key 
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <br />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No data available for this selection.</p>
      )}
    </div>
  );
}