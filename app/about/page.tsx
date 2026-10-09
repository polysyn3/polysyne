import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Eyebrow, FinalCTA } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { SystemArt } from "@/components/system-art";
import { BrandMark } from "@/components/brand";
import { site, values } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About Polysyne",
  "An early-stage technology company turning meaningful business problems into practical, adaptable software systems.",
  "/about",
);
export default function About() {
  return (
    <main id="main">
      <section className="page-hero about-hero container">
        <Reveal>
          <Eyebrow dot>INDEPENDENT THINKING. CONNECTED SYSTEMS.</Eyebrow>
          <h1>
            Ideas into systems.
            <br />
            <span>Systems into progress.</span>
          </h1>
          <p>
            Polysyne is a technology company focused on developing practical,
            adaptable software solutions that solve meaningful business
            problems.
          </p>
        </Reveal>
        <div className="page-hero-meta">
          <span>A COMPANY BUILT WITH PURPOSE</span>
          <span>02 / ABOUT POLYSYNE</span>
        </div>
      </section>
      <section className="section story-section">
        <div className="container story-layout">
          <Reveal>
            <Eyebrow>OUR STORY</Eyebrow>
            <h2>
              Big ambitions.
              <br />
              <span>Thoughtful beginnings.</span>
            </h2>
            <p>
              Polysyne is an early-stage technology company with a clear belief:
              the tools businesses depend on should help them move forward.
            </p>
            <p>
              We&apos;re focused on transforming complex business challenges
              into intuitive software experiences. That means understanding the
              everyday work before designing the system around it.
            </p>
            <p>
              Our first product, Opero, is the beginning of that journey.
              We&apos;re developing a connected platform for business operations
              while establishing the engineering foundations for a broader
              portfolio of purposeful technology.
            </p>
            <Link className="text-link" href="/products">
              Explore what we&apos;re building <ArrowUpRight size={17} />
            </Link>
          </Reveal>
          <SystemArt compact />
        </div>
      </section>
      <section className="section mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <Reveal>
              <Eyebrow>OUR MISSION</Eyebrow>
              <h2>
                Empower
                <br />
                <span>the everyday.</span>
              </h2>
              <p>
                To build accessible, reliable, and scalable digital solutions
                that empower businesses to operate more effectively.
              </p>
            </Reveal>
            <Reveal>
              <Eyebrow>OUR VISION</Eyebrow>
              <h2>
                More possibilities.
                <br />
                <span>For more businesses.</span>
              </h2>
              <p>
                To help shape a future where businesses of different sizes can
                access technology that adapts to their needs and supports their
                growth.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section values-section">
        <div className="container values-layout">
          <Reveal className="values-intro">
            <BrandMark />
            <Eyebrow>WHAT GUIDES US</Eyebrow>
            <h2>
              Principles that
              <br />
              <span>outlast the product.</span>
            </h2>
            <p>The way we work matters just as much as what we build.</p>
          </Reveal>
          <div className="values-list">
            {values.map((value, i) => (
              <Reveal key={value.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {site.leadership && (
        <section className="section leadership-section">
          <div className="container">
            <Eyebrow>LEADERSHIP</Eyebrow>
            <h2>{site.leadership.name}</h2>
            <p>{site.leadership.role}</p>
            <p>{site.leadership.biography}</p>
          </div>
        </section>
      )}
      <FinalCTA />
    </main>
  );
}
