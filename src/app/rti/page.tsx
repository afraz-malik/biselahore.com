import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { rtiItems } from "@/lib/rti-data";

export const metadata: Metadata = {
  title: "RTI (Proactive Disclosure) | BISE Lahore",
  description: "Statutory proactive disclosure of information under the Right to Information framework.",
};

export default function RtiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Transparency"
        title="RTI (Proactive Disclosure)"
        description="Statutory information disclosed proactively by the Board under the Right to Information framework."
        breadcrumbs={[{ label: "RTI" }]}
      />
      <Section>
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="divide-y divide-border">
            {rtiItems.map((item) => {
              const content = (
                <>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-primary">
                    {item.label}
                  </span>
                  <span className="flex-1 text-sm text-pretty">{item.description}</span>
                  {item.notApplicable ? (
                    <Badge variant="destructive" className="shrink-0">
                      Not Applicable
                    </Badge>
                  ) : (
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                </>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-card px-5 py-4 transition-colors hover:bg-accent/40"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="flex items-center gap-4 bg-card px-5 py-4">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
