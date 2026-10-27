/*
 * One visual language for both practices: layered planes (craft) and
 * connected nodes (intelligence). Drawn as hairlines so they sit quietly
 * beside the type rather than competing with it.
 */

export function HeroFigure() {
  return (
    <svg
      className="hero-figure draw"
      viewBox="0 0 560 520"
      fill="none"
      aria-hidden="true"
    >
      {/* Planes — back to front */}
      <g className="hero-figure__planes">
        <rect x="30.5" y="140.5" width="260" height="200" />
        <rect x="90.5" y="200.5" width="260" height="200" />
        <rect x="150.5" y="260.5" width="260" height="200" />
      </g>

      {/* An interface, suggested on the front plane */}
      <g className="hero-figure__ui">
        <line x1="174" y1="292" x2="262" y2="292" pathLength={1} />
        <line x1="174" y1="316" x2="356" y2="316" pathLength={1} />
        <line x1="174" y1="330" x2="330" y2="330" pathLength={1} />
        <rect x="174.5" y="356.5" width="70" height="26" />
        <line x1="174" y1="428" x2="386" y2="428" pathLength={1} />
      </g>

      {/* Connections from the planes into the system */}
      <g className="hero-figure__links">
        <path d="M290 140 L466 90" pathLength={1} />
        <path d="M350 200 L524 214" pathLength={1} />
        <path d="M410 260 L478 330" pathLength={1} />
        <path d="M410 460 L518 448" pathLength={1} />
        <path d="M466 90 L524 214 L478 330 L518 448" pathLength={1} />
      </g>

      <g className="hero-figure__nodes">
        <circle cx="466" cy="90" r="6" />
        <circle cx="524" cy="214" r="6" />
        <circle cx="518" cy="448" r="6" />
        <circle className="is-active" cx="478" cy="330" r="8" />
      </g>
    </svg>
  );
}

export function PracticeFigure({ variant }: { variant: "layers" | "nodes" }) {
  if (variant === "layers") {
    return (
      <svg className="practice-figure" viewBox="0 0 240 150" fill="none" aria-hidden="true">
        <rect x="20.5" y="20.5" width="120" height="84" />
        <rect x="50.5" y="40.5" width="120" height="84" />
        <rect className="is-front" x="80.5" y="60.5" width="120" height="84" />
        <line x1="94" y1="78" x2="140" y2="78" />
        <line x1="94" y1="90" x2="180" y2="90" />
        <circle className="is-active" cx="200" cy="60" r="4.5" />
      </svg>
    );
  }
  return (
    <svg className="practice-figure" viewBox="0 0 240 150" fill="none" aria-hidden="true">
      <path d="M30 110 L84 44 L150 82 L210 30 M84 44 L120 128 L150 82 M150 82 L210 118" />
      <circle cx="30" cy="110" r="4.5" />
      <circle cx="84" cy="44" r="4.5" />
      <circle cx="120" cy="128" r="4.5" />
      <circle cx="210" cy="30" r="4.5" />
      <circle cx="210" cy="118" r="4.5" />
      <circle className="is-active" cx="150" cy="82" r="6" />
    </svg>
  );
}

/**
 * Stand-in visual for a project until real imagery is supplied.
 * Replace by passing `image` once screenshots or captures exist.
 */
export function Plate({
  variant,
  tone = "umber",
  image,
  alt = "",
  caption,
}: {
  variant: "layers" | "nodes";
  tone?: "umber" | "ink" | "peach";
  image?: { src: string; width: number; height: number };
  alt?: string;
  caption?: string;
}) {
  return (
    <figure className="plate">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image.src} width={image.width} height={image.height} alt={alt} loading="lazy" />
      ) : (
        <div className={`plate__art plate__art--${tone}`}>
          <PracticeFigure variant={variant} />
        </div>
      )}
      {caption ? <figcaption className="small">{caption}</figcaption> : null}
    </figure>
  );
}
