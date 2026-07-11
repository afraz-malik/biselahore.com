import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SocialSidebar } from "@/components/layout/social-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BISE Lahore | Board of Intermediate & Secondary Education, Lahore",
  description:
    "Official website of the Board of Intermediate & Secondary Education, Lahore — examinations, results, registrations, and student services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SocialSidebar />
      </body>
    </html>
  );
}
