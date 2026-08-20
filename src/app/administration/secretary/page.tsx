import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OfficialProfile } from "@/components/administration/official-profile";
import { getOfficialByRole } from "@/lib/db/queries/officials";

export const metadata: Metadata = {
  title: "Secretary | Administration | BISE Lahore",
  description: "Message and contact details of the Secretary of BISE Lahore.",
};

export default async function SecretaryPage() {
  const official = await getOfficialByRole("secretary");
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
