"use client";

import { useEffect, useRef } from "react";

/**
 * One of the few scroll-linked moments: the point of view lights up word by
 * word as it is read. Native scrolling; at most one update per frame.
 */
export function ScrollStatement({
  text,
  emphasis,
  id,
}: {
  text: string;
  emphasis?: string;
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    el.classList.add("is-scrubbed");

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the statement enters the lower part of the screen, 1 by the middle.
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.45 + r.height)));
      const lit = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle("is-lit", i < lit));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <h2 ref={ref} id={id} className="statement">
      {words.map((w, i) => {
        const bare = w.replace(/[.,]/g, "");
        const word = bare === emphasis ? (
          <em>
            {bare}
          </em>
        ) : (
          bare
        );
        const trail = w.slice(bare.length);
        return (
          <span key={i} data-w="">
            {word}
            {trail}
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </h2>
  );
}
