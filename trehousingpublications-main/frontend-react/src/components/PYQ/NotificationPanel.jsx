
import React, { useState, useEffect } from 'react';

import './NotificationPanel.css';

export default function MyComponent() {
  // TODO: Convert Vue data(), methods, and mounted() manually
  
  return (
    <>
      <div className="container">


    <div className="content">
      <h2>BPSC TRE 4.0 Previous Year Question Papers PDf Download</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et tenetur fuga repudiandae, non distinctio ea quos aliquam iusto debitis cumque aliquid cum at, fugit inventore! At magni ex sunt perspiciatis impedit. Commodi quisquam ducimus hic qui corporis deserunt ab culpa, neque voluptas voluptatem cupiditate in vero nam officia dolorem modi.</p>
    </div>





    <div className="sidebar">


      <h3 className="latest-news-title">CSIR NET 2025</h3>
      <ul className="news-list">
        <li v-htmlFor="news in notification1" key={news.id} className="dropdown">
          <div className="dropdown-btn" onClick={(e) => { toggleDropdown(news.id)(e); }}>
            <span className={ rotate: openDropdown === news.id }> > </span>{ news.title }
          </div>
          <ul data-v-if="{openDropdown === news.id}" className="dropdown-content">
            <li v-htmlFor="link in news.links" key={link.id}>
              <a href={link.url} target="_blank">
                { link.text }
              </a>
            </li>
          </ul>
        </li>
      </ul>



      <h3 className="latest-news-title">CTET 2024 EXAM</h3>
      <ul className="news-list">
        <li v-htmlFor="news in notification2" key={news.id} className="dropdown">
          <div className="dropdown-btn" onClick={(e) => { toggleDropdown(news.id)(e); }}>
            <span className={ rotate: openDropdown === news.id }> > </span>{ news.title }
          </div>
          <ul data-v-if="{openDropdown === news.id}" className="dropdown-content">
            <li v-htmlFor="link in news.links" key={link.id}>
              <a href={link.url} target="_blank">
                { link.text }
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    

   

    
  </div>
    </>
  );
}
  