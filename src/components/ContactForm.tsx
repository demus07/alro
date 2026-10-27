"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitInquiry, type InquiryField, type InquiryState, type Route } from "@/app/actions";
import { site } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { Arrow, Mark } from "./Mark";

const ROUTES: { value: Route; title: string; body: string }[] = [
  {
    value: "experience",
    title: "A digital experience",
    body: "A website, landing page, founder site or digital product.",
  },
  {
    value: "system",
    title: "An intelligent system",
    body: "Company knowledge, AI workflows, integrations or internal tools.",
  },
  {
    value: "unsure",
    title: "Not sure what I need",
    body: "You know what isn't working, but not yet what the answer is.",
  },
];

type Option = { value: string; label: string };
const opt = (label: string, value: string): Option => ({ value, label });
const NONE = opt("Prefer not to say", "");

const LAUNCH = [opt("No date in mind", ""), opt("Within 2 months", "within-2-months"), opt("2 – 4 months", "2-4-months"), opt("4 months or more", "4-months-plus"), opt("Flexible", "flexible")];
const SENSITIVITY = [opt("Not sure / prefer to discuss", ""), opt("Mostly public information", "public"), opt("Internal, not sensitive", "internal"), opt("Confidential or regulated", "confidential"), opt("Don't know yet", "unsure")];
const DEPLOYMENT = [opt("Not sure / prefer to discuss", ""), opt("No preference", "no-preference"), opt("Must run in our cloud account", "our-cloud"), opt("Must run on our own hardware", "our-hardware"), opt("Don't know yet", "unsure")];
const BUDGET = [NONE, opt("Under 10k", "under-10k"), opt("10k – 25k", "10k-25k"), opt("25k – 50k", "25k-50k"), opt("50k +", "50k-plus"), opt("Not sure yet", "unsure")];

const initial: InquiryState = { status: "idle" };

