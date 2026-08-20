import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OfficialProfile } from "@/components/administration/official-profile";
import { getOfficialByRole } from "@/lib/db/queries/officials";

export const metadata: Metadata = {
  title: "Chairman | Administration | BISE Lahore",
  description: "Message and contact details of the Chairman of BISE Lahore.",
};

export default async function ChairmanPage() {
  const official = await getOfficialByRole("chairman");
  if (!official || !official.isPublished) {
    notFound();
  }

  return (
    <OfficialProfile
      name={official.name}
      title={official.title}
      appointment={official.appointment}
      imageSrc={official.imageSrc}
      breadcrumbLabel={official.breadcrumbLabel}
      email={official.email}
      phone={official.phone}
      message={official.messageParagraphs}
    />
  );
}
