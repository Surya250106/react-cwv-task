import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runAudit(outputFilename) {
  const url = 'http://localhost:4173/';
  console.log(`Starting Lighthouse audit for ${url}...`);

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

    const rootDir = path.join(__dirname, '..');
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
    await chrome.kill();
  }
}

const outputFile = process.argv[2] || 'lighthouse-v1-broken.html';
runAudit(outputFile).catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
