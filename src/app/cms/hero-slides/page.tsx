import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { heroSlides } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { CreateHeroSlideForm, EditHeroSlideForm } from "./form";
import { deleteHeroSlide, toggleHeroSlidePublished, reorderHeroSlide } from "./actions";

export default async function HeroSlidesPage() {
  const rows = await db.select().from(heroSlides).orderBy(asc(heroSlides.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Hero Slides</h1>
          <p className="text-sm text-muted-foreground">Homepage hero carousel.</p>
        </div>
        <CreateHeroSlideForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No hero slides yet."
        columns={[
          { header: "Title", render: (row) => row.title },
          { header: "Eyebrow", render: (row) => <span className="text-muted-foreground">{row.eyebrow}</span> },
          { header: "Image", render: (row) => <span className="text-muted-foreground">{row.backgroundImage}</span> },
        ]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderHeroSlide} />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleHeroSlidePublished} />
            <EditHeroSlideForm
              id={row.id}
              values={{
                eyebrow: row.eyebrow,
                title: row.title,
                description: row.description,
                backgroundImage: row.backgroundImage,
                imageAlt: row.imageAlt,
                primaryCtaLabel: row.primaryCtaLabel,
                primaryCtaHref: row.primaryCtaHref,
                secondaryCtaLabel: row.secondaryCtaLabel ?? undefined,
                secondaryCtaHref: row.secondaryCtaHref ?? undefined,
                sortOrder: row.sortOrder,
                isPublished: row.isPublished,
              }}
            />
            <DeleteButton id={row.id} label={row.title} action={deleteHeroSlide} />
          </div>
        )}
      />
    </div>
  );
}
