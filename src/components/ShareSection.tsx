import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRightIcon, CloseIcon, PlayIcon } from "./Icons";
import { backgroundsByOrientation } from "../data/backgrounds.generated";
import { shareConfig, shareItems, type ShareItem, type ShareKind } from "../data/share";

const platformLabels: Record<ShareItem["platform"], string> = {
  bilibili: "B 站",
  netease: "网易云音乐",
  qqmusic: "QQ 音乐",
  local: "本站",
};

const kindLabels: Record<ShareKind, string> = {
  video: "视频",
  music: "音乐",
};

type Filter = "all" | ShareKind;

interface PlayerSource {
  url: string;
  /** wide = 16:9 视频框；bar = 网易云那种细长条 */
  mode: "wide" | "bar";
}

function playerSource(item: ShareItem): PlayerSource | null {
  if (item.platform === "bilibili" && item.embedId) {
    return {
      url: `https://player.bilibili.com/player.html?bvid=${item.embedId}&page=1&autoplay=1&high_quality=1&danmaku=0`,
      mode: "wide",
    };
  }
  if (item.platform === "netease" && item.embedId) {
    return {
      url: `https://music.163.com/outchain/player?type=2&id=${item.embedId}&auto=1&height=86`,
      mode: "bar",
    };
  }
  if (item.platform === "local") {
    return { url: item.href, mode: item.kind === "music" ? "bar" : "wide" };
  }
  return null;
}

/** 还没有内容时，用壁纸库的图先占住封面位 */
function placeholderItems(): ShareItem[] {
  const landscape = backgroundsByOrientation.landscape as readonly string[];
  const portrait = backgroundsByOrientation.portrait as readonly string[];
  const pick = (list: readonly string[], index: number) =>
    list.length > 0 ? list[index % list.length] : undefined;

  const videos: ShareItem[] = [3, 7, 12, 15].map((source, index) => ({
    id: `placeholder-video-${index + 1}`,
    kind: "video" as const,
    title: `视频封面位 ${String(index + 1).padStart(2, "0")}`,
    author: "等待上传",
    platform: "bilibili" as const,
    href: "",
    cover: pick(landscape, source),
    placeholder: true,
  }));

  const albums: ShareItem[] = [0, 2, 4, 6].map((source, index) => ({
    id: `placeholder-album-${index + 1}`,
    kind: "music" as const,
    title: `专辑封面位 ${String(index + 1).padStart(2, "0")}`,
    author: "等待上传",
    platform: "netease" as const,
    href: "",
    cover: pick(portrait, source),
    placeholder: true,
  }));

  return [...videos, ...albums];
}

function ShareCardBody({ item }: { item: ShareItem }) {
  return (
    <>
      <span className="share-card__cover">
        {item.cover ? <img src={item.cover} alt="" loading="lazy" decoding="async" /> : null}
        <span className="share-card__badge">
          {item.placeholder
            ? `${kindLabels[item.kind]} · 待上传`
            : `${kindLabels[item.kind]} · ${platformLabels[item.platform]}`}
        </span>
        {item.placeholder ? null : (
          <span className="share-card__play" aria-hidden="true">
            <PlayIcon width={20} height={20} />
          </span>
        )}
      </span>
      <span className="share-card__body">
        <span className="share-card__title">{item.title}</span>
        <span className="share-card__meta">
          {item.author}
          {item.date ? ` · ${item.date}` : ""}
        </span>
        {item.note ? <span className="share-card__note">{item.note}</span> : null}
      </span>
    </>
  );
}

interface CarouselProps {
  slides: ShareItem[];
  onOpen: (item: ShareItem) => void;
}

