"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="container error-page">
      <p className="eyebrow">SOMETHING INTERRUPTED THIS PAGE</p>
      <h1>
        Let&apos;s try
        <br />
        <span>that again.</span>
      </h1>
      <p>
        We couldn&apos;t load this page. Please try again, or return to
        Polysyne&apos;s homepage.
      </p>
      <div className="button-row">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="secondary">
          <Link href="/">Back to homepage</Link>
        </Button>
      </div>
    </main>
  );
}
