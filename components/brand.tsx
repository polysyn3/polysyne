import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("brand-mark", className)}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 3 35 11.5V28.5L20 37 5 28.5V11.5L20 3Z"
        stroke="currentColor"
        strokeWidth="2.3"
      />
      <path
        d="m5 11.5 15 9 15-9M20 20.5V37M12.5 7.3l15 8.7v17"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Brand({ small = false }: { small?: boolean }) {
  return (
    <span className={cn("brand", small && "brand-small")}>
      <BrandMark />
      polysyne<span className="brand-period">.</span>
    </span>
  );
}
export function OperoMark() {
  return (
    <span className="opero-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}
