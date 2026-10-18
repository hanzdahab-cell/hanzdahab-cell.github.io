import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IN_DIR = path.join(path.resolve(), 'public', 'images', 'home-hero');
const OUT_DIR = IN_DIR; // place enhanced images alongside

async function enhance(file) {
  const src = path.join(IN_DIR, file);
  const name = path.parse(file).name;
  const out = path.join(OUT_DIR, `enhanced-${name}.webp`);
  try {
    console.log('Processing', file);
    await sharp(src)
      .rotate()
      .resize({ width: 7680, withoutEnlargement: false, kernel: 'lanczos3' })
      .sharpen()
      .modulate({ saturation: 1.05 })
      .normalize()
      .webp({ quality: 90, alphaQuality: 90 })
      .toFile(out);
    console.log('Wrote', out);
  } catch (e) {
    console.error('Failed', file, e);
  }
}

(async () => {
  const files = fs.readdirSync(IN_DIR).filter(f => /\.(png|jpe?g|webp)$/i.test(f));
  for (const f of files) {
    await enhance(f);
  }
  console.log('Done');
})();
