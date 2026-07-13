import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TenureTable } from "@/components/deputationists/tenure-table";
import { chairmen } from "@/lib/deputationists-data";

export const metadata: Metadata = {
  title: "Chairmen | BISE Lahore",
  description: "Complete list of Chairmen of BISE Lahore since 1955.",
};

export default function ChairmenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Term of Deputationists"
        title="Chairmen"
        description="Every Chairman who has led the Board of Intermediate & Secondary Education, Lahore, since its establishment in 1955."
        breadcrumbs={[{ label: "Term of Deputationists" }, { label: "Chairmen" }]}
      />
      <Section>
        <TenureTable rows={chairmen} />
      </Section>
    </>
  );
}
