const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { glob } = require('glob');

async function optimizeImages() {
  const imageDir = path.join(__dirname, '../_site/images');
  const outputDir = path.join(__dirname, '../_site/images/optimized');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Find all images
  const imageFiles = await glob('**/*.{jpg,jpeg,png}', { cwd: imageDir });

  console.log(`Found ${imageFiles.length} images to optimize`);

  for (const imageFile of imageFiles) {
    const inputPath = path.join(imageDir, imageFile);
    const outputPath = path.join(outputDir, imageFile.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

    try {
      // Get image info
      const metadata = await sharp(inputPath).metadata();
      const { width, height } = metadata;

      // Create responsive sizes
      const sizes = [
        { width: Math.min(width, 400), suffix: '-400' },
        { width: Math.min(width, 800), suffix: '-800' },
        { width: Math.min(width, 1200), suffix: '-1200' },
        { width: Math.min(width, 1600), suffix: '-1600' }
      ];

      // Generate WebP versions
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .resize(sizes[0].width)
        .toFile(outputPath.replace('.webp', `${sizes[0].suffix}.webp`));

      // Generate original WebP
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      console.log(`Optimized: ${imageFile}`);
    } catch (error) {
      console.error(`Error optimizing ${imageFile}:`, error.message);
    }
  }

  console.log('Image optimization complete!');
}

optimizeImages().catch(console.error);
