import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrimaryAction, TextLink } from "@/components/Actions";
import { Plate } from "@/components/Figures";
import { SectionMarker } from "@/components/Mark";
import { projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const parts: { title: string; body: React.ReactNode }[] = [
    { title: "Context", body: project.context },
    { title: "Role", body: project.role },
    { title: "The challenge", body: project.challenge },
    { title: "The approach", body: project.approach },
    { title: "The work", body: project.work },
    {
      title: "What it demonstrates",
      body: (
        <ul>
          {project.demonstrates.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      ),
    },
    { title: "Limitations", body: project.limitations },
  ];

  return (
    <>
      <section
        className="page-hero surface-ivory"
        data-marker={`${String(index + 1).padStart(2, "0")} — ${project.title}`}
      >
        <div className="wrap">
          <div data-reveal>
            <SectionMarker index={String(index + 1).padStart(2, "0")} label={project.practice} />
          </div>
          <h1 className="display" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {project.title}
          </h1>
          <div className="grid page-hero__foot">
            <div data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <p className="lead">{project.summary}</p>
              <p className="notice">
                <span className="label" style={{ display: "block", marginBottom: 6 }}>
                  How to read this
                </span>
                {project.label}. {project.limitations}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight surface-ivory" aria-label="Project overview">
        <div className="wrap stack">
          <dl className="project-facts" data-reveal>
            <div>
              <dt className="label">Type</dt>
              <dd>{project.label}</dd>
            </div>
            <div>
              <dt className="label">Practice</dt>
              <dd>{project.practice}</dd>
            </div>
            <div>
              <dt className="label">Year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
          <div data-reveal>
            <Plate
              variant={project.practice === "Intelligent Systems" ? "nodes" : "layers"}
              tone={project.kind === "demonstration" ? "ink" : project.kind === "experiment" ? "peach" : "umber"}
            />
          </div>
        </div>
      </section>

      <section className="section surface-ivory section--flush-top" aria-label="Project write-up">
        <div className="wrap">
          <ol className="project-body divided">
            {parts.map((part, i) => (
              <li key={part.title} data-reveal>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="h4">{part.title}</h2>
                <div className="prose">{part.body}</div>
              </li>
            ))}
          </ol>

          <div className="actions section-foot">
            {project.link ? (
              <TextLink href={project.link.href} external={project.link.href.startsWith("http")}>
                {project.link.label}
              </TextLink>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section-tight surface-ink" aria-label="Next">
        <div className="wrap project-nav">
          <div>
            <p className="label">Next project</p>
            <p className="h3" style={{ marginTop: 10 }}>
              <TextLink href={`/work/${next.slug}`}>{next.title}</TextLink>
            </p>
          </div>
          <div className="actions">
            <PrimaryAction />
            <TextLink href="/work">All work</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
