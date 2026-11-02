import { treeholePosts } from "../data/treehole";
import { charCount, postSummary, readMinutes } from "../lib/treehole";
import { Link } from "../router";

/** 树洞列表：像博客首页那样，一篇一张卡片 */
export function TreeHolePage() {
  const total = treeholePosts.reduce((sum, post) => sum + charCount(post), 0);

  return (
    <section className="treehole" aria-labelledby="treehole-title">
      <p className="section__kicker">Tree Hole</p>
      <h1 className="treehole__title" id="treehole-title">
        树洞
      </h1>
      <p className="treehole__lede">有些话不想大声说，就埋在这儿。想读就读，读完就忘。</p>

      <div className="treehole__stats">
        <span>
          共 <strong>{treeholePosts.length}</strong> 篇
        </span>
        <span aria-hidden="true">·</span>
        <span>{total} 字</span>
      </div>

      <div className="treehole__list">
        {treeholePosts.map((post) => (
          <Link key={post.id} to={`/shudong/${post.id}`} className="treehole-card">
            <span className="treehole-card__main">
              <span className="treehole-card__meta">
                <time dateTime={post.date}>{post.date}</time>
                {post.tags?.length ? (
                  <span className="treehole-card__tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="treehole-tag">
                        #{tag}
                      </span>
                    ))}
                  </span>
                ) : null}
              </span>
              <span className="treehole-card__title">{post.title}</span>
              <span className="treehole-card__summary">{postSummary(post)}</span>
              <span className="treehole-card__foot">
                {charCount(post)} 字 · 约 {readMinutes(post)} 分钟
              </span>
            </span>
            {post.thumb || post.cover ? (
              <span className="treehole-card__thumb" aria-hidden="true">
                <img src={post.thumb ?? post.cover} alt="" loading="lazy" decoding="async" />
              </span>
            ) : null}
            <span className="treehole-card__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
