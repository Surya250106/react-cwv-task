import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function startStaticServer(port = 4173) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(distDir)) {
      return reject(new Error(`Production build directory "${distDir}" does not exist. Run "npm run build" first.`));
    }

    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
      let filePath = path.join(distDir, reqPath);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(distDir, 'index.html');
      }
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading asset');
          return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });

    server.on('error', reject);
    server.listen(port, () => resolve(server));
  });
}

async function runAudit(outputFilename) {
  const url = 'http://localhost:4173/';
  console.log(`Starting Lighthouse audit for ${url}...`);

  let server = null;
  const isServerRunning = await fetch(url).then(() => true).catch(() => false);
  if (!isServerRunning) {
    console.log(`Starting local preview server on ${url}...`);
    server = await startStaticServer(4173);
  } else {
    console.log(`Using existing server on ${url}`);
  }

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  const chrome = await chromeLauncher.launch({
    chromePath: fs.existsSync(chromePath) ? chromePath : undefined,
    chromeFlags: ['--headless=new', '--no-sandbox', '--incognito'],
  });

  try {
    const options = {
      logLevel: 'info',
      output: ['html', 'json'],
      onlyCategories: ['performance'],
      port: chrome.port,
      formFactor: 'mobile',
      screenEmulation: {
        mobile: true,
        width: 390,
        height: 844,
        deviceScaleFactor: 3,
        disabled: false,
      },
      throttlingMethod: 'devtools',
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4, // Slow 4G
        requestLatencyMs: 150 * 3.75,
        downloadThroughputKbps: 1.6 * 1024,
        uploadThroughputKbps: 750,
        cpuSlowdownMultiplier: 4, // 4x CPU slowdown
      },
    };

    const runnerResult = await lighthouse(url, options);

    const reportHtml = Array.isArray(runnerResult.report)
      ? runnerResult.report[0]
      : runnerResult.report;

    const htmlPath = path.join(rootDir, outputFilename);
    fs.writeFileSync(htmlPath, reportHtml);

    const lhr = runnerResult.lhr;
    const perfScore = Math.round((lhr.categories.performance.score || 0) * 100);
    const fcp = lhr.audits['first-contentful-paint'];
    const lcp = lhr.audits['largest-contentful-paint'];
    const cls = lhr.audits['cumulative-layout-shift'];
    const tti = lhr.audits['interactive'];
    const tbt = lhr.audits['total-blocking-time'];

    console.log('-------------------------------------------');
    console.log(`Lighthouse Audit Complete: ${outputFilename}`);
    console.log(`Performance Score: ${perfScore}`);
    console.log(`FCP: ${fcp.displayValue || fcp.numericValue + ' ms'} (${fcp.numericValue} ms)`);
    console.log(`LCP: ${lcp.displayValue || lcp.numericValue + ' ms'} (${lcp.numericValue} ms)`);
    console.log(`CLS: ${cls.displayValue || cls.numericValue} (${cls.numericValue})`);
    console.log(`TTI: ${tti.displayValue || tti.numericValue + ' ms'} (${tti.numericValue} ms)`);
    console.log(`TBT: ${tbt.displayValue || tbt.numericValue + ' ms'} (${tbt.numericValue} ms)`);
    console.log('-------------------------------------------');

    return {
      perfScore,
      fcp: { display: fcp.displayValue, value: fcp.numericValue },
      lcp: { display: lcp.displayValue, value: lcp.numericValue },
      cls: { display: cls.displayValue, value: cls.numericValue },
      tti: { display: tti.displayValue, value: tti.numericValue },
      tbt: { display: tbt.displayValue, value: tbt.numericValue },
    };
  } finally {
    if (server) {
      server.close();
      console.log('Stopped preview server.');
    }
    await chrome.kill();
  }
}

const outputFile = process.argv[2] || 'lighthouse-v1-broken.html';
runAudit(outputFile).catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
