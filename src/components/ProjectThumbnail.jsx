import { FiTerminal } from "react-icons/fi";

export default function ProjectThumbnail({ image, alt }) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="h-40 w-full rounded-md border border-border-muted object-cover"
      />
    );
  }

  return (
    <div
      className="flex h-40 w-full items-center justify-center rounded-md border border-border-muted bg-background"
      style={{
        backgroundImage:
          "radial-gradient(var(--color-border) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
      aria-hidden="true"
    >
      <FiTerminal className="text-3xl text-text-muted" />
    </div>
  );
}
