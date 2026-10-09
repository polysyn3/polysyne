import { createHash } from "node:crypto";

const windowMs = 10 * 60 * 1000;
const buckets = new Map<string, { count: number; expires: number }>();
const script =
  "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]); end; return n";

async function count(key: string): Promise<number> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "EVAL",
        script,
        "1",
        `polysyne:leads:${key}`,
        String(windowMs),
      ]),
      signal: AbortSignal.timeout(3000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Rate limiter unavailable");
    const result = await response.json();
    if (typeof result.result !== "number")
      throw new Error("Invalid rate limiter response");
    return result.result;
  }
  if (process.env.NODE_ENV === "production")
    throw new Error("Shared production rate limiter required");
  const now = Date.now();
  for (const [key, bucket] of buckets)
    if (bucket.expires <= now) buckets.delete(key);
  let bucket = buckets.get(key);
  if (!bucket) {
    if (buckets.size >= 5000) return 1000;
    bucket = { count: 0, expires: now + windowMs };
    buckets.set(key, bucket);
  }
  return ++bucket.count;
}

export async function rateLimit(request: Request): Promise<boolean> {
  // Only trust client IP headers when the deployment proxy overwrites them.
  const address =
    process.env.TRUST_PROXY === "true"
      ? request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "shared"
      : "shared";
  const key = createHash("sha256").update(address.slice(0, 100)).digest("hex");
  if ((await count("global")) > 300) return false;
  return (await count(key)) <= (address === "shared" ? 30 : 5);
}
