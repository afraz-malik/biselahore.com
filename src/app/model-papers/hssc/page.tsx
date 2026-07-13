import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { DownloadList } from "@/components/downloads/download-list";
import { hsscModelPapers } from "@/lib/model-papers-data";

export const metadata: Metadata = {
  title: "Intermediate Model Papers | BISE Lahore",
  description: "Model papers for HSSC (Intermediate) 11th and 12th class, including practicals.",
};

export default function HsscModelPapersPage() {
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
