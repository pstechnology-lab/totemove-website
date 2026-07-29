const sharp = require('sharp');
const path = require('path');

const images = [
  { input: 'outside-totes.png', output: 'outside-totes.webp', quality: 82 },
  { input: 'garage.png',        output: 'garage.webp',        quality: 82 },
  { input: 'totemove-logo.png', output: 'totemove-logo.webp', quality: 90 },
  { input: 'logo.png',          output: 'logo.webp',          quality: 90 },
];

(async () => {
  for (const img of images) {
    const info = await sharp(img.input)
      .webp({ quality: img.quality })
      .toFile(img.output);
    const inputSize  = require('fs').statSync(img.input).size;
    const outputSize = info.size;
    const saving     = Math.round((1 - outputSize / inputSize) * 100);
    console.log(`${img.input} → ${img.output}  ${(inputSize/1024).toFixed(0)} KB → ${(outputSize/1024).toFixed(0)} KB  (${saving}% smaller)`);
  }
})();
