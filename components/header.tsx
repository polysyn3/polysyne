"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { navigation } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => dialog.current?.close();
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link
          href="/"
          className="brand-link"
          aria-label="Polysyne home"
          onClick={close}
        >
          <Brand />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
              {item.label === "Products" && (
                <ChevronDown size={12} aria-hidden="true" />
              )}
            </Link>
          ))}
        </nav>
        <Button asChild variant="light" size="small" className="nav-cta">
          <Link href="/products/opero">
            Explore Opero <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </Button>
        <button
          ref={trigger}
          className="menu-trigger"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          aria-controls="mobile-navigation"
          onClick={() => dialog.current?.showModal()}
        >
          <Menu size={23} />
        </button>
        <dialog
          ref={dialog}
          id="mobile-navigation"
          className="mobile-dialog"
          aria-label="Mobile navigation"
          onClose={() => trigger.current?.focus()}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const focusable = Array.from(
              event.currentTarget.querySelectorAll<HTMLElement>(
                "a[href], button:not([disabled])",
              ),
            ).filter((element) => element.getClientRects().length > 0);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="mobile-nav-panel">
            <div className="mobile-nav-top">
              <Brand />
              <button
                className="icon-button"
                aria-label="Close navigation"
                onClick={close}
              >
                <X size={24} />
              </button>
            </div>
            <nav aria-label="Mobile main navigation">
              {[{ label: "Home", href: "/" }, ...navigation].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                  <ArrowUpRight size={20} />
                </Link>
              ))}
            </nav>
            <Button asChild>
              <Link href="/products/opero" onClick={close}>
                Explore Opero <ArrowUpRight size={17} />
              </Link>
            </Button>
            <p>
              Independent thinking.
              <br />
              Connected systems.
            </p>
          </div>
        </dialog>
      </div>
    </header>
  );
}
