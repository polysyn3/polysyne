import { afterEach, describe, expect, test } from "bun:test";
import { leadSchema } from "../lib/lead-schema";
import { POST } from "../app/api/leads/route";
import { deliverLead } from "../lib/lead-delivery";

const originalFetch = globalThis.fetch;
const savedEnv = { ...process.env };
const valid = {
  kind: "contact",
  name: "Alex Morgan",
  email: "alex@example.test",
  company: "",
  inquiryType: "Business Inquiry",
  industry: "",
  size: "",
  message: "We would like to learn more about Opero.",
  contactPreference: "",
  consent: true,
  website: "",
};
function request(data: unknown, extra: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
      ...extra,
    },
    body: JSON.stringify(data),
  });
}
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of Object.keys(process.env))
    if (!(key in savedEnv)) delete process.env[key];
  Object.assign(process.env, savedEnv);
});

describe("Shared lead validation", () => {
  test("requires consent, valid email, meaningful message, and a clean honeypot", () => {
    for (const invalid of [
      { ...valid, consent: false },
      { ...valid, email: "invalid" },
      { ...valid, message: "Hi" },
      { ...valid, website: "spam" },
      { ...valid, extra: "unexpected" },
    ])
      expect(leadSchema.safeParse(invalid).success).toBe(false);
    expect(leadSchema.safeParse(valid).success).toBe(true);
  });
  test("early access requires business name, industry, and business size", () => {
    const early = { ...valid, kind: "early-access", inquiryType: "" };
    expect(leadSchema.safeParse(early).success).toBe(false);
    expect(
      leadSchema.safeParse({
        ...early,
        company: "Sample studio",
        industry: "Agency or consulting",
        size: "2–10 people",
      }).success,
    ).toBe(true);
  });
});
describe("Public lead route", () => {
  test("fails honestly when no backend is connected", async () => {
    delete process.env.LEAD_API_URL;
    const result = await POST(request(valid));
    expect(result.status).toBe(503);
    expect((await result.json()).accepted).toBe(false);
  });
  test("rejects other origins, wrong content types, and oversized requests", async () => {
    expect(
      (await POST(request(valid, { Origin: "https://untrusted.example" })))
        .status,
    ).toBe(403);
    expect(
      (await POST(request(valid, { "Content-Type": "text/plain" }))).status,
    ).toBe(415);
    expect(
      (await POST(request({ ...valid, message: "a".repeat(17000) }))).status,
    ).toBe(413);
  });
  test("validates on the server and returns accessible field errors", async () => {
    const result = await POST(
      request({ ...valid, email: "invalid", consent: false }),
    );
    expect(result.status).toBe(422);
    const data = await result.json();
    expect(data.fields.email).toBeDefined();
    expect(data.fields.consent).toBeDefined();
    expect(data.accepted).toBe(false);
  });
  test("accepts only explicit backend acknowledgement, keeps token server-side", async () => {
    process.env.LEAD_API_URL = "https://lead.example.test/intake";
    process.env.LEAD_API_TOKEN = "test-token";
    process.env.UPSTASH_REDIS_REST_URL = "https://rate.example.test";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-rate-token";
    let forwarded: unknown;
    globalThis.fetch = (async (url: string | URL | Request, options?: RequestInit) => {
      if (String(url) === process.env.UPSTASH_REDIS_REST_URL)
        return Response.json({ result: 1 });
      forwarded = JSON.parse(String(options?.body));
      expect((options?.headers as Record<string, string>).Authorization).toBe(
        "Bearer test-token",
      );
      return Response.json({ accepted: true });
    }) as unknown as typeof fetch;
    const result = await POST(request(valid));
    expect(result.status).toBe(201);
    expect(await result.json()).toEqual({ accepted: true });
    expect(forwarded).not.toHaveProperty("website");
    expect(forwarded).toHaveProperty("schemaVersion", 1);
  });
  test("does not report success for a 2xx without accepted:true", async () => {
    process.env.LEAD_API_URL = "https://lead.example.test/intake";
    globalThis.fetch = (async () =>
      Response.json({ ok: true })) as unknown as typeof fetch;
    await expect(deliverLead(leadSchema.parse(valid))).rejects.toThrow(
      "acknowledge acceptance",
    );
  });
  test("rejects upstream errors without exposing upstream details", async () => {
    process.env.LEAD_API_URL = "https://lead.example.test/intake";
    globalThis.fetch = (async () =>
      Response.json(
        { detail: "private information" },
        { status: 500 },
      )) as unknown as typeof fetch;
    await expect(deliverLead(leadSchema.parse(valid))).rejects.toThrow(
      "rejected request",
    );
  });
  test("rate limits and fails closed on limiter errors", async () => {
    process.env.LEAD_API_URL = "https://lead.example.test/intake";
    process.env.UPSTASH_REDIS_REST_URL = "https://rate.example.test";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test";
    globalThis.fetch = (async () =>
      Response.json({ result: 301 })) as unknown as typeof fetch;
    const limited = await POST(request(valid));
    expect(limited.status).toBe(429);
    expect(limited.headers.get("Retry-After")).toBe("600");
    globalThis.fetch = (async () => {
      throw new Error("Connection failed");
    }) as unknown as typeof fetch;
    expect((await POST(request(valid))).status).toBe(503);
  });
});
