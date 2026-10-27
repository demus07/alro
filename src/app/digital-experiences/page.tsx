import type { Metadata } from "next";
import { PrimaryAction, TextLink } from "@/components/Actions";
import { SectionMarker } from "@/components/Mark";
import {
  ContactBlock,
  Engagements,
  PageHero,
  ProcessList,
  Section,
  SectionHead,
  WorkList,
} from "@/components/Sections";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Digital Experiences",
  description:
    "Bespoke websites and digital products that translate a business's identity into a thoughtful, cohesive experience.",
};

const offers = [
  {
    title: "Bespoke websites",
    body: "Designed and built around your business, your audience and your content, rather than adapted from a template.",
  },
  {
    title: "SaaS marketing sites",
    body: "Sites that explain a product clearly to the people who need to understand it, and that your team can keep up to date.",
  },
  {
    title: "Founder and personal-brand sites",
    body: "A considered home for a founder's work, writing and point of view.",
  },
  {
    title: "Product and interface design",
    body: "Interfaces for digital products, from flows and structure to finished visual design.",
  },
  {
    title: "Frontend development",
    body: "Accessible, fast, maintainable frontends, built with the same care as the design.",
  },
];

const deliverables = [
  "Discovery and positioning",
  "Messaging structure and page plan",
  "Art direction",
  "Responsive design for every screen size",
  "Development, ready for production",
  "Analytics setup",
  "A documented handover",
];

const considered = [
  "Responsive layouts rethought for phones, not just shrunk",
  "Accessibility: keyboard support, contrast and reduced motion",
  "Performance: compressed media and restrained scripts",
  "A documented handover, so the site can be maintained",
];

export default function DigitalExperiencesPage() {
  return (
    <>
      <PageHero
        index="01"
        label="Design & Development"
        title={
          <>
            Digital <em>Experiences</em>
          </>
        }
        lead="We create bespoke websites and digital products that translate a business's identity into a thoughtful, cohesive experience."
      >
        <div className="actions">
          <PrimaryAction />
          <TextLink href="#work">See related work</TextLink>
        </div>
      </PageHero>

      <Section id="offers" index="02" label="What we make">
        <SectionHead
          id="offers"
          index="02"
          label="What we make"
          title={
            <>
              Made for the context, not from a <em>template</em>.
            </>
          }
        />
        <div className="grid split">
          <div />
          <ol className="offer-list divided">
            {offers.map((o, i) => (
              <li key={o.title} data-reveal>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{o.title}</h3>
                <p className="prose">{o.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="standards" index="03" label="What you get" className="section--flush-top">
        <div className="grid split">
          <div data-reveal>
            <SectionMarker index="03" label="What you get" />
          </div>
          <div data-reveal>
            <div className="two-lists">
              <div>
                <p className="h3" id="standards-title">
                  What a project includes.
                </p>
                <ul className="boundaries">
                  {deliverables.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="h3">The details people notice without noticing.</p>
                <ul className="boundaries">
                  {considered.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="process" index="04" label="How a project runs" surface="ink">
        <SectionHead
          id="process"
          index="04"
          label="How a project runs"
          title={
            <>
              From first conversation to a site you can <em>own</em>.
            </>
          }
        >
          <p className="prose">
            We don&rsquo;t promise fixed delivery times before a project is scoped. Timelines are agreed
            in the written proposal.
          </p>
        </SectionHead>
        <div className="grid split">
          <div />
          <ProcessList />
        </div>
        <div className="grid split engage-block">
          <div data-reveal>
            <p className="label">How you buy it</p>
            <p className="h3 demo-block__title">A scoped project, then a handover.</p>
          </div>
          <Engagements only="websites" />
        </div>
      </Section>

      <Section id="work" index="05" label="Related work">
        <SectionHead
          id="work"
          index="05"
          label="Related work"
          title={
            <>
              Work that shows how we <em>think</em>.
            </>
          }
        />
        <WorkList items={projects.filter((p) => p.practice === "Digital Experiences")} />
      </Section>

      <ContactBlock index="06" defaultRoute="experience" />
    </>
  );
}
