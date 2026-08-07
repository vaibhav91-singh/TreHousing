import React from 'react';
import './Loader.css';

export default function Loader({ fullPage = false, text = "Loading..." }) {
    return (
        <div className={`global-loader-container ${fullPage ? 'full-page' : ''}`}>
            <div className="loader-animation">
                <div className="loader-ring"></div>
                <div className="loader-ring"></div>
                <div className="loader-ring"></div>
            </div>
            <div className="loader-text">{text}</div>
        </div>
    );
}
