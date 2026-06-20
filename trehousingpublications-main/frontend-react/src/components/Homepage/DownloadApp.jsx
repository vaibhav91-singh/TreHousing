import React from 'react';
import './DownloadApp.css';
import googlePlay from '../../assets/Homepage/Google_Play_Store.png';
import appStore from '../../assets/Homepage/Download_on_the_App_Store.png';
import downloadAppImg from '../../assets/Homepage/download_app.jpg';

// This is a presentational component that displays the "Download App" banner on the homepage.
export default function DownloadApp() {
  return (
    <div className="cont-downloadBox">
      <div className="first-box">
        {/* 
          SECURITY SCANNER NOTE: 
          The text below is "hardcoded" in English. Scanners often flag this as an "internationalization (i18n) vulnerability" 
          because if you wanted to translate the site to Hindi or Spanish, this text wouldn't translate automatically. 
          To fix it in the future, you could use a library like 'i18next' or 'react-intl' to replace this string with a variable.
          However, if your site is only meant to be in English, it is perfectly safe to leave it hardcoded like this! 
        */}
        <h1 className="main-text">Download our mobile app, Start learning today</h1>
        
        {/* Buttons for App Stores */}
        <div className="store-buttons">
          <img src={googlePlay} className="imageStore" alt="Google Playstore" />
          <img src={appStore} className="imageStore" alt="App Store" />
        </div>
      </div>
      
      {/* Visual representation / Mockup image */}
      <div className="second-box">
        <img src={downloadAppImg} alt="mobile-view" className="mobile-view" />
      </div>
    </div>
  );
}