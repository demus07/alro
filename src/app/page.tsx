import Link from "next/link";
import { PrimaryAction, TextLink } from "@/components/Actions";
import { HeroFigure, PracticeFigure } from "@/components/Figures";
import { Arrow, SectionMarker } from "@/components/Mark";
import { ScrollStatement } from "@/components/ScrollStatement";
import {
  CapabilityStatus,
  ContactBlock,
  Deployment,
  Engagements,
  FAQ,
  FounderList,
  FounderNote,
  ProcessList,
  Section,
  SectionHead,
  UseCases,
  WorkKey,
  WorkList,
} from "@/components/Sections";
import { Walkthrough } from "@/components/Walkthrough";
import { ci, gap, paths, practices } from "@/content/site";

const d = (i: number) => ({ "--i": i }) as React.CSSProperties;

/*
 * The page follows the order a decision gets made:
 * promise → point of view → what we offer → proof → the flagship, shown working
 * → how buying works → where data lives → people → objections → action.
 * Its one thread: how a business presents itself, and how it works.
 */
export default function Home() {
  return (
    <>
      {/* 01 — Promise, and two ways in */}
      <section className="hero surface-ivory" data-marker="01 — Digital craft & intelligence">
        <div className="wrap">
          <div className="hero__meta" data-reveal>
            <SectionMarker index="01" label="Digital craft & intelligence" />
            <p className="label hero__meta-aside">Independent · Founder-led</p>
          </div>

          <div className="grid hero__body">
            <h1 className="display hero__title" data-reveal style={d(1)}>
              Digital experiences with feeling. Intelligent systems with <em>purpose</em>.
            </h1>
            <div className="hero__copy" data-reveal style={d(2)}>
              <p className="lead">
                We design bespoke websites and build practical AI systems for ambitious businesses —
                and you work directly with the people doing the work.
              </p>
              <div className="actions">
                <PrimaryAction href="#contact" from="hero" />
                <TextLink href="#work">See the work first</TextLink>
              </div>
            </div>
            <div className="hero__art" data-reveal style={d(3)}>
              <HeroFigure />
            </div>
          </div>

          <nav className="paths" aria-label="Choose a path">
            {paths.map((p, i) => (
              <Link
                key={p.href}
                href={p.href}
                className="path"
                data-reveal
                style={d(i + 4)}
                data-track="path"
                data-track-label={p.href}
              >
                <span className="label">
                  <span className="num">{p.index}</span> · {p.label}
                </span>
                <span className="path__title">{p.title}</span>
                <span className="path__body small">{p.body}</span>
                <span className="path__arrow" aria-hidden="true">
                  <Arrow />
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* 02 — Point of view */}
      <Section id="pov" index="02" label="Our point of view">
        <div className="grid split">
          <div data-reveal>
            <SectionMarker index="02" label="Our point of view" />
          </div>
          <div>
            <ScrollStatement
              id="pov-title"
              text="A business should work as thoughtfully as it presents itself."
              emphasis="presents"
            />
            <div className="gap">
              {[gap.outside, gap.inside].map((side, i) => (
                <div key={side.label} className="gap__side" data-reveal style={d(i)}>
                  <p className="label">{side.label}</p>
                  <p className="gap__body">{side.body}</p>
                </div>
              ))}
            </div>
            <p className="prose pov__close" data-reveal>
              Most studios do one or the other. We do both, because the same care belongs on each
              side — and because the people who notice one usually notice the other.
            </p>
          </div>
        </div>
      </Section>

      {/* 03 — What we offer */}
      <Section id="practices" index="03" label="Two practices" surface="ink">
        <SectionHead
          id="practices"
          index="03"
          label="Two practices"
          title={
            <>
              One studio for how it looks, and how it <em>works</em>.
            </>
          }
        />
        <div className="practices">
          {practices.map((p, i) => (
            <article key={p.slug} className="practice" data-reveal style={d(i)}>
              <div className="practice__figure">
                <PracticeFigure variant={i === 0 ? "layers" : "nodes"} />
              </div>
              <p className="label">
                <span className="num">{p.index}</span> · {p.discipline}
              </p>
              <h3 className="h2 practice__title">{p.title}</h3>
              <p className="prose">{p.summary}</p>
              <ul className="practice__offers divided">
                {p.offers.map((o) => (
                  <li key={o}>
                    {o}
                    {o === ci.name ? <span className="practice__flag">Flagship</span> : null}
                  </li>
                ))}
              </ul>
              <div className="actions">
                <TextLink href={`/${p.slug}`}>Explore {p.title}</TextLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 04 — Proof, labelled honestly */}
      <Section id="work" index="04" label="Selected work">
        <SectionHead
          id="work"
          index="04"
          label="Selected work"
          title={
            <>
              Two kinds of proof, each labelled for what it <em>is</em>.
            </>
          }
        >
          <p className="prose">
            ALRO is new. Instead of a logo wall, we show the founders&rsquo; own work and what
            we&rsquo;re building now — who made each piece, why it exists, and what it does and
            doesn&rsquo;t demonstrate.
          </p>
          <WorkKey />
        </SectionHead>
        <WorkList />
        <div className="section-foot">
          <TextLink href="/work">All work, and how we label it</TextLink>
        </div>
      </Section>

      {/* 05 — The flagship, shown working */}
      <Section id="intelligence" index="05" label="Company Intelligence" surface="ink">
        <SectionHead
          id="intelligence"
          index="05"
          label="Company Intelligence"
          title={
            <>
              Your company&rsquo;s knowledge, <em>connected</em>.
            </>
          }
        >
          <p className="prose">{ci.summary}</p>
          <p className="stage-pill">
            <span aria-hidden="true" />
            {ci.stage}
          </p>
        </SectionHead>

        <UseCases />

        <div className="grid split demo-block" id="walkthrough">
          <div data-reveal>
            <p className="label">See it work</p>
            <p className="h3 demo-block__title">From a document to an approved action, in five steps.</p>
            <p className="small demo-block__note">
              About forty seconds on autoplay, or step through at your own pace.
            </p>
          </div>
          <div data-reveal style={d(1)}>
            <Walkthrough />
          </div>
        </div>

        <div className="grid split status-block">
          <div data-reveal>
            <p className="label">What we&rsquo;re building</p>
            <p className="h3 demo-block__title">What exists today, and what doesn&rsquo;t yet.</p>
          </div>
          <div>
            <CapabilityStatus />
            <div className="section-foot">
              <TextLink href="/company-intelligence">Explore Company Intelligence</TextLink>
            </div>
          </div>
        </div>
      </Section>

      {/* 06 — How buying works */}
      <Section id="process" index="06" label="How we work">
        <SectionHead
          id="process"
          index="06"
          label="How we work"
          title={
            <>
              Five steps, the same every <em>time</em>.
            </>
          }
        />
        <div className="grid split">
          <div />
          <ProcessList />
        </div>
        <div className="grid split engage-block">
          <div data-reveal>
            <p className="label">How an engagement works</p>
            <p className="h3 demo-block__title">Scoped in writing. Support only if you want it.</p>
          </div>
          <Engagements />
        </div>
      </Section>

      {/* 07 — Where data lives */}
      <Section id="deployment" index="07" label="Security & deployment" surface="ink">
        <SectionHead
          id="deployment"
          index="07"
          label="Security & deployment"
          title={
            <>
              Built around your <em>environment</em>.
            </>
          }
        >
          <p className="prose">
            Deployment and data handling are agreed during discovery, and written down before a
            pilot begins. We&rsquo;ve built and deployed SaaS and on-premises software before; for
            Company Intelligence, each option below is proven with you in a pilot rather than
            promised up front.
          </p>
        </SectionHead>
        <Deployment />
      </Section>

      {/* 08 — The people */}
      <Section id="people" index="08" label="The people behind ALRO">
        <SectionHead
          id="people"
          index="08"
          label="The people behind ALRO"
          title={
            <>
              Small by design. Thoughtful by <em>default</em>.
            </>
          }
        >
          <p className="prose">
            ALRO brings together complementary strengths in digital craft and intelligent systems. We
            work directly with clients, keeping the process collaborative, considered, and close to
            the work.
          </p>
        </SectionHead>
        <div className="grid split people">
          <div>
            <FounderNote />
          </div>
          <FounderList />
        </div>
      </Section>

      {/* 09 — Objections */}
      <Section id="questions" index="09" label="Questions" surface="umber">
        <div className="grid split">
          <div data-reveal>
            <SectionMarker index="09" label="Questions" />
            <h2 id="questions-title" className="h3 principles__title">
              Pricing, ownership, support — <em>answered</em>.
            </h2>
          </div>
          <FAQ />
        </div>
      </Section>

      {/* 10 — Action, routed */}
      <ContactBlock index="10" />
    </>
  );
}
