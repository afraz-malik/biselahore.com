import type { Metadata } from "next";

import { OfficialProfile } from "@/components/administration/official-profile";

export const metadata: Metadata = {
  title: "Chairman | Administration | BISE Lahore",
  description: "Message and contact details of the Chairman of BISE Lahore.",
};

export default function ChairmanPage() {
  return (
    <OfficialProfile
      name="Engr. Dr. Badar-ul-Islam"
      title="Chairman"
      appointment="Chairman, BISE Lahore"
      imageSrc="/people/chairman1.jpg"
      breadcrumbLabel="Chairman"
      email="chairman@biselahore.com"
      phone="+92 42 99200191"
      message={[
        "It is an honour to serve the students, institutions, and families of Lahore through a transparent, disciplined, and student-focused examination system. BISE Lahore remains committed to upholding academic integrity while ensuring that every candidate is treated fairly and with dignity.",
        "Our administration continues to strengthen digital systems, improve accessibility, and promote timely communication so that the examination process remains smooth and dependable. We believe that quality education and credible assessment must go hand in hand for the progress of the province and the nation.",
        "I urge all students, parents, and affiliated institutions to stay connected with official announcements and use the available online services responsibly. Together, we can preserve the credibility and prestige of our examination system.",
      ]}
    />
  );
}
