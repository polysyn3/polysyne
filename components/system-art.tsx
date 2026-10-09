import { BrandMark } from "@/components/brand";

export function SystemArt({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`system-art ${compact ? "system-art-compact" : ""}`}
      role="img"
      aria-label="Interlocking indigo modules form a connected system, representing independent businesses sharing a software foundation."
    >
      <div className="art-ambient" />
      <svg
        className="art-lines"
        viewBox="0 0 600 520"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M40 152H156L212 208M450 308l48 48h80M134 399h64l52-52M375 119l36-36h111"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="40" cy="152" r="3" fill="currentColor" />
        <circle cx="578" cy="356" r="3" fill="currentColor" />
        <circle cx="134" cy="399" r="3" fill="currentColor" />
        <circle cx="522" cy="83" r="3" fill="currentColor" />
      </svg>
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <div className="sculpture">
        <div className="sculpture-ring ring-back" />
        <div className="sculpture-ring ring-front" />
        <div className="sculpture-ring ring-third" />
        <div className="sculpture-core">
          <BrandMark />
        </div>
      </div>
      <div className="art-label art-label-top">
        <span className="art-label-dot" /> Purposeful technology
      </div>
      <div className="art-label art-label-bottom">
        <span className="art-label-dot cyan" /> Endless possibilities
      </div>
      <div className="art-coordinate">
        <span>01 / CONNECTED BY DESIGN</span>
        <span>POLYSYNE SYSTEMS</span>
      </div>
    </div>
  );
}
