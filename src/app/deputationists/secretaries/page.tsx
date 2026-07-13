import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TenureTable } from "@/components/deputationists/tenure-table";
import { secretaries } from "@/lib/deputationists-data";

export const metadata: Metadata = {
  title: "Secretaries | BISE Lahore",
  description: "Complete list of Secretaries of BISE Lahore since 1954.",
};

export default function SecretariesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Term of Deputationists"
        title="Secretaries"
        description="Every Secretary who has served the Board of Intermediate & Secondary Education, Lahore, since 1954."
        breadcrumbs={[{ label: "Term of Deputationists" }, { label: "Secretaries" }]}
      />
      <Section>
        <TenureTable rows={secretaries} />
      </Section>
    </>
  );
}
