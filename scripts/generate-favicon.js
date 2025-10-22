const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// SVG template voor NN favicon
const svgTemplate = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#000000"/>
  <text
    x="50%"
    y="50%"
    font-family="Raleway, Arial, sans-serif"
    font-size="${size * 0.5}"
    font-weight="700"
    fill="#FFFFFF"
    text-anchor="middle"
    dominant-baseline="central"
  >NN</text>
</svg>
`;

async function generateFavicons() {
    const publicDir = path.join(__dirname, '..');

    console.log('\n🎨 FAVICON GENERATIE GESTART\n');

    // Genereer verschillende sizes
    const sizes = [
        { size: 16, name: 'favicon-16x16.png' },
        { size: 32, name: 'favicon-32x32.png' },
        { size: 180, name: 'apple-touch-icon.png' },
        { size: 192, name: 'android-chrome-192x192.png' },
        { size: 512, name: 'android-chrome-512x512.png' }
    ];

    for (const { size, name } of sizes) {
        const svg = Buffer.from(svgTemplate(size));
        const outputPath = path.join(publicDir, name);

        await sharp(svg)
            .png()
            .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        console.log(`✅ ${name.padEnd(30)} ${size}x${size}  (${(stats.size / 1024).toFixed(1)} KB)`);
    }

    // Genereer ook een favicon.ico (32x32)
    const svg32 = Buffer.from(svgTemplate(32));
    const icoPath = path.join(publicDir, 'favicon.ico');
    await sharp(svg32)
        .png()
        .toFile(icoPath);

    const icoStats = fs.statSync(icoPath);
    console.log(`✅ ${'favicon.ico'.padEnd(30)} 32x32  (${(icoStats.size / 1024).toFixed(1)} KB)`);

    console.log('\n🎉 Alle favicons gegenereerd!\n');
}

generateFavicons().catch(console.error);
