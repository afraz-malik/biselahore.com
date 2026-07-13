import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, Printer, User } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { MapSection } from "@/components/home/map-section";
import { contactOfficials, generalInquiry } from "@/lib/contact-data";

export const metadata: Metadata = {
  title: "Contact Us | BISE Lahore",
  description: "General inquiries and direct contact details for the Chairman, Secretary, and Controller of Examination at BISE Lahore.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Reach the Board directly, or contact the office of the Chairman, Secretary, or Controller of Examination."
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <Section>
        <SectionHeading eyebrow="General" title="General Inquiry" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <Phone className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm font-medium">{generalInquiry.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <Printer className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Fax</p>
              <p className="text-sm font-medium">{generalInquiry.fax}</p>
            </div>
          </div>
          <a
            href={generalInquiry.portalHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 hover:bg-accent/40"
          >
            <Mail className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Inquiry Portal</p>
              <p className="text-sm font-medium text-primary">{generalInquiry.portalLabel}</p>
            </div>
          </a>
        </div>
      </Section>

      <Section background="subtle">
        <SectionHeading eyebrow="Leadership" title="Direct Contacts" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactOfficials.map((official) => (
            <div
              key={official.role}
              className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
            >
              {official.photo ? (
                <Image
                  src={official.photo}
                  alt={official.name}
                  width={96}
                  height={96}
                  className="size-24 rounded-full object-cover ring-2 ring-border"
                />
              ) : (
                <span className="flex size-24 items-center justify-center rounded-full bg-accent text-primary ring-2 ring-border">
                  <User className="size-9" />
                </span>
              )}
              <div>
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  {official.role}
                </p>
                <p className="mt-1 text-lg font-semibold">{official.name}</p>
              </div>
              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <span className="flex items-center justify-center gap-2">
                  <Phone className="size-3.5" /> {official.phone}
                </span>
                {official.fax ? (
                  <span className="flex items-center justify-center gap-2">
                    <Printer className="size-3.5" /> {official.fax}
                  </span>
                ) : null}
                <a
                  href={`mailto:${official.email}`}
                  className="flex items-center justify-center gap-2 hover:text-primary"
                >
                  <Mail className="size-3.5" /> {official.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <MapSection />
    </>
  );
}
