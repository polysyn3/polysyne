# Verification record

Verified locally on October 9, 2026, using the completed Next.js 16.4.0 production build. No public deployment or real lead backend has been configured.

## Source and build

- `bun run check`: ESLint, TypeScript, and nine lead/schema/API tests passed.
- `bun run build`: passed with all five marketing routes prerendered. Lead intake and generated social images are server routes.
- `git diff --check`: passed.
- Next.js Cache Components compatibility was verified, including the cached dynamic copyright year.
- A sandbox socket error was retained in the Turbopack cache after an interrupted session. Moving that compiler cache aside and rebuilding resolved it; the bundler and application configuration were retained.

## Browser checks

Production verification used `http://localhost:3001`. The completed interactive development preview is running at `http://localhost:3000`.

The production browser suite recorded **22 passed, one expected skip**. It covers:

- All five routes at 1440 × 960, 768 × 1024, and 390 × 844.
- No horizontal overflow, one main page heading, correct canonical paths, and no page JavaScript errors across the route/viewport matrix.
- Zero violations in the axe WCAG 2 A/AA and WCAG 2.1 AA tagged scans across those 15 route/viewport combinations. This is automated evidence, not an accessibility certification.
- Mobile navigation focus trapping, Escape dismissal, focus return, and internal navigation.
- Keyboard switching of all four labeled dashboard concept views.
- Contact and early-access validation, field focus/errors, consent, preserved input on failure, and honest disconnected submission behavior.
- Sitemap, robots, PNG social image generation, 404 behavior, and security response headers.
- Desktop and mobile screenshots of the Opero introduction, company vision, platform architecture, early access, and contact form.

The connected success-state test skips on the production preview because the user confirmed there is no lead endpoint. **That same test passed separately against an isolated fixture rendering the actual LeadForm component with configured connectivity and intercepted test responses.** It verified loading/disabled state, rejected submission, preserved details, retry, explicit acceptance, success, and reset. No real lead was sent; these responses exist only in browser test interception. Backend/schema tests independently verify that `accepted:true` is required.

Snapshots and Lighthouse JSON reports are in ignored `.impeccable/review/`. First-viewport snapshots include the live navigation. Isolated section captures hide fixed navigation/skip-link chrome only during capture, so it cannot obscure the section being reviewed.

## Lighthouse

Lighthouse 13.5.0, local production homepage, Chromium, standard simulated mobile and desktop presets:

| Category / metric        | Mobile | Desktop |
| ------------------------ | ------ | ------- |
| Performance              | 95     | 100     |
| Accessibility            | 100    | 100     |
| Best practices           | 100    | 100     |
| SEO                      | 66     | 66      |
| First contentful paint   | 0.9 s  | 0.2 s   |
| Largest contentful paint | 2.9 s  | 0.7 s   |
| Total blocking time      | 70 ms  | 0 ms    |
| Cumulative layout shift  | 0      | 0       |

The only failed SEO audit was “Page is blocked from indexing.” This is deliberate: no confirmed public domain has been supplied, so metadata and robots prevent indexing the localhost configuration. Set `NEXT_PUBLIC_SITE_URL` to the confirmed HTTPS domain and rebuild before launch. The resulting SEO score has not been measured and is not promised.

Mobile report timestamp: `2026-10-09T01:28:17.250Z`. Desktop: `2026-10-09T01:32:34.690Z`. These are synthetic local measurements; deployment latency, devices, and hosting can change them. Mobile LCP was above the 2.5-second target in this run. Field Core Web Vitals, screen-reader review, and production-hostname checks remain deployment-time work.

## Configuration still required

- Confirmed public domain and any company email/social/leadership details.
- A real lead endpoint that durably accepts validated records, plus shared production rate-limit configuration.
- Actual backend data retention and inquiry/deletion contact procedures.
- Consent UI and a chosen analytics provider if analytics is enabled.

The running website does not invent these values, simulate successful intake, or claim Opero is production-ready.

## Finish review

A fresh read-only review opened all 25 supplied page/section screenshots and inspected the implementation, product truth, configuration, and documentation. Its disposition was **ship**, with no material blocking findings at that scope. It relied on the recorded verification rather than rerunning commands, and did not certify a public deployment or real backend acceptance.
