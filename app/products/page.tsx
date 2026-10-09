import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { products } from "@/content/site";
import { Dashboard } from "@/components/dashboard";
import { OperoMark } from "@/components/brand";
import { Eyebrow, FinalCTA } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Our products",
  "Purposeful technology for evolving businesses. Explore Opero, Polysyne's flagship business operations platform in development.",
  "/products",
);
export default function Products() {
  return (
    <main id="main">
      <section className="page-hero container">
        <Reveal>
          <Eyebrow dot>THE POLYSYNE PRODUCT PORTFOLIO</Eyebrow>
          <h1>
            Products built to
            <br />
            <span>move businesses forward.</span>
          </h1>
          <p>
            We create purposeful technology that addresses operational
            challenges and helps businesses adapt, grow, and succeed.
          </p>
        </Reveal>
        <div className="page-hero-meta">
          <span>THOUGHTFUL SOFTWARE. REAL POSSIBILITIES.</span>
          <span>01 / OUR PRODUCTS</span>
        </div>
      </section>
      <section className="product-portfolio section">
        <div className="container">
          {products.map((product) => (
            <article className="portfolio-product" key={product.slug}>
              <Reveal className="portfolio-product-copy">
                <Eyebrow>OUR FLAGSHIP PRODUCT</Eyebrow>
                <div className="product-name">
                  <OperoMark />
                  <span>{product.name.toLowerCase()}</span>
                </div>
                <span className="development-badge">
                  <span className="status-dot" />
                  {product.status}
                </span>
                <h2>{product.category}</h2>
                <p>{product.description}</p>
                <Button asChild>
                  <Link href={`/products/${product.slug}`}>
                    Explore {product.name} <ArrowUpRight size={17} />
                  </Link>
                </Button>
                <p className="portfolio-note">
                  Actively being developed.
                  <br />
                  Shaped by real business needs.
                </p>
              </Reveal>
              <Reveal className="portfolio-preview">
                <Dashboard compact />
              </Reveal>
            </article>
          ))}
          <Reveal className="portfolio-outlook">
            <div>
              <Eyebrow>ONE PRODUCT IS JUST THE BEGINNING</Eyebrow>
              <h2>
                A foundation for
                <br />
                <span>what comes next.</span>
              </h2>
            </div>
            <div>
              <p>
                Our long-term ambition is a growing portfolio of business
                technology. We start by understanding the work, building
                carefully, and making every product earn its place.
              </p>
              <Link href="/about" className="text-link">
                Meet the company behind the products <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
