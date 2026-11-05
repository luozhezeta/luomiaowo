import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "./Icons";
import { localGroups, localIntro, localNote, type FanGroup } from "../data/fanGroups";

const PROVINCE_KEYS = [
  "内蒙古",
  "黑龙江",
  "北部湾",
  "港澳台",
  "冀东",
  "粤西",
  "中珠澳",
  "东北",
  "安徽",
  "北京",
  "重庆",
  "福建",
  "甘肃",
  "广东",
  "广西",
  "贵州",
  "海南",
  "河北",
  "河南",
  "湖北",
  "湖南",
  "江苏",
  "江西",
  "吉林",
  "辽宁",
  "宁夏",
  "青海",
  "山东",
  "山西",
  "陕西",
  "上海",
  "四川",
  "天津",
  "西藏",
  "新疆",
  "云南",
  "浙江",
];

function provinceOf(name: string): string {
  return PROVINCE_KEYS.find((key) => name.startsWith(key)) ?? "其他";
}

interface GroupRowProps {
  group: FanGroup;
  copied: string | null;
  onCopy: (qq: string) => void;
}

function GroupRow({ group, copied, onCopy }: GroupRowProps) {
  return (
    <button
      type="button"
      className="group-row"
      onClick={() => onCopy(group.qq)}
      title="点击复制群号"
    >
      <span className="group-row__name">
        {group.name}
        {group.note ? <span className="group-row__note">（{group.note}）</span> : null}
      </span>
      <span className="group-row__qq">{group.qq}</span>
      <span className="group-row__copy" aria-hidden="true">
        {copied === group.qq ? "已复制" : "复制"}
      </span>
    </button>
  );
}

interface FanGroupsDialogProps {
  onClose: () => void;
}

function FanGroupsDialog({ onClose }: FanGroupsDialogProps) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focus = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      window.clearTimeout(focus);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [onClose]);

  const copy = (qq: string) => {
    const done = () => {
      setCopied(qq);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(null), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(qq).then(done).catch(done);
    } else {
      done();
    }
  };

  const keyword = query.trim().toLowerCase();
  const match = (group: FanGroup) =>
    !keyword ||
    group.name.toLowerCase().includes(keyword) ||
    group.qq.includes(keyword) ||
    (group.note ?? "").toLowerCase().includes(keyword);

  const provinces = useMemo(() => {
    const buckets = new Map<string, FanGroup[]>();
    for (const group of localGroups) {
      if (!match(group)) continue;
      const key = provinceOf(group.name);
      const list = buckets.get(key);
      if (list) list.push(group);
      else buckets.set(key, [group]);
    }
    return [...buckets.entries()].sort((a, b) => a[0].localeCompare(b[0], "zh-Hans-CN"));
  }, [keyword]);

  const shown = provinces.reduce((sum, [, list]) => sum + list.length, 0);
  const total = localGroups.length;

  return (
    <div className="share-modal" role="dialog" aria-modal="true" aria-labelledby="groups-title">
      <button type="button" className="share-modal__scrim" aria-label="关闭" onClick={onClose} />
      <div className="share-modal__panel groups">
        <div className="groups__head">
          <div>
            <h2 id="groups-title">中V粉丝群</h2>
            <p className="groups__count">
              共 {total} 个群{keyword ? ` · 匹配 ${shown} 个` : ""} · 点群号可复制
            </p>
          </div>
          <button type="button" className="icon-btn share-modal__close" onClick={onClose} aria-label="关闭">
            <CloseIcon />
          </button>
        </div>

        <input
          ref={inputRef}
          className="groups__search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索省份 / 城市 / 群号，比如「山东」「青岛」「717521885」"
          aria-label="搜索地方群"
        />

        <div className="groups__body">
          {provinces.length > 0 ? (
            <section className="groups__section">
              <h3 className="groups__section-title">各地地方群</h3>
              <p className="groups__text">{localIntro}</p>
              <p className="groups__text groups__text--muted">{localNote}</p>
              {provinces.map(([province, list]) => (
                <div key={province} className="groups__block">
                  <h4 className="groups__block-title">{province}</h4>
                  <div className="groups__rows">
                    {list.map((group) => (
                      <GroupRow
                        key={`${province}-${group.name}-${group.qq}`}
                        group={group}
                        copied={copied}
                        onCopy={copy}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <p className="groups__empty">没找到匹配的群，换个关键词试试。</p>
          )}
        </div>
      </div>
    </div>
  );
}

/** 首页右上角入口：点击展开全国中V粉丝群 */
export function FanGroups() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <span className="home__groups-wrap">
        <button
          type="button"
          className="btn btn--accent home__groups"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-label="查看各地中V粉丝群"
          aria-describedby="groups-tip"
        >
          <span className="home__groups-dot" aria-hidden="true" />
          粉丝群
        </button>
        <span className="home__groups-tip" id="groups-tip" role="tooltip">
          找不到同好？点这里❍⩊❍
        </span>
      </span>
      {open ? createPortal(<FanGroupsDialog onClose={() => setOpen(false)} />, document.body) : null}
    </>
  );
}
