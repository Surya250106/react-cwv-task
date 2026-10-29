import React from "react";
import type { Article } from "../mockData";

interface ArticleCardProps {
  article: Article;
}

const resolveAssetUrl = (url: string) => {
  if (url.startsWith("/")) {
    const base = import.meta.env.BASE_URL;
    const cleanBase = base.endsWith("/") ? base : `${base}/`;
    return `${cleanBase}${url.slice(1)}`;
  }
  return url;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="article-card" id={`article-${article.id}`}>
      <div className="article-thumbnail-container">
        {/* Fixed: Intrinsic width and height to prevent CLS */}
        <img
          src={resolveAssetUrl(article.thumbnail)}
          alt={article.title}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="article-thumbnail"
        />
        {article.badge && (
          <span className="card-badge">{article.badge}</span>
        )}
      </div>

      <div className="article-card-body">
        <div className="article-category-row">
          <span className="category-pill">{article.category}</span>
          <span className="read-time">{article.readTime}</span>
        </div>

        <h2 className="article-title">{article.title}</h2>
        <p className="article-excerpt">{article.excerpt}</p>

        <div className="article-footer">
          <div className="author-container">
            {/* Fixed: Intrinsic width and height to prevent CLS */}
            <img
              src={resolveAssetUrl(article.author.avatar)}
              alt={article.author.name}
              width={36}
              height={36}
              loading="lazy"
              decoding="async"
              className="author-avatar"
            />
            <div className="author-details">
              <span className="author-name">{article.author.name}</span>
              <span className="author-role">{article.author.role}</span>
            </div>
          </div>
          <time className="publish-date" dateTime={article.date}>
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>
      </div>
    </article>
  );
};
