import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = path.join(root, 'public', 'images', 'home-hero');
const outputDirectory = path.join(sourceDirectory, 'optimized');
const widths = [1920, 3840, 7680];
const sources = [
  ['freedive-team', 'freedive-team.jpg'],
  ['cnf-record-one', 'cnf-record-one.webp'],
  ['blue-water-diver', 'blue-water-diver.jpg'],
  ['cnf-record-two', 'cnf-record-two.webp'],
  ['ras-mohammed', 'ras-mohammed.jpg'],
  ['lighthouse-freediver', 'lighthouse-freediver.jpg'],
];

await mkdir(outputDirectory, { recursive: true });

for (const [name, file] of sources) {
  const input = path.join(sourceDirectory, file);

  for (const width of widths) {
    const height = Math.round((width * 9) / 16);
    const output = path.join(outputDirectory, `${name}-${width}.webp`);
    const background = await sharp(input)
      .rotate()
      .resize(width, height, {
        fit: 'cover',
        position: sharp.strategy.attention,
        kernel: sharp.kernel.lanczos3,
      })
      .blur(Math.max(8, Math.round(width / 120)))
      .modulate({ brightness: 0.38, saturation: 0.9 })
      .png()
      .toBuffer();
    const fullImage = await sharp(input)
      .rotate()
      .median(3)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 8, g: 31, b: 53, alpha: 0 },
        kernel: sharp.kernel.lanczos3,
      })
      .sharpen({ sigma: 0.8, m1: 0.5, m2: 1.5 })
      .png()
      .toBuffer();

    await sharp(background)
      .composite([{ input: fullImage }])
      .webp({ quality: width === 7680 ? 88 : 86, effort: 6 })
      .toFile(output);

    console.log(`Wrote ${path.relative(root, output)}`);
  }
}
