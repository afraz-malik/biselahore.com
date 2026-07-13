export type NavColor =
  | "emerald"
  | "sky"
  | "violet"
  | "rose"
  | "cyan"
  | "amber"
  | "fuchsia"
  | "blue";

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
  | "grid";

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
  { label: "Home", href: "/", icon: "home", color: "emerald" },
  { label: "About Us", href: "/about", icon: "info", color: "sky" },
  { label: "Downloads", href: "/downloads", icon: "download", color: "violet" },
  { label: "Notifications", href: "/notifications", icon: "bell", color: "rose" },
  { label: "Contact Us", href: "/contact", icon: "phone", color: "cyan" },
  {
    label: "Term of Deputationists",
    icon: "users",
    color: "amber",
    items: [
      { label: "Chairmen", href: "/deputationists/chairmen" },
      { label: "Secretaries", href: "/deputationists/secretaries" },
      { label: "CEs", href: "/deputationists/ces" },
    ],
  },
  { label: "Sitemap", href: "/sitemap", icon: "map", color: "fuchsia" },
];

/** Primary, always-visible nav links — the most-used destinations, surfaced directly. */
export const quickNavLinks: NavLink[] = [
  { label: "Quick Services", href: "#quick-services", icon: "zap", color: "amber" },
  { label: "Online Systems", href: "#online-systems", icon: "radio", color: "emerald" },
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
