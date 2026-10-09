import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SystemArt } from "@/components/system-art";
import { Dashboard } from "@/components/dashboard";
import { OperoMark } from "@/components/brand";
import { Icon } from "@/components/icons";
import {
  Eyebrow,
  FinalCTA,
  IndustrySection,
  VisionSection,
} from "@/components/sections";
import { principles, processSteps } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Technology built for the way businesses evolve",
  "Polysyne builds purposeful business technology. Discover Opero, our business operations platform currently in development.",
  "/",
);
export default function Home() {
  return (
    <main id="main">
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Reveal>
              <Eyebrow dot>POLYSYNE — BUILDING WHAT&apos;S NEXT</Eyebrow>
              <h1>
                Technology built
                <br className="desktop-only" /> for the way
                <br className="desktop-only" />
                <span> businesses evolve.</span>
              </h1>
              <p>
                At Polysyne, we build intelligent, scalable software solutions
                that simplify operations, connect workflows, and help businesses
                grow with confidence.
              </p>
              <div className="button-row">
                <Button asChild>
                  <Link href="/products/opero">
                    Explore Opero <ArrowUpRight size={18} />
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/contact">
                    Get in Touch <ArrowRight size={17} />
                  </Link>
                </Button>
              </div>
              <div className="hero-smallprint">
                <span className="small-cross">+</span> Thoughtfully engineered.
                Built for real business.
              </div>
            </Reveal>
          </div>
          <SystemArt />
        </div>
        <div className="container hero-bottom">
          <span>INDEPENDENT THINKING. CONNECTED SYSTEMS.</span>
          <Link href="#mission">
            Discover Polysyne <span>↓</span>
          </Link>
        </div>
      </section>
      <section id="mission" className="section mission-section">
        <div className="container">
          <Reveal>
            <div className="section-intro">
              <div>
                <Eyebrow>COMPLEXITY, MEET CLARITY</Eyebrow>
                <h2>
                  Making complex
                  <br />
                  <span>operations feel simple.</span>
                </h2>
              </div>
              <p>
                Businesses shouldn&apos;t have to fight their tools to move
                forward. We develop software that brings clarity to complex
                processes, reduces operational friction, and creates room for
                meaningful growth.
              </p>
            </div>
          </Reveal>
          <div className="principles-grid">
            {principles.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.06}>
                <div className="principle-top">
                  <Icon name={principle.icon} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
                <span className="principle-detail">{principle.detail}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section featured-section">
        <div className="container">
          <Reveal>
            <div className="featured-top">
              <div>
                <Eyebrow>INTRODUCING OPERO</Eyebrow>
                <div className="product-name">
                  <OperoMark />
                  <span>opero</span>
                  <span className="development-badge">
                    <span className="status-dot" /> In development
                  </span>
                </div>
                <h2>
                  One platform.
                  <br />
                  Different businesses.
                  <br />
                  <span>Smarter operations.</span>
                </h2>
              </div>
              <div className="featured-description">
                <p>
                  Opero is Polysyne&apos;s flagship multi-tenant business
                  operations platform, designed to help businesses manage their
                  essential workflows through a unified, adaptable digital
                  environment.
                </p>
                <div className="button-row">
                  <Button asChild>
                    <Link href="/products/opero">
                      Discover Opero <ArrowUpRight size={17} />
                    </Link>
                  </Button>
                  <Link
                    className="text-link"
                    href="/products/opero#early-access"
                  >
                    Join the Early Access List <ChevronRight size={17} />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="featured-dashboard">
            <Dashboard />
          </Reveal>
          <div className="product-caption">
            <span>ONE CONNECTED EXPERIENCE</span>
            <p>
              Workflows. Customers. Schedules. A clearer view of your business.
            </p>
            <Link href="/products">
              Our product philosophy <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section process-section">
        <div className="container">
          <Reveal>
            <Eyebrow>HOW WE THINK</Eyebrow>
            <h2>
              Built around
              <br />
              <span>real business problems.</span>
            </h2>
            <p className="section-description">
              Good software starts with understanding.
              <br />
              Our process keeps the business at the center.
            </p>
          </Reveal>
          <div className="process-grid">
            {processSteps.map((step, i) => (
              <Reveal
                className="process-step"
                key={step.title}
                delay={i * 0.07}
              >
                <div className="process-number">
                  <span>0{i + 1}</span>
                  <i />
                  <ArrowRight size={16} />
                </div>
                <span className="process-label">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <IndustrySection />
      <VisionSection />
      <FinalCTA />
    </main>
  );
}
