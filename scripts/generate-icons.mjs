// Генерация PWA-иконок и favicon из логотипа-обезьянки.
// Запуск: pnpm icons  (node scripts/generate-icons.mjs)
import { mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const INK = "#1e1a11";
const WHITE = "#fffdf8";
const BODY = "#cd8c52";
const FACE = "#f7dcb8";
const BG = "#FEF4EB";

// Standalone-версия MonkeyLogo.tsx: CSS-переменные заменены на литеральные цвета,
// добавлен кремовый фон под стиль приложения.
const svg = (size) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
  <defs>
    <g id="eye">
      <circle cx="390" cy="505" r="97" fill="${WHITE}"/>
      <circle cx="390" cy="505" r="97" fill="none" stroke="${INK}" stroke-width="22"/>
      <circle cx="390" cy="512" r="54" fill="${INK}"/>
      <circle cx="370" cy="490" r="22" fill="${WHITE}"/>
    </g>
  </defs>
  <rect width="1024" height="1024" rx="224" fill="${BG}"/>
  <circle cx="128" cy="420" r="112" fill="${BODY}" stroke="${INK}" stroke-width="24"/>
  <circle cx="128" cy="420" r="56" fill="${FACE}"/>
  <circle cx="896" cy="420" r="112" fill="${BODY}" stroke="${INK}" stroke-width="24"/>
  <circle cx="896" cy="420" r="56" fill="${FACE}"/>
  <circle cx="512" cy="560" r="382" fill="${BODY}" stroke="${INK}" stroke-width="26"/>
  <path d="M470 192 C 470 142 566 134 572 182 C 576 216 524 224 516 194" fill="none" stroke="${INK}" stroke-width="20" stroke-linecap="round"/>
  <path d="M512 344 C 396 310 268 366 254 474 C 244 560 300 622 372 664 C 330 710 318 778 356 822 C 396 868 628 868 668 822 C 706 778 694 710 652 664 C 724 622 780 560 770 474 C 756 366 628 310 512 344 Z" fill="${FACE}"/>
  <use href="#eye"/>
  <use href="#eye" x="244"/>
  <ellipse cx="466" cy="672" rx="14" ry="21" fill="${INK}"/>
  <ellipse cx="558" cy="672" rx="14" ry="21" fill="${INK}"/>
  <path d="M 412 724 Q 512 796 612 724" fill="none" stroke="${INK}" stroke-width="18" stroke-linecap="round"/>
</svg>`);

const targets = [
  ["public/icons/android-chrome-512x512.png", 512],
  ["public/icons/android-chrome-192x192.png", 192],
  ["public/icons/apple-touch-icon-1024x1024.png", 1024],
  ["public/icons/apple-touch-icon-180x180.png", 180],
  ["public/icons/favicon-32x32.png", 32],
  ["public/icons/favicon-16x16.png", 16],
  ["logo.png", 512],
];

mkdirSync("public/icons", { recursive: true });

for (const [file, size] of targets) {
  await sharp(svg(size)).png().toFile(file);
  console.log(`✓ ${file} (${size}x${size})`);
}

// favicon.ico: PNG-в-ICO (поддерживается всеми современными браузерами)
const icoSizes = [16, 32, 48];
const pngs = [];
for (const s of icoSizes) {
  pngs.push(await sharp(svg(s)).png().toBuffer());
}

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(icoSizes.length, 4);

let offset = 6 + 16 * icoSizes.length;
const entries = [];
for (let i = 0; i < icoSizes.length; i++) {
  const s = icoSizes[i];
  const e = Buffer.alloc(16);
  e.writeUInt8(s === 256 ? 0 : s, 0);
  e.writeUInt8(s === 256 ? 0 : s, 1);
  e.writeUInt16LE(1, 2); // planes
  e.writeUInt16LE(32, 4); // bpp
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  entries.push(e);
}

writeFileSync("public/favicon.ico", Buffer.concat([header, ...entries, ...pngs]));
console.log("✓ public/favicon.ico (16/32/48)");

// favicon.svg для includeAssets в vite.config.ts
writeFileSync("public/favicon.svg", svg(64).toString());
console.log("✓ public/favicon.svg");
