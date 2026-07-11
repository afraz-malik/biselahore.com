import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { relatedBoards, relatedOrganizations, type NavLinkLike } from "@/lib/home-data";

function LinkList({ title, links }: { title: string; links: NavLinkLike[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-muted-foreground">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary"
            >
              {link.label}
              <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RelatedLinks() {
  return (
    <Section background="subtle">
      <SectionHeading eyebrow="Reference" title="Related Links" />
      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <LinkList title="Other Education Boards" links={relatedBoards} />
        <LinkList title="Government & Partner Organizations" links={relatedOrganizations} />
      </div>
    </Section>
  );
}
