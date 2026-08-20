import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { DownloadList } from "@/components/downloads/download-list";
import { getPublishedDownloads } from "@/lib/db/queries/downloads";

export const metadata: Metadata = {
  title: "Downloads | BISE Lahore",
  description: "Forms for corrections, migrations, examination duties, and affiliation — all in one place.",
};

export default async function DownloadsPage() {
  const items = await getPublishedDownloads();

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Downloads"
        description="Forms for record corrections, migrations, examination duties, and affiliation."
        breadcrumbs={[{ label: "Downloads" }]}
      />
      <Section>
        <DownloadList items={items} />
      </Section>
    </>
  );
}
