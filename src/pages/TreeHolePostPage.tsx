import type { TreeHolePost } from "../data/treehole";
import { treeholePosts } from "../data/treehole";
import { charCount, readMinutes } from "../lib/treehole";
import { Link } from "../router";

interface TreeHolePostPageProps {
  post: TreeHolePost;
}

/** 树洞文章详情 */
export function TreeHolePostPage({ post }: TreeHolePostPageProps) {
  const blocks = post.blocks?.length
    ? post.blocks
    : post.paragraphs.map((text) => ({ type: "text" as const, text }));
  const index = treeholePosts.findIndex((item) => item.id === post.id);
  const newer = index > 0 ? treeholePosts[index - 1] : undefined;
  const older = index >= 0 && index < treeholePosts.length - 1 ? treeholePosts[index + 1] : undefined;

  return (
    <article className="article" aria-labelledby="post-title">
      <Link className="article__back" to="/shudong">
        <span aria-hidden="true">←</span> 树洞
      </Link>

      <header className="article__head">
        <p className="article__meta">
          <time dateTime={post.date}>{post.date}</time>
          <span aria-hidden="true">·</span>
          <span>{charCount(post)} 字</span>
          <span aria-hidden="true">·</span>
          <span>约 {readMinutes(post)} 分钟</span>
        </p>
        <h1 className="article__title" id="post-title">
          {post.title}
        </h1>
        {post.tags?.length ? (
          <p className="article__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="treehole-tag">
                #{tag}
              </span>
            ))}
          </p>
        ) : null}
      </header>

      {post.cover ? (
        <img className="article__cover" src={post.cover} alt="" loading="lazy" decoding="async" />
      ) : null}

      <div className="article__body">
        {blocks.map((block, i) =>
          block.type === "text" ? (
            <p key={i}>{block.text}</p>
          ) : (
            <figure key={i} className={`article__figure article__figure--${block.align ?? "wide"}`}>
              <img src={block.src} alt={block.caption ?? ""} loading="lazy" decoding="async" />
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          ),
        )}
      </div>

      <footer className="article__foot">
        {newer ? (
          <Link className="article__nav" to={`/shudong/${newer.id}`}>
            <span className="article__nav-label">上一篇</span>
            <span className="article__nav-title">{newer.title}</span>
          </Link>
        ) : null}
        {older ? (
          <Link className="article__nav post__nav--end" to={`/shudong/${older.id}`}>
            <span className="article__nav-label">下一篇</span>
            <span className="article__nav-title">{older.title}</span>
          </Link>
        ) : null}
      </footer>
    </article>
  );
}
