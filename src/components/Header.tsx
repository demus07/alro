"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, pagesWithContact } from "@/content/site";
import { Wordmark } from "./Mark";
import { PrimaryAction } from "./Actions";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  // Reading progress: at most one update per animation frame.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progressRef.current?.style.setProperty("--p", String(p));
      setScrolled(window.scrollY > 8);
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
  }, [pathname]);

  // "Where you are" marker, driven by sections that declare data-marker.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-marker]"),
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(e.target.getAttribute("data-marker"));
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      io.disconnect();
      setCurrent(null);
    };
  }, [pathname]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap site-header__inner">
        <Link href="/" className="site-header__brand" aria-label="ALRO, home">
          <Wordmark />
        </Link>

        <p className="site-header__where label" aria-hidden="true">
          {current}
        </p>

        <ThemeToggle className="theme-toggle--compact" />
        <nav className="site-nav" aria-label="Primary">
          <ul>
            {nav.map((item) => {
              const active =
                pathname.startsWith(item.href) ||
                (item.href === "/intelligent-systems" && pathname === "/company-intelligence");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
          <PrimaryAction href={pagesWithContact.includes(pathname) ? "#contact" : "/contact"} from="header" />
        </nav>
      </div>
      <span ref={progressRef} className="site-header__progress" aria-hidden="true" />
    </header>
  );
}
