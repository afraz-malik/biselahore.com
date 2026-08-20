import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { DownloadList } from "@/components/downloads/download-list";
import { getPublishedTenders } from "@/lib/db/queries/tenders";

export const metadata: Metadata = {
  title: "Tenders | BISE Lahore",
  description: "Current procurement tender notices from BISE Lahore.",
};

export default async function TendersPage() {
  const tenderNotices = await getPublishedTenders();

  return (
    <>
      <PageHeader
        eyebrow="Procurement"
        title="Tenders"
        description="Current procurement and framework-contract tender notices."
        breadcrumbs={[{ label: "Tenders" }]}
      />
      <Section>
        {tenderNotices.length > 0 ? (
          <DownloadList items={tenderNotices} />
        ) : (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Currently no tender available.
          </p>
        )}
      </Section>
    </>
  );
}
