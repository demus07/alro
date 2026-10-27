"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { moreNav, nav, pagesWithContact, site } from "@/content/site";
import { Arrow, Mark } from "./Mark";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Phones only: a persistent action bar in place of desktop navigation.
 * It steps aside once the contact form or the footer is on screen.
 */
export function ActionBar() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-actionbar-yield]"),
    );
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      setHidden(false);
    };
  }, [pathname]);

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const contactHref = pagesWithContact.includes(pathname) ? "#contact" : "/contact";

  return (
    <>
      <div className={`action-bar${hidden ? " is-hidden" : ""}`} inert={hidden}>
        <button
          type="button"
          className="action-bar__menu"
          aria-haspopup="dialog"
          onClick={() => dialogRef.current?.showModal()}
        >
          Menu
        </button>
        <Link
          className="btn action-bar__cta"
          href={contactHref}
          data-track="primary_action"
          data-track-label="action-bar"
        >
          {site.primaryAction}
          <Arrow />
        </Link>
      </div>

      <dialog
        ref={dialogRef}
        className="menu-sheet surface-ink"
        aria-label="Site menu"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className="menu-sheet__inner">
          <div className="menu-sheet__top">
            <span className="label">Menu</span>
            <button
              type="button"
              className="menu-sheet__close"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul className="menu-sheet__list">
              <li>
                <Link href="/">Home</Link>
              </li>
              {[...nav, ...moreNav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-sheet__foot">
            <Mark size={26} />
            <a className="small" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <ThemeToggle className="menu-sheet__theme" />
          </div>
        </div>
      </dialog>
    </>
  );
}
