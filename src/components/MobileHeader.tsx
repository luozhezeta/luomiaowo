import { site } from "../data/site";
import { useTheme } from "../hooks/useTheme";
import { Link } from "../router";
import { MenuIcon, MoonIcon, SunIcon } from "./Icons";

interface MobileHeaderProps {
  open: boolean;
  onToggle: () => void;
}

export function MobileHeader({ open, onToggle }: MobileHeaderProps) {
  const { theme, toggle } = useTheme();
  const nextLabel = theme === "dark" ? "切换到浅色模式" : "切换到深色模式";

  return (
    <div className="mobilebar">
      <button
        type="button"
        className="icon-btn"
        onClick={onToggle}
        aria-label="打开菜单"
        aria-expanded={open}
        aria-controls="sidebar-nav"
      >
        <MenuIcon />
      </button>

      <Link className="brand" to="/" aria-label={`${site.name} 个人主页`}>
        <span className="brand__mark" aria-hidden="true">
          洛
        </span>
        <span className="brand__text">
          <strong>{site.handle}</strong>
        </span>
      </Link>

      <span className="mobilebar__spacer" />

      <button type="button" className="icon-btn" onClick={toggle} aria-label={nextLabel} title={nextLabel}>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
