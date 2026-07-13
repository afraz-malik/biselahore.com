import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { latestEvent } from "@/lib/events-data";

export const metadata: Metadata = {
  title: "Latest Events | BISE Lahore",
  description: latestEvent.description,
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Latest Events"
        title={latestEvent.title}
        description={latestEvent.description}
        breadcrumbs={[{ label: "Latest Events" }]}
      />
      <Section>
        <GalleryGrid album={latestEvent.album} />
      </Section>
    </>
  );
}
