import Link from "next/link";
import { ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { LeadForm } from "@/components/lead-form";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Contact Polysyne",
  "Interested in Opero, exploring a partnership, or starting a business conversation? Get in touch with Polysyne.",
  "/contact",
);
export default function Contact() {
  return (
    <main id="main">
      <section className="contact-section container lead-layout">
        <Reveal className="lead-copy">
          <Eyebrow dot>LET&apos;S TALK POSSIBILITIES</Eyebrow>
          <h1>
            Great ideas start
            <br />
            <span>with a conversation.</span>
          </h1>
          <p>
            Interested in what we&apos;re building? Whether it&apos;s Opero, a
            partnership, or a new possibility, we&apos;d love to hear
            what&apos;s on your mind.
          </p>
          <div className="contact-topics">
            <div>
              <MessageSquare size={22} />
              <div>
                <h2>A conversation with Polysyne</h2>
                <p>Business inquiries, partnerships, and thoughtful ideas.</p>
              </div>
            </div>
            <div>
              <Sparkles size={22} />
              <div>
                <h2>Curious about Opero?</h2>
                <p>
                  Tell us about your business and the work you&apos;d like to
                  simplify.
                </p>
                <Link href="/products/opero#early-access" className="text-link">
                  Explore early access <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
          {site.email && (
            <div className="direct-contact">
              <span>Prefer email?</span>
              <a href={`mailto:${site.email}`}>
                {site.email}
                <ArrowUpRight size={15} />
              </a>
            </div>
          )}
        </Reveal>
        <LeadForm
          kind="contact"
          configured={Boolean(process.env.LEAD_API_URL)}
        />
      </section>
    </main>
  );
}
