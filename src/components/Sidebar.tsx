import React from "react";
import { SIDEBAR_HEADLINES } from "../mockData";

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar-section" aria-label="Headlines & Trending Stories">
      <div className="sidebar-card">
        <div className="sidebar-header">
          <span className="live-indicator"></span>
          <h3 className="sidebar-title">Trending Wire</h3>
        </div>
        <div className="headline-list">
          {SIDEBAR_HEADLINES.map((headline, idx) => (
            <div key={headline.id} className="headline-item">
              <span className="headline-number">{String(idx + 1).padStart(2, "0")}</span>
              <div className="headline-info">
                <span className="headline-category">{headline.category}</span>
                <h4 className="headline-text">{headline.title}</h4>
                <div className="headline-meta">
                  <span className="headline-time">{headline.timeAgo}</span>
                  <span className="bullet">•</span>
                  <span className="headline-reads">{headline.reads}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-newsletter-card">
        <h4 className="newsletter-title">The Engineering Daily</h4>
        <p className="newsletter-desc">
          Get curated deep-dives into distributed systems, browser engine internals, and Core Web Vitals directly to your inbox.
        </p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-input"
            aria-label="Email address for newsletter"
          />
          <button type="submit" className="newsletter-button">
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
};
