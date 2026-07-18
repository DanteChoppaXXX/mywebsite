export default function DetailSection({ title, type = "text", content, children }) {
  return (
    <section className="border-t border-border-muted py-8 first:border-t-0 first:pt-0">
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>

      {type === "text" && (
        <p className="mt-3 max-w-3xl leading-relaxed text-text-secondary">{content}</p>
      )}

      {type === "list" && (
        <ul className="mt-3 max-w-3xl space-y-2">
          {content.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed text-text-secondary">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-text-muted" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {type === "custom" && <div className="mt-3">{children}</div>}
    </section>
  );
}
