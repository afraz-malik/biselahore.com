import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { DownloadList } from "@/components/downloads/download-list";
import { downloadForms } from "@/lib/downloads-data";

export const metadata: Metadata = {
  title: "Downloads | BISE Lahore",
  description: "Forms for corrections, migrations, examination duties, and affiliation — all in one place.",
};

export default function DownloadsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Downloads"
        description="Forms for record corrections, migrations, examination duties, and affiliation."
        breadcrumbs={[{ label: "Downloads" }]}
      />
      <Section>
        <DownloadList items={downloadForms} />
      </Section>
    </>
  );
}
