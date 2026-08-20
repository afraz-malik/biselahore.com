import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

import { AdminSidebar } from "@/components/cms/admin-sidebar";
import { LogoutButton } from "@/components/cms/logout-button";
import { isAuthenticated } from "@/lib/cms/auth/session";

export const metadata: Metadata = {
  title: "BISE Lahore CMS",
  robots: { index: false, follow: false },
};

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated();

  if (!authed) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-secondary/30">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
          <p className="text-sm text-muted-foreground">Content Management</p>
          <LogoutButton />
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
