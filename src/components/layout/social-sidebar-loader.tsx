import { getPublishedSocialSidebarItems } from "@/lib/db/queries/home";
import { SocialSidebar } from "@/components/layout/social-sidebar";

export async function SocialSidebarLoader() {
  const items = await getPublishedSocialSidebarItems();
  return <SocialSidebar items={items} />;
}
