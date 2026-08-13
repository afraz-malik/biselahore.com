export interface HeroSlideData {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export const heroSlides: HeroSlideData[] = [
  {
    id: "examinations",
    eyebrow: "Board of Intermediate & Secondary Education, Lahore",
    title: "Your Academic Journey Starts Here.",
    description:
    "Admissions, registrations, migration, certificates, and student services — all in one place.",
    image: "/hero/slide1.jpg",
    imageAlt: "Rows of empty desks arranged in an examination hall",
    primaryAction: { label: "Explore Services", href: "/notifications" },
    secondaryAction: { label: "Learn More", href: "/about" },
  },
  {
    id: "student-journey",
    eyebrow: "Student Services",
    title: "Transparent Examinations. Timely Results.",
    description:
    "The official examination board serving millions of students with secure, transparent, and technology-driven examination services.",
      image: "/hero/slide-examinations.jpg",
    imageAlt: "A modern brick academic building framed by lawns and walkways",
    primaryAction: { label: "Online Results", href: "https://result.biselahore.com/" },
    secondaryAction: { label: "Learn More", href: "/about" },
  },

  {
      id: "digital-services",
      eyebrow: "Introducing Student Online Systems",
      title: "Everything You Need, Just a Click Away.",
      description:
        "Access essential BISE Lahore services, from Registration & Roll Number Slips to Exam Management all in one convenient digital platform.",
        image: "/hero/b3_OnlineSystems.jpg",
    imageAlt: "Online Digital Services for Students",
    primaryAction: { label: "Explore Online Systems", href: "/#online-systems" },
    secondaryAction: { label: "Learn More", href: "/about" },
  },
  {
    id: "digital chatbot",
    eyebrow: "Your Online Assistant for Student Services",
    title: "Introducing BISE Lahore Digital Chatbot.",
    description:
      "Get instant answers about BISE Lahore, from Results, Contact Information and Roll Number Slip to Jurisdiction, Board History & more — simply ask the chatbot.",
    image: "/hero/b4Chatbot.jpg",
    imageAlt: "A student using a laptop to access the BISE Lahore Digital Chatbot",
    primaryAction: { label: "Digital Chatbot", href: "https://chatbot.biselahore.com/" },
    secondaryAction: { label: "Learn More", href: "/about" },
  },
  {
    id: "E - Services",
    eyebrow: "All Student Services in one Convenient Platform",
    title: "BISE Lahore E-Services.",
    description:
      "Access essential online services for Attestation, Verification, NOC / Migration, Duplicate / Triplicate Certificates, Name Change & Corrections - all in one convenient platform.",
    image: "/hero/b5_eservices.jpg",
    imageAlt: "All student services in one convenient platform",
    primaryAction: { label: "E-Services", href: "/#quick-services" },
    secondaryAction: { label: "Learn More", href: "/about" },
  },
];