/** 左侧大图轮播：自动切换、可点箭头/圆点，鼠标悬停暂停 */
function ShareCarousel({ slides, onOpen }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length, paused]);

  useEffect(() => {
    if (index >= slides.length) setIndex(0);
  }, [index, slides.length]);

  if (slides.length === 0) return null;
  const current = slides[index] ?? slides[0];
  const go = (delta: number) => setIndex((value) => (value + delta + slides.length) % slides.length);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel__viewport">
        {slides.map((slide, i) => (
          <div key={slide.id} className={i === index ? "carousel__slide is-active" : "carousel__slide"}>
            {slide.cover ? <img src={slide.cover} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async" /> : null}
          </div>
        ))}

        <button
          type="button"
          className="carousel__hit"
          onClick={() => onOpen(current)}
          aria-label={current.placeholder ? "封面位待上传" : `打开 ${current.title}`}
        />

        <div className="carousel__caption">
          <span className="carousel__badge">
            {current.placeholder ? "待上传" : kindLabels[current.kind]}
          </span>
          <p className="carousel__title">{current.title}</p>
          <p className="carousel__meta">
            {current.author}
            {current.date ? ` · ${current.date}` : ""}
          </p>
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              className="carousel__arrow carousel__arrow--prev"
              onClick={() => go(-1)}
              aria-label="上一张"
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel__arrow carousel__arrow--next"
              onClick={() => go(1)}
              aria-label="下一张"
            >
              ›
            </button>
            <div className="carousel__dots">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  className={i === index ? "carousel__dot is-active" : "carousel__dot"}
                  onClick={() => setIndex(i)}
                  aria-label={`第 ${i + 1} 张`}
                  aria-current={i === index}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

declare global {
  interface Window {
    twikoo?: {
      init: (options: Record<string, unknown>) => void;
    };
  }
}

function loadTwikoo(): Promise<void> {
  if (window.twikoo) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-twikoo]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("twikoo load failed")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/twikoo@1.6.44/dist/twikoo.min.js";
    script.async = true;
    script.dataset.twikoo = "true";
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("twikoo load failed")));
    document.head.appendChild(script);
  });
}

