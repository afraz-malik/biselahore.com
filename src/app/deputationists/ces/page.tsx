import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TenureTable } from "@/components/deputationists/tenure-table";
import { controllers } from "@/lib/deputationists-data";

export const metadata: Metadata = {
  title: "Controllers of Examination | BISE Lahore",
  description: "Complete list of Controllers of Examination (CEs) of BISE Lahore since 1958.",
};

export default function ControllersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Term of Deputationists"
        title="Controllers of Examination"
        description="Every Controller of Examination (CE) who has served the Board of Intermediate & Secondary Education, Lahore, since 1958."
        breadcrumbs={[{ label: "Term of Deputationists" }, { label: "CEs" }]}
      />
      <Section>
        <TenureTable rows={controllers} />
      </Section>
    </>
  );
}
