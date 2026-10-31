import { useEffect, useState } from "react";
import { pickBackground } from "../data/backgrounds";

interface BackgroundState {
  url: string | null;
  ready: boolean;
}

/** 每次页面加载随机选一张背景图，预加载完成后淡入。 */
export function useBackground(): BackgroundState {
  const [url] = useState<string | null>(pickBackground);
  const [ready, setReady] = useState(false);

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
