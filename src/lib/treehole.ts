import type { TreeHolePost } from "../data/treehole";

function textOf(post: TreeHolePost): string[] {
  if (post.blocks?.length) {
    return post.blocks.filter((block) => block.type === "text").map((block) => block.text);
  }
  return post.paragraphs;
}

/** 正文字数（不算空白） */
export function charCount(post: TreeHolePost): number {
  return textOf(post).join("").replace(/\s/g, "").length;
}

/** 按每分钟 400 字估算阅读时长 */
export function readMinutes(post: TreeHolePost): number {
  return Math.max(1, Math.round(charCount(post) / 400));
}

export function postSummary(post: TreeHolePost): string {
  if (post.summary) return post.summary;
  const first = textOf(post)[0] ?? "";
  return first.length > 60 ? `${first.slice(0, 60)}…` : first;
}

export function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${year}-${month}-${day}`;
}
