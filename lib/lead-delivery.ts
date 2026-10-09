import type { LeadInput } from "@/lib/lead-schema";

export async function deliverLead(data: LeadInput) {
  const endpoint = process.env.LEAD_API_URL;
  if (!endpoint)
    return {
      accepted: false as const,
      status: 503,
      message:
        "Submission is not connected yet. Your details have not been submitted.",
    };
  const url = new URL(endpoint);
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:")
    throw new Error("HTTPS endpoint required");
  const { website: _website, ...lead } = data;
  void _website;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.LEAD_API_TOKEN
        ? { Authorization: `Bearer ${process.env.LEAD_API_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({
      ...lead,
      source: "polysyne-marketing",
      schemaVersion: 1,
    }),
    signal: AbortSignal.timeout(8000),
    redirect: "error",
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Lead service rejected request");
  const result = await response.json();
  if (result.accepted !== true)
    throw new Error("Lead service did not acknowledge acceptance");
  return { accepted: true as const, status: 201 };
}
