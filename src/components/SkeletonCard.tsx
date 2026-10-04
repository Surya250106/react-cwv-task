import React from "react";

export const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-thumbnail shimmer"></div>
      <div className="skeleton-body">
        <div className="skeleton-pill shimmer"></div>
        <div className="skeleton-line skeleton-title shimmer"></div>
        <div className="skeleton-line skeleton-title-short shimmer"></div>
        <div className="skeleton-line skeleton-text shimmer"></div>
        <div className="skeleton-line skeleton-text-short shimmer"></div>
        <div className="skeleton-footer">
          <div className="skeleton-avatar shimmer"></div>
          <div className="skeleton-author-info">
            <div className="skeleton-line skeleton-author-name shimmer"></div>
            <div className="skeleton-line skeleton-author-role shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
