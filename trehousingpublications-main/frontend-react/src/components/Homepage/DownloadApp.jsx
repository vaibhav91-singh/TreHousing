import React from 'react';
import './DownloadApp.css';
import googlePlay from '../../assets/Homepage/Google_Play_Store.png';
import appStore from '../../assets/Homepage/Download_on_the_App_Store.png';
import downloadAppImg from '../../assets/Homepage/download_app.jpg';

export default function DownloadApp() {
  return (
    <div className="cont-downloadBox">
      <div className="first-box">
        <h1 className="main-text">Download our mobile app, Start learning today</h1>
        <div className="store-buttons">
          <img src={googlePlay} className="imageStore" alt="Google Playstore" />
          <img src={appStore} className="imageStore" alt="App Store" />
        </div>
      </div>
      <div className="second-box">
        <img src={downloadAppImg} alt="mobile-view" className="mobile-view" />
      </div>
    </div>
  );
}