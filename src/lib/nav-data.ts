export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavLink[];
}

/** Primary site navigation, preserved from the legacy header. */
export const primaryNav: (NavLink | NavGroup)[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Downloads", href: "/downloads" },
  { label: "Notifications", href: "/notifications" },
  { label: "Contact Us", href: "/contact" },
  {
    label: "Term of Deputationists",
    items: [
      { label: "Chairmen", href: "/deputationists/chairmen" },
      { label: "Secretaries", href: "/deputationists/secretaries" },
      { label: "CEs", href: "/deputationists/ces" },
    ],
  },
  { label: "Sitemap", href: "/sitemap" },
];

export function isNavGroup(item: NavLink | NavGroup): item is NavGroup {
  return "items" in item;
}

export const socialLinks: (NavLink & { icon: "facebook" | "twitter" | "youtube" | "linkedin" | "whatsapp" })[] = [
  { label: "Facebook", href: "https://www.facebook.com/biselhrofficial/", external: true, icon: "facebook" },
  { label: "Twitter / X", href: "https://www.twitter.com/Biselhrofficial/", external: true, icon: "twitter" },
  { label: "YouTube", href: "https://www.youtube.com/c/BISELahoreofficial/", external: true, icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/biselahoreofficial/", external: true, icon: "linkedin" },
  { label: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029VaF2Z8W3WHTYaFfPE00T", external: true, icon: "whatsapp" },
];
