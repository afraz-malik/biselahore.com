export type NavColor =
  | "emerald"
  | "sky"
  | "violet"
  | "rose"
  | "cyan"
  | "amber"
  | "fuchsia"
  | "blue"
  | "teal";

export type NavIconName =
  | "home"
  | "info"
  | "download"
  | "bell"
  | "phone"
  | "users"
  | "map"
  | "zap"
  | "radio"
  | "grid"
  | "help";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: NavIconName;
  color?: NavColor;
}

export interface NavGroup {
  label: string;
  items: NavLink[];
  icon?: NavIconName;
  color?: NavColor;
}

/** Secondary navigation — everything that lives behind the "More" menu. */
export const primaryNav: (NavLink | NavGroup)[] = [
  { label: "Home", href: "/", icon: "home", color: "sky" },
  { label: "About Us", href: "/about", icon: "info", color: "blue" },
  // { label: "Online Results", href: "http://result.biselahore.com/", external: true, icon: "radio", color: "blue" },
  // { label: "Print Challan", href: "http://challan.biselahore.com/", external: true, icon: "download", color: "amber" },
  { label: "Downloads", href: "/downloads", icon: "download", color: "cyan" },
  { label: "Notifications", href: "/notifications", icon: "bell", color: "violet" },
  { label: "Contact Us", href: "/contact", icon: "phone", color: "sky" },
  {
    label: "Administration",
    icon: "users",
    color: "amber",
    items: [
      { label: "Chairman", href: "/administration/chairman" },
      { label: "Secretary", href: "/administration/secretary" },
      { label: "Controller of Examinations", href: "/administration/controller-of-examinations" },
    ],
  },
  { label: "FAQs", href: "/faqs", icon: "help", color: "cyan" },
  // { label: "Sitemap", href: "/sitemap", icon: "map", color: "blue" },
];

/** Primary, always-visible nav links — the most-used destinations, surfaced directly. */
export const quickNavLinks: NavLink[] = [
  { label: "E-Services", href: "/#quick-services", icon: "zap", color: "amber" },
  { label: "Online Systems", href: "/#online-systems", icon: "radio", color: "blue" },
];

export function isNavGroup(item: NavLink | NavGroup): item is NavGroup {
  return "items" in item;
}

export const socialLinks: (Omit<NavLink, "icon"> & { icon: "facebook" | "twitter" | "youtube" | "linkedin" | "whatsapp" })[] = [
  { label: "Facebook", href: "https://www.facebook.com/biselhrofficial/", external: true, icon: "facebook" },
  { label: "Twitter / X", href: "https://www.twitter.com/Biselhrofficial/", external: true, icon: "twitter" },
  { label: "YouTube", href: "https://www.youtube.com/c/BISELahoreofficial/", external: true, icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/biselahoreofficial/", external: true, icon: "linkedin" },
  { label: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029VaF2Z8W3WHTYaFfPE00T", external: true, icon: "whatsapp" },
];
