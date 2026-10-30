import { site } from "../data/site";
import { Reveal } from "./Reveal";
import { ChatIcon, ChevronDownIcon, GithubIcon, MailIcon } from "./Icons";

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="about">
        <div>
          <p className="section__kicker">About</p>
          <h2 id="about-title">关于我</h2>
          <p className="about__text">
            我关心界面的手感：点击之后多久有反馈、滚动是否跟手、深色模式下的那层灰是不是刚好。做设计出身的工程师，习惯先用
            Figma 把 50 种方案试一遍，再写 200 行 CSS 把剩下的 49 种删掉。
          </p>
          <p className="about__text">
            目前一个人维护几个小工具，业余时间写点前端与域名相关的东西。如果你有想做的界面，或者只是想聊聊
            Win11 的亚克力为什么好看，欢迎来信。
          </p>
          <div className="about__links">
            <a className="btn" href={`mailto:${site.email}`}>
              <MailIcon width={16} height={16} />
              发邮件
            </a>
            <a className="btn" href={site.github} target="_blank" rel="noreferrer noopener">
              <GithubIcon width={16} height={16} />
              GitHub
            </a>
          </div>
        </div>

        <Reveal className="card about__panel">
          <h3>常用工具</h3>
          <ul className="tags">
            {site.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <p className="about__note">现在在学 Rust，目标是明年用 Tauri 重写自己的桌面工具箱。</p>
        </Reveal>
      </div>

      <details className="about__more">
        <summary>
          <span className="about__more-label">
            <ChatIcon width={16} height={16} />
            联系方式
          </span>
          <ChevronDownIcon className="about__more-chevron" width={16} height={16} />
        </summary>
        <div className="about__more-body">
          <div className="about__more-row">
            <span>QQ</span>
            <a
              href={`https://wpa.qq.com/msgrd?v=3&uin=${site.qq}&site=qq&menu=yes`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {site.qq}
            </a>
          </div>
          <p className="about__more-hint">点号码可直接发起 QQ 临时会话，也可以发邮件。</p>
        </div>
      </details>
    </section>
  );
}
