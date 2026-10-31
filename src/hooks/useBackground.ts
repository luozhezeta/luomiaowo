import { useEffect, useRef, useState } from "react";
import { pickBackground, type Orientation } from "../data/backgrounds";

interface BackgroundState {
  url: string | null;
  ready: boolean;
}

function currentOrientation(): Orientation {
  if (typeof window === "undefined") return "landscape";
  return window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape";
}

/** 每次加载按横竖屏随机选图；旋转屏幕时会换成本方向的图。 */
export function useBackground(): BackgroundState {
  const [orientation, setOrientation] = useState<Orientation>(currentOrientation);
  const [url, setUrl] = useState<string | null>(() => pickBackground(currentOrientation()));
  const [ready, setReady] = useState(false);
  const firstRun = useRef(true);

  // 监听横竖屏变化
  useEffect(() => {
    const query = window.matchMedia("(orientation: portrait)");
    const update = () => setOrientation(query.matches ? "portrait" : "landscape");
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // 方向变了才换图，首次挂载不重复抽
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const next = pickBackground(orientation);
    if (!next || next === url) return;
    setReady(false);
    setUrl(next);
  }, [orientation, url]);

  // 预加载完成后再淡入
  useEffect(() => {
    if (!url) return;

    let cancelled = false;
    const image = new Image();
    const show = () => {
      if (!cancelled) setReady(true);
    };

    image.onload = show;
    image.onerror = show;
    image.src = url;

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { url, ready };
}
