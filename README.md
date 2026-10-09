# Polysyne

A company-first marketing website for Polysyne, with Opero presented as its flagship product under active development. This repository is the corporate website, not the Opero SaaS application.

## Run locally

Requires Bun 1.3.11+ and Node.js 20.9+.

```sh
bun install --frozen-lockfile
cp .env.example .env.local
bun run dev
```

Open http://localhost:3000. The site works without credentials. Contact and early-access forms clearly indicate that submission is unavailable until a backend is configured; entered details stay in the form and no success is simulated.

```sh
bun run check        # ESLint, TypeScript, and lead/API tests
bun run build        # production build
bun run start        # production server
```

## Routes and structure

| Route             | Purpose                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `/`               | Polysyne positioning, principles, Opero introduction, philosophy, target sectors, vision |
| `/products`       | Editable, expandable product portfolio                                                   |
| `/products/opero` | Conceptual dashboard, intended capabilities, platform explanation, early-access form     |
| `/about`          | Company story, mission, vision, values, optional leadership                              |
| `/contact`        | Business, partnership, general, and Opero inquiries                                      |

- `app/`: server-rendered pages, route metadata, error pages, API, sitemap, robots, icons.
- `components/`: shared shell, geometric brand visual, concept dashboard, form, and Motion leaves.
- `components/ui/`: owned shadcn-style Button/Input/Textarea primitives. The Button uses Radix Slot and CVA; `components.json` is ready for additional shadcn components.
- `content/site.ts`: company configuration, products, principles, sectors, capabilities, and values. The supplied brief's primary page headlines live in the route files.
- `lib/`: metadata helpers, shared Zod schema, server delivery adapter, bounded rate limiter, and utilities.
- `public/`: future approved static brand assets. The current visuals are geometric SVG/CSS and use no third-party photography.
- `tests/`: API contracts and browser/accessibility checks.
- `PRODUCT.md`, `DESIGN.md`: durable company truth and design decisions.

To add a product, extend `products` in `content/site.ts` and implement its route. Navigation, footer, portfolio structure, and design tokens can extend to case studies, careers, articles, and updates. Do not add fictional products or public proof.

## Configuration

| Variable                        | Visibility        | Purpose                                                                   |
| ------------------------------- | ----------------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Public/build time | Confirmed canonical HTTPS domain; also used for sitemap and social images |
| `NEXT_PUBLIC_CONTACT_EMAIL`     | Public/build time | Optional verified company email                                           |
| `LEAD_API_URL`                  | Server only       | Exact lead intake URL; must use HTTPS in production                       |
| `LEAD_API_TOKEN`                | Server only       | Optional backend bearer token                                             |
| `UPSTASH_REDIS_REST_URL`        | Server only       | Shared atomic production rate-limit store                                 |
| `UPSTASH_REDIS_REST_TOKEN`      | Server only       | Rate-limit store token                                                    |
| `TRUST_PROXY`                   | Server only       | Enable only where a trusted proxy overwrites client IP headers            |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Public/build time | Enables the provider-neutral pageview hook after consent; defaults off    |

No real domain, contact address, leadership biography, or social accounts have been supplied. Set `site.socials` and `site.leadership` in `content/site.ts` when verified content is available. Leadership is omitted while unconfigured; social placeholders are text, not dead links.

Without `NEXT_PUBLIC_SITE_URL`, canonical URLs use localhost and search indexing is disabled in metadata and robots. Set the real domain and rebuild before a public launch. Preview deployments should leave indexing disabled. Rebuild after changing public variables or lead connectivity: Next.js statically renders the form's configured/unconfigured presentation.

## FastAPI-compatible lead integration

Both forms submit to the same-origin `POST /api/leads`. The route validates against `lib/lead-schema.ts`, rejects foreign origins, enforces a 16 KiB body cap, and calls the server-only HTTP adapter. It never stores or logs form contents. Secrets are never returned to the browser. The optional honeypot must be empty; consent is required on the client and server.

The configured backend receives:

```json
{
  "schemaVersion": 1,
  "source": "polysyne-marketing",
  "kind": "contact",
  "name": "Sample Person",
  "email": "person@example.test",
  "company": "Sample Business",
  "inquiryType": "Business Inquiry",
  "industry": "",
  "size": "",
  "message": "A sample inquiry describing a business need.",
  "contactPreference": "",
  "consent": true
}
```

