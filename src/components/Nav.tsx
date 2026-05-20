"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/site";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { StatusDot } from "@/components/StatusDot";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border-subtle"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <div className="flex items-center gap-2.5">
          <StatusDot />
          <Link
            href="/"
            className="text-sm font-medium tracking-tight text-foreground"
            aria-label={`${site.name}, home`}
          >
            <span className="sm:hidden">{site.monogram}</span>
            <span className="hidden sm:inline">{site.name}</span>
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center gap-4 sm:gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on LinkedIn`}
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded text-muted transition-colors hover:text-accent"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
