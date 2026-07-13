import type { Metadata } from "next";
import { Mail, Phone, Globe, ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Complaints | BISE Lahore",
  description: "How to lodge a complaint with BISE Lahore — by phone, email, or the online portal.",
};

const methods = [
  {
    icon: Phone,
    title: "Land Line",
    description: "Phone Numbers: +92 42 99200192-197",
  },
  {
    icon: Mail,
    title: "E-Mail",
    description: "complaint@biselahore.com",
    href: "mailto:complaint@biselahore.com",
  },
  {
    icon: Globe,
    title: "Online Portal",
    description: "Lodge your complaint directly through our online portal.",
    href: "http://complaints.biselahore.com",
  },
];

export default function ComplaintsPage() {
  return (
    <>
      <PageHeader
        eyebrow="We're Listening"
        title="Complaints"
        description="How to lodge a complaint with the Board."
        breadcrumbs={[{ label: "Complaints" }]}
      />
      <Section>
        <SectionHeading eyebrow="Process" title="How to lodge a complaint?" description="Complaint can be lodged via three different ways as given below." />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {methods.map((method) => {
            const Icon = method.icon;
            const content = (
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/30">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="size-5" />
                </span>
                <p className="text-sm font-semibold">{method.title}</p>
                <p className="text-sm text-muted-foreground text-pretty">{method.description}</p>
              </div>
            );
            return method.href ? (
              <a key={method.title} href={method.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={method.title}>{content}</div>
            );
          })}
        </div>

        <Button
          size="lg"
          className="mt-10"
          nativeButton={false}
          render={<a href="http://complaints.biselahore.com/viewreply.aspx" target="_blank" rel="noopener noreferrer" />}
        >
          Check Complaint Status
          <ArrowRight />
        </Button>
      </Section>
    </>
  );
}
