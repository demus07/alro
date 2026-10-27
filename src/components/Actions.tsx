import Link from "next/link";
import { site } from "@/content/site";
import { Arrow } from "./Mark";

/** The one primary action. Worded the same way everywhere. */
export function PrimaryAction({ href = "/contact", from }: { href?: string; from?: string }) {
  return (
    <Link className="btn" href={href} data-track="primary_action" data-track-label={from}>
      {site.primaryAction}
      <Arrow />
    </Link>
  );
}

/** Secondary actions are always text links, never a second button. */
export function TextLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a className="link" href={href} target="_blank" rel="noreferrer">
        {children}
        <Arrow />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className="link" href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
