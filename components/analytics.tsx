"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
// A provider-neutral, consent-aware hook. No tracking request is made by default.
export function Analytics() {
  const pathname = usePathname();
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" &&
      localStorage.getItem("polysyne-analytics-consent") === "granted"
    )
      window.dispatchEvent(
        new CustomEvent("polysyne:pageview", { detail: { path: pathname } }),
      );
  }, [pathname]);
  return null;
}
