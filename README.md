# React News Feed Performance Optimization

A production-grade React + TypeScript + Vite editorial application engineered to demonstrate Core Web Vitals (CWV) diagnostics, measurement, and optimization.

This repository tracks the transformation of an intentionally unoptimized news feed application (`v1-broken`) into a high-performance, Core Web Vitals optimized application (`v2-fixed`).

---

## Core Web Vitals Performance Report

All metrics were audited under identical, real-world Lighthouse mobile constraints:
- **Device Emulation**: Mobile (390×844 CSS px, DPR 3)
- **Throttling**: DevTools Slow 4G (1.6 Mbps download, 750 Kbps upload, 150 ms RTT)
- **CPU Throttling**: 4× CPU slowdown
- **Mode**: Navigation mode, Chrome Incognito

### Measured Metrics Comparison

| Metric | v1 Broken | v2 Fixed | Improvement (Δ) | Assessment |
| :--- | :---: | :---: | :---: | :--- |
| **Performance Score** | **63 / 100** | **90 / 100** | **+27 pts (+42.9%)** | 🟢 **Good (Green Zone)** |
| **Total Blocking Time (TBT)** | `670 ms` | `130 ms` | **-540 ms (-80.6%)** | 🟢 **Massive Main-Thread Relief** |
| **Cumulative Layout Shift (CLS)** | `0.132` | `0.007` | **-0.125 (-94.7%)** | 🟢 **Near-Zero Layout Jitter** |
| **Time to Interactive (TTI)** | `5.2 s` | `4.8 s` | **-387 ms (-7.4%)** | 🟢 **Faster User Interactivity** |
| **First Contentful Paint (FCP)** | `2.6 s` | `2.8 s` | `+163 ms` | 🟡 **Stable Under Slow 4G** |
| **Largest Contentful Paint (LCP)** | `2.6 s` | `2.8 s` | `+163 ms` | 🟡 **Stable Under Slow 4G** |
| **JS Bundle Size (Uncompressed)** | `316.95 kB` | `245.76 kB` | **-71.19 kB (-22.5%)** | 🟢 **Zero Unused Utilities** |
| **JS Bundle Size (Gzip)** | `103.19 kB` | `77.22 kB` | **-25.97 kB (-25.2%)** | 🟢 **Faster Script Transfer** |
| **Hero Image Payload** | `8,308 kB` | `37 kB` | **-8,271 kB (-99.55%)** | 🟢 **Massive Payload Reduction** |

> **Note on Reports**: The raw, untouched Lighthouse HTML reports are preserved directly in the repository root:
> - [`lighthouse-v1-broken.html`](./lighthouse-v1-broken.html)
> - [`lighthouse-v2-fixed.html`](./lighthouse-v2-fixed.html)

---

## Project Overview

**Global Chronicle** is an editorial news portal featuring:
- **Hero Lead Story**: Featured technical dispatch with high-resolution imagery and metadata.
- **Article Grid**: 12 detailed technical articles complete with category pills, excerpts, publish dates, reading times, and author profiles (names, avatars, and titles).
- **Sidebar Trending Wire**: Text-only ranked headlines and email digest subscription card.
- **Skeleton Shimmer Placeholders**: Smooth loading state prior to data arrival.
- **Infinite Scroll Sentinel**: Intersection Observer-based lazy pagination at the bottom of the feed.
- **Live Core Web Vitals Telemetry**: Integrated `web-vitals` runtime reporting via `src/reportVitals.ts` with console diagnostics.

---

## Technologies Used

- **Framework**: React 19 (TypeScript)
- **Bundler & Dev Server**: Vite 8
- **Bundle Analyzer**: `rollup-plugin-visualizer`
- **Image Optimization**: `sharp-cli` / `sharp` (WebP conversion)
- **Telemetry**: `web-vitals` v6
- **Styling**: Vanilla CSS custom properties & modern responsive layout (Grid / Flexbox)

---

## The Five Anti-Patterns (v1-broken) vs. The Five Fixes (v2-fixed)

### 1. Render-Blocking Fonts and CSS
- **Anti-Pattern (v1)**: Synchronous `<link rel="stylesheet">` to Google Fonts in `index.html` blocked initial HTML parsing and network discovery without domain preconnection.
- **Fix (v2)**: Added `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com` (crossorigin). Loaded font stylesheets asynchronously with `media="print" onload="this.media='all'"` and `display=swap`, backed by `<noscript>` fallbacks.

