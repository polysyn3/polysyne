import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/sections";
export default function NotFound() {
  return (
    <main id="main" className="container error-page">
      <Eyebrow>404 / A DIFFERENT DIRECTION</Eyebrow>
      <h1>
        Let&apos;s find
        <br />
        <span>your way forward.</span>
      </h1>
      <p>
        The page you&apos;re looking for isn&apos;t here. Explore
        Polysyne&apos;s products or start again from the homepage.
      </p>
      <div className="button-row">
        <Button asChild>
          <Link href="/">
            Back to Polysyne <ArrowRight size={17} />
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/products">Our products</Link>
        </Button>
      </div>
    </main>
  );
}
