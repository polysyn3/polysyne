import { ImageResponse } from "next/og";

// Share-image rings use the geometric-art palette documented in DESIGN.md.

const pages: Record<string, { label: string; title: string; detail: string }> =
  {
    "/": {
      label: "POLYSYNE — BUILDING WHAT'S NEXT",
      title: "Technology built for the way businesses evolve.",
      detail: "Independent thinking. Connected systems.",
    },
    "/products": {
      label: "THE POLYSYNE PRODUCT PORTFOLIO",
      title: "Products built to move businesses forward.",
      detail: "Purposeful technology. Real possibilities.",
    },
    "/products/opero": {
      label: "OPERO BY POLYSYNE / IN DEVELOPMENT",
      title: "Run your business. Not your busywork.",
      detail: "One platform. A more connected way to operate.",
    },
    "/about": {
      label: "ABOUT POLYSYNE",
      title: "Ideas into systems. Systems into progress.",
      detail: "A technology company, built with purpose.",
    },
    "/contact": {
      label: "LET'S TALK POSSIBILITIES",
      title: "Great ideas start with a conversation.",
      detail: "Business inquiries. Partnerships. New possibilities.",
    },
  };
export async function GET(request: Request) {
  const page =
    pages[new URL(request.url).searchParams.get("page") || "/"] || pages["/"];
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#09090b",
        color: "#fafafa",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 35,
          letterSpacing: -2,
        }}
      >
        polysyne<span style={{ color: "#a5a6ff" }}>.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: 800 }}>
        <div
          style={{
            color: "#a1a1aa",
            fontSize: 14,
            letterSpacing: 3,
            marginBottom: 28,
          }}
        >
          {page.label}
        </div>
        <div
          style={{
            fontSize: 70,
            lineHeight: 1.06,
            letterSpacing: -3,
            maxWidth: 850,
          }}
        >
          {page.title}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #25252b",
          paddingTop: 24,
          color: "#a1a1aa",
          fontSize: 17,
        }}
      >
        <span>{page.detail}</span>
        <span style={{ color: "#a5a6ff" }}>Building what&apos;s next ↗</span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 82,
          width: 94,
          height: 94,
          border: "17px solid #7972c4",
          borderRadius: 22,
          transform: "rotate(-25deg)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 132,
          top: 112,
          width: 94,
          height: 94,
          border: "17px solid #514b83",
          borderRadius: 22,
          transform: "rotate(-25deg)",
          display: "flex",
        }}
      />
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    },
  );
}
