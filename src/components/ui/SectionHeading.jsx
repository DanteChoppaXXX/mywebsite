import { cn } from "../../utils/cn";

/**
 * `eyebrow` is a short mono-font label (e.g. "01 — PROJECTS" or just
 * "PROJECTS") that appears above every section title. It's used because
 * it mirrors real systems documentation and status-page conventions,
 * not as decoration — so keep it short and literal, never cute.
 */
export default function SectionHeading({ eyebrow, title, description, align = "left", className }) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">{title}</h2>
      {description && (
        <p className={cn("mt-3 max-w-2xl text-text-secondary", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
