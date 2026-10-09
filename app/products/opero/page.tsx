import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import { Dashboard } from "@/components/dashboard";
import { OperoMark } from "@/components/brand";
import {
  Eyebrow,
  IndustrySection,
  PlatformDiagram,
} from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/lead-form";
import { capabilities } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Opero — Run your business. Not your busywork.",
  "Opero by Polysyne is a business operations platform in development. Explore the concept and register your early-access interest.",
  "/products/opero",
);
export default function OperoPage() {
  return (
    <main id="main" className="opero-page">
      <section className="opero-hero container">
        <Reveal>
          <Eyebrow dot>OPERO BY POLYSYNE</Eyebrow>
          <div className="opero-hero-wordmark">
            <OperoMark />
            <span>opero</span>
          </div>
          <h1>
            Run your business.
            <br />
            <span>Not your busywork.</span>
          </h1>
          <p>
            Opero is a multi-tenant business operations platform being developed
            to bring essential workflows, customer information, scheduling, and
            operational visibility into a more connected experience.
          </p>
          <div className="button-row">
            <Button asChild>
              <Link href="#early-access">
                Request Early Access <ArrowUpRight size={17} />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact">
                Contact the Team <ArrowRight size={17} />
              </Link>
            </Button>
          </div>
          <span className="opero-hero-note">
            <span className="status-dot" /> In development. Built with tomorrow
            in mind.
          </span>
        </Reveal>
        <Reveal className="opero-dashboard">
          <Dashboard />
        </Reveal>
      </section>
      <section className="section problem-section">
        <div className="container">
          <Reveal>
            <Eyebrow>LESS SCATTERED. MORE CONNECTED.</Eyebrow>
            <h2>
              Business operations
              <br />
              <span>shouldn&apos;t be scattered.</span>
            </h2>
          </Reveal>
          <div className="problem-grid">
            <Reveal className="problem-list">
              <h3>The everyday friction</h3>
              {[
                "Workflows distributed across multiple tools",
                "Manual tracking of operational information",
                "Lack of centralized business visibility",
                "Repetitive administrative tasks",
                "Difficulties coordinating customers, schedules, and services",
              ].map((item) => (
                <p key={item}>
                  <Minus size={15} />
                  {item}
                </p>
              ))}
            </Reveal>
            <Reveal className="solution-summary">
              <div className="solution-logo">
                <OperoMark />
              </div>
              <h3>
                A more connected
                <br />
                way to operate.
              </h3>
              <p>
                We&apos;re designing Opero to bring the essential parts of a
                business together. Less time piecing things together. More space
                to do meaningful work.
              </p>
              <span>
                <Check size={15} /> One adaptable digital environment
              </span>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section capabilities-section">
        <div className="container">
          <Reveal>
            <div className="section-intro">
              <div>
                <Eyebrow>THE EXPERIENCE WE&apos;RE BUILDING</Eyebrow>
                <h2>
                  A clearer picture.
                  <br />
                  <span>A better flow.</span>
                </h2>
              </div>
              <p>
                These are Opero&apos;s intended capabilities. Development
                priorities will be shaped by customer research and validated
                business needs.
              </p>
            </div>
          </Reveal>
          <div className="capabilities-grid">
            {capabilities.map((capability, i) => (
              <Reveal
                key={capability.title}
                className="capability"
                delay={i * 0.025}
              >
                <Icon name={capability.icon} />
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <span>Planned capability</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section multi-tenant-section">
        <div className="container">
          <Reveal>
            <Eyebrow>ONE PLATFORM. YOUR OWN SPACE.</Eyebrow>
            <h2>
              One foundation.
              <br />
              <span>Built for many businesses.</span>
            </h2>
            <p className="section-description wide-description">
              Opero is being designed so multiple organizations can operate
              within the same underlying platform while maintaining their own
              organizational configurations and appropriately isolated business
              data.
            </p>
          </Reveal>
          <Reveal>
            <PlatformDiagram />
          </Reveal>
          <div className="platform-explanation">
            <p>
              <strong>A shared foundation</strong>The same underlying software,
              continuously developed by Polysyne.
            </p>
            <p>
              <strong>An organization&apos;s own context</strong>
              Business-specific settings, workflows, and access arrangements.
            </p>
            <p>
              <strong>Designed to evolve</strong>Modular capabilities informed
              by actual business needs.
            </p>
          </div>
        </div>
      </section>
      <IndustrySection product />
      <section id="early-access" className="section early-access-section">
        <div className="container lead-layout">
          <Reveal className="lead-copy">
            <Eyebrow dot>BUILD THE FUTURE WITH US</Eyebrow>
            <h2>
              Help shape
              <br />
              <span>the future of Opero.</span>
            </h2>
            <p>
              We&apos;re developing Opero alongside a growing understanding of
              the challenges businesses face. Share your needs and register your
              interest in becoming an early adopter.
            </p>
            <div className="early-access-notes">
              <p>
                <Check size={17} /> Share what your business needs
              </p>
              <p>
                <Check size={17} /> Express interest in early access
              </p>
              <p>
                <Check size={17} /> Help guide product development
              </p>
            </div>
            <p className="lead-fineprint">
              No launch date or access guarantee is implied. We&apos;re building
              thoughtfully and will share updates when there&apos;s something
              meaningful to show.
            </p>
          </Reveal>
          <LeadForm
            kind="early-access"
            configured={Boolean(process.env.LEAD_API_URL)}
          />
        </div>
      </section>
    </main>
  );
}
