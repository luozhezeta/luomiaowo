import { ShareSection } from "../components/ShareSection";

/** 首页（洛喵窝）：标题 + 分享板块 */
export function HomePage() {
  return (
    <>
      <section className="home" aria-labelledby="home-title">
        <p className="section__kicker">Home</p>
        <h1 className="home__title" id="home-title">
          洛喵窝
        </h1>
        <p className="home__subtitle">Luo Tianyi&apos;s fans&apos; den</p>
        <p className="home__lede">这里放我分享的视频和音乐，看到的好东西都堆在这儿。</p>
      </section>

      <ShareSection />
    </>
  );
}
