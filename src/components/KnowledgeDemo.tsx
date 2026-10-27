"use client";

import { useId, useRef, useState } from "react";

/*
 * A scripted walkthrough of a company knowledge assistant, using a fictional
 * business and fictional documents. It is not connected to a live model, and
 * says so on screen.
 */

type Source = { title: string; meta: string };
type Segment = string | { cite: number };
type Scenario = {
  prompt: string;
  kicker: string;
  body: Segment[][];
  sources: Source[];
  note: string;
};

const SOURCES = {
  meeting: { title: "Leadership meeting notes", meta: "Notes · 14 Aug" },
  pricing: { title: "Wholesale pricing review — v3", meta: "Document · 9 Aug" },
  tracker: { title: "Kiln & production tracker", meta: "Spreadsheet · updated 28 Aug" },
  launch: { title: "Autumn collection launch plan", meta: "Document · 2 Aug" },
  channel: { title: "#stockists", meta: "Team chat · thread, 27 Aug" },
};

const MODES = ["Ask", "Alert", "Brief", "Act"] as const;
type Mode = (typeof MODES)[number];

const SCENARIOS: Record<Mode, Scenario[]> = {
  Ask: [
    {
      prompt: "What did we decide about wholesale pricing?",
      kicker: "Answer",
      body: [
        [
          "The team agreed to hold wholesale prices for existing stockists until January, and to apply the new price list to new accounts only.",
          { cite: 1 },
        ],
        [
          "The pricing review gives the reasoning: material costs rose, but two of the largest stockists renew in December.",
          { cite: 2 },
        ],
      ],
      sources: [SOURCES.meeting, SOURCES.pricing],
      note: "Drawn from 2 sources you have access to.",
    },
    {
      prompt: "What is our refund policy for trade orders?",
      kicker: "Not found",
      body: [
        [
          "I couldn't find a trade refund policy in the approved sources. The closest match is a retail returns page, which doesn't cover trade orders, so I haven't used it.",
        ],
        ["You may want to ask the operations team, or add the policy as a source."],
      ],
      sources: [],
      note: "No answer is better than a guessed one.",
    },
  ],
  Alert: [
    {
      prompt: "Change detected · Autumn collection",
      kicker: "Needs attention",
      body: [
        [
          "The glaze firing for the autumn collection moved from 2 to 9 September.",
          { cite: 1 },
        ],
        [
          "Product photography is planned for 5 September, which now falls before the pieces are ready.",
          { cite: 2 },
        ],
        ["Suggested next step: confirm a new photography date with the launch owner."],
      ],
      sources: [SOURCES.tracker, SOURCES.launch],
      note: "Raised because two linked dates now conflict.",
    },
  ],
  Brief: [
    {
      prompt: "Monday briefing · week of 1 September",
      kicker: "This week",
      body: [
        ["Decided — wholesale prices held for existing stockists until January.", { cite: 1 }],
        ["Changed — autumn glaze firing moved back one week.", { cite: 2 }],
        [
          "Open — three stockists have asked for the new catalogue; no one has replied yet.",
          { cite: 3 },
        ],
      ],
      sources: [SOURCES.meeting, SOURCES.tracker, SOURCES.channel],
      note: "Prepared from changes since last Monday.",
    },
  ],
  Act: [
    {
      prompt: "Prepare pricing letters for existing stockists",
      kicker: "Draft workflow",
      body: [
        [
          "I've prepared letters for existing stockists confirming that their prices are held until January, using the wording agreed in the meeting.",
          { cite: 1 },
        ],
        ["Nothing will be sent until someone with permission approves it."],
      ],
      sources: [SOURCES.meeting, SOURCES.pricing],
      note: "Actions run only through approved, pre-defined workflows.",
    },
  ],
};

export function KnowledgeDemo() {
  const [mode, setMode] = useState<Mode>("Ask");
  const [index, setIndex] = useState(0);
  const [approved, setApproved] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const scenarios = SCENARIOS[mode];
  const scenario = scenarios[Math.min(index, scenarios.length - 1)];

  const select = (m: Mode) => {
    setMode(m);
    setIndex(0);
    setApproved(false);
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % MODES.length;
    if (e.key === "ArrowLeft") next = (i - 1 + MODES.length) % MODES.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = MODES.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(MODES[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="kdemo">
      <div className="kdemo__bar">
        <p className="label">
          Marlowe Ceramics <span className="kdemo__fict">(fictional)</span>
        </p>
        <div className="kdemo__tabs" role="tablist" aria-label="What the assistant does">
          {MODES.map((m, i) => (
            <button
              key={m}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${id}-tab-${m}`}
              role="tab"
              type="button"
              aria-selected={mode === m}
              aria-controls={`${id}-panel`}
              tabIndex={mode === m ? 0 : -1}
              onClick={() => select(m)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${mode}`}
        className="kdemo__panel"
      >
        {scenarios.length > 1 ? (
          <div className="kdemo__prompts" aria-label="Example questions">
            {scenarios.map((s, i) => (
              <button
                key={s.prompt}
                type="button"
                className="kdemo__prompt"
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                {s.prompt}
              </button>
            ))}
          </div>
        ) : (
          <p className="kdemo__query">{scenario.prompt}</p>
        )}

        <div className="kdemo__response" key={`${mode}-${index}`} aria-live="polite">
          <p className="label kdemo__kicker">{scenario.kicker}</p>
          {scenario.body.map((line, li) => (
            <p key={li} className="kdemo__line" style={{ "--i": li } as React.CSSProperties}>
              {line.map((seg, si) =>
                typeof seg === "string" ? (
                  <span key={si}>{seg}</span>
                ) : (
                  <sup key={si} className="kdemo__cite">
                    <span className="sr-only">source </span>
                    {seg.cite}
                  </sup>
                ),
              )}
            </p>
          ))}

          {mode === "Act" ? (
            <div className="kdemo__approve">
              {approved ? (
                <p className="small" role="status">
                  Approved. In a real system, this would now run the agreed workflow and log who
                  approved it.
                </p>
              ) : (
                <>
                  <span className="label">Awaiting approval</span>
                  <button type="button" className="kdemo__approve-btn" onClick={() => setApproved(true)}>
                    Approve (demo)
                  </button>
                </>
              )}
            </div>
          ) : null}

          {scenario.sources.length ? (
            <ol className="kdemo__sources">
              {scenario.sources.map((s, si) => (
                <li key={s.title}>
                  <span className="num">{si + 1}</span>
                  <span className="kdemo__src-title">{s.title}</span>
                  <span className="kdemo__src-meta">{s.meta}</span>
                </li>
              ))}
            </ol>
          ) : null}
          <p className="kdemo__note small">{scenario.note}</p>
        </div>
      </div>

      <p className="kdemo__disclaimer small">
        Scripted walkthrough using a fictional business and sample documents. Not a live model,
        and not a client deployment.
      </p>
    </div>
  );
}
