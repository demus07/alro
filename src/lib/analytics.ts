import { track } from "@vercel/analytics";

/*
 * Cookieless, aggregate analytics: page views plus a handful of named events
 * (primary-action clicks, enquiry routes, form completions, demo completions).
 * No personal details are ever sent as event properties.
 */
export function trackEvent(name: string, props?: Record<string, string>) {
  try {
    track(name, props);
  } catch {
    // Analytics must never break the page.
  }
}
