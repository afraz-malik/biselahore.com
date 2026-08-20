import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { faqs } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { CreateFaqForm, EditFaqForm } from "./form";
import { deleteFaq, toggleFaqPublished, reorderFaq } from "./actions";

export default async function FaqsAdminPage() {
  const rows = await db.select().from(faqs).orderBy(asc(faqs.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">FAQs</h1>
          <p className="text-sm text-muted-foreground">Frequently asked questions at /faqs.</p>
        </div>
        <CreateFaqForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No FAQs yet."
        columns={[{ header: "Question", render: (row) => row.question }]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderFaq} />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleFaqPublished} />
            <EditFaqForm id={row.id} values={{ question: row.question, answer: row.answer, sortOrder: row.sortOrder, isPublished: row.isPublished }} />
            <DeleteButton id={row.id} label="this FAQ" action={deleteFaq} />
          </div>
        )}
      />
    </div>
  );
}
