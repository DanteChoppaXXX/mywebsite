export default function BlogContent({ blocks }) {
  return (
    <div className="max-w-3xl">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "heading":
            return (
              <h2 key={key} className="mt-8 text-lg font-semibold text-text-primary first:mt-0">
                {block.text}
              </h2>
            );

          case "list":
            return (
              <ul key={key} className="mt-4 space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-text-secondary">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-text-muted" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "code":
            return (
              <pre
                key={key}
                className="mt-4 overflow-x-auto rounded-md border border-border-muted bg-background p-4 text-sm text-text-secondary"
              >
                <code>{block.code}</code>
              </pre>
            );

          case "paragraph":
          default:
            return (
              <p key={key} className="mt-4 leading-relaxed text-text-secondary first:mt-0">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
