import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OfficialProfile } from "@/components/administration/official-profile";
import { getOfficialByRole } from "@/lib/db/queries/officials";

export const metadata: Metadata = {
  title: "Controller of Examinations | Administration | BISE Lahore",
  description: "Message and contact details of the Controller of Examinations of BISE Lahore.",
};

export default async function ControllerOfExaminationsPage() {
  const official = await getOfficialByRole("controller");
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
