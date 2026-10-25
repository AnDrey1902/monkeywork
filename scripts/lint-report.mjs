// Вспомогательный скрипт: вывод диагностик Biome по src/ (из report2.json)
import { readFileSync } from "node:fs";

const d = JSON.parse(readFileSync("report2.json", "utf8"));
for (const x of d.diagnostics ?? []) {
  const c = (x.category ?? "").replace("lint/", "");
  const p = String(x.location?.path ?? "")
    .split("\\")
    .join("/");
  if (!p.startsWith("src")) continue;
  console.log(`${c} | ${p}:${x.location?.start?.line}`);
}
