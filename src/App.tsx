import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { MobileHeader } from "./components/MobileHeader";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { PanelLeftIcon } from "./components/Icons";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SharePage } from "./pages/SharePage";
import { ThanksPage } from "./pages/ThanksPage";
import { useBackground } from "./hooks/useBackground";
import { Link, usePath } from "./router";
import { matchRoute } from "./routes";

const placeholders: Record<string, string> = {
  "/": "首页还没想好放什么，先留一块空白。",
  "/shudong": "一个可以匿名说点什么的地方，功能还在做。",
  "/games": "几个零碎的小游戏，做完会搬上来。",
};

const headings: Record<string, { title?: string; subtitle?: string }> = {
  "/": { title: "洛喵窝", subtitle: "Luo Tianyi's fans' den" },
  "/shudong": { subtitle: "Tree Hole" },
  "/games": { subtitle: "Games" },
};

const SIDEBAR_KEY = "luozhe-sidebar";

function readCollapsed(): boolean {
  try {
    return localStorage.getItem(SIDEBAR_KEY) === "collapsed";
  } catch {
    return false;
  }
}

export default function App() {
  const path = usePath();
  const route = matchRoute(path);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const { url: backgroundUrl, ready: backgroundReady } = useBackground();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.title = route?.title ?? "页面不存在 · 洛哲";
  }, [route]);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_KEY, collapsed ? "collapsed" : "expanded");
    } catch {
      /* 隐私模式下忽略 */
    }
  }, [collapsed]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // 有背景图时侧栏改成不透明，避免条纹/照片从半透明面板里透出来
  useEffect(() => {
    document.documentElement.classList.toggle("has-photo", backgroundReady);
    return () => {
      document.documentElement.classList.remove("has-photo");
    };
  }, [backgroundReady]);

  return (
    <>
      <div
        className={backgroundReady ? "backdrop has-photo" : "backdrop"}
        aria-hidden="true"
        style={
          backgroundUrl
            ? ({ "--bg-photo": `url("${backgroundUrl}")` } as CSSProperties)
            : undefined
        }
      >
        <span className="backdrop__photo" />
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="blob blob--3" />
      </div>

      <a className="skip-link" href="#main">
        跳到主要内容
      </a>

      <div className={collapsed ? "app-shell is-collapsed" : "app-shell"}>
        <Sidebar current={path} open={menuOpen} collapsed={collapsed} onClose={closeMenu} />

        {menuOpen ? (
          <button type="button" className="scrim" aria-label="关闭菜单" onClick={closeMenu} />
        ) : null}

        <div className="content">
          <MobileHeader open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} />

          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? "展开侧边栏" : "折叠侧边栏"}
            aria-pressed={collapsed}
            title={collapsed ? "展开侧边栏" : "折叠侧边栏"}
          >
            <PanelLeftIcon />
          </button>

          <main id="main" key={path} className="route">
            {route?.path === "/profile" ? (
              <ProfilePage />
            ) : route?.path === "/thanks" ? (
              <ThanksPage />
            ) : route?.path === "/share" ? (
              <SharePage />
            ) : route ? (
              <PlaceholderPage
                kicker={headings[route.path] ? undefined : route.kicker}
                title={headings[route.path]?.title ?? route.label}
                subtitle={headings[route.path]?.subtitle}
                lede={placeholders[route.path] ?? ""}
              />
            ) : (
              <PlaceholderPage
                kicker="404"
                title="页面不存在"
                lede="这个地址没有对应内容，回首页看看。"
                action={
                  <Link className="btn btn--accent" to="/">
                    回到首页
                  </Link>
                }
              />
            )}
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
