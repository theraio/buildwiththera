import { afterEach, describe, expect, it, vi } from "vitest";

import { sendInquiry } from "./actions";

const inquiry = (fields: Record<string, string> = {}) => {
  const formData = new FormData();
  const values = {
    locale: "en",
    need: "sd",
    budget: "1",
    name: "Ada",
    email: "ada@example.com",
    message: "A booking tool for my clinic.",
    ...fields,
  };
  for (const [key, value] of Object.entries(values)) formData.set(key, value);
  return formData;
};

const configure = () => {
  vi.stubEnv("RESEND_API_KEY", "key");
  vi.stubEnv("CONTACT_EMAIL_TO", "me@example.com");
  vi.stubEnv("CONTACT_EMAIL_FROM", "Thera <hello@example.com>");
};

describe("sendInquiry", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("emails the inquiry through Resend, replying to the visitor", async () => {
    configure();
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetch);
    expect(await sendInquiry("idle", inquiry())).toBe("sent");
    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      to: ["me@example.com"],
      reply_to: "ada@example.com",
    });
    expect(body.text).toContain("Software Development");
    expect(body.text).toContain("USD 5K–10K");
  });

  it("rejects an invalid email or an empty message without sending", async () => {
    configure();
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    expect(await sendInquiry("idle", inquiry({ email: "nope" }))).toBe(
      "invalid",
    );
    expect(await sendInquiry("idle", inquiry({ message: "  " }))).toBe(
      "invalid",
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("reports an error when email isn't configured or Resend fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    expect(await sendInquiry("idle", inquiry())).toBe("error");
    configure();
    expect(await sendInquiry("idle", inquiry())).toBe("error");
  });

  it("drops bot submissions silently", async () => {
    configure();
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    expect(await sendInquiry("idle", inquiry({ website: "spam" }))).toBe(
      "sent",
    );
    expect(fetch).not.toHaveBeenCalled();
  });
});
