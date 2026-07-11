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
    title: "Transparent Examinations. Timely Results.",
    description:
      "The official examination board serving millions of students with secure, transparent, and technology-driven examination services.",
    image: "/hero/slide-examinations.jpg",
    imageAlt: "Rows of empty desks arranged in an examination hall",
    primaryAction: { label: "Explore Services", href: "#quick-services" },
    secondaryAction: { label: "Learn More", href: "/about" },
  },
  {
    id: "student-journey",
    eyebrow: "Student Services",
    title: "Your Academic Journey Starts Here.",
    description:
      "Admissions, registrations, migration, certificates, and student services — all in one place.",
    image: "/hero/slide-student-journey.jpg",
    imageAlt: "A modern brick academic building framed by lawns and walkways",
    primaryAction: { label: "Student Services", href: "/student-services" },
    secondaryAction: { label: "Learn More", href: "/about" },
  },
  {
    id: "digital-services",
    eyebrow: "Online Services",
    title: "Fast. Secure. Digital.",
    description:
      "Access online results, verification services, challans, notifications, and important announcements anytime.",
    image: "/hero/slide-digital-services.jpg",
    imageAlt: "A laptop glowing with light in a dark, modern workspace",
    primaryAction: { label: "Explore Online Services", href: "/online-services" },
    secondaryAction: { label: "Learn More", href: "/about" },
  },
  {
    id: "future-of-education",
    eyebrow: "Our Commitment",
    title: "Building the Future of Education.",
    description:
      "Supporting schools, colleges, students, and educators across Punjab through trusted examination services.",
    image: "/hero/slide-future-education.jpg",
    imageAlt: "Graduates celebrating, throwing their caps into the air outside their academic building",
    primaryAction: { label: "Latest Notifications", href: "/notifications" },
    secondaryAction: { label: "Learn More", href: "/about" },
  },
];
