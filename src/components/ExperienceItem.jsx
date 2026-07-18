export default function ExperienceItem({ role, company, location, start, end, points }) {
  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-medium text-text-primary">
          {role} <span className="text-text-muted">·</span> {company}
        </h3>
        <span className="shrink-0 font-mono text-xs text-text-muted">
          {start} — {end}
        </span>
      </div>

      {location && <p className="mt-0.5 text-sm text-text-muted">{location}</p>}

      <ul className="mt-3 space-y-2">
        {points.map((point) => (
          <li key={point} className="flex gap-3 leading-relaxed text-text-secondary">
            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-text-muted" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
