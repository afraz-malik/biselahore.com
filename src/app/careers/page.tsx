import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { DownloadList } from "@/components/downloads/download-list";

export const metadata: Metadata = {
  title: "Careers | BISE Lahore",
  description: "Current job openings and application forms at BISE Lahore.",
};

const openings = [
  { title: "Applications required for Secrecy Officers (Temporary Basis)", href: "/downloads/careers/Advt._SOs_Matric.pdf" },
  { title: "Applications Form for Secrecy Officers (Temporary Basis)", href: "/downloads/careers/SO_Matric_Form.pdf" },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join Us"
        title="Careers"
        description="Current job openings and application forms at BISE Lahore."
        breadcrumbs={[{ label: "Careers" }]}
      />
      <Section>
        {openings.length > 0 ? (
          <DownloadList items={openings} />
        ) : (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Currently no jobs available.
          </p>
        )}
      </Section>
    </>
  );
}
