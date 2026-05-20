import type { Testimonial } from "@/lib/testimonials";

/**
 * Testimonial card. Elevated warm tone matching the featured project card,
 * with a faint top-right glow (lower opacity than the featured card), a large
 * accent quote mark, the quote in muted off-white, and attribution at the
 * bottom. Renders cleanly whether or not an avatar is provided.
 */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, name, role, company, avatar } = testimonial;

  return (
    <figure className="group/t relative flex h-full flex-col overflow-hidden rounded-lg border border-stone-800 bg-[#1a140d] p-8 transition-colors duration-200 hover:border-[rgba(249,115,22,0.3)]">
      {/* Faint warm corner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-[280px] w-[280px] bg-[radial-gradient(circle,rgba(249,115,22,0.05),transparent_60%)]"
      />

      <div className="relative flex flex-1 flex-col">
        <span
          aria-hidden="true"
          className="font-mono text-4xl leading-none text-accent"
        >
          &ldquo;
        </span>

        <blockquote className="mt-4 flex-1 text-base leading-relaxed text-stone-300">
          {quote}
        </blockquote>

        <figcaption className="mt-6">
          {avatar && (
            // eslint-disable-next-line @next/next/no-img-element -- small optional avatar, no optimization needed
            <img
              src={avatar}
              alt={name}
              width={40}
              height={40}
              className="mb-3 h-10 w-10 rounded-full border border-stone-800 object-cover"
            />
          )}
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="mt-1 font-mono text-xs text-muted">
            {role} <span className="text-accent">·</span> {company}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}
