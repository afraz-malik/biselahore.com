import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { DownloadList } from "@/components/downloads/download-list";
import { getPublishedModelPapers } from "@/lib/db/queries/model-papers";

export const metadata: Metadata = {
  title: "Intermediate Model Papers | BISE Lahore",
  description: "Model papers for HSSC (Intermediate) 11th and 12th class, including practicals.",
};

export default async function HsscModelPapersPage() {
  const hsscModelPapers = await getPublishedModelPapers("hssc");

  return (
    <>
      <PageHeader
        eyebrow="Model Papers"
        title="Intermediate Model Papers"
        description="Sample papers for HSSC 11th and 12th class, including practicals."
        breadcrumbs={[{ label: "Model Papers — Intermediate" }]}
      />
      <Section>
        <DownloadList items={hsscModelPapers} />
      </Section>
    </>
  );
}
