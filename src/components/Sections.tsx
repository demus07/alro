import Link from "next/link";
import {
  capabilityStatus,
  deploymentModels,
  deploymentQuestions,
  engagements,
  evidenceKinds,
  faqs as defaultFaqs,
  fit,
  founders,
  knowledgeFlow,
  nextSteps,
  principles,
  process,
  projects,
  terms,
  founderNote,
  useCases,
  type Faq,
  type Project,
} from "@/content/site";
import type { Route } from "@/app/actions";
import { ContactForm } from "./ContactForm";
import { Plate } from "./Figures";
import { Arrow, Mark, SectionMarker } from "./Mark";
import { TextLink } from "./Actions";

/* Section shell: marker rail on the left, content on the right */
export function Section({
  id,
  index,
  label,
  surface = "ivory",
  children,
  className = "",
}: {
  id?: string;
  index: string;
  label: string;
  surface?: "ivory" | "ink" | "umber";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`section surface-${surface} ${className}`}
      data-marker={`${index} — ${label}`}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHead({
  id,
  index,
  label,
  title,
  children,
}: {
  id?: string;
  index: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid split section-head">
      <div data-reveal>
        <SectionMarker index={index} label={label} />
      </div>
      <div className="stack">
        <h2 id={id ? `${id}-title` : undefined} className="h2" data-reveal>
          {title}
        </h2>
        {children ? (
          <div data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ── Inner page hero ───────────────────────── */

export function PageHero({
  index,
  label,
  title,
  lead,
  marker,
  children,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  marker?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero surface-ivory" data-marker={marker ?? `${index} — ${label}`}>
      <div className="wrap">
        <div data-reveal>
          <SectionMarker index={index} label={label} />
        </div>
        <h1 className="display" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {title}
        </h1>
        {lead || children ? (
          <div className="grid page-hero__foot">
            <div data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              {lead ? <p className="lead">{lead}</p> : null}
              {children}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ── Selected work ─────────────────────────── */

export function ProjectRow({ project, n }: { project: Project; n: number }) {
  return (
    <li className="project-row" data-reveal>
      <Link href={`/work/${project.slug}`} className="project-row__link">
        <span className="num">{String(n).padStart(2, "0")}</span>
        <div className="project-row__text">
          <h3 className="h3">{project.title}</h3>
          <p className="project-row__summary">{project.summary}</p>
          <p className="label project-row__label">{project.label}</p>
        </div>
        <div className="project-row__plate">
          <Plate
            variant={project.practice === "Intelligent Systems" ? "nodes" : "layers"}
            tone={project.kind === "demonstration" ? "ink" : project.kind === "experiment" ? "peach" : "umber"}
          />
        </div>
        <span className="project-row__arrow" aria-hidden="true">
          <Arrow />
        </span>
      </Link>
    </li>
  );
}

export function WorkList({ items = projects }: { items?: Project[] }) {
  const list = items;
  return (
    <ol className="project-list">
      {list.map((p) => (
        <ProjectRow key={p.slug} project={p} n={projects.indexOf(p) + 1} />
      ))}
    </ol>
  );
}

export function WorkKey() {
  return (
    <dl className="evidence">
      {evidenceKinds.map((k, i) => (
        <div key={k.title} className="evidence__kind" data-reveal style={{ "--i": i } as React.CSSProperties}>
          <dt className="h4">
            <span className="evidence__mark" data-kind={i} aria-hidden="true" />
            {k.title}
          </dt>
          <dd className="small">{k.body}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Company intelligence diagram ──────────── */

export function KnowledgeFlow() {
  return (
    <div className="kflow" role="group" aria-label="Illustrative architecture">
      <div className="kflow__stage" data-reveal>
        <p className="label">
          <span className="num">01</span> Connect
        </p>
        <p>{knowledgeFlow.connect}</p>
      </div>
      <div className="kflow__join" aria-hidden="true" />
      <div className="kflow__stage kflow__stage--core" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
        <p className="label">
          <span className="num">02</span> Retrieve and reason
        </p>
        <p>{knowledgeFlow.retrieve}</p>
      </div>
      <div className="kflow__join" aria-hidden="true" />
      <ul className="kflow__outputs">
        {knowledgeFlow.outputs.map((o, i) => (
          <li key={o.title} data-reveal style={{ "--i": i + 2 } as React.CSSProperties}>
            <Mark size={20} />
            <p className="h4">{o.title}</p>
            <p className="small">{o.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Process ───────────────────────────────── */

export function ProcessList() {
  return (
    <ol className="process numbered divided">
      {process.map((step, i) => (
        <li key={step.title} data-reveal style={{ "--i": i % 2 } as React.CSSProperties}>
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="h3">{step.title}</h3>
          <p className="prose">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Founders ──────────────────────────────── */

export function FounderList() {
  return (
    <ul className="founders">
      {founders.map((f, i) => (
        <li key={f.role} className="founder" data-reveal style={{ "--i": i } as React.CSSProperties}>
          {/* TODO: replace with a real photograph at its native proportions. */}
          <div className="founder__portrait" role="img" aria-label={`Portrait of ${f.name} to be added`}>
            <span className="label">Portrait</span>
          </div>
          <p className="label">{f.role}</p>
          <h3 className="h3">{f.name}</h3>
          <p className="prose">{f.bio}</p>
          <TextLink href={f.portfolio}>View selected work</TextLink>
        </li>
      ))}
    </ul>
  );
}

export function FounderNote() {
  return (
    <figure className="founder-note" data-reveal>
      <Mark size={26} />
      <blockquote>
        <p>{founderNote.body}</p>
      </blockquote>
      <figcaption className="label">{founderNote.signature}</figcaption>
    </figure>
  );
}

/* ── Terms — the risk, reversed ────────────── */

export function TermsList() {
  return (
    <ol className="principles divided">
      {terms.map((t, i) => (
        <li key={t.title} data-reveal style={{ "--i": i % 2 } as React.CSSProperties}>
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <p className="h4">{t.title}</p>
          <p className="prose">{t.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Principles ────────────────────────────── */

export function PrincipleList() {
  return (
    <ol className="principles divided">
      {principles.map((p, i) => (
        <li key={p.title} data-reveal style={{ "--i": i % 2 } as React.CSSProperties}>
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <p className="h4">{p.title}</p>
          <p className="prose">{p.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Fit ───────────────────────────────────── */

export function FitList() {
  return (
    <div className="fit">
      <div data-reveal>
        <p className="label">A good fit</p>
        <ul className="fit__list">
          {fit.good.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div data-reveal style={{ "--i": 1 } as React.CSSProperties}>
        <p className="label">Probably not the right studio for</p>
        <ul className="fit__list fit__list--not">
          {fit.notFor.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── FAQ — the biggest objection is open by default ── */

export function FAQ({ items = defaultFaqs }: { items?: Faq[] }) {
  return (
    <div className="faq divided">
      {items.map((f, i) => (
        <details key={f.q} open={i === 0} data-reveal>
          <summary>
            <span className="h4">{f.q}</span>
            <span className="faq__icon" aria-hidden="true" />
          </summary>
          <p className="prose">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ── Contact — "what happens next" right before the ask ── */

export function ContactBlock({
  index = "10",
  defaultRoute,
  title,
}: {
  index?: string;
  defaultRoute?: Route;
  title?: React.ReactNode;
}) {
  return (
    <section
      id="contact"
      className="section surface-ivory contact"
      data-marker={`${index} — Start a conversation`}
      aria-labelledby="contact-title"
    >
      <div className="wrap grid">
        <div className="contact__intro">
          <SectionMarker index={index} label="Start a conversation" />
          <h2 id="contact-title" className="h2">
            {title ?? (
              <>
                Have something worth <em>building</em>?
              </>
            )}
          </h2>
          <p className="lead">
            Tell us which kind of conversation this is. We&rsquo;ll ask only what helps make the
            first call useful.
          </p>

          <div className="next-steps">
            <p className="label">What happens next</p>
            <ol className="numbered">
              {nextSteps.map((s, i) => (
                <li key={s.title}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="next-steps__title">{s.title}</p>
                    <p className="small">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="contact__form" data-actionbar-yield>
          <ContactForm defaultRoute={defaultRoute} />
        </div>
      </div>
    </section>
  );
}

/* ── Company Intelligence ──────────────────── */

export function UseCases() {
  return (
    <ol className="cases">
      {useCases.map((c, i) => (
        <li key={c.title} className="case" data-reveal style={{ "--i": i } as React.CSSProperties}>
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="h3">{c.title}</h3>
          <p className="prose">{c.body}</p>
          <p className="case__example">{c.example}</p>
        </li>
      ))}
    </ol>
  );
}

/* What exists today, what a pilot adds, and what is only intended */
export function CapabilityStatus() {
  return (
    <ol className="status">
      {capabilityStatus.map((s, i) => (
        <li
          key={s.key}
          className={`status__col status__col--${s.key}`}
          data-reveal
          style={{ "--i": i } as React.CSSProperties}
        >
          <p className="status__head">
            <span className="status__mark" aria-hidden="true" />
            <span className="h4">{s.title}</span>
          </p>
          <p className="small status__body">{s.body}</p>
          <ul>
            {s.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export function Deployment() {
  return (
    <div className="deploy">
      <ol className="deploy__models">
        {deploymentModels.map((m, i) => (
          <li key={m.title} data-reveal style={{ "--i": i } as React.CSSProperties}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="h4">{m.title}</h3>
            <p className="small">{m.body}</p>
            <p className="label deploy__status">Validated during a pilot</p>
          </li>
        ))}
      </ol>
      <div className="deploy__questions" data-reveal>
        <p className="label">Answered in writing, before anything is connected</p>
        <ul>
          {deploymentQuestions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Engagements({ only }: { only?: "websites" | "systems" }) {
  return (
    <div className={`engage${only ? " engage--single" : ""}`}>
      {engagements.filter((e) => !only || e.key === only).map((e, i) => (
        <article key={e.key} className="engage__track" data-reveal style={{ "--i": i } as React.CSSProperties}>
          <p className="label">{e.label}</p>
          <h3 className="h3">{e.title}</h3>
          <ol>
            {e.steps.map((s, j) => (
              <li key={s.title} className={"optional" in s && s.optional ? "is-optional" : undefined}>
                <span className="engage__dot" aria-hidden="true" />
                <span className="num">{String(j + 1).padStart(2, "0")}</span>
                <div>
                  <p className="engage__title">{s.title}</p>
                  <p className="small">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}
