import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import BlogContent from "../components/BlogContent";
import BlogPostNav from "../components/BlogPostNav";
import { getPostBySlug, getAdjacentPosts, formatDate } from "../utils/blog";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-semibold text-text-primary">Post not found</h1>
        <p className="mt-2 text-text-secondary">It may have been renamed or removed.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-1.5 text-accent hover:text-accent-hover">
          <FiArrowLeft aria-hidden="true" />
          Back to all posts
        </Link>
      </Container>
    );
  }

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link to="/blog" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary">
          <FiArrowLeft aria-hidden="true" />
          Back to all posts
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-3 text-3xl font-semibold text-text-primary sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </header>

        <div className="mt-10 border-t border-border-muted pt-8">
          <BlogContent blocks={post.content} />
        </div>

        <div className="mt-12">
          <BlogPostNav prev={prev} next={next} />
        </div>
      </Container>
    </article>
  );
}
