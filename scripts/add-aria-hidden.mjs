// Добавляет aria-hidden="true" декоративным <svg> без <title> и без aria-hidden.
// Запуск: node scripts/add-aria-hidden.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dirs = ["src/components", "src/app"];
const changed = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (name.endsWith(".tsx")) changed.push(p);
  }
}
dirs.forEach(walk);

for (const file of changed) {
  let src = readFileSync(file, "utf8");
  // пропускаем svg, у которых уже есть aria-hidden или есть <title> (MonkeyLogo)
  const re = /<svg\b(?![^>]*aria-hidden)([^>]*)>/gs;
  let touched = false;
  src = src.replace(re, (m, attrs) => {
    // MonkeyLogo использует <title> — aria-hidden не нужен
    if (attrs.includes("aria-labelledby")) return m;
    touched = true;
    return `<svg${attrs} aria-hidden="true">`;
  });
  if (touched) {
    writeFileSync(file, src);
    console.log(`✓ ${file}`);
  }
}
