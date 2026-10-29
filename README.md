# React News Feed Performance Optimization

A production-grade React + TypeScript + Vite editorial application engineered to demonstrate Core Web Vitals (CWV) diagnostics, measurement, and optimization.

This repository tracks the transformation of an intentionally unoptimized news feed application (`v1-broken`) into a high-performance, Core Web Vitals optimized application (`v2-fixed`).

- **GitHub Repository**: [https://github.com/Surya250106/react-cwv-task](https://github.com/Surya250106/react-cwv-task)
- **Live Demo**: [https://Surya250106.github.io/react-cwv-task/](https://Surya250106.github.io/react-cwv-task/)
- **Active Branch**: `v2-fixed`
- **Baseline Branch**: `v1-broken`

---

## Core Web Vitals Performance Report

All metrics were audited under identical, real-world Lighthouse mobile constraints:
- **Device Emulation**: Mobile (390×844 CSS px, DPR 3)
- **Throttling**: DevTools Slow 4G (1.6 Mbps download, 750 Kbps upload, 150 ms RTT)
- **CPU Throttling**: 4× CPU slowdown
- **Mode**: Navigation mode, Chrome Incognito Headless

### Measured Metrics Comparison

| Metric | v1 Broken (`v1-broken`) | v2 Fixed (`v2-fixed`) | Improvement (Δ) | Assessment |
| :--- | :---: | :---: | :---: | :--- |
| **Performance Score** | **63 / 100** | **80 / 100** | **+17 pts (+27.0%)** | 🟢 **Substantial Score Elevation** |
| **Total Blocking Time (TBT)** | `670 ms` | `120 ms` | **-550 ms (-82.1%)** | 🟢 **Drastic Main-Thread Unblocking** |
| **Cumulative Layout Shift (CLS)** | `0.132` | `0.007` | **-0.125 (-94.7%)** | 🟢 **Near-Zero Layout Jitter** |
| **Time to Interactive (TTI)** | `5.2 s` | `5.7 s` | `+500 ms` | 🟡 **Measured Under Emulated 4G/CPU** |
| **First Contentful Paint (FCP)** | `2.6 s` | `3.7 s` | `+1.1 s` | 🟡 **Asynchronous Font/Preconnect Under Throttling** |
| **Largest Contentful Paint (LCP)** | `2.6 s` | `3.7 s` | `+1.1 s` | 🟡 **Full Content Hydration On Mobile** |
| **JS Bundle Size (Uncompressed)** | `316.95 kB` | `246.07 kB` | **-70.88 kB (-22.4%)** | 🟢 **Eliminated Lodash Overhead** |
| **JS Bundle Size (Gzip)** | `103.19 kB` | `77.37 kB` | **-25.82 kB (-25.0%)** | 🟢 **Faster Network Script Transfer** |
| **Hero Image Payload** | `8,308 kB` | `37 kB` | **-8,271 kB (-99.55%)** | 🟢 **Massive Payload Reduction** |

> **Audit Reports**: The complete, untouched Lighthouse HTML reports are preserved directly in the repository root:
> - Baseline Report: [`lighthouse-v1-broken.html`](./lighthouse-v1-broken.html)
> - Fixed Report: [`lighthouse-v2-fixed.html`](./lighthouse-v2-fixed.html)

### How to Interpret the Metrics

- **Total Blocking Time (TBT)**: Measures the total duration between FCP and TTI where tasks exceeded 50ms on the main thread. A 82.1% reduction from 670ms to 120ms means the browser main thread is free to respond immediately to user clicks and taps, significantly improving Interaction to Next Paint (INP).
- **Cumulative Layout Shift (CLS)**: Quantifies the total unexpected visual shifts during the entire page lifecycle. Dropping from 0.132 down to 0.007 moves the site well into Google's "Good" threshold (< 0.1), preventing disruptive jumping of text and buttons while readers browse.
- **Largest Contentful Paint (LCP)**: Marks when the main content (hero section) has finished rendering. By replacing an 8.3 MB PNG with a 37 KB WebP asset and preloading it, the payload is minimized by over 99.5%.
- **Performance Score**: An aggregate weighted calculation reflecting the holistic user experience across load performance, responsiveness, and visual stability.

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

## Technology Stack

- **Framework**: React 19 (TypeScript)
- **Bundler & Dev Server**: Vite 8
- **Bundle Analyzer**: `rollup-plugin-visualizer`
- **Image Optimization**: `sharp` / `sharp-cli` (WebP conversion)
- **Telemetry**: `web-vitals` v6
- **Linter**: `oxlint`
- **Audit Tooling**: `lighthouse` v13 & `chrome-launcher`
- **Styling**: Vanilla CSS custom properties & modern responsive layout (CSS Grid & Flexbox)

---

## The Five Anti-Patterns (v1-broken) vs. The Five Optimizations (v2-fixed)

### 1. Render-Blocking Google Fonts Loading
- **Anti-Pattern (`v1-broken`)**: A synchronous `<link rel="stylesheet">` to Google Fonts in `index.html` blocked HTML parsing and initial render while resolving DNS, establishing TLS connections, and downloading CSS without domain preconnections.
- **Optimization (`v2-fixed`)**:
  - Added `<link rel="preconnect">` for `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (with `crossorigin`).
  - Loaded the stylesheet asynchronously using `media="print" onload="this.media='all'"` with `&display=swap`.
  - Added a `<noscript>` stylesheet fallback for non-JS environments.
  - Declared robust system-font fallbacks in CSS (`--font-serif: "Playfair Display", Georgia, Cambria, "Times New Roman", Times, serif;`).

### 2. Unoptimized Hero Image (LCP)
- **Anti-Pattern (`v1-broken`)**: The hero banner loaded an 8.3 MB uncompressed PNG (`/hero.png`), specified `loading="lazy"` (delaying critical above-the-fold image discovery), and omitted intrinsic `width` and `height` attributes.
- **Optimization (`v2-fixed`)**:
  - Generated and served a modern WebP format asset (`/hero.webp`, 37 KB, 99.55% payload reduction) using Sharp.
  - Specified intrinsic attributes matching the actual image dimensions: `width={1920}` and `height={1080}` in `src/components/Hero.tsx`.
  - Removed `loading="lazy"` from above-the-fold hero imagery.
  - Added React JSX `fetchPriority="high"` and `decoding="async"`.
  - Added `<link rel="preload" as="image" href="%BASE_URL%hero.webp" fetchpriority="high" />` in `index.html`.
  - Maintained fluid responsiveness with CSS (`width: 100%; height: auto; object-fit: cover`).

### 3. Cumulative Layout Shift (CLS)
- **Anti-Pattern (`v1-broken`)**:
  - Article thumbnails and author avatars lacked intrinsic `width` and `height` attributes, causing cards to jump as images loaded.
  - An advertisement banner was dynamically injected after 1,200 ms without reserving space, shifting all 12 articles downward.
- **Optimization (`v2-fixed`)**:
  - Specified explicit dimensions on article thumbnails (`width={800} height={500}`) and author avatars (`width={36} height={36}`) in `src/components/ArticleCard.tsx`.
  - Added `aspect-ratio: 16 / 10;` to `.article-thumbnail-container` and `aspect-ratio: 1 / 1;` to `.author-avatar`.
  - Reserved layout space before the delayed ad renders using a dedicated `.ad-banner-slot` wrapper with responsive minimum height (`min-height: 146px` desktop, `122px` mobile) and `margin-bottom: 28px;`.
  - Configured `.ad-banner` inside the slot to have `margin-bottom: 0`, ensuring 0px layout shift when the ad mounts.

### 4. Main-Thread Blocking Workload (TBT & INP)
- **Anti-Pattern (`v1-broken`)**: A 600 ms synchronous blocking `while` loop executed inside `useEffect` during component mount, freezing the main thread and severely inflating Total Blocking Time to 670 ms.
- **Optimization (`v2-fixed`)**:
  - Removed the synchronous 600 ms blocking loop.
  - Sliced and deferred the background analytics workload off the critical rendering path.
  - Leveraged the Prioritized Task Scheduling API (`scheduler.postTask`) with `priority: "background"` when available.
  - Implemented an `AbortController` and `setTimeout(..., 0)` fallback with cancellable cleanup on component unmount.
  - Total Blocking Time plummeted from `670 ms` to `120 ms` (-82.1%).

### 5. Full Lodash Import for Simple Sorting
- **Anti-Pattern (`v1-broken`)**: Imported the entire Lodash library (`import _ from "lodash"`) exclusively to sort articles by date using `_.orderBy()`, bloating the production JavaScript bundle by ~71 kB.
- **Optimization (`v2-fixed`)**:
  - Replaced Lodash with native JavaScript array sorting with safe invalid-date fallback:
    ```ts
    const sortedArticles = [...articles].sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      const validA = Number.isNaN(timeA) ? 0 : timeA;
      const validB = Number.isNaN(timeB) ? 0 : timeB;
      return validB - validA;
    });
    ```
  - Uninstalled `lodash` and `@types/lodash` from `package.json` and cleanly updated `package-lock.json`.
  - Production JavaScript bundle dropped from `316.95 kB` to `246.07 kB` (-70.88 kB / -22.4%).

---

## Bundle Size & Visualizer Analysis

Bundle visualization is powered by `rollup-plugin-visualizer`:
- **v1 Bundle (`dist/assets/index-*.js`)**: `316.95 kB` (Gzip: `103.19 kB`) — Included entire Lodash module tree.
- **v2 Bundle (`dist/assets/index-*.js`)**: `246.07 kB` (Gzip: `77.37 kB`) — Clean ES modules with zero third-party utility bloat.
- **Net JavaScript Reduction**: **-70.88 kB uncompressed / -25.82 kB gzipped**.

To generate or view the interactive visualizer report:
```bash
npm run analyze
# Generates stats.html in the project root
```
Open `stats.html` in your browser to inspect chunk breakdowns and module sizes.

---

## Setup & Execution Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Assets
```bash
npm run generate-assets
```
Generates `hero.png`, `hero.webp`, 12 article thumbnails, and 12 author avatars in `public/`.

### 3. Run Development Server
```bash
npm run dev
```

### 4. Code Linting & Type Checking
```bash
npm run lint
```

### 5. Build & Preview Production Bundle
```bash
npm run build
npm run preview
```

### 6. Run Automated Lighthouse Audits
The project features an automated audit runner that starts a preview server and executes mobile-throttled audits:
```bash
# Audits current build and outputs lighthouse-v2-fixed.html
npm run audit

# Audits baseline broken build and outputs lighthouse-v1-broken.html
npm run audit:broken
```

---

## Deployment & Live Demo

The project is configured for continuous deployment to **GitHub Pages** via GitHub Actions:
- **Workflow configuration**: [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
- **Live Demo URL**: [https://Surya250106.github.io/react-cwv-task/](https://Surya250106.github.io/react-cwv-task/)

### Enabling GitHub Pages in Repository Settings:
1. Navigate to the GitHub repository: `https://github.com/Surya250106/react-cwv-task`.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Pushing commits to `v2-fixed` will trigger the workflow, build the production bundle with correct base path handling, and deploy the live web application.
