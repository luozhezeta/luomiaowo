// 扫描 public/backgrounds/{landscape,portrait} 生成两套图片清单
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const base = join(root, "public", "backgrounds");
const allowed = new Set([".webp", ".avif", ".jpg", ".jpeg", ".png"]);

function list(dirName) {
  const dir = join(base, dirName);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => allowed.has(extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en"))
    .map((name) => `"/backgrounds/${dirName}/${name}"`);
}

const landscape = list("landscape");
const portrait = list("portrait");

const content = `// 由 scripts/gen-backgrounds.mjs 自动生成，请勿手动修改
export const backgroundsByOrientation = {
  landscape: [${landscape.join(", ")}],
  portrait: [${portrait.join(", ")}],
} as const;
`;

writeFileSync(join(root, "src", "data", "backgrounds.generated.ts"), content, "utf8");
console.log(`[backgrounds] landscape ${landscape.length} 张 / portrait ${portrait.length} 张`);
