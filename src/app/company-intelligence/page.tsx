import type { Metadata } from "next";
import { PrimaryAction, TextLink } from "@/components/Actions";
import { SectionMarker } from "@/components/Mark";
import {
  CapabilityStatus,
  ContactBlock,
  Deployment,
  FAQ,
  PageHero,
  Section,
  SectionHead,
  UseCases,
} from "@/components/Sections";
import { Walkthrough } from "@/components/Walkthrough";
import { ci, ciFaqs, engagements } from "@/content/site";

export const metadata: Metadata = {
  title: "Company Intelligence",
  description:
    "A configurable system that connects approved company information, so people can find answers, see what was decided, and notice what still needs doing. A working prototype, available as a scoped pilot.",
  openGraph: {
    title: "Company Intelligence · ALRO",
    description:
      "Find what your company already knows, surface what needs attention, and move work forward — with a person approving every action.",
  },
};

const pilot = engagements.find((e) => e.key === "systems")!;

/*
 * The page outbound messages link to. It should stand on its own: the offer,
 * the demo, what's real, how a pilot works, where data lives, and a way to
 * start — without needing the rest of the site.
 */
export default function CompanyIntelligencePage() {
  return (
    <>
      <PageHero
        index="01"
        label="Intelligent Systems · Flagship"
        marker="01 — Company Intelligence"
        title={
          <>
            Company <em>Intelligence</em>
          </>
        }
        lead={ci.summary}
      >
        <p className="stage-pill">
          <span aria-hidden="true" />
          {ci.stage}
        </p>
        <div className="actions">
          <PrimaryAction href="#contact" from="ci-hero" />
          <TextLink href="#walkthrough">Watch the walkthrough</TextLink>
        </div>
      </PageHero>

      <Section id="does" index="02" label="What it does" className="section--flush-top">
        <SectionHead
          id="does"
          index="02"
          label="What it does"
          title={
            <>
              Three jobs, done with the evidence <em>attached</em>.
            </>
          }
        >
          <p className="prose">
            Decisions sit in meeting notes, context in chat threads, commitments in email. It brings
            the approved parts together, so people spend less time piecing things back together.
          </p>
        </SectionHead>
        <UseCases />
      </Section>

      <Section id="walkthrough" index="03" label="Walkthrough" surface="ink">
        <SectionHead
          id="walkthrough"
          index="03"
          label="Walkthrough"
          title={
            <>
              From a document to an approved <em>action</em>.
            </>
          }
        >
          <p className="prose">
            Upload a meeting document, see what it finds, ask it a question, and review the
            follow-up it prepares. A simulation with fictional data — about forty seconds on
            autoplay.
          </p>
        </SectionHead>
        <div className="walk-wide" data-reveal>
          <Walkthrough />
        </div>
      </Section>

      <Section id="status" index="04" label="What we're building" surface="ink" className="section--seam">
        <SectionHead
          id="status"
          index="04"
          label="What we're building"
          title={
            <>
              What exists today, and what doesn&rsquo;t <em>yet</em>.
            </>
          }
        >
          <p className="prose">
            Retrieval, extraction and taking action are different levels of capability. We keep
            them apart, and say which is which.
          </p>
        </SectionHead>
        <CapabilityStatus />
      </Section>

      <Section id="pilot" index="05" label="How a pilot works">
        <div className="grid split">
          <div data-reveal>
            <SectionMarker index="05" label="How a pilot works" />
          </div>
          <div className="stack">
            <h2 id="pilot-title" className="h2" data-reveal>
              Start small, prove it, then <em>build</em>.
            </h2>
            <p className="prose" data-reveal>
              One workflow first, not a company-wide transformation. Each stage has its own scope and
              price, and you can stop after any of them.
            </p>
            <ol className="offer-list divided">
              {pilot.steps.map((s, i) => (
                <li key={s.title} data-reveal>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h3">{s.title}</h3>
                  <p className="prose">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="notice" data-reveal>
              {/* TODO: the founders should define exactly what the first pilot includes and excludes. */}
              <p className="label">A first pilot includes</p>
              <p style={{ marginTop: 8 }}>
                [One workflow, up to [n] connected sources, [n] weeks, a fixed price, and the
                criteria it will be judged against.]
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="deployment" index="06" label="Security & deployment" surface="ink">
        <SectionHead
          id="deployment"
          index="06"
          label="Security & deployment"
          title={
            <>
              Built around your <em>environment</em>.
            </>
          }
        >
          <p className="prose">
            Deployment and data-handling requirements are agreed during discovery. We&rsquo;ve built
            and deployed SaaS and on-premises software before; for Company Intelligence, no model
            below is offered as proven until it has been validated with you.
          </p>
        </SectionHead>
        <Deployment />
        <p className="small kflow__caveat">
          We don&rsquo;t claim that data never leaves your network, or that it is encrypted so no one
          can see it, unless the agreed architecture genuinely supports it.
        </p>
      </Section>

      <Section id="questions" index="07" label="Questions" surface="umber">
        <div className="grid split">
          <div data-reveal>
            <SectionMarker index="07" label="Questions" />
            <h2 id="questions-title" className="h3 principles__title">
              What teams ask <em>first</em>.
            </h2>
          </div>
          <FAQ items={ciFaqs} />
        </div>
      </Section>

      <ContactBlock
        index="08"
        defaultRoute="system"
        title={
          <>
            Explore a <em>pilot</em>.
          </>
        }
      />
    </>
  );
}
