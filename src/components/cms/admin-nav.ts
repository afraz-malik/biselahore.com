export interface AdminNavItem {
  label: string;
  href: string;
}

export interface AdminNavGroup {
  label: string;
  items: AdminNavItem[];
}

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "Home",
    items: [
      { label: "Hero Slides", href: "/cms/hero-slides" },
      { label: "Announcements", href: "/cms/announcements" },
      { label: "Online Systems", href: "/cms/online-systems" },
      { label: "BISE at a Glance", href: "/cms/glance-stats" },
      { label: "Latest News", href: "/cms/latest-news" },
      { label: "Related Links", href: "/cms/related-links" },
      { label: "Social Icons", href: "/cms/social-sidebar" },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Notifications", href: "/cms/notifications" },
      { label: "Downloads", href: "/cms/downloads" },
      { label: "Model Papers", href: "/cms/model-papers" },
      { label: "Careers", href: "/cms/careers" },
      { label: "Tenders", href: "/cms/tenders" },
      { label: "RTI", href: "/cms/rti" },
    ],
  },
  {
    label: "Pages",
    items: [
      { label: "About", href: "/cms/about" },
      { label: "Administration", href: "/cms/administration" },
      { label: "Contact", href: "/cms/contact" },
      { label: "FAQs", href: "/cms/faqs" },
      { label: "Result Statistics", href: "/cms/result-statistics" },
      { label: "Gallery", href: "/cms/gallery" },
      { label: "Deputationists", href: "/cms/deputationists" },
    ],
  },
];
