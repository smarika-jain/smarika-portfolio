import { site, navLinks } from "@/lib/site";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";

// Mono nav link with a warm underline that grows from the left on hover.
const footerLinkClass =
  "group/flink relative font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-800">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Middle row: brand + nav */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-800 font-mono text-xs font-medium text-foreground">
                {site.monogram}
              </span>
              <span className="text-sm font-medium tracking-tight text-foreground">
                {site.name}
              </span>
            </div>
            <p className="mt-3 font-mono text-xs text-muted">
              GTM Engineer. I make outbound run itself.
            </p>
          </div>

          <nav aria-label="Footer" className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={footerLinkClass}>
                {link.label}
              </a>
            ))}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on LinkedIn`}
              className="inline-flex h-7 w-7 items-center justify-center rounded text-muted transition-colors hover:text-accent"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </nav>
        </div>

        {/* Bottom row: copyright + credit */}
        <div className="mt-12 flex flex-col gap-2 border-t border-stone-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
            © {year} {site.name}
          </p>
          <p className="font-mono text-xs text-muted">
            Built with Next.js. Deployed on Vercel.
          </p>
        </div>
      </div>
    </footer>
  );
}
