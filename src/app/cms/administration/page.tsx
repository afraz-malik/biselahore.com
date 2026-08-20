import { db } from "@/lib/db/client";
import { officials } from "@/lib/db/schema";
import { EditOfficialForm } from "./form";

const roleLabels: Record<string, string> = {
  chairman: "Chairman",
  secretary: "Secretary",
  controller: "Controller of Examinations",
};

export default async function AdministrationAdminPage() {
  const rows = await db.select().from(officials).all();
  const byRole = new Map(rows.map((r) => [r.roleSlug, r]));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Administration</h1>
        <p className="text-sm text-muted-foreground">
          Fixed profiles for Chairman, Secretary, and Controller of Examinations. No create/delete — edit only.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(["chairman", "secretary", "controller"] as const).map((role) => {
          const row = byRole.get(role);
          if (!row) {
            return (
              <div key={role} className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                {roleLabels[role]}: not seeded.
              </div>
            );
          }
          return (
            <div key={role} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{roleLabels[role]}</p>
                <p className="mt-1 text-base font-semibold">{row.name}</p>
                <p className="text-sm text-muted-foreground">{row.email}</p>
              </div>
              <EditOfficialForm
                id={row.id}
                values={{
                  roleSlug: row.roleSlug,
                  name: row.name,
                  title: row.title,
                  appointment: row.appointment,
                  imageSrc: row.imageSrc,
                  email: row.email,
                  phone: row.phone,
                  messageParagraphs: row.messageParagraphs,
                  breadcrumbLabel: row.breadcrumbLabel,
                  isPublished: row.isPublished,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
