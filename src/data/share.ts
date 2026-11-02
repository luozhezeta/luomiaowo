export type ShareKind = "video" | "music";
export type SharePlatform = "bilibili" | "netease" | "qqmusic" | "local";

export interface ShareItem {
  /** 用于路由与评论分页的唯一标识 */
  id: string;
  kind: ShareKind;
  title: string;
  /** UP 主 / 歌手 / 出处 */
  author: string;
  platform: SharePlatform;
  /** 原站链接 */
  href: string;
  /** B 站填 BV 号，网易云填歌曲 id；本地文件留空 */
  embedId?: string;
  /** 封面图，放在 public/share/ 下 */
  cover?: string;
  /** 一句推荐语 */
  note?: string;
  date?: string;
  /** 没有真实内容时的占位封面 */
  placeholder?: boolean;
}

/**
 * 分享列表：视频 / 音乐都往这里加，页面会自动分类。
 * B 站：https://www.bilibili.com/video/BV1xx411c7mD → embedId "BV1xx411c7mD"
 * 网易云：https://music.163.com/#/song?id=1234567 → embedId "1234567"
 */
export const shareItems: ShareItem[] = [];

export const shareConfig = {
  /** 填腾讯云开发 CloudBase 的环境 ID 后，详情页会自动加载 Twikoo 评论区；留空则显示提示 */
  twikooEnvId: "",
  submitEmail: "luozhe520@yeah.net",
};
