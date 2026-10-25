// Добавляет type="button" всем <button> без явного type (кроме type="submit").
// Запуск: node scripts/add-button-type.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const files = [];
function walk(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (name.name.endsWith(".tsx")) files.push(p);
  }
}
walk("src");

let total = 0;
for (const file of files) {
  let src = readFileSync(file, "utf8");
  const re = /<button\b(?![^>]*\stype=)([^>]*)>/gs;
  let count = 0;
  src = src.replace(re, (_m, attrs) => {
    count++;
    return `<button type="button"${attrs}>`;
  });
  if (count) {
    writeFileSync(file, src);
    total += count;
    console.log(`✓ ${file} (+${count})`);
  }
}
console.log(`Всего: ${total}`);
