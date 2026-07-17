import { cn } from "../../utils/cn";

const VARIANTS = {
  primary:
    "bg-accent text-background hover:bg-accent-hover border border-accent",
  secondary:
    "bg-surface text-text-primary border border-border hover:border-text-muted hover:bg-surface-hover",
  ghost:
    "text-text-secondary hover:text-text-primary border border-transparent",
};

const SIZES = {
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

/**
 * Renders a <button> or, when `href` is passed, an <a>. Keeping one
 * component for both avoids two near-identical implementations drifting
 * apart in styling over time.
 */
export default function Button({
  as,
  href,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon aria-hidden="true" className="text-base" />}
      {children}
      {Icon && iconPosition === "right" && <Icon aria-hidden="true" className="text-base" />}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  const Tag = as || "button";
  return (
    <Tag className={classes} {...props}>
      {content}
    </Tag>
  );
}
