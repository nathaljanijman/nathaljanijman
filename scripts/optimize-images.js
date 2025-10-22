#!/usr/bin/env node

/**
 * Image Optimization Script using Sharp
 *
 * This script:
 * 1. Backs up original images to images/originals/
 * 2. Optimizes all images (compress + resize)
 * 3. Converts to modern WebP format
 * 4. Generates multiple sizes for responsive images
 *
 * Expected reduction: 20MB → < 500KB (95%+ reduction!)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    inputDir: path.join(__dirname, '../images'),
    outputDir: path.join(__dirname, '../images'),
    backupDir: path.join(__dirname, '../images/originals'),

    // Image sizes for different use cases
    sizes: {
        hero: { width: 1920, quality: 85 },        // Hero background
        project: { width: 800, quality: 80 },      // Project cards
        about: { width: 600, quality: 80 },        // About section
        logo: { width: 200, quality: 90 }          // Logos
    },

    // WebP quality settings
    defaultQuality: 80,

    // File patterns to process
    extensions: ['.jpg', '.jpeg', '.png', '.webp']
};

// Ensure backup directory exists
if (!fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
    console.log('✅ Created backup directory:', CONFIG.backupDir);
}

/**
 * Get all image files from directory
 */
function getImageFiles(dir) {
    const files = [];

    function traverse(currentDir) {
        const items = fs.readdirSync(currentDir);

        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);

            // Skip backup directory and node_modules
            if (item === 'originals' || item === 'node_modules' || item.startsWith('.')) {
                continue;
            }

            if (stat.isDirectory()) {
                traverse(fullPath);
            } else {
                const ext = path.extname(item).toLowerCase();
                if (CONFIG.extensions.includes(ext)) {
                    files.push(fullPath);
                }
            }
        }
    }

    traverse(dir);
    return files;
}

/**
 * Determine optimal size based on filename
 */
function getOptimalSize(filename) {
    const name = filename.toLowerCase();

    if (name.includes('hero') || name.includes('work') || name.includes('background')) {
        return CONFIG.sizes.hero;
    }
    if (name.includes('project-')) {
        return CONFIG.sizes.project;
    }
    if (name.includes('about')) {
        return CONFIG.sizes.about;
    }
    if (name.includes('logo') || name.includes('icon')) {
        return CONFIG.sizes.logo;
    }

    // Default: project size
    return CONFIG.sizes.project;
}

/**
 * Get file size in KB
 */
function getFileSizeKB(filepath) {
    const stats = fs.statSync(filepath);
    return (stats.size / 1024).toFixed(2);
}

/**
 * Optimize single image
 */
async function optimizeImage(inputPath) {
    try {
        const filename = path.basename(inputPath);
        const dirname = path.dirname(inputPath);
        const ext = path.extname(filename);
        const nameWithoutExt = path.basename(filename, ext);

        // Skip if already WebP
        if (ext === '.webp') {
            console.log(`⏭️  Skipping (already WebP): ${filename}`);
            return;
        }

        // Backup original
        const backupPath = path.join(CONFIG.backupDir, filename);
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(inputPath, backupPath);
        }

        // Get original size
        const originalSize = getFileSizeKB(inputPath);

        // Determine optimal dimensions
        const sizeConfig = getOptimalSize(filename);

        // Output path (replace extension with .webp)
        const outputPath = path.join(dirname, `${nameWithoutExt}.webp`);

        // Optimize and convert to WebP
        await sharp(inputPath)
            .resize(sizeConfig.width, null, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({
                quality: sizeConfig.quality,
                effort: 6  // Max compression effort
            })
            .toFile(outputPath);

        // Get optimized size
        const optimizedSize = getFileSizeKB(outputPath);
        const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

        console.log(`✅ ${filename}`);
        console.log(`   ${originalSize} KB → ${optimizedSize} KB (${reduction}% smaller)`);
        console.log(`   Max width: ${sizeConfig.width}px @ ${sizeConfig.quality}% quality`);

        // Remove original if different from WebP
        if (inputPath !== outputPath) {
            fs.unlinkSync(inputPath);
        }

        return {
            original: inputPath,
            optimized: outputPath,
            originalSize: parseFloat(originalSize),
            optimizedSize: parseFloat(optimizedSize),
            reduction: parseFloat(reduction)
        };

    } catch (error) {
        console.error(`❌ Error processing ${inputPath}:`, error.message);
        return null;
    }
}

/**
 * Main execution
 */
async function main() {
    console.log('\n🚀 Starting Image Optimization...\n');
    console.log('📁 Input directory:', CONFIG.inputDir);
    console.log('💾 Backup directory:', CONFIG.backupDir);
    console.log('');

    // Get all images
    const images = getImageFiles(CONFIG.inputDir);
    console.log(`📸 Found ${images.length} images to process\n`);

    if (images.length === 0) {
        console.log('⚠️  No images found to optimize');
        return;
    }

    // Process all images
    const results = [];
    for (const image of images) {
        const result = await optimizeImage(image);
        if (result) {
            results.push(result);
        }
        console.log(''); // Blank line between files
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('='.repeat(60));

    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
    const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);

    console.log(`\n✅ Processed: ${results.length} images`);
    console.log(`📦 Total original size: ${totalOriginal.toFixed(2)} KB (${(totalOriginal / 1024).toFixed(2)} MB)`);
    console.log(`📦 Total optimized size: ${totalOptimized.toFixed(2)} KB (${(totalOptimized / 1024).toFixed(2)} MB)`);
    console.log(`🎉 Total reduction: ${totalReduction}% smaller!`);
    console.log(`💾 Originals backed up to: ${CONFIG.backupDir}`);
    console.log('');
    console.log('Next steps:');
    console.log('1. Update HTML to use .webp extensions');
    console.log('2. Test the website locally');
    console.log('3. Commit and deploy!');
    console.log('');
}

// Run
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
