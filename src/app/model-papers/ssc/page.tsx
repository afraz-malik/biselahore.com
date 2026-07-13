import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { DownloadList } from "@/components/downloads/download-list";
import { sscModelPapers } from "@/lib/model-papers-data";

export const metadata: Metadata = {
  title: "Matric Model Papers | BISE Lahore",
  description: "Model papers for SSC (Matric) 9th and 10th class.",
};

export default function SscModelPapersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Model Papers"
        title="Matric Model Papers"
        description="Sample papers for SSC 9th and 10th class."
        breadcrumbs={[{ label: "Model Papers — Matric" }]}
      />
      <Section>
        <DownloadList items={sscModelPapers} />
      </Section>
    </>
  );
}