### 2. Unoptimized Hero Image (LCP)
- **Anti-Pattern (v1)**: The hero banner used an 8.3 MB uncompressed PNG (`/hero.png`), specified `loading="lazy"` (delaying critical above-the-fold image discovery), and omitted `width` and `height` attributes.
- **Fix (v2)**: Converted image to WebP (`/hero.webp`, 37 KB, 99.55% smaller). Replaced `loading="lazy"` with `fetchPriority="high"` and `decoding="async"`, supplied explicit intrinsic dimensions (`width={1200} height={630}`), and added `<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">` in `index.html`.

### 3. Cumulative Layout Shift (CLS)
- **Anti-Pattern (v1)**: Thumbnail images and author avatars lacked intrinsic `width` and `height` attributes, causing page content to jump as assets downloaded. Furthermore, an advertisement banner was dynamically injected after 1,200 ms without reserving viewport space.
- **Fix (v2)**: Added explicit `width` and `height` attributes to all article thumbnails (`800x500`) and author avatars (`36x36`). Reserved dedicated layout space for the advertisement slot using `<div className="ad-banner-slot" style={{ minHeight: 90 }}>{showBanner && <AdBanner />}</div>`, reducing CLS from `0.132` down to `0.007`.

### 4. Long Synchronous Task (TBT & INP)
- **Anti-Pattern (v1)**: A 600 ms synchronous blocking `while` loop was executed inside `useEffect` during component mount, freezing the browser main thread and delaying user input readiness.
- **Fix (v2)**: Removed the synchronous blocking loop. Sliced and deferred telemetry/analytics execution off the critical rendering path using `scheduler.postTask` with `priority: "background"` (falling back gracefully to `requestIdleCallback` and `setTimeout(..., 0)`). Total Blocking Time dropped from `670 ms` to `130 ms` (-80.6%).

### 5. Full Lodash Import (Bundle Size)
- **Anti-Pattern (v1)**: Imported the entire Lodash library (`import _ from "lodash"`) solely to sort articles by date using `_.orderBy()`, bloating the production JavaScript bundle by over 71 kB.
- **Fix (v2)**: Replaced Lodash with native JavaScript array sorting:
  ```ts
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  ```
  Uninstalled `lodash` and `@types/lodash`, shrinking the production bundle from `316.95 kB` to `245.76 kB` (-22.5%).

---

## Bundle Size Optimization

Visualized using `rollup-plugin-visualizer`:
- **v1 Bundle (`dist/assets/index-*.js`)**: `316.95 kB` (Gzip: `103.19 kB`) — Included entire Lodash module tree.
- **v2 Bundle (`dist/assets/index-*.js`)**: `245.76 kB` (Gzip: `77.22 kB`) — Clean ES modules with zero third-party utility bloat.
- **Net JavaScript Reduction**: **-71.19 kB uncompressed / -25.97 kB gzipped**.

To generate an interactive bundle visualizer report:
```bash
npm run build
# Opens stats.html in your browser
```

---

## Git Branch & Commit History

```text
* 6f7ad65 (HEAD -> v2-fixed) perf: remove lodash from article sorting
* 4b576a2 perf: defer long analytics initialization
* 2a777db perf: reserve layout space to prevent CLS
* bf5701b perf: optimize hero image for LCP
* 433df5f perf: eliminate render blocking font loading
* 3e46ced (main, v1-broken) perf: add baseline Lighthouse report
* b9bd72c feat: build intentionally slow news feed
```

- **`v1-broken`**: Preserves the complete intentionally unoptimized baseline along with `lighthouse-v1-broken.html`.
- **`v2-fixed`**: Contains all incremental performance commits, WebP assets, and the final `lighthouse-v2-fixed.html`.

---

## How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build & Preview Production Bundle
```bash
npm run build
npm run preview
```

### 4. Run Automated Lighthouse Performance Audits
```bash
# Starts audit against http://localhost:4173/ with mobile slow 4G throttling
node scripts/audit.mjs lighthouse-v2-fixed.html
```
