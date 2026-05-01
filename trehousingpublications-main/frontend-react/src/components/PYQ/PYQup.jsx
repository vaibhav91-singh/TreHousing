import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PYQup.css';

export default function PYQup() {
  const [pageData, setPageData] = useState({});
  const [questionPapers, setQuestionPapers] = useState([]);
  const [sidebarData, setSidebarData] = useState({});
  const [notification1, setNotification1] = useState([]);
  const [notification2, setNotification2] = useState([]);
  const [mockTests, setMockTests] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const baseUrl = 'https://cms.trehousingpublication.com/api/v2/?course_id=1&subject_id=1';
      const [page, papers, sidebar, notify, tests, posts] = await Promise.all([
        axios.get(`${baseUrl}/pyq-page`),
        axios.get(`${baseUrl}/question-papers`),
        axios.get(`${baseUrl}/sidebar-data`),
        axios.get(`${baseUrl}/notifications`),
        axios.get(`${baseUrl}/mock-tests`),
        axios.get(`${baseUrl}/recent-posts`)
      ]);

      setPageData(page.data || {});
      setQuestionPapers(papers.data || []);
      setSidebarData(sidebar.data || {});
      setNotification1(notify.data?.csirNet || []);
      setNotification2(notify.data?.ctet || []);
      setMockTests(tests.data || []);
      setRecentPosts(posts.data || []);
    } catch (error) {
      console.error('Error fetching PYQ data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = (id) => setOpenDropdown(openDropdown === id ? null : id);

  if (isLoading) return <div className="loading-container"><div className="loading-spinner"></div></div>;

  return (
    <div className="container">
      <div className="content">
        <div className="main-content">
          <div className="content-bpsc">
            <h2 className="fourZero">{pageData.title}</h2>
            <p className="bpsc-italic">{pageData.description}</p>
            <div className="bpscImg">
              <img src={pageData.headerImage} alt="BPSC Header" />
            </div>
            <p className="bpsc-normal">{pageData.introText}</p>
          </div>
          <div className="trePYQtable">
            <table>
              <thead>
                <tr className="tble-hed">
                  <td colSpan="2">{pageData.tableTitle || 'BPSC TRE Question Papers'}</td>
                </tr>
              </thead>
              <tbody>
                {questionPapers.map((row, index) => (
                  <tr key={index} className="rowData">
                    <td className="cell-text">{row.category}</td>
                    <td>
                      <ul>
                        {row.papers?.map((paper, pi) => <li key={pi}>{paper.title}</li>)}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="sidebar">
        <h3 className="latest-news-title">{sidebarData.notification1Title || 'Latest News'}</h3>
        <ul className="news-list">
          {notification1.map(news => (
            <li key={news.id} className="dropdown">
              <div className="dropdown-btn" onClick={() => toggleDropdown(news.id)}>
                <span className={openDropdown === news.id ? 'rotate' : ''}> {'>'} </span>{news.title}
              </div>
              {openDropdown === news.id && (
                <ul className="dropdown-content">
                  {news.links?.map(link => (
                    <li key={link.id}><a href={link.url} target="_blank" rel="noreferrer">{link.text}</a></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="referral">
          <img src={sidebarData.referralImage} alt="Referral" />
        </div>
      </div>
    </div>
  );
}