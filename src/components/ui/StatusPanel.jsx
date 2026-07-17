const METRICS = [
  { label: "UPTIME", value: "99.98%" },
  { label: "AVG LATENCY", value: "11ms" },
  { label: "NODES", value: "6/6 online" },
  { label: "LAST DEPLOY", value: "2h ago" },
];

export default function StatusPanel() {
  return (
    <div
      className="w-full max-w-sm rounded-lg border border-border bg-surface font-mono text-sm"
      role="status"
      aria-label="System status panel"
    >
      <div className="flex items-center justify-between border-b border-border-muted px-4 py-3">
        <span className="text-xs uppercase tracking-wider text-text-muted">system status</span>
        <span className="flex items-center gap-1.5 text-xs text-success">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          operational
        </span>
      </div>

      <dl className="divide-y divide-border-muted">
        {METRICS.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between px-4 py-2.5">
            <dt className="text-text-muted">{metric.label}</dt>
            <dd className="text-text-primary">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
