import type { Metadata } from "next";
import { PrimaryAction } from "@/components/Actions";
import {
  ContactBlock,
  FitList,
  FounderList,
  PageHero,
  PrincipleList,
  ProcessList,
  Section,
  SectionHead,
  TermsList,
} from "@/components/Sections";
import { SectionMarker } from "@/components/Mark";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "ALRO is a small, founder-led studio bringing together digital craft and intelligent systems.",
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        index="01"
        label="The studio"
        title={
          <>
            Small by design. Thoughtful by <em>default</em>.
          </>
        }
        lead="ALRO brings together complementary strengths in digital craft and intelligent systems. We work directly with clients, keeping the process collaborative, considered, and close to the work."
      >
        <PrimaryAction />
      </PageHero>

      <Section id="founders" index="02" label="The founders" className="section--flush-top">
        <div className="grid split section-head" style={{ marginBottom: 56 }}>
          <div data-reveal>
            <SectionMarker index="02" label="The founders" />
          </div>
          <h2 id="founders-title" className="h3" data-reveal>
            The people you&rsquo;ll work with are the people doing the work.
          </h2>
        </div>
        <FounderList />
      </Section>

      <Section id="pov" index="03" label="Shared philosophy" surface="ink">
        <SectionHead
          id="pov"
          index="03"
          label="Shared philosophy"
          title={
            <>
              A business should work as thoughtfully as it <em>presents</em> itself.
            </>
          }
        >
          <p className="prose">
            Your website shapes the first impression. Your internal systems shape what happens behind
            the scenes. We bring both into focus — designing digital experiences that express the
            character of a business, and intelligent systems that help its people spend less time on
            repetitive work and more time on what matters.
          </p>
        </SectionHead>
        <div className="grid split">
          <div />
          <PrincipleList />
        </div>
      </Section>

      <Section id="approach" index="04" label="Working approach">
        <SectionHead
          id="approach"
          index="04"
          label="Working approach"
          title={
            <>
              Five steps, the same every <em>time</em>.
            </>
          }
        />
        <div className="grid split">
          <div />
          <div className="stack-lg">
            <ProcessList />
            <TermsList />
            <FitList />
          </div>
        </div>
      </Section>

      <ContactBlock index="05" />
    </>
  );
}
