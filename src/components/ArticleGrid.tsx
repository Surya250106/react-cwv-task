import React, { useState, useEffect } from "react";
import type { Article } from "../mockData";
import { ArticleCard } from "./ArticleCard";
import { AdBanner } from "./AdBanner";

interface ArticleGridProps {
  articles: Article[];
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Fixed: Native JavaScript sorting with safe invalid date fallback, eliminating Lodash dependency
  const sortedArticles = [...articles].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    const validA = Number.isNaN(timeA) ? 0 : timeA;
    const validB = Number.isNaN(timeB) ? 0 : timeB;
    return validB - validA;
  });

  return (
    <section className="article-feed-section" aria-label="Latest Articles Feed">
      {/* Fixed: Reserved layout space for delayed advertisement to prevent CLS */}
      <div className="ad-banner-slot">
        {showBanner && <AdBanner />}
      </div>

      <div className="article-grid">
        {sortedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};
