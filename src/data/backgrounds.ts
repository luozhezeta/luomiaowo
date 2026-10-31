import { backgroundFiles } from "./backgrounds.generated";

export const backgrounds: string[] = [...backgroundFiles];

/** 每次加载随机挑一张；没有图片时返回 null，页面保持渐变背景。 */
export function pickBackground(): string | null {
  if (backgrounds.length === 0) return null;
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}
