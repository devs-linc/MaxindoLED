import sharp from 'sharp';
import fs from 'node:fs';
const PUB='C:/dev/maxindoled-site/public';

// ---- favicon.svg : dark rounded square + gradient "M" ----
const fav=`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 64 64">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs>
<rect width="64" height="64" rx="14" fill="#0a0e1a"/>
<path d="M12 50V14h9l11 15 11-15h9v36h-9V29l-9 12h-4l-9-12v21z" fill="url(#g)"/>
</svg>`;
fs.writeFileSync(PUB+'/favicon.svg', fav);
await sharp(Buffer.from(fav)).resize(180,180).png().toFile(PUB+'/apple-touch-icon.png');
await sharp(Buffer.from(fav)).resize(32,32).png().toFile(PUB+'/favicon-32.png');

// ---- og-default.jpg : 1200x630 dark + logo + tagline ----
const logoB64=fs.readFileSync(PUB+'/logo.png').toString('base64');
const og=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0e1a"/><stop offset="1" stop-color="#111827"/></linearGradient>
<radialGradient id="glow" cx="78%" cy="22%" r="55%"><stop offset="0" stop-color="#06b6d4" stop-opacity="0.45"/><stop offset="1" stop-color="#06b6d4" stop-opacity="0"/></radialGradient>
<linearGradient id="acc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#06b6d4"/><stop offset="1" stop-color="#3b82f6"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<rect width="1200" height="630" fill="url(#glow)"/>
<image href="data:image/png;base64,${logoB64}" x="110" y="150" width="620" height="124"/>
<text x="112" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="54" font-weight="800" fill="#ffffff">Sewa LED Screen &amp; Multimedia</text>
<text x="112" y="426" font-family="Segoe UI, Arial, sans-serif" font-size="54" font-weight="800" fill="#ffffff">untuk Setiap Acara</text>
<text x="112" y="492" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#94a3b8">Jakarta &amp; Tangerang · LED · Sound · Lighting · Multimedia</text>
<rect x="112" y="520" width="120" height="6" rx="3" fill="url(#acc)"/>
</svg>`;
await sharp(Buffer.from(og)).jpeg({quality:88}).toFile(PUB+'/og-default.jpg');
console.log('wrote favicon.svg, apple-touch-icon.png, favicon-32.png, og-default.jpg');
