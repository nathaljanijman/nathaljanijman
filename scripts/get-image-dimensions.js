const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function getImageDimensions() {
    const imagesDir = path.join(__dirname, '..', 'images');
    const files = fs.readdirSync(imagesDir)
        .filter(file => file.endsWith('.webp'))
        .sort();

    console.log('\n📐 IMAGE DIMENSIONS:\n');

    for (const file of files) {
        const filePath = path.join(imagesDir, file);
        try {
            const metadata = await sharp(filePath).metadata();
            console.log(`${file.padEnd(35)} ${metadata.width}x${metadata.height}`);
        } catch (error) {
            console.log(`${file.padEnd(35)} ERROR: ${error.message}`);
        }
    }
}

getImageDimensions();
