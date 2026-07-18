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
        "The Board of Intermediate and Secondary Education (BISE), Lahore, established in 1954, has served as a distinguished institution of educational assessment for more than seven decades, earning an enduring reputation for excellence, integrity, transparency and public trust. As the oldest and pioneering Board of Intermediate and Secondary Education in both Punjab and Pakistan, BISE Lahore is widely acknowledged as the 'Mother Board', having laid the foundation for the subsequent establishment of other Boards of Intermediate and Secondary Education across the Province. Throughout its illustrious history, the Board has steadfastly upheld the principles of fairness, impartiality and merit by conducting examinations in a transparent, credible and efficient manner, while consistently maintaining the highest standards of professionalism, accountability and institutional integrity.",
        "At present, the Board of Intermediate and Secondary Education (BISE), Lahore, annually facilitates nearly two million fresh candidates appearing in the Secondary School Certificate (SSC) and Higher Secondary School Certificate (HSSC) examinations, making it one of the largest examining bodies in the country. Under the visionary leadership of the Honourable Chief Minister, Punjab, the guidance of the Honorable Minister for School Education and Higher Education, and supervision of Chairman Chief Minister Task Force on Examination Reforms and the dynamic administrative leadership of the Board, BISE Lahore remains firmly committed to strengthening the examination system and delivering efficient, transparent, technology-driven and citizen-centric public services.",
        "To achieve these objectives, the Board is actively implementing a comprehensive reform agenda aimed at modernizing examination and assessment practices in line with contemporary educational standards. Particular emphasis is being placed on enhancing the quality, accuracy and credibility of assessment through the introduction of innovative initiatives, including On-Screen Marking (OSM), the adoption of advanced digital technologies, process automation, continuous institutional improvements and alignment with internationally recognized best practices. These transformative reforms are designed to further reinforce the credibility, transparency, efficiency and reliability of the examination system while ensuring that every candidate is assessed fairly, objectively and in accordance with the highest standards of merit, integrity and accountability.",
        "At the Board of Intermediate and Secondary Education (BISE), Lahore, we firmly believe that students, parents, teachers, educational institutions and all other stakeholders are entitled to services that are efficient, accessible, transparent and responsive. Guided by this commitment, the Board remains steadfast in its pursuit of excellence in public service delivery through continuous institutional improvement, innovation and the adoption of best governance practices.",
        "BISE Lahore is dedicated to preserving and strengthening the confidence reposed in the institution by ensuring the highest standards of integrity, accountability, professionalism and service excellence. The Board will continue to work with unwavering commitment to modernize the examination system, promote transparency and merit, and enhance the quality and credibility of educational assessment. Through collective efforts and a forward-looking vision, BISE Lahore aspires to build a robust, technology-driven and internationally aligned examination system that fosters educational excellence, inspires public confidence and serves the interests of present and future generations."
      ]}
    />
  );
}
