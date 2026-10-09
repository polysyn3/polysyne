---
name: Polysyne
description: Independent thinking. Connected systems.
colors:
  background: "#09090b"
  surface: "#111116"
  surface-raised: "#18181f"
  foreground: "#fafafa"
  muted: "#a1a1aa"
  subtle: "#858590"
  accent: "#6366f1"
  accent-soft: "#a5a6ff"
  cyan: "#22d3ee"
  border: "rgb(255 255 255 / 8%)"
  primary-button: "#595bdf"
  primary-button-hover: "#6062e5"
  secondary-button: "#ffffff04"
  secondary-button-text: "#e4e4e7"
  light-button: "#f2f2f5"
  field-background: "#0d0d12"
  field-text: "#dedee7"
  field-placeholder: "#858591"
  field-error: "#eaa0a7"
  art-metal: "#7c74cf"
  concept-neutral: "#94949f"
  concept-accent: "#bcbaff"
  status-success: "#97c1a7"
typography:
  vision-display:
    fontSize: "clamp(42px, 5vw, 69px)"
  page-display:
    fontSize: "clamp(43px, 5.2vw, 66px)"
  opero-display:
    fontSize: "clamp(46px, 5.6vw, 77px)"
  contact-display:
    fontSize: "clamp(40px, 4vw, 54px)"
  mobile-company-display:
    fontSize: "clamp(43px, 8vw, 62px)"
  display:
    fontFamily: "Geist Sans, Arial, sans-serif"
    fontSize: "clamp(45px, 5.2vw, 72px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Geist Sans, Arial, sans-serif"
    fontSize: "clamp(34px, 3.55vw, 48px)"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.043em"
  title:
    fontFamily: "Geist Sans, Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist Sans, Arial, sans-serif"
    fontSize: "15px"
    lineHeight: 1.75
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.12em"
  control:
    fontFamily: "Geist Sans, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 500
  preview-status-mini:
    fontSize: "5px"
  preview-data-caption:
    fontSize: "6px"
  preview-microtext:
    fontSize: "7px"
  caption-xs:
    fontSize: "8px"
  caption-small:
    fontSize: "9px"
  label-small:
    fontSize: "11px"
  body-small:
    fontSize: "13px"
  body-standard:
    fontSize: "14px"
  input-mobile:
    fontSize: "16px"
  title-small:
    fontSize: "17px"
  title-standard:
    fontSize: "18px"
  form-title:
    fontSize: "21px"
  preview-wordmark:
    fontSize: "22px"
  brand-small:
    fontSize: "23px"
  brand-footer:
    fontSize: "24px"
  brand-default:
    fontSize: "25px"
  mobile-navigation:
    fontSize: "26px"
  preview-stat:
    fontSize: "27px"
  product-subtitle:
    fontSize: "30px"
  success-title:
    fontSize: "32px"
  product-wordmark:
    fontSize: "35px"
  heading-mobile:
    fontSize: "36px"
  cta-mobile:
    fontSize: "39px"
  contact-heading-min:
    fontSize: "40px"
  contact-heading-mobile:
    fontSize: "41px"
  vision-heading-min:
    fontSize: "42px"
  page-heading-min:
    fontSize: "43px"
  page-heading-mobile:
    fontSize: "44px"
  hero-tablet:
    fontSize: "46px"
  vision-tablet:
    fontSize: "49px"
  opero-heading-tablet:
    fontSize: "53px"
  hero-compact:
    fontSize: "55px"
  company-hero-max:
    fontSize: "68px"
rounded:
  field: "5px"
  notice: "6px"
  button: "7px"
  tile: "8px"
  form: "12px"
  portfolio: "16px"
  concept-shell: "20px"
  chart-key: "1px"
  chart-bar: "2px"
  focus-and-micro-control: "3px"
  preview-badge: "4px"
  dashboard-panel: "10px"
  architecture-panel: "13px"
  opero-shell: "18px"
spacing:
  control-gap: "12px"
  field-gap: "17px"
  mobile-gutter: "20px"
  tablet-gutter: "32px"
  desktop-gutter: "48px"
  mobile-section: "74px"
  desktop-section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.primary-button}"
    textColor: "{colors.foreground}"
    typography: "{typography.control}"
    rounded: "{rounded.button}"
    padding: "0 21px"
  button-primary-hover:
    backgroundColor: "{colors.primary-button-hover}"
  button-secondary:
    backgroundColor: "{colors.secondary-button}"
    textColor: "{colors.secondary-button-text}"
    typography: "{typography.control}"
    rounded: "{rounded.button}"
    padding: "0 21px"
  button-light:
    backgroundColor: "{colors.light-button}"
    textColor: "{colors.surface}"
    typography: "{typography.control}"
    rounded: "{rounded.button}"
    padding: "0 21px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.control}"
    rounded: "{rounded.button}"
    padding: "0 21px"
  input:
    backgroundColor: "{colors.field-background}"
    textColor: "{colors.field-text}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
    width: "100%"
  lead-form:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.form}"
    padding: "31px"
---

# Design System: Polysyne

## Overview

**Creative North Star: "Connected systems"**

