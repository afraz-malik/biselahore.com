import type { Metadata } from "next";

import { OfficialProfile } from "@/components/administration/official-profile";

export const metadata: Metadata = {
  title: "Controller of Examinations | Administration | BISE Lahore",
  description: "Message and contact details of the Controller of Examinations of BISE Lahore.",
};

export default function ControllerOfExaminationsPage() {
  return (
    <OfficialProfile
      name="Toseef-ur-Rehman"
      title="Controller of Examinations"
      appointment="Controller of Examinations, BISE Lahore"
      imageSrc="/people/controller.jpg"
      breadcrumbLabel="Controller of Examinations"
      email="controller@biselahore.com"
      phone="+92 42 99200193"
      message={[
        "The examination wing remains the backbone of the Board’s credibility and public confidence. Every step of the process — from scheduling to result management — is designed to preserve accuracy, fairness, and institutional discipline while serving the needs of thousands of students every year.",
        "Our team continues to improve examination planning, operational monitoring, and result-related services with the help of modern systems and stronger coordination. The aim is to ensure that every candidate receives a process that is transparent, secure, and dependable.",
        "I encourage all stakeholders to follow official guidance closely and rely only on authenticated communication channels. When we work with integrity and discipline, the examination system becomes a source of confidence for students, parents, and institutions alike.",
      ]}
    />
  );
}
