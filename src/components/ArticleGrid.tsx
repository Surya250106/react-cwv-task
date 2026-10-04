import React, { useState, useEffect } from "react";
// Anti-Pattern 5 (v1): Full lodash import
import _ from "lodash";
import type { Article } from "../mockData";
import { ArticleCard } from "./ArticleCard";
import { AdBanner } from "./AdBanner";

interface ArticleGridProps {
  articles: Article[];
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  // Anti-Pattern 3 (v1): Late injected ad banner causing layout shift
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Anti-Pattern 5 (v1): Using lodash to sort articles
  const sortedArticles = _.orderBy(
    articles,
    ["date"],
    ["desc"]
  );

  return (
    <section className="article-feed-section" aria-label="Latest Articles Feed">
      {/* Anti-Pattern 3 (v1): No reserved space for dynamically injected banner */}
      {showBanner && <AdBanner />}

      <div className="article-grid">
        {sortedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};
