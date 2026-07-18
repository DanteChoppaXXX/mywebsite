export default function ContactLink({ icon: Icon, label, value, href, external = true }) {
  const target = external ? "_blank" : undefined;
  const rel = external ? "noreferrer" : undefined;

  return (
    <a href={href} target={target} rel={rel} className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border-muted bg-background text-accent">
        <Icon aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm text-text-muted">{label}</span>
        <span className="block font-mono text-sm text-text-primary group-hover:text-accent">
          {value}
        </span>
      </span>
    </a>
  );
}