Polysyne's company identity uses independent geometric modules sharing a coherent foundation. The built world is dark first, restrained, and spacious: white and muted headlines, indigo actions, thin dividers, and layered charcoal surfaces. Geist supplies a consistent voice across company pages and the Opero concept.

The marketing site establishes Polysyne as the company; Opero has its own wordmark and quieter indigo/cyan accents within that same system. The company hero pairs asymmetric typography with interlocking sculptural rings. Open principles, process sequences, product previews, and larger statements vary the reading rhythm. These are existing surface compositions, rather than a required template for every future page.

**Key Characteristics:**

- Dark charcoal surfaces with restrained indigo and cyan accents.
- Geist Sans hierarchy and compact Geist Mono labels.
- Open layouts, generous section separation, and low-opacity borders.
- Geometric brand media and explicitly labeled conceptual product interfaces.
- Native controls, visible focus, honest form states, and reduced-motion support.

## Colors

### Primary

Brand indigo (`accent`) belongs to brand geometry, consent controls, and selected concept states. Soft indigo (`accent-soft`) supplies status dots, link hover, and the global focus ring. The accessible primary-button shade **#595bdf** is distinct from the brand accent **#6366f1**; its hover shade is `primary-button-hover`, and its text remains `foreground`.

### Secondary

Cyan (`cyan`) is limited to Opero concept and diagram accents. Main company actions remain indigo.

### Neutral

`background` is the page canvas; `surface` and `surface-raised` create charcoal layers. `foreground` carries major headings and primary controls; `muted` and `subtle` carry supporting text. `border` is the recurring low-opacity divider; component-specific translucent strokes remain in CSS. Fields use their own background, text, placeholder, and error colors. Light navigation buttons use dark surface text; secondary buttons retain translucent dark fills.

Selection uses `#6366f155` behind foreground text. The native browser color scheme is dark. Frontmatter owns the base tokens; sidecar tonal ramps enumerate only shades actually used in the source, including translucent variants. Artwork, miniature concept surfaces, completion states, and errors have explicitly separate roles. These component palettes do not introduce additional primary brand accents.

## Typography

Geist Sans and Geist Mono are loaded through `next/font/google` in `app/layout.tsx`. CSS uses the generated font variables, with Arial/sans-serif and monospace fallbacks.

The frontmatter records actual base h1, h2, h3, body, label, and button styles. Section-specific sizes override them: the desktop company hero reaches 72px, the Opero headline reaches 77px, and contact headlines use a smaller scale. Headings use weight 500; wordmarks use 550. Muted headline spans are flat color. Body inherits 15px, while most marketing paragraphs are 13–14px with composition-specific pixel measures; no universal character-width rule exists.

Uppercase Geist Mono eyebrows are part of the supplied identity. Mobile variants reduce their size and tracking. The expanded frontmatter records every existing fixed responsive type step. Sizes 5–7px are reserved for the labeled miniature product visualization, its chart keys/status labels, and decorative coordinate captions; they are not a size recommendation for live product interfaces or marketing body copy. The 8–9px steps serve compact captions and labels. Marketing paragraphs use the documented 11–16px steps. Small concept labels are denser than marketing copy. At 480px and below, the company hero is 45px, generic page and Opero hero headings are 44px, and contact headings are 41px. Text inputs become 16px; placeholders and selects use 12px.

## Layout

The shared container has **1160px maximum width** and `width: calc(100% - 96px)`. At 1100px and below it has 32px side gutters; below 768px it has 20px gutters. Standard sections use 112px vertical padding, reduced to 74px below 768px. Page heroes, contact, and vision have their own spacing.

The company hero is a `1.17fr 1fr` grid with 652px minimum height; at 1440px and above it reaches 690px. Below 768px, copy precedes a centered, scaled sculpture in a vertical stack. Between 768px and 900px its headline is 46px. Artwork is clipped within the hero, without horizontal page scrolling.

Section introductions, portfolio, story, mission/vision, problem/solution, and lead layouts stack below 768px. Industry tiles move from three columns to two; principles and process become a single sequence at 480px and below. Platform organizations retain three compact columns; explanatory copy stacks on narrow phones. **About story artwork is omitted below 1024px**, where the story text spans one column.

Desktop navigation is visible from 768px upward; below that a 44px trigger opens a native dialog. The sticky header is 76px high on desktop and 68px on mobile, at layer 30. The dialog occupies the browser top layer; the keyboard skip link uses layer 50. Anchor scrolling reserves 100px for the header.

The main dashboard retains its sidebar on desktop/tablet and simplifies widgets below 768px. At 480px and below its four view buttons become a horizontal strip. The compact portfolio dashboard hides its sidebar below 1101px and restores horizontal controls on narrow phones. Form fields change from two columns to one at 480px and below; form padding reduces from 31px to 27px, then 23px 20px.

## Elevation & Depth

Most surfaces use tonal layers and thin borders. Shadows are selective: primary-button lift, dashboard depth, and dimensional rings. The sculpture's stepped shadows represent physical extrusion and are specific to that artwork. The sticky header uses a translucent fill with 20px backdrop blur; the dialog backdrop uses 5px blur. Reduced transparency makes both opaque.

