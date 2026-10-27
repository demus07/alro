import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import { ActionBar } from "@/components/ActionBar";
import { Cursor } from "@/components/Cursor";
import { Intro } from "@/components/Intro";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { Tracking } from "@/components/Tracking";
import { site } from "@/content/site";
import "./globals.css";
import "../styles/components.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `ALRO — ${site.descriptor}`,
    template: "%s · ALRO",
  },
  description:
    "An independent digital studio. We design bespoke websites and build practical AI systems for ambitious businesses.",
  openGraph: {
    title: `ALRO — ${site.descriptor}`,
    description: site.tagline,
    siteName: "ALRO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff6ec" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1b1d" },
  ],
};

// Runs before first paint: theme (stored choice, else system) and whether to
// play the once-per-visit intro. No flash of the wrong theme.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');var t='light';try{t=localStorage.getItem('alro-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(!sessionStorage.getItem('alro-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro')}catch(e){}d.dataset.theme=t})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: boot }}
        />
      </head>
      <body>
        <Intro />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ActionBar />
        <Reveal />
        <Cursor />
        <Tracking />
      </body>
    </html>
  );
}