/** 首页里的分享板块：轮播 + 封面墙 + 弹层播放 + 预留评论区 */
export function ShareSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const displayItems = useMemo(
    () => (shareItems.length > 0 ? shareItems : placeholderItems()),
    [],
  );
  const realItems = shareItems.length > 0;

  const items = useMemo(
    () => displayItems.filter((item) => filter === "all" || item.kind === filter),
    [displayItems, filter],
  );

  const slides = useMemo(() => {
    const videos = displayItems.filter((item) => item.kind === "video").slice(0, 4);
    return videos.length > 0 ? videos : displayItems.slice(0, 4);
  }, [displayItems]);

  const sideItems = useMemo(() => {
    const videos = displayItems.filter((item) => item.kind === "video").slice(0, 2);
    const albums = displayItems.filter((item) => item.kind === "music").slice(0, 2);
    return [...videos, ...albums];
  }, [displayItems]);

  const selected = shareItems.find((item) => item.id === selectedId) ?? null;
  const source = selected ? playerSource(selected) : null;

  const open = (item: ShareItem) => {
    if (item.placeholder) return;
    setSelectedId(item.id);
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [selected]);

  useEffect(() => {
    if (selected) return;
    const opener = openerRef.current;
    if (!opener) return;
    opener.focus();
    openerRef.current = null;
  }, [selected]);

  useEffect(() => {
    if (!selected || !shareConfig.twikooEnvId) return;
    let cancelled = false;
    loadTwikoo()
      .then(() => {
        if (cancelled || !window.twikoo) return;
        window.twikoo.init({
          envId: shareConfig.twikooEnvId,
          el: "#share-comments",
          path: `/share/${selected.id}`,
          lang: "zh-CN",
          pageSize: 10,
        });
      })
      .catch(() => {
        /* 评论区加载失败不影响播放 */
      });
    return () => {
      cancelled = true;
    };
  }, [selected]);

  const submitHref = `mailto:${shareConfig.submitEmail}?subject=${encodeURIComponent("洛喵窝 · 分享投稿")}&body=${encodeURIComponent(
    "链接：\n标题：\n想说的话：\n",
  )}`;

  return (
    <section className="section share" id="share" aria-labelledby="share-title">
      <div className="share__head">
        <div>
          <p className="section__kicker">Share</p>
          <h2 id="share-title">分享</h2>
        </div>
        <a className="btn btn--accent share__submit" href={submitHref}>
          <PlayIcon width={15} height={15} />
          投稿给我
        </a>
      </div>

      <div className="share__hero">
        <ShareCarousel slides={slides} onOpen={open} />
        <ul className="share__side">
          {sideItems.map((item) => (
            <li key={item.id}>
              {item.placeholder ? (
                <div className="share-card share-card--mini share-card--placeholder">
                  <ShareCardBody item={item} />
                </div>
              ) : (
                <button
                  type="button"
                  className="share-card share-card--mini"
                  onClick={(event) => {
                    openerRef.current = event.currentTarget;
                    setSelectedId(item.id);
                  }}
                  aria-label={`打开 ${item.title}`}
                >
                  <ShareCardBody item={item} />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="share__bar">
        <div className="share__tabs" role="tablist" aria-label="内容类型">
          {(["all", "video", "music"] as Filter[]).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={filter === value}
              className="share__tab"
              onClick={() => setFilter(value)}
            >
              {value === "all" ? "全部" : kindLabels[value]}
            </button>
          ))}
        </div>
        <p className="share__count">
          {realItems ? `共 ${displayItems.length} 个内容` : "占位封面 · 等待上传"}
        </p>
      </div>

      <ul className="share__grid">
        {items.map((item) => (
          <li key={item.id}>
            {item.placeholder ? (
              <div className="share-card share-card--placeholder">
                <ShareCardBody item={item} />
              </div>
            ) : (
              <button
                type="button"
                className="share-card"
                onClick={(event) => {
                  openerRef.current = event.currentTarget;
                  setSelectedId(item.id);
                }}
                aria-label={`打开 ${item.title}`}
              >
                <ShareCardBody item={item} />
              </button>
            )}
          </li>
        ))}
      </ul>

      {selected ? (
        <div className="share-modal" role="dialog" aria-modal="true" aria-labelledby="share-modal-title">
          <button
            type="button"
            className="share-modal__scrim"
            aria-label="关闭"
            onClick={() => setSelectedId(null)}
          />
          <div className="share-modal__panel">
            <div className="share-modal__head">
              <div>
                <h2 id="share-modal-title">{selected.title}</h2>
                <p>
                  {selected.author} · {platformLabels[selected.platform]}
                  {selected.date ? ` · ${selected.date}` : ""}
                </p>
              </div>
              <button
                type="button"
                className="icon-btn share-modal__close"
                onClick={() => setSelectedId(null)}
                aria-label="关闭"
              >
                <CloseIcon />
              </button>
            </div>

            <div className={source?.mode === "bar" ? "share-player share-player--bar" : "share-player"}>
              {source ? (
                selected.platform === "local" ? (
                  selected.kind === "video" ? (
                    <video src={source.url} controls playsInline preload="metadata" />
                  ) : (
                    <audio src={source.url} controls preload="metadata" />
                  )
                ) : (
                  <iframe
                    src={source.url}
                    title={selected.title}
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                    allowFullScreen
                    loading="lazy"
                  />
                )
              ) : (
                <p className="share-player__hint">
                  {selected.platform === "qqmusic"
                    ? "QQ 音乐没有稳定的内嵌播放器，点下面的按钮到原站听。"
                    : "这个链接暂时没法内嵌播放，点下面到原站看。"}
                </p>
              )}
            </div>

            {selected.note ? <p className="share-modal__note">{selected.note}</p> : null}

            <div className="share-modal__links">
              <a className="btn" href={selected.href} target="_blank" rel="noreferrer noopener">
                到原站打开
                <ArrowUpRightIcon width={13} height={13} />
              </a>
            </div>

            <div className="share-comments">
              <h3>聊两句</h3>
              {shareConfig.twikooEnvId ? (
                <div id="share-comments" />
              ) : (
                <p className="share-comments__hint">评论区还没接上，接好之后可以直接在这里留言。</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
