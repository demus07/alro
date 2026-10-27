import type { Metadata } from "next";
import { PageHero, Section, WorkList } from "@/components/Sections";
import { SectionMarker } from "@/components/Mark";
import { kindLabels, projects, type ProjectKind } from "@/content/site";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Previous work by the founders, independent experiments and AI demonstrations — each clearly labelled.",
};

const groups: { kind: ProjectKind; letter: string; note: string }[] = [
  {
    kind: "portfolio",
    letter: "01",
    note: "Work made by each founder before ALRO, with their role and the context stated. It is not presented as studio commissions.",
  },
  {
    kind: "experiment",
    letter: "02",
    note: "Personal concepts made to explore an idea. Not commissioned client work.",
  },
  {
    kind: "demonstration",
    letter: "03",
    note: "Working prototypes built with permitted sample data. They demonstrate functionality, not client outcomes.",
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        index="04"
        label="Selected work"
        title={
          <>
            Selected work, independent practice and <em>explorations</em>.
          </>
        }
        lead="ALRO is a new studio. Rather than borrow proof, we show exactly what each piece is, who made it, and what it does — and doesn't — demonstrate."
      />

      {groups.map((g) => {
        const items = projects.filter((p) => p.kind === g.kind);
        if (!items.length) return null;
        return (
          <Section
            key={g.kind}
            id={g.kind}
            index={g.letter}
            label={kindLabels[g.kind]}
            className="section--flush-top"
          >
            <div className="grid split section-head" style={{ marginBottom: 32 }}>
              <div data-reveal>
                <SectionMarker index={g.letter} label={kindLabels[g.kind]} />
              </div>
              <div data-reveal>
                <h2 id={`${g.kind}-title`} className="h3">
                  {kindLabels[g.kind]}
                </h2>
                <p className="prose" style={{ marginTop: 12 }}>
                  {g.note}
                </p>
              </div>
            </div>
            <WorkList items={items} />
          </Section>
        );
      })}
    </>
  );
}
