"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // Follow the system setting until the visitor makes a choice of their own.
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("alro-theme");
    } catch {}
    if (!stored) document.documentElement.dataset.theme = mq.matches ? "dark" : "light";
  };
  mq.addEventListener("change", onSystem);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", onSystem);
  };
}

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${next} theme`}
      aria-pressed={theme === "dark"}
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("alro-theme", next);
        } catch {}
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
      <span className="theme-toggle__text label">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
