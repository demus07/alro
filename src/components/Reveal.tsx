"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Plays each [data-reveal] element's entrance once, as it enters the viewport. */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Hold entrances until the intro has lifted, so they play in reading order.
    if (document.documentElement.classList.contains("intro")) {
      let dispose: (() => void) | undefined;
      const run = () => {
        dispose = observe();
      };
      window.addEventListener("alro:intro-done", run, { once: true });
      return () => {
        window.removeEventListener("alro:intro-done", run);
        dispose?.();
      };
    }
    return observe();
  }, [pathname]);

  return null;
}

const revealed = new WeakSet<Element>();

// Animates with the Web Animations API rather than toggling classes, so it
// never touches attributes React manages (no hydration mismatches).
function play(el: HTMLElement) {
  if (revealed.has(el)) return;
  revealed.add(el);
  const i = Number(getComputedStyle(el).getPropertyValue("--i")) || 0;
  el.animate(
    [
      { opacity: 0, transform: "translateY(14px)" },
      { opacity: 1, transform: "none" },
    ],
    { duration: 700, delay: i * 90, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", fill: "both" },
  );
}

function observe(): (() => void) | undefined {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
    (el) => !revealed.has(el),
  );
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => {
      revealed.add(el);
      el.animate([{ opacity: 1 }], { duration: 0, fill: "forwards" });
    });
    return undefined;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        play(e.target as HTMLElement);
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
