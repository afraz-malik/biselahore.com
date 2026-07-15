import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/container";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
}

/**
 * Dark "brand" banner used at the top of every inner page — mirrors the
 * BiseAtAGlance section's surface-brand treatment so the whole site shares
 * one hero language beyond the homepage's slider.
 */
export function PageHeader({ eyebrow, title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-surface-brand py-16 text-surface-brand-foreground md:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,oklch(0.6_0.14_241_/_0.45)_0%,transparent_60%),radial-gradient(55%_60%_at_100%_100%,oklch(0.7_0.12_220_/_0.3)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[48px_48px] opacity-[0.04]" />
      </div>

      <Container>
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-surface-brand-foreground/60">
            <Link href="/" className="hover:text-surface-brand-foreground">
              Home
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-surface-brand-foreground">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-surface-brand-foreground">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        {eyebrow ? (
          <p className="text-sm font-semibold tracking-[0.08em] text-primary-foreground/70 uppercase [color:oklch(0.75_0.14_163)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-surface-brand-foreground/75 text-pretty">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
