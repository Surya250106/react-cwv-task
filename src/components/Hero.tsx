import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="hero-section" id="hero-banner">
      <div className="hero-image-wrapper">
        <img
          src="/hero.png"
          alt="Global Chronicle Special Report - Next-Gen Intelligence & Architecture"
          loading="lazy"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="hero-content">
        <div className="hero-meta">
          <span className="badge-primary">SPECIAL REPORT</span>
          <span className="hero-date">October 4, 2026 • 12 min read</span>
        </div>
        <h1 className="hero-title">
          Distributed Intelligence & The Quantum Frontier: Redefining Global Software Architecture
        </h1>
        <p className="hero-description">
          An exhaustive investigation into how neuromorphic processing nodes, zero-latency edge topologies,
          and quantum-resistant cryptographic fabrics are transforming enterprise systems in 2026.
        </p>
        <div className="hero-author-bar">
          <div className="author-info">
            <span className="byline">Lead Analysis by</span>
            <span className="author-name">Editorial Board &amp; Principal Fellows</span>
          </div>
          <button className="read-button" type="button" aria-label="Read full report">
            Read Comprehensive Report →
          </button>
        </div>
      </div>
    </section>
  );
};
