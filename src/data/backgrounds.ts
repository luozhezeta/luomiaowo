import { backgroundsByOrientation } from "./backgrounds.generated";

export type Orientation = "landscape" | "portrait";

/** 两套图库：横屏用 landscape，竖屏用 portrait */
export const backgrounds = backgroundsByOrientation;

/** 按屏幕方向挑图；某一侧为空时退回另一侧，两边都空则返回 null。 */
export function pickBackground(orientation: Orientation): string | null {
  const primary: readonly string[] = backgroundsByOrientation[orientation];
  const fallback: readonly string[] =
    backgroundsByOrientation[orientation === "landscape" ? "portrait" : "landscape"];
  const pool = primary.length > 0 ? primary : fallback;
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
