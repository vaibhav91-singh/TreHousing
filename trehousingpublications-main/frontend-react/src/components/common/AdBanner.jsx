import React, { useEffect } from 'react';

export default function AdBanner({ slotId, format = 'auto', style = {} }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense placement error:", e);
    }
  }, []);

  return (
    <div style={{ margin: '20px 0', textAlign: 'center', width: '100%', overflow: 'hidden', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4227720775456376"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
