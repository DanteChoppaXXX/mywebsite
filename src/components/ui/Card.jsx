import { cn } from "../../utils/cn";

/**
 * Base card surface. `interactive` adds the hover treatment used when the
 * whole card is a link/button (project cards, blog cards) — a 1px border
 * color shift and a very small lift, never a shadow-heavy "pop".
 */
export default function Card({ as: Tag = "div", interactive = false, className, children, ...props }) {
  return (
    <Tag
      className={cn(
        "rounded-lg border border-border bg-surface p-6",
        interactive &&
          "transition-all duration-150 hover:-translate-y-0.5 hover:border-text-muted",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
