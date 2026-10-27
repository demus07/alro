"use server";

import { site } from "@/content/site";

/*
 * One enquiry, three routes. Each route asks only what makes the first call
 * useful: a website conversation and a systems conversation need different facts.
 */

export type Route = "experience" | "system" | "unsure";

export type InquiryField =
  | "route"
  | "name"
  | "email"
  | "company"
  | "goals"
  | "audience"
  | "currentSite"
  | "launch"
  | "problem"
  | "tools"
  | "sensitivity"
  | "deployment"
  | "description"
  | "budget";

export type InquiryState = {
  status: "idle" | "error" | "sent";
  message?: string;
  errors?: Partial<Record<InquiryField, string>>;
  values?: Partial<Record<InquiryField, string>>;
};

const ROUTES: Route[] = ["experience", "system", "unsure"];
const OPTIONS: Partial<Record<InquiryField, string[]>> = {
  launch: ["", "within-2-months", "2-4-months", "4-months-plus", "flexible"],
  sensitivity: ["", "public", "internal", "confidential", "unsure"],
  deployment: ["", "no-preference", "our-cloud", "our-hardware", "unsure"],
  budget: ["", "under-10k", "10k-25k", "25k-50k", "50k-plus", "unsure"],
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Which free-text field carries the substance of each route.
const MAIN: Record<Route, InquiryField> = {
  experience: "goals",
  system: "problem",
  unsure: "description",
};

function text(formData: FormData, key: string, max: number) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const route = text(formData, "route", 20) as Route;
  const values: Partial<Record<InquiryField, string>> = {
    route,
    name: text(formData, "name", 120),
    email: text(formData, "email", 200),
    company: text(formData, "company", 200),
  };
  const fields: Record<Route, [InquiryField, number][]> = {
    experience: [["goals", 4000], ["audience", 600], ["currentSite", 300], ["launch", 30], ["budget", 30]],
    system: [["problem", 4000], ["tools", 600], ["sensitivity", 30], ["deployment", 30], ["budget", 30]],
    unsure: [["description", 4000]],
  };

  // Honeypot: real visitors never see or fill this field.
  if (text(formData, "website_url", 200)) {
    return { status: "sent" };
  }

  const errors: InquiryState["errors"] = {};
  if (!ROUTES.includes(route)) {
    errors.route = "Choose the option closest to what you need.";
  } else {
    for (const [key, max] of fields[route]) values[key] = text(formData, key, max);
    for (const [key, allowed] of Object.entries(OPTIONS)) {
      const v = values[key as InquiryField];
      if (v !== undefined && !allowed.includes(v)) {
        errors[key as InquiryField] = "Please choose an option from the list.";
      }
    }
    const main = MAIN[route];
    if ((values[main] ?? "").length < 20) {
      errors[main] = "A sentence or two is enough, but please give us a little to go on.";
    }
  }
  if (!values.name) errors.name = "Please tell us your name.";
  if (!values.email) errors.email = "We need an email address to reply to.";
  else if (!EMAIL.test(values.email)) errors.email = "That email address doesn't look complete.";

  if (Object.keys(errors).length) {
    return {
      status: "error",
      message: "A few details need another look.",
      errors,
      values,
    };
  }

  // Delivery is provider-agnostic: point CONTACT_WEBHOOK_URL at any endpoint
  // that accepts JSON (an email service, CRM, Slack workflow, etc.).
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    console.error("[contact] CONTACT_WEBHOOK_URL is not set; inquiry not delivered.");
    return {
      status: "error",
      message: `Our form isn't able to send messages right now. Please email us at ${site.email} instead — nothing you've typed has been lost.`,
      values,
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET
          ? { authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({ ...values, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please try again, or email us at ${site.email}.`,
      values,
    };
  }

  return { status: "sent", values: { route } };
}
