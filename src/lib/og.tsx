import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/* Shared card for link previews: the signature, a kicker and one line. */
export function ogCard({ kicker, title }: { kicker: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1b1b1d",
          color: "#fff6ec",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 26, height: 26, borderRadius: 13, background: "#ff8a3d" }} />
            <div style={{ width: 60, height: 2, background: "rgba(255,246,236,0.7)" }} />
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                border: "2px solid rgba(255,246,236,0.7)",
              }}
            />
          </div>
          <div style={{ fontSize: 34, letterSpacing: 8 }}>ALRO</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,246,236,0.6)",
            }}
          >
            {kicker}
          </div>
          <div style={{ fontSize: 64, lineHeight: 1.1, maxWidth: 980, letterSpacing: -1 }}>{title}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
