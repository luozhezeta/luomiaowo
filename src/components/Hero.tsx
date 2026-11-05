import { site } from "../data/site";
import { Reveal } from "./Reveal";
import { ArrowUpRightIcon, GithubIcon, MailIcon } from "./Icons";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <p className="eyebrow">
          <span className="dot" aria-hidden="true" />
          {site.status}
        </p>

        <h1 className="hero__title">
          你好，我是
          <span className="hero__name">{site.name}</span>。
        </h1>

        <p className="hero__tagline">{site.tagline}</p>
        <p className="hero__lede">{site.intro}</p>

        <div className="hero__actions">
          <a className="btn" href="#about">
            关于我
          </a>
        </div>
      </div>

      <Reveal className="profile">
        <div className="profile__head">
          <span className="avatar" aria-hidden="true">
            洛
          </span>
          <div>
            <p className="profile__name">{site.name}</p>
            <p className="profile__role">{site.role}</p>
          </div>
        </div>

        <ul className="profile__rows">
          <li>
            <span>
              <MailIcon />
              邮箱
            </span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
        </ul>

        <div className="profile__foot">
          <span className="profile__status">
            <span className="dot dot--sm" aria-hidden="true" />
            在线
          </span>
          <a href={site.github} target="_blank" rel="noreferrer noopener">
            <GithubIcon width={15} height={15} />
            GitHub
            <ArrowUpRightIcon width={13} height={13} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
