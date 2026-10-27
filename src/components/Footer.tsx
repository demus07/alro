import Link from "next/link";
import { moreNav, nav, site } from "@/content/site";
import { Mark } from "./Mark";

export function Footer() {
  return (
    <footer className="site-footer surface-ink" data-actionbar-yield>
      <div className="wrap">
        <div className="grid site-footer__top">
          <div className="site-footer__intro">
            <p className="h3">
              Digital experiences with feeling. Intelligent systems with{" "}
              <em>purpose</em>.
            </p>
          </div>
          <nav className="site-footer__nav" aria-label="Footer">
            <p className="label">Studio</p>
            <ul>
              {[...nav, ...moreNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/contact">{site.primaryAction}</Link>
              </li>
            </ul>
          </nav>
          <div className="site-footer__contact">
            <p className="label">Write to us</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>

        <div className="site-footer__mark" aria-hidden="true">
          <span>ALRO</span>
          <Mark size={120} />
        </div>

        <div className="site-footer__base small">
          <p>
            © 2026 ALRO · {site.descriptor}
          </p>
          <ul>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>Independent studio · Founder-led</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
