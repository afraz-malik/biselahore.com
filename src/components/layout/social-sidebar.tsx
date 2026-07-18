"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Newspaper, Phone, type LucideIcon } from "lucide-react";

import {
  SocialIcon,
  type SocialIconName,
} from "@/components/icons/social-icons";
import {
  socialSidebarItems,
  type SocialSidebarItem,
} from "@/lib/social-sidebar-data";
import { cn } from "@/lib/utils";

const brandIcons: readonly SocialSidebarItem["icon"][] = [
  "facebook",
  "instagram",
  "youtube",
  "linkedin",
  "twitter",
  "whatsapp",
];

const lucideIconMap: Record<"mail" | "phone" | "newspaper", LucideIcon> = {
  mail: Mail,
  phone: Phone,
  newspaper: Newspaper,
};

function ItemIcon({
  icon,
  className,
}: {
  icon: SocialSidebarItem["icon"];
  className?: string;
}) {
  if ((brandIcons as string[]).includes(icon)) {
    return <SocialIcon name={icon as SocialIconName} className={className} />;
  }
  const Icon = lucideIconMap[icon as "mail" | "phone" | "newspaper"];
  return <Icon className={className} />;
}

const expandTransition = {
  type: "spring",
  duration: 0.3,
  bounce: 0.2,
} as const;

function SocialSidebarRow({ item }: { item: SocialSidebarItem }) {
  const [active, setActive] = useState(false);
  const isHttp = item.href.startsWith("http");
  const isInternal = item.href.startsWith("/");

  const inner = (
    <motion.div
      initial={false}
      animate={{ width: active ? 232 : 48 }}
      transition={expandTransition}
      className={cn(
        "flex h-12 items-center gap-0 overflow-hidden rounded-l-full pl-0 shadow-md transition-shadow duration-200",
        item.colorClass,
        active && "shadow-xl",
      )}
      style={{ transformOrigin: "right center" }}
    >
      <motion.span
        animate={{ scale: active ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="flex size-12 shrink-0 items-center justify-center text-white"
      >
        <ItemIcon icon={item.icon} className="size-5" />
      </motion.span>
      <motion.span
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.18, delay: active ? 0.05 : 0 }}
        className="flex min-w-0 flex-col justify-center gap-0 pr-4 whitespace-nowrap text-white"
      >
        <span className="text-sm leading-tight font-semibold">
          {item.label}
        </span>
        {item.subtitle ? (
          <span className="text-xs leading-tight text-white/85">
            {item.subtitle}
          </span>
        ) : null}
      </motion.span>
    </motion.div>
  );

  const sharedProps = {
    "aria-label": item.subtitle
      ? `${item.label}: ${item.subtitle}`
      : item.label,
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => setActive(false),
    onFocus: () => setActive(true),
    onBlur: () => setActive(false),
    className:
      "block rounded-l-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  };

  if (isInternal) {
    return (
      <Link href={item.href} {...sharedProps}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      target={isHttp ? "_blank" : undefined}
      rel={isHttp ? "noopener noreferrer" : undefined}
      {...sharedProps}
    >
      {inner}
    </a>
  );
}

/**
 * Floating, config-driven social sidebar. Fixed to the right edge of the
 * viewport, vertically centered; expands each row on hover/focus without
 * shifting page layout. Populate `socialSidebarItems` to add/remove platforms.
 */
export function SocialSidebar() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <nav
      aria-label="Social and contact links"
      className="fixed top-1/2 right-0 z-50 flex -translate-y-1/2 flex-col items-end gap-2"
    >
      {socialSidebarItems.map((item) => (
        <SocialSidebarRow key={item.key} item={item} />
      ))}
    </nav>
  );
}
