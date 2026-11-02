import { useEffect } from "react";
import { site } from "../data/site";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useTheme } from "../hooks/useTheme";
import { Link } from "../router";
import { routes, thanksRoute } from "../routes";
import {
  ChatIcon,
  CloseIcon,
  GamepadIcon,
  HeartIcon,
  HomeIcon,
  MailIcon,
  MoonIcon,
  PlayIcon,
  SunIcon,
  UserIcon,
} from "./Icons";

const icons: Record<string, typeof HomeIcon> = {
  "/": HomeIcon,
  "/share": PlayIcon,
  "/shudong": ChatIcon,
  "/games": GamepadIcon,
  "/profile": UserIcon,
};

interface SidebarProps {
  current: string;
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
}

export function Sidebar({ current, open, collapsed, onClose }: SidebarProps) {
  const { theme, toggle } = useTheme();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const nextLabel = theme === "dark" ? "切换到浅色模式" : "切换到深色模式";
  const themeLabel = theme === "dark" ? "浅色模式" : "深色模式";

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <aside
      id="sidebar-nav"
      className={`sidebar${open ? " is-open" : ""}${collapsed ? " is-collapsed" : ""}`}
      aria-label="侧边导航"
      inert={isMobile && !open ? true : undefined}
    >
      <div className="sidebar__brand">
        <Link className="brand" to="/" onClick={onClose} aria-label={`${site.name} 个人主页`}>
          <span className="brand__mark" aria-hidden="true">
            洛
          </span>
          <span className="brand__text">
            <strong>{site.handle}</strong>
            <span className="brand__tld">{site.domain.slice(site.handle.length)}</span>
          </span>
        </Link>
        <button type="button" className="icon-btn sidebar__close" onClick={onClose} aria-label="关闭菜单">
          <CloseIcon />
        </button>
      </div>

      <nav className="sidebar__nav" aria-label="主导航">
        <p className="sidebar__label">导航</p>
        {routes.map((route) => {
          const Icon = icons[route.path] ?? HomeIcon;
          return (
            <Link
              key={route.path}
              to={route.path}
              className="sidebar__link"
              onClick={onClose}
              title={route.label}
              aria-label={route.label}
              aria-current={current === route.path ? "page" : undefined}
            >
              <Icon />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__foot">
        <div className="sidebar__actions">
          <button
            type="button"
            className="sidebar__theme"
            onClick={toggle}
            aria-label={nextLabel}
            title={nextLabel}
          >
            {/* key 变化时重新挂载，触发一次缩放出现 */}
            <span className="theme-icon" key={theme}>
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </span>
            <span className="theme-label">{themeLabel}</span>
          </button>

          <a className="btn btn--accent" href={`mailto:${site.email}`} title="联系我" aria-label="联系我">
            <MailIcon width={15} height={15} />
            <span className="btn__label">联系我</span>
          </a>

          <Link
            className="sidebar__thanks"
            to={thanksRoute.path}
            onClick={onClose}
            title={thanksRoute.label}
            aria-label={thanksRoute.label}
            aria-current={current === thanksRoute.path ? "page" : undefined}
          >
            <HeartIcon />
            <span>{thanksRoute.label}</span>
          </Link>
        </div>

        <div className="sidebar__meta">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <a href={site.github} target="_blank" rel="noreferrer noopener">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
