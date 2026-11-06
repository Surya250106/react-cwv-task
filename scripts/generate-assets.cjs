const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

async function generateAssets() {
  const publicDir = path.join(__dirname, '..', 'public');
  const imagesDir = path.join(publicDir, 'images');
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // 1. Generate realistic high-res hero.png (1920x1080)
  const heroSvg = `
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090d16" />
        <stop offset="35%" stop-color="#1e1b4b" />
        <stop offset="70%" stop-color="#311042" />
        <stop offset="100%" stop-color="#030712" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="50%" stop-color="#818cf8" />
        <stop offset="100%" stop-color="#c084fc" />
      </linearGradient>
      <radialGradient id="glow" cx="70%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#6366f1" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#090d16" stop-opacity="0" />
      </radialGradient>
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
      </pattern>
    </defs>

    <rect width="1920" height="1080" fill="url(#bgGrad)" />
    <rect width="1920" height="1080" fill="url(#glow)" />
    <rect width="1920" height="1080" fill="url(#grid)" />

    <g transform="translate(1150, 160)">
      <polygon points="0,300 240,40 520,220 420,620 90,560" fill="url(#accentGrad)" opacity="0.8" />
      <circle cx="280" cy="300" r="150" fill="none" stroke="#e0e7ff" stroke-width="3" stroke-dasharray="14 14" />
      <circle cx="280" cy="300" r="70" fill="#f59e0b" opacity="0.95" />
    </g>

    <text x="120" y="440" font-family="Playfair Display, Georgia, serif" font-weight="700" font-size="78" fill="#f8fafc" letter-spacing="-1">
      GLOBAL CHRONICLE
    </text>
    <text x="120" y="530" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="34" fill="url(#accentGrad)">
      NEXT-GEN DISTRIBUTED INTELLIGENCE &amp; ARCHITECTURE
    </text>
    <text x="120" y="600" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="22" fill="#94a3b8">
      Special Report: In-depth technical coverage, benchmark measurements, and edge optimization breakthroughs.
    </text>
  </svg>
  `;

  // Write PNG with raw texture
  await sharp(Buffer.from(heroSvg))
    .png({ compressionLevel: 0 })
    .toFile(path.join(publicDir, 'hero.png'));
  console.log('Created public/hero.png');

  // Write WebP hero asset (1920x1080)
  await sharp(Buffer.from(heroSvg))
    .webp({ quality: 80 })
    .toFile(path.join(publicDir, 'hero.webp'));
  console.log('Created public/hero.webp');

  // 2. Generate 12 article thumbnails (800x500)
  const categories = [
    { name: 'AI & Neural Systems', color1: '#1e3a8a', color2: '#3b82f6', icon: '🤖' },
    { name: 'Web Performance', color1: '#064e3b', color2: '#10b981', icon: '⚡' },
    { name: 'Cloud Infrastructure', color1: '#312e81', color2: '#6366f1', icon: '☁️' },
    { name: 'Cybersecurity', color1: '#831843', color2: '#ec4899', icon: '🛡️' },
    { name: 'DevOps & Tooling', color1: '#701a75', color2: '#d946ef', icon: '⚙️' },
    { name: 'Frontend Architecture', color1: '#7c2d12', color2: '#f97316', icon: '🎨' },
    { name: 'Distributed Databases', color1: '#14532d', color2: '#22c55e', icon: '💾' },
    { name: 'Mobile Computing', color1: '#1e293b', color2: '#64748b', icon: '📱' },
    { name: 'Quantum Information', color1: '#3b0764', color2: '#a855f7', icon: '⚛️' },
    { name: 'Open Source Systems', color1: '#134e4a', color2: '#14b8a6', icon: '🌐' },
    { name: 'Microservices & Mesh', color1: '#713f12', color2: '#eab308', icon: '🔌' },
    { name: 'Engineering Velocity', color1: '#4c0519', color2: '#f43f5e', icon: '👥' },
  ];

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const thumbSvg = `
    <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${cat.color1}" />
          <stop offset="100%" stop-color="${cat.color2}" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#grad${i})" />
      <circle cx="680" cy="120" r="220" fill="rgba(255,255,255,0.08)" />
      <circle cx="120" cy="400" r="180" fill="rgba(0,0,0,0.18)" />
      <text x="400" y="230" font-family="system-ui, sans-serif" font-size="80" text-anchor="middle" dominant-baseline="middle">
        ${cat.icon}
      </text>
      <text x="400" y="330" font-family="system-ui, sans-serif" font-weight="700" font-size="26" fill="#ffffff" text-anchor="middle">
        ${escapeXml(cat.name.toUpperCase())}
      </text>
    </svg>
    `;
    await sharp(Buffer.from(thumbSvg))
      .png()
      .toFile(path.join(imagesDir, `article-${i + 1}.png`));
  }
  console.log('Created 12 article thumbnails');

  // 3. Generate 12 author avatars (200x200)
  const avatarColors = [
    '#3b82f6', '#10b981', '#6366f1', '#ec4899', '#f97316', '#8b5cf6',
    '#14b8a6', '#ef4444', '#06b6d4', '#eab308', '#d946ef', '#64748b'
  ];
  const initials = ['SC', 'AL', 'MR', 'EW', 'DK', 'JT', 'NK', 'HL', 'VR', 'OB', 'MP', 'TC'];

  for (let i = 0; i < initials.length; i++) {
    const avatarSvg = `
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="100" fill="${avatarColors[i]}" />
      <text x="100" y="112" font-family="system-ui, sans-serif" font-weight="700" font-size="64" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">
        ${initials[i]}
      </text>
    </svg>
    `;
    await sharp(Buffer.from(avatarSvg))
      .png()
      .toFile(path.join(imagesDir, `avatar-${i + 1}.png`));
  }
  console.log('Created 12 author avatars');
}

generateAssets().catch(console.error);
