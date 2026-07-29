const fs = require('fs');

const files = [
  'index.html',
  'brampton.html', 'mississauga.html', 'caledon.html', 'georgetown.html',
  'halton-hills.html', 'acton.html', 'hillsburgh.html', 'erin.html',
  'orangeville.html', 'bolton.html',
];

const replacements = [
  {
    search: '<img src="totemove-logo.png" alt="Tote Move" class="site-logo" width="160" height="44" />',
    replace: '<picture><source srcset="totemove-logo.webp" type="image/webp" /><img src="totemove-logo.png" alt="Tote Move" class="site-logo" width="160" height="44" /></picture>',
  },
  {
    search: '<img src="totemove-logo.png" alt="Tote Move" class="footer-logo" width="48" height="48" loading="lazy" />',
    replace: '<picture><source srcset="totemove-logo.webp" type="image/webp" /><img src="totemove-logo.png" alt="Tote Move" class="footer-logo" width="48" height="48" loading="lazy" /></picture>',
  },
  {
    search: '<img src="outside-totes.png" alt="Stacked moving totes ready for delivery" width="600" height="520" loading="eager" />',
    replace: '<picture><source srcset="outside-totes.webp" type="image/webp" /><img src="outside-totes.png" alt="Stacked moving totes ready for delivery" width="600" height="520" loading="eager" /></picture>',
  },
  {
    search: '<img src="garage.png" alt="Tote inventory ready for rental" class="stat-photo" width="600" height="480" loading="lazy" />',
    replace: '<picture><source srcset="garage.webp" type="image/webp" /><img src="garage.png" alt="Tote inventory ready for rental" class="stat-photo" width="600" height="480" loading="lazy" /></picture>',
  },
];

let totalChanges = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changes = 0;

  for (const { search, replace } of replacements) {
    const count = (content.split(search).length - 1);
    if (count > 0) {
      content = content.replaceAll(search, replace);
      changes += count;
    }
  }

  if (changes > 0) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`updated: ${file} (${changes} replacements)`);
    totalChanges += changes;
  } else {
    console.log(`skipped: ${file} (no matches)`);
  }
}

console.log(`\nDone — ${totalChanges} total replacements`);
