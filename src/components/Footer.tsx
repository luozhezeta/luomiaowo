import { site } from "../data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          © {new Date().getFullYear()} {site.name} · 手写 Win11 风格，没有用组件库
        </p>
        <div className="footer__links">
          <a href={`mailto:${site.email}`}>邮箱</a>
          <a href={site.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href="#top">回到顶部 ↑</a>
        </div>
      </div>
    </footer>
  );
}
