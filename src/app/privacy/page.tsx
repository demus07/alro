import type { Metadata } from "next";
import { SectionMarker } from "@/components/Mark";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How ALRO handles the information you send us.",
};

// TODO: have this reviewed for your jurisdiction and fill in the bracketed details.
export default function PrivacyPage() {
  return (
    <section className="page-hero surface-ivory">
      <div className="wrap grid split">
        <div>
          <SectionMarker index="—" label="Privacy notice" />
        </div>
        <div className="legal">
          <h1 className="h2">Privacy</h1>
          <p className="small" style={{ marginTop: 16 }}>
            Last updated: [date]
          </p>

          <h2 className="h4">Who we are</h2>
          <p>
            This website is operated by [legal entity name], [registered address] (&ldquo;ALRO&rdquo;,
            &ldquo;we&rdquo;). You can contact us about privacy at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2 className="h4">What we collect</h2>
          <p>When you use the contact form, we receive the details you choose to give us:</p>
          <ul>
            <li>your name and work email address;</li>
            <li>your company or website, if provided;</li>
            <li>
              the kind of project, your description of it, and any optional details you add — such
              as audience, launch window, tools in use, data sensitivity, deployment needs or a
              budget range.
            </li>
          </ul>

          <h2 className="h4">Analytics and cookies</h2>
          <p>
            We use [Vercel Web Analytics] to count page views and a few anonymous events, such as
            when the contact form is sent. It does not use cookies, and it does not identify you
            or follow you across other websites. We do not send your form answers to it.
          </p>
          <p>
            We store two small preferences in your browser: your light or dark theme, and whether
            the opening animation has already played this visit. Neither is sent to us.
          </p>
          <p>[Confirm the hosting provider and any server logs it keeps.]</p>

          <h2 className="h4">Why we use it</h2>
          <p>
            Only to reply to your enquiry and, if we go on to work together, to discuss and prepare a
            proposal. We do not sell your information or add you to a mailing list.
          </p>

          <h2 className="h4">Where it goes and how long we keep it</h2>
          <p>
            Form submissions are delivered to our inbox through [service provider]. We keep enquiries
            for [period] unless we begin working together, after which they are kept for as long as
            needed for that work and any legal obligations.
          </p>

          <h2 className="h4">Your choices</h2>
          <p>
            You can ask to see, correct or delete the information we hold about you at any time by
            writing to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
