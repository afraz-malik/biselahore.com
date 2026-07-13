import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import {
  relatedBoards,
  relatedOrganizations,
  activeSystems,
  quickServiceCards,
} from "@/lib/home-data";

export const metadata: Metadata = {
  title: "Sitemap | BISE Lahore",
  description: "A complete index of every page and service on the BISE Lahore website.",
};

interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

const siteGroups: { heading: string; links: LinkItem[] }[] = [
  {
    heading: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Downloads", href: "/downloads" },
      { label: "Notifications", href: "/notifications" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    heading: "Term of Deputationists",
    links: [
      { label: "Chairmen", href: "/deputationists/chairmen" },
      { label: "Secretaries", href: "/deputationists/secretaries" },
      { label: "CEs", href: "/deputationists/ces" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Complaints", href: "/complaints" },
      { label: "RTI (Proactive Disclosure)", href: "/rti" },
      { label: "Careers", href: "/careers" },
      { label: "Tenders", href: "/tenders" },
      { label: "Result Statistics", href: "/result-statistics" },
      { label: "Model Papers — Matric", href: "/model-papers/ssc" },
      { label: "Model Papers — Intermediate", href: "/model-papers/hssc" },
    ],
  },
  {
    heading: "Media",
    links: [
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Latest Events", href: "/events" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Site Index"
        title="Sitemap"
        description="Every page and service on the BISE Lahore website, in one place."
        breadcrumbs={[{ label: "Sitemap" }]}
      />

      <Section>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {siteGroups.map((group) => (
            <div key={group.heading}>
              <p className="text-sm font-semibold text-muted-foreground">{group.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-foreground/80 hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section background="subtle">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">E-Services</p>
            <ul className="mt-4 space-y-2.5">
              {quickServiceCards.map((service) => (
                <li key={service.title}>
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary"
                  >
                    {service.title}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Online / Active Systems</p>
            <ul className="mt-4 space-y-2.5">
              {activeSystems.map((system) => (
                <li key={system.title + system.href}>
                  <a
                    href={system.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary"
                  >
                    {system.title}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Other Education Boards</p>
            <ul className="mt-4 space-y-2.5">
              {relatedBoards.map((link) => (
                <li key={link.href}>
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
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Government & Partner Organizations</p>
            <ul className="mt-4 space-y-2.5">
              {relatedOrganizations.map((link) => (
                <li key={link.href}>
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
        </div>
      </Section>
    </>
  );
}
