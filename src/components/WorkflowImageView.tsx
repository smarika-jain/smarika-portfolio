"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccentSeparators } from "@/components/AccentSeparators";

type WorkflowImageViewProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** next/image `sizes` hint for the rendered (non-lightbox) image. */
  sizes: string;
  /** Tailwind max-width class controlling the rendered width tier. */
  maxWidthClass: string;
  /**
   * next/image quality. Technical screenshots (fine 1px lines, small text)
   * need a high value; default 95. NOTE: must be present in
   * `images.qualities` in next.config or Next.js 16 coerces it to 75.
   */
  quality?: number;
  /** Eager-load + high fetch priority. Use for above-the-fold images only. */
  priority?: boolean;
  /** Override the caption styling (e.g. larger text for result galleries). */
  captionClassName?: string;
  /** Override the wrapping <figure> styling (e.g. drop default margins on cards). */
  figureClassName?: string;
};

/**
 * Renders a workflow diagram (via next/image) that opens in a full-size
 * lightbox on click. Escape or a backdrop click closes it; body scroll is
 * locked while open.
 */
export function WorkflowImageView({
  src,
  width,
  height,
  alt,
  caption,
  sizes,
  maxWidthClass,
  quality = 95,
  priority = false,
  captionClassName = "mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted",
  figureClassName = "not-prose my-8",
}: WorkflowImageViewProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <figure className={cn(figureClassName, maxWidthClass)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View full size: ${alt}`}
        className="block w-full cursor-zoom-in overflow-hidden rounded-lg border border-stone-800 transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(249,115,22,0.06)]"
      >
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes={sizes}
          quality={quality}
          priority={priority}
          className="block h-auto w-full"
        />
      </button>

      {caption && (
        <figcaption className={captionClassName}>
          <AccentSeparators text={caption} />
        </figcaption>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-foreground sm:right-6 sm:top-6"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- full-resolution view is intentional */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain"
          />
        </div>
      )}
    </figure>
  );
}
