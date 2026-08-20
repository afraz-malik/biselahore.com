import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { contactOfficials, generalInquiry } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { CreateContactOfficialForm, EditContactOfficialForm, EditGeneralInquiryForm } from "./form";
import { deleteContactOfficial, toggleContactOfficialPublished, reorderContactOfficial } from "./actions";

export default async function ContactAdminPage() {
  const rows = await db.select().from(contactOfficials).orderBy(asc(contactOfficials.sortOrder)).all();
  const inquiry = await db.select().from(generalInquiry).get();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold">Contact</h1>
        <p className="text-sm text-muted-foreground">Officials list &amp; general inquiry block on /contact.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">Officials</h2>
          <CreateContactOfficialForm nextSortOrder={rows.length} />
        </div>
        <AdminTable
          rows={rows}
          emptyMessage="No contacts yet."
          columns={[
            { header: "Role", render: (row) => row.role },
            { header: "Name", render: (row) => row.name },
            { header: "Email", render: (row) => <span className="text-muted-foreground">{row.email}</span> },
          ]}
          actions={(row, index) => (
            <div className="flex items-center justify-end gap-1">
              <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderContactOfficial} />
              <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleContactOfficialPublished} />
              <EditContactOfficialForm
                id={row.id}
                values={{
                  role: row.role,
                  name: row.name,
                  photo: row.photo ?? undefined,
                  phone: row.phone,
                  fax: row.fax ?? undefined,
                  email: row.email,
                  sortOrder: row.sortOrder,
                  isPublished: row.isPublished,
                }}
              />
              <DeleteButton id={row.id} label={row.name} action={deleteContactOfficial} />
            </div>
          )}
        />
      </div>

      {inquiry ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase">General Inquiry</h2>
            <EditGeneralInquiryForm
              id={inquiry.id}
              values={{ phone: inquiry.phone, portalLabel: inquiry.portalLabel, portalHref: inquiry.portalHref }}
            />
          </div>
          <p className="text-sm">{inquiry.phone}</p>
          <p className="text-sm text-muted-foreground">
            {inquiry.portalLabel} — {inquiry.portalHref}
          </p>
        </div>
      ) : null}
    </div>
  );
}
