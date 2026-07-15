import type { Metadata } from "next";

import { OfficialProfile } from "@/components/administration/official-profile";

export const metadata: Metadata = {
  title: "Secretary | Administration | BISE Lahore",
  description: "Message and contact details of the Secretary of BISE Lahore.",
};

export default function SecretaryPage() {
  return (
    <OfficialProfile
      name="Rizwan Nazir"
      title="Secretary"
      appointment="Secretary, BISE Lahore"
      imageSrc="/people/secretary.jpg"
      breadcrumbLabel="Secretary"
      email="secretary@biselahore.com"
      phone="+92 42 99200192"
      message={[
        "The Secretariat of BISE Lahore plays a central role in coordinating administrative processes, maintaining institutional discipline, and ensuring that policies are implemented effectively. We remain dedicated to serving the public through transparent records, timely decisions, and efficient communication.",
        "In a rapidly changing academic environment, the Board has embraced digital tools and structured procedures to reduce delays and improve service delivery. Our focus is to make every interaction with the Board clearer, simpler, and more responsive to the needs of students and institutions.",
        "We appreciate the trust placed in the Board by the education community and will continue to strengthen systems that reflect accountability, professionalism, and public service.",
      ]}
    />
  );
}
