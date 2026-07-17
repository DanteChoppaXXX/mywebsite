import { cn } from "../../utils/cn";

export default function Badge({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border-muted bg-surface px-2 py-0.5 font-mono text-xs text-text-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
