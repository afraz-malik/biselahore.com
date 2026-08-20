import { getPublishedAnnouncements } from "@/lib/db/queries/home";
import { AnnouncementBar } from "@/components/layout/announcement-bar";

export async function AnnouncementBarLoader() {
  const announcements = await getPublishedAnnouncements();
  return <AnnouncementBar announcements={announcements} />;
}