### Shadow Vocabulary

- **Primary action:** `inset 0 1px 0 #ffffff17, 0 3px 12px #6366f114`.
- **Dashboard:** `0 18px 55px #0004`.
- **Field focus:** `0 0 0 3px #6366f11b`, paired with a `#a5a6ff99` border.
- **Light navigation action:** `0 0 0 3px #ffffff06`.

These are component treatments, not a universal elevation scale.

## Shapes

The radius scale includes 1–4px chart keys, small badges, and focus indicators, as well as the actual panel radii. Artwork curvature (15px core, 43px small ring, 53px large ring) is recorded separately in sidecar `roundedMeta`; it is geometric illustration material, not a reusable card-radius scale.

Controls are compact rounded rectangles: 7px buttons, 5px fields and development badges, and 6px notices. Industry tiles use 8px corners, lead forms 12px, and portfolio previews 16px. Concept wrappers have 20px corners around 10px dashboard surfaces; mobile featured wrappers reduce to 12px. Platform diagrams use 13px outer and 8px organization corners.

Circles belong to status dots, avatars, and the success icon. The SVG company mark and CSS interlocking rings are geometric media; rings use 53px/43px corners and perspective transforms. Reuse the relevant component instead of assigning one radius to every surface.

## Components

### Buttons and links

The owned Button uses Radix Slot/CVA with `default`, `secondary`, `light`, and `ghost` variants, plus `small` sizing. Standard controls have 46px minimum height, 21px horizontal padding, 20px icon gap, and 12px medium text. Small controls have 34px minimum height, 14px padding, 13px gap, and 11px text. The light variant is the desktop Opero navigation action.

Hover lifts buttons 2px and shifts their arrow. Global focus uses a 2px soft-indigo outline with 5px offset. Disabled controls have 0.65 opacity and a waiting cursor. Text links brighten and shift their arrow on hover. Form actions span their container.

### Inputs and lead forms

Inputs, native selects, and textareas share a dark fill, 1px translucent border, 5px corners, 42px minimum height, and 10px 12px padding. Textareas resize vertically with 110px minimum height. Fields have persistent labels, required markers, optional annotations, associated errors, and invalid borders. Narrow-phone text inputs have 46px minimum height.

Contact and early-access forms share LeadForm and Zod validation, with required consent. Unconfigured forms display a preview notice; a valid attempt reports that nothing was submitted and retains input. Connected submission disables its action and shows a spinner. Rejected or uncertain delivery preserves details and exposes an alert. Only explicit backend acceptance replaces the form with success and reset controls. Privacy information uses native disclosure content. No acceptance is simulated.

### Navigation

The company wordmark links home. Desktop links brighten on hover and use `aria-current` for the exact route; the Products chevron is decorative on a normal link. The native mobile dialog supports Escape, bounded keyboard focus, focus return, and links that close it. The skip link appears on focus. No task relies only on hover.

### Badges and content groups

The development badge combines a soft-indigo dot, translucent indigo fill/stroke, and 9px text. It is a status label, not an interactive chip. Industry tiles have subtle fill and hover borders; capabilities and numbered values remain open content groups rather than adopting dashboard density.

### Opero concept and platform diagram

Overview, Workflows, Schedule, and Customers are native buttons with `aria-pressed`; selecting one renders its actual sample view. Other dashboard icons, dates, organization controls, task checks, and settings are illustrative noninteractive elements. The enclosing labels identify conceptual interfaces and sample data; fictional customers have an additional explanation. The platform diagram labels separation/access controls as intended and under development, never deployment evidence.

### Motion and preferences

The signature motion is the sculpture's 9-second float, enabled only without reduced motion. Reveal wrappers start visible and use a once-only 0.6-second translation/opacity sequence with easing `[0.16, 1, 0.3, 1]`. Dashboard views transition in 0.16 seconds; buttons, links, and inputs use 0.2-second CSS transitions. Loading uses a one-second spinner.

Reduced motion disables spatial Reveal/dashboard entrances, sculpture animation, and smooth scrolling; global CSS shortens animations/transitions to 0.01ms. Reduced transparency removes header/dialog blur. There is no scroll hijacking.

## Do's and Don'ts

### Do:

- **Do** preserve Polysyne as the company and Opero as its flagship product in development.
- **Do** use the existing dark palette, Geist typography, shared controls, and responsive container.
- **Do** use action indigo for readable primary-button text while retaining brand indigo in the identity.
- **Do** retain visible focus, native keyboard behavior, field labels, truthful feedback, and preference handling.
- **Do** label illustrative interfaces, sample data, intended capabilities, and conceptual architecture.

### Don't:

- **Don't** invent customers, company metrics, testimonials, personnel, certifications, contact details, or production readiness.
- **Don't** show submission success before explicit durable backend acceptance.
- **Don't** remove conceptual/development labels when extending an Opero preview.
- **Don't** require the desktop sculpture, sidebar, or multicolumn forms to persist on narrow screens.
- **Don't** turn one page's composition into a mandatory layout for every future surface.
