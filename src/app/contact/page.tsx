import type { Metadata } from "next";
import { ContactBlock, FAQ } from "@/components/Sections";
import { SectionMarker } from "@/components/Mark";

export const metadata: Metadata = {
  title: "Start a conversation",
  description:
    "Tell us a little about the website, workflow or idea you have in mind. We read every message ourselves.",
};

export default function ContactPage() {
  return (
    <>
      <div className="contact-page">
        <ContactBlock index="01" />
      </div>
      <section className="section surface-ivory" data-marker="02 — Questions" aria-labelledby="faq-title">
        <div className="wrap grid split">
          <div>
            <SectionMarker index="02" label="Questions" />
            <h2 id="faq-title" className="h3" style={{ marginTop: 24, maxWidth: "12ch" }}>
              Before you write.
            </h2>
          </div>
          <FAQ />
        </div>
      </section>
    </>
  );
}
