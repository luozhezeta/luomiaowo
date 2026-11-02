export interface RouteDef {
  path: string;
  label: string;
  title: string;
  kicker: string;
}

/** 主导航里的四个页面 */
export const routes: RouteDef[] = [
  { path: "/", label: "首页", title: "洛喵窝 · 洛哲", kicker: "Home" },
  { path: "/shudong", label: "树洞", title: "树洞 · 洛哲", kicker: "Tree Hole" },
  { path: "/games", label: "小游戏", title: "小游戏 · 洛哲", kicker: "Games" },
  { path: "/profile", label: "个人简介", title: "个人简介 · 洛哲", kicker: "Profile" },
];

/** 不在主导航里、但需要独立页面的路由 */
export const thanksRoute: RouteDef = {
  path: "/thanks",
  label: "特别鸣谢",
  title: "特别鸣谢 · 洛哲",
  kicker: "Special Thanks",
};

export const allRoutes: RouteDef[] = [...routes, thanksRoute];

export function matchRoute(path: string): RouteDef | undefined {
  return allRoutes.find((route) => route.path === path);
}
