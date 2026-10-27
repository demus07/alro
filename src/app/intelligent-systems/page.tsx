import type { Metadata } from "next";
import { PrimaryAction, TextLink } from "@/components/Actions";
import { SectionMarker } from "@/components/Mark";
import { KnowledgeDemo } from "@/components/KnowledgeDemo";
import {
  ContactBlock,
  Engagements,
  KnowledgeFlow,
  PageHero,
  Section,
  SectionHead,
  WorkList,
} from "@/components/Sections";
import { faqs, projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Intelligent Systems",
  description:
    "Practical AI systems that connect tools, information and workflows to reduce repetitive work and make important knowledge easier to use.",
};

const offers = [
  {
    title: "Company Intelligence",
    body: "Our flagship system: approved company information, connected — to find answers, surface what needs attention, and move work forward with a person's approval.",
    href: "/company-intelligence",
  },
  {
    title: "Custom AI workflows",
    body: "One defined process improved from trigger to outcome: mapped, integrated, tested for exceptions, monitored and documented.",
  },
  {
    title: "Tool integrations",
    body: "The tools you already use, connected, so information moves between them without being re-typed.",
  },
  {
    title: "Internal tools and reporting",
    body: "Small, focused internal tools that make information easier to see and act on.",
  },
];

const boundaries = [
  "We start with one defined workflow, not a company-wide transformation.",
  "Systems use approved sources only, and respect who can see what.",
  "Consequential actions wait for a person to approve them.",
  "We validate against criteria agreed before the build begins.",
  "If AI isn't the right tool for the problem, we'll say so.",
];

const guarantee = faqs[0];

export default function IntelligentSystemsPage() {
  return (
    <>
      <PageHero
        index="02"
        label="AI & Automation"
        title={
          <>
            Intelligent <em>Systems</em>
          </>
        }
        lead="We connect tools, information and workflows to reduce repetitive work and make important knowledge easier to use."
      >
        <div className="actions">
          <PrimaryAction />
          <TextLink href="/company-intelligence">See our flagship system</TextLink>
        </div>
      </PageHero>

      <Section id="offers" index="02" label="What we build">
        <SectionHead
          id="offers"
          index="02"
          label="What we build"
          title={
            <>
              Specific workflows. Bounded systems you can <em>trust</em>.
            </>
          }
        >
          <p className="prose">
            We don&rsquo;t sell an autonomous company or a flawless &ldquo;AI brain&rdquo;. We build
            specific systems we can design, test and support — starting with one workflow.
          </p>
        </SectionHead>
        <div className="grid split">
          <div />
          <ol className="offer-list divided">
            {offers.map((o, i) => (
              <li key={o.title} data-reveal>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{o.title}</h3>
                <div>
                  <p className="prose">{o.body}</p>
                  {o.href ? (
                    <div className="offer-list__link">
                      <TextLink href={o.href}>See Company Intelligence, and the walkthrough</TextLink>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="demo" index="03" label="How it works" surface="ink">
        <SectionHead
          id="demo"
          index="03"
          label="How it works"
          title={
            <>
              Your company&rsquo;s knowledge, <em>connected</em>.
            </>
          }
        >
          <p className="prose">
            Company decisions, conversations, documents, and tasks often live in separate tools. We
            can bring approved sources together into a searchable knowledge layer that helps teams
            find answers and surface what needs attention.
          </p>
        </SectionHead>
        <KnowledgeFlow />
        <p className="small kflow__caveat">
          Illustrative architecture, not a claim that ALRO has already deployed this complete system
          for a customer.
        </p>
        <div className="grid split demo-block">
          <div data-reveal>
            <p className="label">Try it</p>
            <p className="h3 demo-block__title">Four things a knowledge system should do well.</p>
          </div>
          <div data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <KnowledgeDemo />
          </div>
        </div>
      </Section>

      <Section id="engagement" index="04" label="How an engagement works">
        <SectionHead
          id="engagement"
          index="04"
          label="How an engagement works"
          title={
            <>
              Start small, prove it, then <em>build</em>.
            </>
          }
        >
          <p className="prose">
            Each stage is scoped and priced on its own, and you can stop after any of them.
          </p>
        </SectionHead>
        <div className="grid split">
          <div />
          <Engagements only="systems" />
        </div>
      </Section>

      <Section id="boundaries" index="05" label="How we keep it practical" surface="ink">
        <div className="grid split">
          <div data-reveal>
            <SectionMarker index="05" label="How we keep it practical" />
          </div>
          <div className="stack">
            <h2 id="boundaries-title" className="h2" data-reveal>
              Technology with <em>intent</em>.
            </h2>
            <ul className="boundaries" data-reveal>
              {boundaries.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="notice" data-reveal>
              <p className="label">{guarantee.q}</p>
              <p style={{ marginTop: 8 }}>{guarantee.a}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="work" index="06" label="Related work">
        <SectionHead
          id="work"
          index="06"
          label="Related work"
          title={
            <>
              Demonstrations, clearly <em>labelled</em>.
            </>
          }
        />
        <WorkList items={projects.filter((p) => p.practice === "Intelligent Systems")} />
      </Section>

      <ContactBlock index="07" defaultRoute="system" />
    </>
  );
}
