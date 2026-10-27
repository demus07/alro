"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** One delegated listener for every element marked with data-track. */
export function Tracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      trackEvent(el.dataset.track!, {
        from: window.location.pathname,
        ...(el.dataset.trackLabel ? { label: el.dataset.trackLabel } : {}),
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <Analytics />;
}
