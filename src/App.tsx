import React, { useState, useEffect, useRef } from "react";
import { Hero } from "./components/Hero";
import { ArticleGrid } from "./components/ArticleGrid";
import { Sidebar } from "./components/Sidebar";
import { SkeletonCard } from "./components/SkeletonCard";
import { INITIAL_ARTICLES, type Article } from "./mockData";
import "./App.css";

export const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const infiniteScrollRef = useRef<HTMLDivElement | null>(null);

  // Anti-Pattern 4 (v1): Heavy synchronous task blocking the main thread during initial mount
  useEffect(() => {
    const start = performance.now();
    while (performance.now() - start < 600) {
      // Synchronous blocking loop simulating un-deferred heavy analytics/tracking bootstrap
    }
  }, []);

  // Simulated initial data loading
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setArticles(INITIAL_ARTICLES);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(loadTimer);
  }, []);

  // Infinite-scroll trigger element handling
  useEffect(() => {
    if (!infiniteScrollRef.current || isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingMore) {
          setIsFetchingMore(true);
          // Simulate fetching more articles
          setTimeout(() => {
            setArticles((prev) => [
              ...prev,
              ...INITIAL_ARTICLES.slice(0, 6).map((item, idx) => ({
                ...item,
                id: `${item.id}-page2-${idx}`,
                title: `[Archive] ${item.title}`,
                date: new Date(new Date(item.date).getTime() - 86400000 * (idx + 1)).toISOString(),
              })),
            ]);
            setIsFetchingMore(false);
            setHasMore(false); // Stop after 1 pagination batch for demo stability
          }, 800);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(infiniteScrollRef.current);
    return () => observer.disconnect();
  }, [isLoading, isFetchingMore, hasMore]);

  return (
    <div className="app-container">
      {/* Top Header Navigation */}
      <header className="site-header">
        <div className="header-top-bar">
          <div className="header-date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="header-tagline">The Premier Technical &amp; Systems Publication</div>
          <div className="header-edition">Edition: Global / English</div>
        </div>

        <div className="header-main">
          <div className="header-logo-container">
            <h1 className="site-logo">GLOBAL CHRONICLE</h1>
            <p className="site-sub-logo">JOURNAL OF HIGH-PERFORMANCE COMPUTING &amp; WEB ARCHITECTURE</p>
          </div>
        </div>

        <nav className="site-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li className="nav-item active"><a href="#all">All Feed</a></li>
            <li className="nav-item"><a href="#ai">AI &amp; Neural</a></li>
            <li className="nav-item"><a href="#performance">Web Performance</a></li>
            <li className="nav-item"><a href="#infrastructure">Infrastructure</a></li>
            <li className="nav-item"><a href="#security">Cybersecurity</a></li>
            <li className="nav-item"><a href="#frontend">Frontend</a></li>
            <li className="nav-item"><a href="#database">Databases</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Layout */}
      <main className="main-layout">
        {/* Large Hero Section */}
        <Hero />

        {/* Two-Column Grid: Articles + Sidebar */}
        <div className="feed-grid-wrapper">
          <div className="feed-main-col">
            <div className="section-heading-bar">
              <h2 className="section-title">Latest Technical Dispatches</h2>
              <span className="section-count">{articles.length || 12} Stories Published</span>
            </div>

            {isLoading ? (
              <div className="skeleton-grid" aria-label="Loading articles...">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <ArticleGrid articles={articles} />
            )}

            {/* Infinite Scroll Trigger Element */}
            <div
              ref={infiniteScrollRef}
              id="infinite-scroll-sentinel"
              className="infinite-scroll-trigger"
            >
              {isFetchingMore && (
                <div className="infinite-loading-indicator">
                  <span className="spinner"></span>
                  <span>Loading additional stories...</span>
                </div>
              )}
              {!hasMore && (
                <div className="infinite-end-indicator">
                  <span>✓ You have viewed all dispatches for this edition</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="feed-sidebar-col">
            <Sidebar />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>GLOBAL CHRONICLE</h3>
            <p>Benchmarked, verified, and engineered for Core Web Vitals excellence.</p>
          </div>
          <div className="footer-links">
            <span>© 2026 Global Chronicle Media Corp. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