For early access, `kind` is `early-access`; company, industry, size, and a meaningful challenge in `message` are required. Enum values live in `lib/lead-schema.ts`. The honeypot is stripped before forwarding. A FastAPI endpoint can validate this shape with a Pydantic model and persist to the lead system of your choice.

The backend must return a successful HTTP status with **`{"accepted": true}` only after durable acceptance**. An empty response, `{"ok": true}`, rejected status, timeout, or redirect is a failure. The website will show success only after that explicit acknowledgement. The adapter uses an 8-second timeout and does not retry automatically. Add backend deduplication/idempotency before retrying uncertain deliveries. The form retains entered details on failure.

No endpoint: `503`, `accepted:false`. Invalid fields: `422`, field-specific messages. Invalid origin: `403`. Wrong content type: `415`. Large body: `413`. Rate limited: `429` plus `Retry-After`. Backend or limiter failure: `503` with a generic message that exposes no backend details.

### Rate limiting and spam

Production submissions require the shared Upstash REST configuration; intake fails closed if the store is missing or unavailable. Atomic Redis counters expire after 10 minutes. Limits are 300 total requests per window and 5 per trusted client IP; without trusted IP headers there is a conservative shared limit of 30. Only SHA-256 hashes of bounded address strings appear in rate-limit keys, not email addresses or form contents. Local development uses an expiring map capped at 5,000 entries. It is not a distributed production limiter.

The edge/CDN should additionally apply request limits before application processing, particularly for malformed requests, because field validation precedes application buckets. Configure proxy trust only for an ingress that strips and overwrites client-supplied headers. Never expose the upstream lead endpoint token. Backend validation, storage permissions, retention/deletion handling, and privacy contact details must be configured in the actual lead service. For increased abuse, add a challenge provider with server-side token verification to the adapter; do not rely on client checks alone.

## Analytics

The site makes no analytics requests by default. If enabled and `localStorage["polysyne-analytics-consent"]` equals `granted`, `components/analytics.tsx` emits `polysyne:pageview` with only the route path. Connect this event to your selected provider and supply a consent interface before enabling it publicly. Never attach form values or contact details to analytics. No analytics vendor or account is invented.

## Deploy

Vercel automatically detects this Next.js project. Use `bun install --frozen-lockfile`, build command `bun run build`, and the default Next.js output. Set environment variables in the hosting dashboard, never in source control. The site also runs on a comparable Node.js host with `bun run build` followed by `bun run start`; it requires a server runtime for leads and generated share images and cannot be deployed as a static-only export.

The existing starter enables Next.js Cache Components and Partial Prefetching. The copyright year uses an hourly cached server component so it stays compatible with prerendering and updates without hardcoding. Geist fonts are optimized through `next/font`. Security response headers block framing/object embeds and set MIME, referrer, and permissions policies. Hosting should terminate HTTPS; the lead adapter requires an HTTPS upstream in production. The limited CSP preserves Next.js scripts; add a nonce-based script policy at the deployment boundary if needed.

Before launch, supply the real domain, verify lead acceptance and the production rate-limit store, review the configured privacy contact and backend practices, and test the deployed hostname. Opero screens must remain labeled conceptual until actual product evidence supports changing the copy.

## Browser and accessibility verification

```sh
bunx playwright install chromium
bun run build
bun run test:e2e
```

The suite starts the production server on port 3100 and checks all five routes at 1440, 768, and 390px, keyboard navigation, native mobile-dialog focus trapping, dashboard transitions, form errors, reduced motion, overflow, WCAG-tagged axe checks, SEO endpoints, generated PNG share images, security headers, and the 404 page.

Use `TEST_BASE_URL` to test an already-running server; `PLAYWRIGHT_CHROMIUM_EXECUTABLE` optionally selects a locally installed Chromium. Screenshots go to ignored `.impeccable/review/`; failure traces go to ignored `test-results/`. The connected success-state test is skipped when no lead endpoint is configured; unit tests verify the accepted-response contract with isolated mock services. Test mocks are never used by the running site.

Automated checks are not an accessibility certification. Keep manual keyboard, screen-reader, and deployed-device checks in the release process. See `docs/verification.md` for recorded results; do not infer Lighthouse or production performance results from a successful build.
