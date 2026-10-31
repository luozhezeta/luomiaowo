import { useEffect, useRef, useState } from "react";
import { creditAuthors, creditGroups, type CreditAuthor } from "../data/credits";
import { ArrowUpRightIcon, CloseIcon } from "../components/Icons";

function Avatar({ author, size = 64 }: { author: CreditAuthor; size?: number }) {
  const style = { width: size, height: size, fontSize: size * 0.34 };
  if (author.avatar) {
    return (
      <span className="credit-avatar" style={style}>
        <img src={author.avatar} alt="" loading="lazy" />
      </span>
    );
  }
  return (
    <span className="credit-avatar credit-avatar--letter" style={style} aria-hidden="true">
      {author.initial}
    </span>
  );
}

export function ThanksPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = creditAuthors.find((author) => author.id === selectedId) ?? null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      openerRef.current?.focus();
    };
  }, [selected]);

  return (
    <section className="thanks" aria-labelledby="thanks-title">
      <p className="section__kicker">Special Thanks</p>
      <h1 className="thanks__title" id="thanks-title">
        特别鸣谢
      </h1>
      <p className="thanks__lede">各位老大的恩情还不完✋🏻😭🤚🏻</p>

      {creditGroups.map((group) => {
        const authors = creditAuthors.filter((author) => author.group === group.id);
        if (authors.length === 0) return null;

        return (
          <section
            key={group.id}
            className="credits-section"
            aria-labelledby={`credits-${group.id}`}
          >
            <h2 className="credits-section__title" id={`credits-${group.id}`}>
              {group.title}
            </h2>
            <ul className="credits">
              {authors.map((author) => (
                <li key={author.id} className={author.tagline ? "credit-item credit-item--wide" : undefined}>
                  <div
                    role="button"
                    tabIndex={0}
                    className={author.tagline ? "credit credit--wide" : "credit"}
                    onClick={(event) => {
                      openerRef.current = event.currentTarget;
                      setSelectedId(author.id);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openerRef.current = event.currentTarget;
                        setSelectedId(author.id);
                      }
                    }}
                    aria-label={`查看 ${author.name} 的作品`}
                  >
                    {author.tagline ? (
                      <>
                        <span className="credit-wide__left">
                          <Avatar author={author} size={48} />
                          <span className="credit__name">{author.name}</span>
                          <span className="credit__role">{author.role}</span>
                        </span>
                        <span className="credit-wide__right">
                          <span className="credit__tagline">{author.tagline}</span>
                          {author.accounts.some((account) => account.href) ? (
                            <span className="credit-links">
                              {author.accounts.map((account) =>
                                account.href ? (
                                  <a
                                    className="credit-link"
                                    key={account.label}
                                    href={account.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    onClick={(event) => event.stopPropagation()}
                                  >
                                    {account.label}
                                    <ArrowUpRightIcon width={12} height={12} />
                                  </a>
                                ) : null,
                              )}
                            </span>
                          ) : null}
                        </span>
                      </>
                    ) : (
                      <>
                        <Avatar author={author} />
                        <span className="credit__name">{author.name}</span>
                        <span className="credit__role">{author.role}</span>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {selected ? (
        <div className="credit-modal" role="dialog" aria-modal="true" aria-labelledby="credit-modal-title">
          <button
            type="button"
            className="credit-modal__scrim"
            aria-label="关闭"
            onClick={() => setSelectedId(null)}
          />
          <div className="credit-modal__panel">
            <div className="credit-modal__head">
              <Avatar author={selected} size={56} />
              <div>
                <h2 id="credit-modal-title">{selected.name}</h2>
                <p>{selected.role}</p>
              </div>
              <button
                type="button"
                className="icon-btn credit-modal__close"
                onClick={() => setSelectedId(null)}
                aria-label="关闭"
                ref={closeRef}
              >
                <CloseIcon />
              </button>
            </div>

            {selected.accounts.length > 0 ? (
              <div className="credit-modal__accounts">
                {selected.accounts.map((account) =>
                  account.href ? (
                    <a
                      key={account.label}
                      className="credit-account"
                      href={account.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {account.label}
                      <ArrowUpRightIcon width={13} height={13} />
                    </a>
                  ) : (
                    <span key={account.label} className="credit-account credit-account--static">
                      {account.label}
                    </span>
                  ),
                )}
              </div>
            ) : null}

            <div className="credit-modal__works">
              {selected.works.length > 0 ? (
                selected.works.map((work, index) => (
                  <a
                    key={`${selected.id}-${index}`}
                    className={work.href ? "credit-work" : "credit-work credit-work--static"}
                    href={work.href ?? undefined}
                    target={work.href ? "_blank" : undefined}
                    rel={work.href ? "noreferrer noopener" : undefined}
                  >
                    {work.image ? (
                      <img className="credit-work__image" src={work.image} alt="" loading="lazy" />
                    ) : (
                      <span className="credit-work__image credit-work__image--empty" aria-hidden="true">
                        {work.title?.slice(0, 1) ?? selected.initial}
                      </span>
                    )}
                    {work.title ? <span className="credit-work__title">{work.title}</span> : null}
                    {work.note ? <span className="credit-work__note">{work.note}</span> : null}
                  </a>
                ))
              ) : (
                <p className="credit-modal__empty">更多信息请访问上方链接。</p>
              )}
            </div>

            {selected.note ? <p className="credit-modal__note">{selected.note}</p> : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
