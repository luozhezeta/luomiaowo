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
            一个普普通通的大学生，没什么出众的天赋，也没有什么特别远大的计划，只是在学习和探索自己能做些什么，能留下些什么，明天能继续创造什么，以及明确自己正在寻找独属于“我”的价值。
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
