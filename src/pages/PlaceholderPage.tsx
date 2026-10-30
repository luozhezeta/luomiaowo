import type { ReactNode } from "react";

interface PlaceholderPageProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  lede: string;
  action?: ReactNode;
}

/** 尚未做内容的页面：给足留白，只放一个虚线占位框。 */
export function PlaceholderPage({ kicker, title, subtitle, lede, action }: PlaceholderPageProps) {
  return (
    <section className="placeholder" aria-labelledby="placeholder-title">
      {kicker ? <p className="section__kicker">{kicker}</p> : null}
      <h1 className="placeholder__title" id="placeholder-title">
        {title}
      </h1>
      {subtitle ? <p className="placeholder__subtitle">{subtitle}</p> : null}
      <p className="placeholder__lede">{lede}</p>
      {action ? <div className="placeholder__action">{action}</div> : null}
      <div className="placeholder__frame" aria-hidden="true">
        内容占位
      </div>
    </section>
  );
}
