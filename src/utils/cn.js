/**
 * Joins conditional class names. Deliberately not pulling in clsx/tailwind-merge
 * for this — the project's utility classes never conflict enough to need
 * merge-resolution, so a dependency here would be unnecessary weight.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
