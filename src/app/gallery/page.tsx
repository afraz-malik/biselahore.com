import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { galleryAlbums } from "@/lib/gallery-data";

export const metadata: Metadata = {
  title: "Photo Gallery | BISE Lahore",
  description: "Photos from BISE Lahore events, ceremonies, and board activities.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media"
        title="Photo Gallery"
        description="A look at events, ceremonies, and activities from across the Board."
        breadcrumbs={[{ label: "Photo Gallery" }]}
      />

      {galleryAlbums.map((album, i) => (
        <Section key={album.id} background={i % 2 === 0 ? "default" : "subtle"}>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">{album.title}</h2>
            <p className="text-sm text-muted-foreground">
              {new Date(album.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <GalleryGrid album={album} />
        </Section>
      ))}
    </>
  );
}
