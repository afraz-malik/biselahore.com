export type SocialSidebarIconName =
  | "facebook"
  | "instagram"
  | "youtube"
  | "linkedin"
  | "twitter"
  | "whatsapp"
  | "mail"
  | "phone"
  | "newspaper";

export interface SocialSidebarItem {
  key: string;
  label: string;
  subtitle?: string;
  href: string;
  icon: SocialSidebarIconName;
  /** Tailwind background color classes applied to the compact icon chip. */
  colorClass: string;
}

/**
 * Config-driven source for <SocialSidebar />. Add a platform by appending a
 * row here — no JSX changes required.
 *
 * Note: Instagram is supported by the component but omitted below since BISE
 * Lahore has no confirmed Instagram account in the source content.
 */
export const socialSidebarItems: SocialSidebarItem[] = [
  {
    key: "live-support",
    label: "Live Support",
    subtitle: "Chat with us",
    href: "https://chatbot.biselahore.com",
    icon: "phone",
    colorClass: "bg-cyan-700",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    subtitle: "Live Admission Support",
    href: "https://whatsapp.com/channel/0029VaF2Z8W3WHTYaFfPE00T",
    icon: "whatsapp",
    colorClass: "bg-[#25D366]",
  },
  {
    key: "facebook",
    label: "Facebook",
    subtitle: "Follow Our Page",
    href: "https://www.facebook.com/biselhrofficial/",
    icon: "facebook",
    colorClass: "bg-[#1877F2]",
  },
  {
    key: "youtube",
    label: "YouTube",
    subtitle: "Watch Videos",
    href: "https://www.youtube.com/c/BISELahoreofficial/",
    icon: "youtube",
    colorClass: "bg-[#FF0000]",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    subtitle: "Connect With Us",
    href: "https://www.linkedin.com/in/biselahoreofficial/",
    icon: "linkedin",
    colorClass: "bg-[#0A66C2]",
  },
  {
    key: "twitter",
    label: "X (Twitter)",
    subtitle: "Follow for Updates",
    href: "https://www.twitter.com/Biselhrofficial/",
    icon: "twitter",
    colorClass: "bg-[#111111]",
  },
  // {
  //   key: "news",
  //   label: "News",
  //   subtitle: "Latest Announcements",
  //   href: "/notifications",
  //   icon: "newspaper",
  //   colorClass: "bg-primary",
  // },
  {
    key: "email",
    label: "Email",
    subtitle: "info@biselahore.com",
    href: "mailto:info@biselahore.com",
    icon: "mail",
    colorClass: "bg-neutral-700",
  },
  // {
  //   key: "phone",
  //   label: "Phone",
  //   subtitle: "+92 42 99200192",
  //   href: "tel:+924299200192",
  //   icon: "phone",
  //   colorClass: "bg-neutral-700",
  // },
];
