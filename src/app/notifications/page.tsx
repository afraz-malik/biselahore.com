import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { NotificationBrowser } from "@/components/notifications/notification-browser";
import { allNotifications } from "@/lib/notifications-data";

export const metadata: Metadata = {
  title: "Notifications | BISE Lahore",
  description: "All notifications, date sheets, admission schedules, and circulars issued by BISE Lahore.",
};

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stay Informed"
        title="Notifications"
        description="Date sheets, admission schedules, syllabus updates, and circulars — the complete archive."
        breadcrumbs={[{ label: "Notifications" }]}
      />
      <Section>
        <NotificationBrowser items={allNotifications} />
      </Section>
    </>
  );
}
