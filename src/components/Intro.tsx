"use client";

import { useEffect } from "react";

/**
 * The loading intro: once per visit, the wordmark settles and the signature
 * draws itself (the line doubles as progress), then the page is revealed.
 * Skipped entirely for reduced motion and on later page views.
 */
export function Intro() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro")) return;

    let doneTimer = 0;
    const finish = () => {
      html.classList.add("intro-out");
      try {
        sessionStorage.setItem("alro-intro", "1");
      } catch {}
      doneTimer = window.setTimeout(() => {
        html.classList.remove("intro", "intro-out");
        window.dispatchEvent(new Event("alro:intro-done"));
      }, 700);
    };

    const outTimer = window.setTimeout(finish, 1700);
    const skip = () => {
      window.clearTimeout(outTimer);
      finish();
    };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });

    return () => {
      window.clearTimeout(outTimer);
      window.clearTimeout(doneTimer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <div className="intro-screen" aria-hidden="true">
      <div className="intro-screen__inner">
        <p className="intro-screen__word">
          {"ALRO".split("").map((ch, i) => (
            <span key={i} style={{ "--i": i } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </p>
        <svg className="intro-screen__mark" viewBox="0 0 56 20" fill="none">
          <circle className="intro-screen__dot" cx="10" cy="10" r="7" />
          <line className="intro-screen__line" x1="18" y1="10" x2="38" y2="10" pathLength={1} />
          <circle className="intro-screen__ring" cx="45" cy="10" r="6.5" pathLength={1} />
        </svg>
        <p className="label intro-screen__label">Digital Craft &amp; Intelligence</p>
      </div>
    </div>
  );
}
