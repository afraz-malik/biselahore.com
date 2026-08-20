import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import type { NavLinkLike } from "@/lib/home-data";
import { getPublishedRelatedLinks } from "@/lib/db/queries/home";

function LinkList({ title, links }: { title: string; links: NavLinkLike[] }) {
  return (
    <div>
      <p className="text-base font-semibold text-muted-foreground">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-base text-foreground/80 hover:text-primary"
            >
              {link.label}
              <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function RelatedLinks() {
  const { boards, organizations } = await getPublishedRelatedLinks();

  return (
    <Section background="subtle">
      <SectionHeading eyebrow="Reference" title="Related Links" />
      <div className="mt-12 grid gap-12 sm:grid-cols-2">
        <LinkList title="Other Education Boards" links={boards} />
        <LinkList title="Government & Partner Organizations" links={organizations} />
      </div>
    </Section>
  );
}
