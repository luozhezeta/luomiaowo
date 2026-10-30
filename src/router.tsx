import {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

const ROUTE_EVENT = "dsh:routechange";

function normalize(path: string): string {
  if (!path || path === "/index.html") return "/";
  return path.replace(/\/+$/, "") || "/";
}

export function getPath(): string {
  return normalize(window.location.pathname);
}

/** 无依赖的 history 路由：pushState + 自定义事件，刷新时由服务端回退到 index.html。 */
export function navigate(to: string) {
  if (normalize(to) === getPath()) {
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }
  window.history.pushState(null, "", to);
  window.dispatchEvent(new Event(ROUTE_EVENT));
  window.scrollTo({ top: 0, behavior: "auto" });
}

export function usePath(): string {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const update = () => setPath(getPath());
    window.addEventListener("popstate", update);
    window.addEventListener(ROUTE_EVENT, update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener(ROUTE_EVENT, update);
    };
  }, []);

  return path;
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
}

/** 站内链接：保留 <a> 语义与可访问性，点击时走前端路由。 */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(to);
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
