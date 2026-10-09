import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icons";
import { BrandMark, OperoMark } from "@/components/brand";
import { industries } from "@/content/site";

export function Eyebrow({
  children,
  dot = false,
}: {
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <p className="eyebrow">
      {dot && <span className="status-dot" />}
      {children}
    </p>
  );
}

export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <Reveal className="cta-inner">
          <div>
            <Eyebrow>A CONVERSATION CAN CHANGE EVERYTHING</Eyebrow>
            <h2>
              Let&apos;s build a<br />
              <span>smarter way forward.</span>
            </h2>
            <p>
              Interested in Opero, exploring a partnership, or looking to
              connect with Polysyne? We&apos;d love to hear from you.
            </p>
          </div>
          <div className="cta-actions">
            <Button asChild>
              <Link href="/products/opero">
                Explore Opero <ArrowUpRight size={17} />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact">
                Contact Polysyne <ArrowRight size={17} />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function IndustrySection({ product = false }: { product?: boolean }) {
  return (
    <section className="section industries-section">
      <div className="container">
        <Reveal>
          <div className="section-intro">
            <div>
              <Eyebrow>ROOM FOR DIFFERENT WAYS OF WORKING</Eyebrow>
              <h2>
                Different industries.
                <br />
                <span>
                  A shared need for
                  <br className="desktop-only" /> better operations.
                </span>
              </h2>
            </div>
            <p>
              {product
                ? "The platform will evolve through customer research, validated needs, and modular capability development. These are possible future experiences."
                : "Every business has its own rhythm. We're exploring how adaptable technology can support a wide range of operational needs."}
            </p>
          </div>
        </Reveal>
        <div className="industry-grid">
          {industries.map((industry, i) => (
            <Reveal
              className="industry-item"
              key={industry.name}
              delay={i * 0.025}
            >
              <Icon name={industry.icon} />
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
            </Reveal>
          ))}
        </div>
        <p className="section-footnote">
          <span className="status-dot" /> Target sectors and future
          opportunities. Industry-specific support is being explored.
        </p>
      </div>
    </section>
  );
}

export function PlatformDiagram() {
  return (
    <div className="platform-diagram">
      <div className="platform-orgs">
        {[
          { label: "A service business", key: "A", color: "indigo" },
          { label: "A creative agency", key: "B", color: "cyan" },
          { label: "A growing SME", key: "C", color: "gray" },
        ].map((org) => (
          <div className={`platform-org ${org.color}`} key={org.key}>
            <span>{org.key}</span>
            <h3>{org.label}</h3>
            <p>Own workspace & configuration</p>
            <div className="org-diagram-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
        ))}
      </div>
      <div className="platform-connectors" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="platform-foundation">
        <div>
          <OperoMark />
          <strong>opero</strong>
        </div>
        <span>One shared platform foundation</span>
        <div className="platform-capabilities">
          <span>Workflows</span>
          <span>Customers</span>
          <span>Scheduling</span>
        </div>
      </div>
      <p className="section-footnote">
        Conceptual architecture. Intended separation and access controls are
        under development.
      </p>
    </div>
  );
}

export function VisionSection() {
  return (
    <section className="vision-section">
      <div className="vision-glow" />
      <div className="container">
        <Reveal>
          <BrandMark className="vision-mark" />
          <Eyebrow>OUR AMBITION, IN A FEW WORDS</Eyebrow>
          <h2>
            We&apos;re not just
            <br />
            building software.
            <br />
            <span>
              We&apos;re building better
              <br />
              ways to work.
            </span>
          </h2>
          <p>
            Polysyne exists to make capable technology more accessible to
            businesses, helping them focus less on managing disconnected
            processes and more on what matters most.
          </p>
          <Link className="text-link" href="/about">
            The thinking behind Polysyne <ArrowUpRight size={17} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
