export type ProjectIcon = "radar" | "layers" | "terminal";

export interface Project {
  title: string;
  blurb: string;
  tags: string[];
  href: string;
  icon: ProjectIcon;
}

export interface Post {
  date: string;
  title: string;
  tag: string;
  href: string;
}

/**
 * 站点内容集中在这里改：文案、链接、项目、文章。
 */
export const site = {
  name: "洛哲",
  handle: "luozhe",
  domain: "luozhe.link",
  role: "在校大学生",
  tagline: "一个阴暗的二次元，锦依卫，我将在此地留下我的见闻，趣事",
  intro:
    "白天写界面，晚上折腾域名和小工具。这里放我做过的项目、写过的文章，以及一些还没做完的想法。",
  status: "接受小项目合作",
  email: "luozhe520@yeah.net",
  qq: "3115124842",
  github: "https://github.com/luozhe",
  skills: ["TypeScript", "React", "Astro", "Tailwind CSS", "Node.js", "Figma", "Rust（学习中）"],
};

export const projects: Project[] = [
  {
    title: "Domain Radar",
    blurb: "一次查清多家注册商的首年价和续费价，到期前用邮件提醒，不用再靠优惠码赌运气。",
    tags: ["TypeScript", "Workers"],
    href: "#",
    icon: "radar",
  },
  {
    title: "Mica UI",
    blurb: "Win11 风格的 React 组件集：亚克力材质、专注外框、50ms 的悬停反馈。",
    tags: ["React", "CSS"],
    href: "#",
    icon: "layers",
  },
  {
    title: "Rainlog",
    blurb: "在命令行里记灵感，收工后自动整理成一篇可发布的 Markdown 文章。",
    tags: ["Go", "SQLite"],
    href: "#",
    icon: "terminal",
  },
];

export const posts: Post[] = [
  {
    date: "2026-09-18",
    title: "为什么我把个人站重写成纯静态",
    tag: "工程",
    href: "#",
  },
  {
    date: "2026-08-02",
    title: "域名后缀的信任成本",
    tag: "随笔",
    href: "#",
  },
  {
    date: "2026-06-21",
    title: "用 40 行 CSS 复刻 Win11 的亚克力材质",
    tag: "前端",
    href: "#",
  },
];
