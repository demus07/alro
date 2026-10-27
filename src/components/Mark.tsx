/**
 * The ALRO signature: two nodes joined by a line — craft and intelligence,
 * connected. Used for section markers, progress, key labels and the final action.
 */
export function Mark({
  className,
  size = 26,
  title,
}: {
  className?: string;
  size?: number;
  title?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.36}
      viewBox="0 0 28 10"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="5" cy="5" r="4" fill="var(--ember)" />
      <line x1="9" y1="5" x2="19" y2="5" stroke="currentColor" strokeWidth="1" />
      <circle cx="23" cy="5" r="3.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark ${className ?? ""}`}>
      ALRO
      <Mark size={22} />
    </span>
  );
}

export function SectionMarker({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <p className="marker label">
      <Mark size={22} />
      <span className="num">{index}</span>
      <span>{label}</span>
    </p>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 9 9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
