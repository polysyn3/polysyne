import { leadSchema } from "@/lib/lead-schema";
import { deliverLead } from "@/lib/lead-delivery";
import { rateLimit } from "@/lib/rate-limit";

const maxBytes = 16384;
function reply(data: object, status: number) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...(status === 429 ? { "Retry-After": "600" } : {}),
    },
  });
}
async function boundedBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Empty request");
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > maxBytes) {
      await reader.cancel();
      throw new RangeError("Request too large");
    }
    chunks.push(value);
  }
  const buffer = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder().decode(buffer));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = new Set([
    new URL(request.url).origin,
    ...(process.env.NEXT_PUBLIC_SITE_URL
      ? [new URL(process.env.NEXT_PUBLIC_SITE_URL).origin]
      : []),
  ]);
  if (!origin || !allowed.has(origin))
    return reply(
      { accepted: false, message: "This request origin is not allowed." },
      403,
    );
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return reply({ accepted: false, message: "Use a JSON request." }, 415);
  if (Number(request.headers.get("content-length")) > maxBytes)
    return reply({ accepted: false, message: "Request is too large." }, 413);
  let payload: unknown;
  try {
    payload = await boundedBody(request);
  } catch (error) {
    return reply(
      {
        accepted: false,
        message:
          error instanceof RangeError
            ? "Request is too large."
            : "Invalid JSON request.",
      },
      error instanceof RangeError ? 413 : 400,
    );
  }
  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success)
    return reply(
      {
        accepted: false,
        message: "Please check the form fields.",
        fields: parsed.error.flatten().fieldErrors,
      },
      422,
    );
  if (!process.env.LEAD_API_URL)
    return reply(
      {
        accepted: false,
        message:
          "Submission is not connected yet. Your details have not been submitted.",
      },
      503,
    );
  try {
    if (!(await rateLimit(request)))
      return reply(
        {
          accepted: false,
          message: "Too many attempts. Please try again later.",
        },
        429,
      );
    const result = await deliverLead(parsed.data);
    return reply(
      {
        accepted: result.accepted,
        ...("message" in result ? { message: result.message } : {}),
      },
      result.status,
    );
  } catch {
    return reply(
      {
        accepted: false,
        message:
          "We could not confirm your submission. Please try again later.",
      },
      503,
    );
  }
}