export function ContactForm({ defaultRoute }: { defaultRoute?: Route }) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const [route, setRoute] = useState<Route | undefined>(defaultRoute);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const v = state.values ?? {};
  const err = state.errors ?? {};

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "sent") trackEvent("enquiry_sent", { route: state.values?.route ?? "" });
  }, [state]);

  if (state.status === "sent") {
    return (
      <div className="form-sent" role="status" tabIndex={-1}>
        <Mark size={34} />
        <p className="h3">Thank you — your note has arrived.</p>
        <p className="prose">
          We read every message ourselves and will reply personally to the address you gave us,
          usually with a few times for a first conversation.
        </p>
      </div>
    );
  }

  const field = (name: InquiryField) => ({
    id: `f-${name}`,
    name,
    defaultValue: v[name],
    "aria-invalid": !!err[name] || undefined,
    "aria-describedby": err[name] ? `${name}-error` : undefined,
  });
  const error = (name: InquiryField) =>
    err[name] ? (
      <p id={`${name}-error`} className="field__error">
        {err[name]}
      </p>
    ) : null;
  const select = (name: InquiryField, label: string, options: Option[]) => (
    <div className="field">
      <label htmlFor={`f-${name}`}>
        {label} <span className="field__opt">Optional</span>
      </label>
      <select {...field(name)} defaultValue={v[name] ?? ""}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error(name)}
    </div>
  );
  const main = (name: InquiryField, label: string, hint: string) => (
    <div className="field">
      <label htmlFor={`f-${name}`}>{label}</label>
      <textarea
        {...field(name)}
        rows={5}
        required
        minLength={20}
        maxLength={4000}
        aria-describedby={[`${name}-hint`, err[name] ? `${name}-error` : null].filter(Boolean).join(" ")}
      />
      <p id={`${name}-hint`} className="field__hint">
        {hint}
      </p>
      {error(name)}
    </div>
  );

  return (
    <form
      ref={formRef}
      action={action}
      className="form"
      onKeyDown={(e) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          formRef.current?.requestSubmit();
        }
      }}
    >
      {state.status === "error" ? (
        <div className="form__summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <p>{state.message}</p>
        </div>
      ) : null}

      <fieldset className="field" aria-describedby={err.route ? "route-error" : undefined}>
        <legend>What are you looking to build?</legend>
        <div className="routes">
          {ROUTES.map((r, i) => (
            <label key={r.value} className="route">
              <input
                type="radio"
                name="route"
                value={r.value}
                required
                checked={route === r.value}
                onChange={() => {
                  setRoute(r.value);
                  trackEvent("enquiry_route", { route: r.value });
                }}
              />
              <span className="route__box">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="route__title">{r.title}</span>
                <span className="route__body">{r.body}</span>
              </span>
            </label>
          ))}
        </div>
        {error("route")}
      </fieldset>

      {route ? (
        <div className="form__rest" key={route}>
          <div className="form__row">
            <div className="field">
              <label htmlFor="f-name">Name</label>
              <input {...field("name")} autoComplete="name" required maxLength={120} />
              {error("name")}
            </div>
            <div className="field">
              <label htmlFor="f-email">Work email</label>
              <input {...field("email")} type="email" autoComplete="email" required maxLength={200} />
              {error("email")}
            </div>
          </div>

          <div className="field">
            <label htmlFor="f-company">
              Company or website <span className="field__opt">Optional</span>
            </label>
            <input {...field("company")} autoComplete="organization" maxLength={200} />
          </div>

          {route === "experience" ? (
            <>
              {main(
                "goals",
                "What should the site achieve?",
                "What it's for, and what would make it a success. A few sentences is plenty.",
              )}
              <div className="form__row">
                <div className="field">
                  <label htmlFor="f-audience">
                    Who is it for? <span className="field__opt">Optional</span>
                  </label>
                  <input {...field("audience")} maxLength={600} />
                </div>
                <div className="field">
                  <label htmlFor="f-currentSite">
                    Current site <span className="field__opt">Optional</span>
                  </label>
                  <input {...field("currentSite")} inputMode="url" maxLength={300} placeholder="example.com" />
                </div>
              </div>
              <div className="form__row">
                {select("launch", "Ideal launch window", LAUNCH)}
                {select("budget", "Budget range", BUDGET)}
              </div>
            </>
          ) : null}

          {route === "system" ? (
            <>
              {main(
                "problem",
                "Which workflow or problem should it solve?",
                "Where time goes today, or what information is hard to find. Please don't include confidential details yet.",
              )}
              <div className="field">
                <label htmlFor="f-tools">
                  Tools you use today <span className="field__opt">Optional</span>
                </label>
                <input {...field("tools")} maxLength={600} placeholder="e.g. Google Drive, Slack, Notion, HubSpot" />
              </div>
              <div className="form__row">
                {select("sensitivity", "How sensitive is the data?", SENSITIVITY)}
                {select("deployment", "Where must it run?", DEPLOYMENT)}
              </div>
              <div className="form__narrow">{select("budget", "Budget range", BUDGET)}</div>
            </>
          ) : null}

          {route === "unsure" ? (
            main(
              "description",
              "What isn't working, or what would you like to change?",
              "Describe the situation in your own words. We'll help work out whether the answer is a website, an integration, an AI workflow — or none of these.",
            )
          ) : null}

          <div className="form__hp" aria-hidden="true">
            <label htmlFor="f-website-url">Leave this empty</label>
            <input id="f-website-url" name="website_url" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="form__submit">
            <button className="btn" type="submit" disabled={pending}>
              {pending ? "Sending…" : "Send message"}
              <Arrow />
            </button>
            <p className="small">
              We use your details only to reply to you. See our <Link href="/privacy">privacy notice</Link>.
              Prefer email? <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>
      ) : (
        <p className="small form__wait">Choose one to see a few short questions.</p>
      )}
    </form>
  );
}
