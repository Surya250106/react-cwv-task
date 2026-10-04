import React from "react";

export const AdBanner: React.FC = () => {
  return (
    <aside className="ad-banner" aria-label="Sponsored Announcement">
      <div className="ad-banner-badge">SPONSORED</div>
      <div className="ad-banner-content">
        <div className="ad-banner-text">
          <strong className="ad-banner-title">CloudScale Global Summit 2026</strong>
          <span className="ad-banner-subtitle">
            Join 20,000+ engineers for the annual conference on Core Web Vitals, Edge Performance, and Distributed AI.
          </span>
        </div>
        <button className="ad-banner-cta" type="button">
          Claim Free Pass →
        </button>
      </div>
    </aside>
  );
};
