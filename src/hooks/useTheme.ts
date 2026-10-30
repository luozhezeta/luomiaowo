import { useCallback, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light";

const STORAGE_KEY = "luozhe-theme";

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function readInitial(): Theme {
  if (typeof window === "undefined") return "dark";
  const query = new URLSearchParams(window.location.search).get("theme");
  if (query === "light" || query === "dark") return query;
  const stored = readStored();
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/* 模块级单例：侧栏和移动端顶栏共用同一份主题状态 */
let current: Theme = readInitial();
const listeners = new Set<() => void>();

if (typeof document !== "undefined") {
  document.documentElement.dataset.theme = current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* 隐私模式下忽略 */
  }
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

/** 深浅色主题：默认跟随系统，切换后写入 localStorage；也支持 ?theme=light 预览。 */
export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => current,
    () => "dark" as Theme,
  );

  const toggle = useCallback(() => {
    const next: Theme = current === "dark" ? "light" : "dark";
    const commit = () => {
      current = next;
      applyTheme(next);
      listeners.forEach((listener) => listener());
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as ViewTransitionDocument;

    // 支持 View Transition 的浏览器：整页交叉淡入淡出，比逐帧改颜色自然得多
    if (!reduceMotion && typeof doc.startViewTransition === "function") {
      try {
        doc.startViewTransition(() => flushSync(commit));
        return;
      } catch {
        /* 某些环境下不可用，退回直接切换 */
      }
    }

    commit();
  }, []);

  return { theme, toggle };
}
