import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Badge from "./ui/Badge";
import { formatDate } from "../utils/blog";

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-lg border border-border bg-surface p-6 transition-colors hover:border-text-muted"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-text-primary group-hover:text-accent">
        {post.title}
      </h3>

      <p className="mt-2 leading-relaxed text-text-secondary">{post.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
        <span className="ml-auto flex items-center gap-1.5 text-sm text-accent">
          Read post
          <FiArrowRight aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
