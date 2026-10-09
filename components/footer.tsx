import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { site } from "@/content/site";
import { Copyright } from "@/components/copyright";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" aria-label="Polysyne home">
              <Brand />
            </Link>
            <p>
              Building technology.
              <br />
              Opening possibilities.
            </p>
          </div>
          <div className="footer-column">
            <h2>Company</h2>
            <Link href="/about">About Polysyne</Link>
            <Link href="/contact">
              Get in touch <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="footer-column">
            <h2>Products</h2>
            <Link href="/products">Our products</Link>
            <Link href="/products/opero">
              Opero <span className="tiny-status">In development</span>
            </Link>
            <Link href="/products/opero#early-access">Early access</Link>
          </div>
          <div className="footer-column">
            <h2>Stay connected</h2>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            {site.socials.length ? (
              site.socials.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                  <ArrowUpRight size={12} />
                </a>
              ))
            ) : (
              <span className="social-placeholder">
                Social channels coming soon
              </span>
            )}
            <Link href="/contact">
              Start a conversation <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <Copyright />
          <p>Opero is a product of Polysyne.</p>
          <span className="footer-note">
            <span className="status-dot" /> Building what&apos;s next
          </span>
        </div>
      </div>
    </footer>
  );
}
