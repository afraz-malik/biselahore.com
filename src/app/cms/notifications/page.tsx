import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { notifications } from "@/lib/db/schema";
import { CreateNotificationForm } from "./form";
import { NotificationsList } from "./list";

export default async function NotificationsAdminPage() {
  const rows = await db.select().from(notifications).orderBy(asc(notifications.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Notifications</h1>
          <p className="text-sm text-muted-foreground">{rows.length} total. Public archive at /notifications.</p>
        </div>
        <CreateNotificationForm nextSortOrder={rows.length} />
      </div>

      <NotificationsList rows={rows} />
    </div>
  );
}
