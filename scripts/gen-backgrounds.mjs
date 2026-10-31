// 扫描 public/backgrounds 生成图片清单，新增/删除图片后重新运行即可
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dir = join(root, "public", "backgrounds");
const allowed = new Set([".webp", ".avif", ".jpg", ".jpeg", ".png"]);

const files = existsSync(dir)
  ? readdirSync(dir)
      .filter((name) => allowed.has(extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "en"))
  : [];

const content = `// 由 scripts/gen-backgrounds.mjs 自动生成，请勿手动修改
export const backgroundFiles = [${files.map((name) => `"/backgrounds/${name}"`).join(", ")}] as const;
`;

writeFileSync(join(root, "src", "data", "backgrounds.generated.ts"), content, "utf8");
console.log(`[backgrounds] ${files.length} 张图片已登记`);
