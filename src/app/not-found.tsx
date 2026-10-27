import { PrimaryAction, TextLink } from "@/components/Actions";
import { SectionMarker } from "@/components/Mark";

export default function NotFound() {
  return (
    <section className="page-hero surface-ivory" style={{ minHeight: "70vh" }}>
      <div className="wrap">
        <SectionMarker index="404" label="Not found" />
        <h1 className="display">
          This page isn&rsquo;t <em>here</em>.
        </h1>
        <div className="actions" style={{ marginTop: 40 }}>
          <PrimaryAction />
          <TextLink href="/">Back to the homepage</TextLink>
        </div>
      </div>
    </section>
  );
}
