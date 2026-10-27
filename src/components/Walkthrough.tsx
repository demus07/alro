"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { Mark } from "./Mark";

/*
 * A scripted, step-through simulation of the Company Intelligence workflow:
 * upload → extract → ask → draft → approve. Every name, document and date is
 * fictional, nothing calls a model, and nothing is sent — the frame says so.
 */

const DOC = {
  name: "Supplier & autumn launch review.pdf",
  meta: "Meeting notes · 4 pages · 9 Sep",
};

const DECISIONS = [
  { text: "Hold wholesale prices for existing stockists until January.", page: 1 },
  { text: "Move the autumn launch from 2 Oct to 16 Oct.", page: 2 },
  { text: "Reorder 400 units of the Tide glaze from Harbour & Kiln.", page: 3 },
];

const ACTIONS = [
  { text: "Confirm the reorder and delivery date with Harbour & Kiln", owner: "Priya", due: "12 Sep", page: 3 },
  { text: "Update the launch date on the stockist calendar", owner: "Tom", due: "13 Sep", page: 2 },
  { text: "Send new price list to new accounts only", owner: "Ana", due: "20 Sep", page: 1 },
  { text: "Book photography for the new pieces", owner: null, due: "26 Sep", page: 4 },
];

const STEPS = [
  { title: "Upload", caption: "A document comes in — uploaded, or from a connected tool." },
  { title: "Extract", caption: "Decisions, actions, owners and dates, each tied to its page." },
  { title: "Ask", caption: "A question, answered from the document, with its source." },
  { title: "Draft", caption: "A follow-up prepared from what was agreed." },
  { title: "Approve", caption: "A person reviews it. Nothing leaves without approval." },
] as const;

const STEP_MS = 7000;

export function Walkthrough() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [approved, setApproved] = useState<"approved" | "discarded" | null>(null);
  const titleId = useId();
  const tracked = useRef(false);

  const go = useCallback((next: number) => {
    setStep(Math.max(0, Math.min(STEPS.length - 1, next)));
    if (next < STEPS.length - 1) setApproved(null);
  }, []);

  // Autoplay advances one step at a time and stops on the last, which waits for a person.
  useEffect(() => {
    if (!playing || step >= STEPS.length - 1) return;
    const t = window.setTimeout(() => {
      go(step + 1);
      if (step + 1 === STEPS.length - 1) setPlaying(false);
    }, STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, step, go]);

  useEffect(() => {
    if (step === STEPS.length - 1 && !tracked.current) {
      tracked.current = true;
      trackEvent("walkthrough_completed");
    }
  }, [step]);

  const manual = (next: number) => {
    setPlaying(false);
    go(next);
  };

  return (
    <div className="walk" role="region" aria-labelledby={titleId}>
      <div className="walk__bar">
        <p className="walk__title" id={titleId}>
          <Mark size={18} />
          <span>Company Intelligence</span>
          <span className="walk__tag">Prototype simulation</span>
        </p>
        <button
          type="button"
          className="walk__play"
          aria-pressed={playing}
          onClick={() => {
            if (!playing && step === STEPS.length - 1) go(0);
            setPlaying((p) => !p);
          }}
        >
          <span className="walk__play-icon" aria-hidden="true" data-playing={playing} />
          {playing ? "Pause" : step === STEPS.length - 1 ? "Replay" : "Play walkthrough"}
        </button>
      </div>

      <div className="walk__body">
        <ol className="walk__steps" aria-label="Steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                className="walk__step"
                aria-current={i === step ? "step" : undefined}
                data-done={i < step || undefined}
                onClick={() => manual(i)}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="walk__step-title">{s.title}</span>
                {i === step && playing ? (
                  <span
                    className="walk__timer"
                    aria-hidden="true"
                    key={`t-${step}`}
                    style={{ "--d": `${STEP_MS}ms` } as React.CSSProperties}
                  />
                ) : null}
              </button>
            </li>
          ))}
        </ol>

        <div className="walk__stage" aria-live="polite">
          <p className="walk__caption">
            <span className="label">
              Step {step + 1} of {STEPS.length}
            </span>
            <span>{STEPS[step].caption}</span>
          </p>
          <div className="walk__screen" key={step}>
            {step === 0 ? <Upload /> : null}
            {step === 1 ? <Extract /> : null}
            {step === 2 ? <Ask /> : null}
            {step === 3 ? <Draft /> : null}
            {step === 4 ? <Approve state={approved} onDecide={setApproved} /> : null}
          </div>
          <div className="walk__nav">
            <button type="button" className="walk__btn" onClick={() => manual(step - 1)} disabled={step === 0}>
              Back
            </button>
            <button
              type="button"
              className="walk__btn walk__btn--next"
              onClick={() => manual(step + 1)}
              disabled={step === STEPS.length - 1}
            >
              Next step
            </button>
          </div>
        </div>
      </div>

      <p className="walk__disclaimer small">
        A scripted simulation of the intended workflow, with a fictional business and fictional
        documents. It is not connected to a live model, and nothing is sent.
      </p>
    </div>
  );
}

