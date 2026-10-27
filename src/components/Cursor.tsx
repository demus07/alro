"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, summary, label.choice, [role='tab']";
const TEXT = "input:not([type='radio']), textarea, select";

/**
 * The signature as a cursor: the filled node by default, opening into the
 * ring over anything you can act on. Fine pointers only; touch keeps its own.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    let x = -100;
    let y = -100;
    let frame = 0;
    const paint = () => {
      frame = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      el.classList.add("is-on");
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      el.classList.toggle("is-text", !!t?.closest(TEXT));
      el.classList.toggle("is-link", !t?.closest(TEXT) && !!t?.closest(INTERACTIVE));
    };
    const onLeave = () => el.classList.remove("is-on");
    const onDown = () => el.classList.add("is-down");
    const onUp = () => el.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(frame);
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span className="cursor__ring" />
      <span className="cursor__dot" />
    </div>
  );
}
