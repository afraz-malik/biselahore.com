"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LegacySiteButton } from "@/components/layout/legacy-site-button";
import { ChatbotWidget } from "@/components/layout/chatbot-widget";

/**
 * Wraps every route in the public chrome, except /cms — the admin section
 * renders its own shell. Checked client-side (matching the existing
 * pathname-gated pattern that SocialSidebar already used) so the root layout
 * stays a plain static Server Component and public pages keep static
 * generation. `announcementBar`/`socialSidebar` are passed in already
 * rendered by the (server) root layout since they read from the database.
 */
export function SiteChrome({
  children,
  announcementBar,
  socialSidebar,
}: {
  children: React.ReactNode;
  announcementBar: React.ReactNode;
  socialSidebar: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCmsSection = pathname?.startsWith("/cms") ?? false;

  if (isCmsSection) {
    return <>{children}</>;
  }

  return (
    <>
      {announcementBar}
      <Navbar />
      <main>{children}</main>
      <Footer />
      {socialSidebar}
      {/* <LegacySiteButton /> */}
      <ChatbotWidget />
    </>
  );
}
