import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function ProjectNav({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="More projects" className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          to={`/projects/${prev.slug}`}
          className="group rounded-lg border border-border p-4 hover:border-text-muted"
        >
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <FiArrowLeft aria-hidden="true" />
            Previous
          </span>
          <span className="mt-1 block font-medium text-text-primary group-hover:text-accent">
            {prev.name}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link
          to={`/projects/${next.slug}`}
          className="group rounded-lg border border-border p-4 text-right hover:border-text-muted sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs text-text-muted">
            Next
            <FiArrowRight aria-hidden="true" />
          </span>
          <span className="mt-1 block font-medium text-text-primary group-hover:text-accent">
            {next.name}
          </span>
        </Link>
      )}
    </nav>
  );
}
