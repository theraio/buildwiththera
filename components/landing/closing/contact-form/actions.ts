"use server";

import { InquiryState } from "./types";
import { LANDING_COPY } from "~/components/landing/constants";
import { NEEDS } from "./constants";
import { z } from "zod";

const inquirySchema = z.object({
  locale: z.enum(["en", "es"]),
  need: z.enum(NEEDS),
  budget: z.coerce.number().int().min(0).max(4),
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  message: z.string().trim().min(1).max(4000),
});

/**
 * Emails a project inquiry to Matías through Resend, replying straight to the
 * visitor. Needs RESEND_API_KEY, CONTACT_EMAIL_TO and CONTACT_EMAIL_FROM.
 *
 * @param _previous - The last state (unused; required by useActionState).
 * @param formData - The submitted form.
 * @returns `sent`, `invalid` when a field fails validation, or `error`.
 */
export async function sendInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot: hidden from people, filled in by bots. Look sent, send nothing.
  if (formData.get("website")) return "sent";

  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return "invalid";
  const { locale, need, budget, name, email, message } = parsed.data;

  const { RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_EMAIL_TO || !CONTACT_EMAIL_FROM) {
    console.error(
      "Contact form: set RESEND_API_KEY, CONTACT_EMAIL_TO and CONTACT_EMAIL_FROM.",
    );
    return "error";
  }

  const copy = LANDING_COPY[locale];
  const service =
    copy.services.items.find((item) => item.key === need)?.name ??
    copy.contact.need.unsure;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_EMAIL_FROM,
      to: [CONTACT_EMAIL_TO],
      reply_to: email,
      subject: `New project: ${name} · ${service}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Need: ${service}`,
        `Budget: ${copy.contact.budget.options[budget]}`,
        `Language: ${locale}`,
        "",
        message,
      ].join("\n"),
    }),
  }).catch(() => null);

  if (!response?.ok) {
    console.error("Contact form: Resend rejected the email.", response?.status);
    return "error";
  }
  return "sent";
}
