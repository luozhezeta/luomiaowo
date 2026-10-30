import { posts } from "../data/site";
import { ArrowRightIcon } from "./Icons";

export function Posts() {
  return (
    <section className="section" id="posts" aria-labelledby="posts-title">
      <div className="section__head">
        <div>
          <p className="section__kicker">Writing</p>
          <h2 id="posts-title">写过的东西</h2>
        </div>
        <a className="link" href="#posts">
          全部文章
          <ArrowRightIcon />
        </a>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <a className="post" href={post.href} key={post.title}>
            <time className="post__date" dateTime={post.date}>
              {post.date}
            </time>
            <span className="post__title">{post.title}</span>
            <span className="post__tag">{post.tag}</span>
            <ArrowRightIcon className="post__arrow" width={16} height={16} />
          </a>
        ))}
      </div>
    </section>
  );
}
