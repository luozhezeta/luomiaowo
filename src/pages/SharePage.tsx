import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRightIcon, CloseIcon, PlayIcon } from "../components/Icons";
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

export function SharePage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const items = useMemo(
    () => shareItems.filter((item) => filter === "all" || item.kind === filter),
    [filter],
  );
  const selected = shareItems.find((item) => item.id === selectedId) ?? null;
  const source = selected ? playerSource(selected) : null;

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
    <section className="share" aria-labelledby="share-title">
      <p className="section__kicker">Share</p>
      <h1 className="share__title" id="share-title">
        分享
      </h1>
      <p className="share__lede">看到的、听到的，觉得值得一看一听的都放这儿。想推荐什么，投稿给我。</p>

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
        <a className="btn share__submit" href={submitHref}>
          <PlayIcon width={15} height={15} />
          投稿给我
        </a>
      </div>

      {items.length > 0 ? (
        <ul className="share__grid">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="share-card"
                onClick={(event) => {
                  openerRef.current = event.currentTarget;
                  setSelectedId(item.id);
                }}
                aria-label={`打开 ${item.title}`}
              >
                <span className="share-card__cover">
                  {item.cover ? <img src={item.cover} alt="" loading="lazy" decoding="async" /> : null}
                  <span className="share-card__badge">
                    {kindLabels[item.kind]} · {platformLabels[item.platform]}
                  </span>
                  <span className="share-card__play" aria-hidden="true">
                    <PlayIcon width={20} height={20} />
                  </span>
                </span>
                <span className="share-card__body">
                  <span className="share-card__title">{item.title}</span>
                  <span className="share-card__meta">
                    {item.author}
                    {item.date ? ` · ${item.date}` : ""}
                  </span>
                  {item.note ? <span className="share-card__note">{item.note}</span> : null}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="share__empty">
          <p className="share__empty-title">这里还空着</p>
          <p className="share__empty-hint">
            B 站视频、网易云的歌都行。把链接发我，我加进来就能在这看到了。
          </p>
          <a className="btn btn--accent" href={submitHref}>
            发邮件投稿
          </a>
        </div>
      )}

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
