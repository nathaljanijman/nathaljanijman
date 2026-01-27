#!/usr/bin/env node

/**
 * Responsive Images Generator
 *
 * Generates multiple sizes of each image for responsive loading
 * Expected performance improvement:
 * - LCP: 3-4s → 1.5-2s (-50%)
 * - Mobile data: 24MB → 5-8MB (-70%)
 * - Performance score: +15-20 points
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    inputDir: path.join(__dirname, '../images'),
    outputDir: path.join(__dirname, '../images/responsive'),

    // Responsive sizes to generate
    sizes: {
        hero: [400, 800, 1200, 1920],      // Hero images
        project: [400, 600, 800],          // Project cards
        about: [400, 600],                 // About section
        general: [400, 800, 1200]          // Other images
    },

    // Quality settings per size
    quality: {
        400: 85,   // Mobile - higher quality for small screens
        600: 82,
        800: 80,
        1200: 78,
        1920: 75   // Desktop - lower quality acceptable on large screens
    },

    // Images to process (main performance bottlenecks)
    targets: [
        'nathalja-hero.webp',
        'nathalja-work.webp',
        'nathalja-about.webp',
        'project-abn-amro.webp',
        'project-balr.webp',
        'project-dhgate.webp',
        'project-slopez.webp',
        'project-sprintplanner.webp'
    ]
};

// Ensure output directory exists
if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log('✅ Created responsive directory:', CONFIG.outputDir);
}

/**
 * Determine which sizes to generate based on filename
 */
function getSizesForImage(filename) {
    const name = filename.toLowerCase();

    if (name.includes('hero') || name.includes('work')) {
        return CONFIG.sizes.hero;
    }
    if (name.includes('project-')) {
        return CONFIG.sizes.project;
    }
    if (name.includes('about')) {
        return CONFIG.sizes.about;
    }

    return CONFIG.sizes.general;
}

/**
 * Get file size in KB
 */
function getFileSizeKB(filepath) {
    const stats = fs.statSync(filepath);
    return (stats.size / 1024).toFixed(2);
}

/**
 * Generate responsive variants for a single image
 */
async function generateResponsiveVariants(filename) {
    try {
        const inputPath = path.join(CONFIG.inputDir, filename);

        if (!fs.existsSync(inputPath)) {
            console.log(`⏭️  Skipping (not found): ${filename}`);
            return null;
        }

        const originalSize = getFileSizeKB(inputPath);
        const nameWithoutExt = path.basename(filename, path.extname(filename));
        const sizes = getSizesForImage(filename);

        console.log(`\n📸 Processing: ${filename} (${originalSize} KB)`);
        console.log(`   Generating ${sizes.length} sizes: ${sizes.join('w, ')}w`);

        const variants = [];

        for (const width of sizes) {
            const outputFilename = `${nameWithoutExt}-${width}w.webp`;
            const outputPath = path.join(CONFIG.outputDir, outputFilename);

            // Generate variant
            await sharp(inputPath)
                .resize(width, null, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({
                    quality: CONFIG.quality[width] || 80,
                    effort: 6
                })
                .toFile(outputPath);

            const variantSize = getFileSizeKB(outputPath);
            const reduction = ((1 - variantSize / originalSize) * 100).toFixed(1);

            console.log(`   ✅ ${width}w: ${variantSize} KB (${reduction}% smaller)`);

            variants.push({
                width,
                path: outputPath,
                size: parseFloat(variantSize),
                reduction: parseFloat(reduction)
            });
        }

        return {
            original: filename,
            originalSize: parseFloat(originalSize),
            variants
        };

    } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
        return null;
    }
}

/**
 * Main execution
 */
async function main() {
    console.log('\n🚀 Generating Responsive Images...\n');
    console.log('📁 Input directory:', CONFIG.inputDir);
    console.log('📁 Output directory:', CONFIG.outputDir);
    console.log(`🎯 Target images: ${CONFIG.targets.length}\n`);

    const results = [];

    for (const filename of CONFIG.targets) {
        const result = await generateResponsiveVariants(filename);
        if (result) {
            results.push(result);
        }
    }

    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('📊 RESPONSIVE IMAGES SUMMARY');
    console.log('='.repeat(70));

    let totalOriginal = 0;
    let totalVariants = 0;
    let variantCount = 0;

    results.forEach(result => {
        totalOriginal += result.originalSize;
        result.variants.forEach(variant => {
            totalVariants += variant.size;
            variantCount++;
        });
    });

    const avgReduction = ((1 - totalVariants / (totalOriginal * (variantCount / results.length))) * 100).toFixed(1);

    console.log(`\n✅ Processed: ${results.length} images`);
    console.log(`📦 Generated: ${variantCount} responsive variants`);
    console.log(`📦 Average size reduction: ${avgReduction}% per variant`);
    console.log(`📦 Total output: ${totalVariants.toFixed(2)} KB (${(totalVariants / 1024).toFixed(2)} MB)`);
    console.log(`\n💾 Responsive images saved to: ${CONFIG.outputDir}`);

    // Generate srcset snippets
    console.log('\n📝 HTML SRCSET SNIPPETS:\n');

    results.forEach(result => {
        const srcset = result.variants
            .map(v => `images/responsive/${path.basename(v.path)} ${v.width}w`)
            .join(',\n        ');

        console.log(`<!-- ${result.original} -->`);
        console.log(`<img`);
        console.log(`  srcset="${srcset}"`);
        console.log(`  sizes="(max-width: 768px) 100vw, 80vw"`);
        console.log(`  src="images/responsive/${path.basename(result.variants[1].path)}"`);
        console.log(`  loading="lazy"`);
        console.log(`  alt="..."`);
        console.log(`/>\n`);
    });

    console.log('Next steps:');
    console.log('1. Update HTML with srcset attributes (see snippets above)');
    console.log('2. Add preload for hero image');
    console.log('3. Test locally');
    console.log('4. Deploy!\n');
}

// Run
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
