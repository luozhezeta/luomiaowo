export interface CreditAccount {
  label: string;
  href: string;
}

export interface CreditWork {
  title: string;
  image?: string;
  href?: string;
  note?: string;
}

export interface CreditAuthor {
  id: string;
  name: string;
  role: string;
  /** 头像图片；没有时用 initial 生成字母头像 */
  avatar?: string;
  initial: string;
  accounts: CreditAccount[];
  works: CreditWork[];
  note?: string;
}

export const creditAuthors: CreditAuthor[] = [
  {
    id: "vsinger",
    name: "上海禾念 / Vsinger",
    role: "官方插画与角色版权",
    initial: "禾",
    accounts: [
      { label: "Vsinger 官网", href: "https://vsinger.com/" },
      { label: "B 站 @Vsinger", href: "https://space.bilibili.com/3235718" },
    ],
    works: [],
    note: "本站背景图库中带 ©洛天依 / ©SHANGHAI HENIAN 水印的图片，版权归上海禾念信息科技有限公司所有，仅作个人主页装饰使用。",
  },
  {
    id: "tid",
    name: "TID",
    role: "插画师 · 洛天依官方绘师",
    avatar: "/avatars/tid.webp",
    initial: "T",
    accounts: [{ label: "Pixiv 418969", href: "https://www.pixiv.net/users/418969" }],
    works: [
      {
        title: "恭贺新禧",
        image: "/backgrounds/landscape/01.webp",
        href: "https://www.pixiv.net/artworks/66987311",
        note: "2018 新年贺图，本站用作桌面背景",
      },
      {
        title: "白",
        image: "/backgrounds/landscape/18.webp",
        note: "官图文件夹收录 · 名称暂拟",
      },
      {
        title: "花灯",
        image: "/backgrounds/landscape/19.webp",
        note: "官图文件夹收录 · 名称暂拟",
      },
      {
        title: "四叶草",
        image: "/backgrounds/landscape/20.webp",
        note: "官图文件夹收录 · 名称暂拟",
      },
      {
        title: "星夜",
        image: "/backgrounds/landscape/21.webp",
        note: "官图文件夹收录 · 名称暂拟",
      },
      {
        title: "泡泡",
        image: "/backgrounds/landscape/22.webp",
        note: "官图文件夹收录 · 名称暂拟",
      },
    ],
    note: "官图文件夹里有 5 张标了 TID 的作品，分别是白裙、花灯、四叶草、星夜、泡泡这五张；加上《恭贺新禧》，共 6 张收录在本站图库。",
  },
  {
    id: "ideolo",
    name: "ideolo",
    role: "插画师 · 洛天依角色设定",
    initial: "i",
    accounts: [{ label: "Pixiv 61513", href: "https://www.pixiv.net/users/61513" }],
    works: [
      {
        title: "⭐洛天依-10th⭐",
        href: "https://www.pixiv.net/artworks/99673005",
        note: "洛天依十周年贺图（2022）",
      },
    ],
    note: "VOCALOID CHINA PROJECT 洛天依 / 乐正绫角色设定参与者，neko work 共同创立者。",
  },
  {
    id: "dragon",
    name: "ドラゴン",
    role: "插画师 · 别名 dragon修罗",
    initial: "ド",
    accounts: [{ label: "Pixiv 12501628", href: "https://www.pixiv.net/users/12501628" }],
    works: [
      {
        title: "桜 洛天依",
        href: "https://www.pixiv.net/artworks/59477657",
        note: "樱花与校服，本站曾用作参考",
      },
    ],
  },
  {
    id: "unknown",
    name: "来源待确认",
    role: "未登记的转载图",
    initial: "?",
    accounts: [],
    works: [
      { title: "竖图 · 线稿", image: "/backgrounds/portrait/01.webp", note: "抖音来源，作者未知" },
      { title: "横图 · 场景", image: "/backgrounds/landscape/02.webp", note: "抖音来源，作者未知" },
    ],
    note: "这些图片来自网络转载，暂未找到原作者。如果你知道出处，欢迎告诉我补上。",
  },
];