const d = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Upload() {
  return (
    <div className="ws">
      <div className="ws-doc ws-in" style={d(0)}>
        <span className="ws-doc__icon" aria-hidden="true">
          PDF
        </span>
        <div>
          <p className="ws-doc__name">{DOC.name}</p>
          <p className="small">{DOC.meta} · Marlowe Ceramics (fictional)</p>
        </div>
      </div>
      <div className="ws-read ws-in" style={d(1)}>
        <span className="ws-read__bar" aria-hidden="true" />
        <p className="small">Reading 4 pages</p>
      </div>
      <ul className="ws-found">
        {[
          ["3", "decisions"],
          ["4", "action items"],
          ["3", "owners"],
          ["4", "dates"],
        ].map(([n, label], i) => (
          <li key={label} className="ws-in" style={d(i + 3)}>
            <span className="ws-found__n">{n}</span>
            <span className="small">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Extract() {
  return (
    <div className="ws ws--split">
      <div>
        <p className="label ws-kicker">Decisions</p>
        <ul className="ws-list">
          {DECISIONS.map((x, i) => (
            <li key={x.text} className="ws-in" style={d(i)}>
              <span>{x.text}</span>
              <span className="ws-cite">p.{x.page}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="label ws-kicker">Action items</p>
        <ul className="ws-list ws-list--actions">
          {ACTIONS.map((x, i) => (
            <li key={x.text} className="ws-in" style={d(i + 2)}>
              <span>{x.text}</span>
              <span className="ws-meta">
                {x.owner ? (
                  <span>{x.owner}</span>
                ) : (
                  <span className="ws-flag">No owner</span>
                )}
                <span>Due {x.due}</span>
                <span className="ws-cite">p.{x.page}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Ask() {
  return (
    <div className="ws">
      <p className="ws-q ws-in" style={d(0)}>
        What did we agree with Harbour &amp; Kiln?
      </p>
      <div className="ws-a ws-in" style={d(1)}>
        <p>
          A reorder of 400 units of the Tide glaze, to arrive before the new launch date of 16 Oct.
          Priya is confirming the delivery date with them by 12 Sep.<span className="ws-cite">p.3</span>
        </p>
      </div>
      <figure className="ws-source ws-in" style={d(3)}>
        <figcaption className="label">Source · {DOC.name}, page 3</figcaption>
        <blockquote>
          &ldquo;…agreed to <mark>reorder 400 units of Tide from Harbour &amp; Kiln</mark>, landing ahead
          of launch. <mark>Priya to confirm delivery by the 12th.</mark>&rdquo;
        </blockquote>
      </figure>
    </div>
  );
}

function Draft() {
  return (
    <div className="ws">
      <div className="ws-mail ws-in" style={d(0)}>
        <dl className="ws-mail__head">
          <div>
            <dt>To</dt>
            <dd>orders@harbourandkiln.example</dd>
          </div>
          <div>
            <dt>Subject</dt>
            <dd>Confirming our Tide glaze reorder</dd>
          </div>
        </dl>
        <div className="ws-mail__body">
          <p className="ws-in" style={d(1)}>Hi Sam,</p>
          <p className="ws-in" style={d(2)}>
            Following our review on 9 September, we&rsquo;d like to confirm a reorder of 400 units of
            the Tide glaze. Our launch has moved to 16 October — could you confirm a delivery date
            ahead of that?
          </p>
          <p className="ws-in" style={d(3)}>Thanks, Priya</p>
        </div>
      </div>
      <p className="ws-note small ws-in" style={d(4)}>
        <span className="ws-dot" aria-hidden="true" />
        Draft · drafted from page 3 · not sent
      </p>
    </div>
  );
}

function Approve({
  state,
  onDecide,
}: {
  state: "approved" | "discarded" | null;
  onDecide: (s: "approved" | "discarded" | null) => void;
}) {
  return (
    <div className="ws">
      <p className="label ws-kicker ws-in" style={d(0)}>
        Waiting for your review
      </p>
      <ul className="ws-review">
        <li className="ws-in" style={d(1)}>
          <span className="ws-review__kind">Email</span>
          <span>Send “Confirming our Tide glaze reorder” to Harbour &amp; Kiln</span>
        </li>
        <li className="ws-in" style={d(2)}>
          <span className="ws-review__kind">Task</span>
          <span>Assign “Book photography for the new pieces” — currently has no owner</span>
        </li>
      </ul>

      {state === null ? (
        <div className="ws-decide ws-in" style={d(3)}>
          <button type="button" className="walk__btn walk__btn--approve" onClick={() => onDecide("approved")}>
            Approve both
          </button>
          <button type="button" className="walk__btn" onClick={() => onDecide("discarded")}>
            Discard
          </button>
        </div>
      ) : (
        <div className="ws-log ws-in" role="status">
          <p>
            <span className="ws-dot" aria-hidden="true" />
            {state === "approved"
              ? "Approved by you, logged with the time and the source it came from."
              : "Discarded. Nothing was sent or created."}
          </p>
          <p className="small">
            {state === "approved"
              ? "In a pilot, this would go out through the connected email account and task tool. In this simulation, nothing is sent."
              : "The draft stays available if someone wants to revisit it."}
          </p>
          <button type="button" className="ws-undo" onClick={() => onDecide(null)}>
            Reset this step
          </button>
        </div>
      )}
    </div>
  );
}
