export type CreditGroup = "tech" | "art";

export interface CreditAccount {
  label: string;
  href?: string;
}

export interface CreditWork {
  /** 有正式标题时才填；未知留空，只展示图片 */
  title?: string;
  image?: string;
  href?: string;
  note?: string;
}

export interface CreditAuthor {
  id: string;
  name: string;
  role: string;
  group: CreditGroup;
  /** 卡片上的补充介绍，有内容时卡片会变宽 */
  tagline?: string;
  /** 头像图片；没有时用 initial 生成字母头像 */
  avatar?: string;
  initial: string;
  accounts: CreditAccount[];
  works: CreditWork[];
  note?: string;
}

export const creditGroups: { id: CreditGroup; title: string }[] = [
  { id: "tech", title: "技术支持" },
  { id: "art", title: "背景图" },
];

export const creditAuthors: CreditAuthor[] = [
  {
    id: "chuzoux",
    name: "chuzouX",
    role: "一只出走离开世界",
    group: "tech",
    tagline:
      "接下来出场的是1301技术骨干，音游主理人，王者发育路制裁者，程序与人机具象化呈现体，本站创作天使投资人（非经济层面）",
    avatar: "/avatars/chuzoux.webp",
    initial: "C",
    accounts: [{ label: "个人主页", href: "https://chuzoux.top/" }],
    works: [],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    role: "AI 模型支持",
    group: "tech",
    avatar: "/avatars/deepseek.webp",
    initial: "D",
    accounts: [
      { label: "官网", href: "https://www.deepseek.com/" },
      { label: "对话", href: "https://chat.deepseek.com/" },
    ],
    works: [],
  },
  {
    id: "vsinger",
    name: "Vsinger 官方",
    role: "官方插画与版权方",
    group: "art",
    avatar: "/avatars/vsinger.webp",
    initial: "V",
    accounts: [
      { label: "Vsinger 官网", href: "https://vsinger.com/" },
      { label: "B 站 @Vsinger", href: "https://space.bilibili.com/3235718" },
    ],
    works: [
      { image: "/backgrounds/landscape/03.webp" },
      { image: "/backgrounds/landscape/07.webp" },
      { image: "/backgrounds/landscape/12.webp" },
      { image: "/backgrounds/landscape/14.webp" },
      { image: "/backgrounds/landscape/15.webp" },
      { image: "/backgrounds/landscape/16.webp" },
    ],
    note: "图库中带 ©洛天依 / ©SHANGHAI HENIAN 水印的官方插画，版权归上海禾念信息科技有限公司所有，仅作个人主页装饰使用。",
  },
  {
    id: "tid",
    name: "TID",
    role: "插画师 · 洛天依官方绘师",
    group: "art",
    avatar: "/avatars/tid.webp",
    initial: "T",
    accounts: [{ label: "Pixiv 418969", href: "https://www.pixiv.net/users/418969" }],
    works: [
      {
        image: "/backgrounds/landscape/01.webp",
        href: "https://www.pixiv.net/artworks/66987311",
      },
      { image: "/backgrounds/landscape/18.webp" },
      { image: "/backgrounds/landscape/19.webp" },
      { image: "/backgrounds/landscape/20.webp" },
      { image: "/backgrounds/landscape/21.webp" },
      { image: "/backgrounds/landscape/22.webp" },
    ],
  },
  {
    id: "xunxiaolin",
    name: "珣小林",
    role: "抖音创作者",
    group: "art",
    avatar: "/avatars/xunxiaolin.webp",
    initial: "珣",
    accounts: [
      {
        label: "抖音 · 珣小林^u^",
        href: "https://www.douyin.com/user/MS4wLjABAAAAsIIdi1j-VchWnWoXTaX4GtXC-ba9HBDQ59_clhlZRxA",
      },
    ],
    works: [{ image: "/backgrounds/portrait/01.webp" }],
  },
  {
    id: "roure",
    name: "爱吃肉的鱼",
    role: "抖音创作者",
    group: "art",
    avatar: "/avatars/roure.webp",
    initial: "鱼",
    accounts: [
      {
        label: "抖音 · 爱吃肉的鱼",
        href: "https://www.douyin.com/user/MS4wLjABAAAAqHkm_pA8jP7DdVbus-A_wj-hWVqDkj4JmzOFZGV72us",
      },
    ],
    works: [{ image: "/backgrounds/landscape/02.webp" }],
  },
];
