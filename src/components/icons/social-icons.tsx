import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** lucide-react dropped brand marks, so the handful we need are hand-drawn here. */
export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.5c0-.93.26-1.56 1.59-1.56h1.7V3.1C16.5 3.03 15.62 3 14.6 3c-2.19 0-3.7 1.34-3.7 3.8v2.8H8.14v3.2h2.76V21z" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.24 3h2.9l-6.34 7.25L22.3 21h-5.83l-4.57-5.98L6.6 21H3.7l6.78-7.76L2.7 3h5.98l4.13 5.47zm-1.02 16.2h1.6L7.86 4.7H6.14z" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.2s-.21-1.5-.87-2.16c-.83-.87-1.76-.87-2.19-.92C15.44 4 12 4 12 4h-.01s-3.44 0-6.54.12c-.43.05-1.36.05-2.19.92C2.6 5.7 2.4 7.2 2.4 7.2S2.18 9 2.18 10.75v1.5C2.18 14 2.4 15.8 2.4 15.8s.21 1.5.87 2.16c.83.87 1.92.84 2.4.93 1.75.17 7.33.22 7.33.22s3.45-.01 6.54-.13c.43-.06 1.36-.06 2.19-.93.66-.66.87-2.16.87-2.16s.22-1.79.22-3.55v-1.5c0-1.75-.22-3.55-.22-3.55zM9.98 14.1V8.9l5.4 2.61z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.4 8.75h3.48V21H3.4zM9.75 8.75h3.34v1.68h.05c.46-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.34V21h-3.48v-6.32c0-1.51-.03-3.45-2.1-3.45-2.11 0-2.43 1.65-2.43 3.34V21H9.75z" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.29-.15-1.71-.84-1.98-.94-.27-.1-.46-.15-.65.15-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.65-1.56-.89-2.14-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.56-.01-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.02c.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.67.61.7.22 1.33.19 1.84.11.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34z" />
      <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.95 9.95 0 0 0 12.02 22C17.54 22 22 17.52 22 12S17.54 2 12.02 2zm0 18.2c-1.62 0-3.13-.47-4.4-1.28l-.32-.19-3.01.79.8-2.93-.2-.3A8.18 8.18 0 0 1 3.8 12c0-4.54 3.69-8.2 8.22-8.2s8.2 3.66 8.2 8.2-3.67 8.2-8.2 8.2z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export type SocialIconName = "facebook" | "twitter" | "youtube" | "linkedin" | "whatsapp" | "instagram";

const iconMap: Record<SocialIconName, (props: IconProps) => React.JSX.Element> = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
  whatsapp: WhatsappIcon,
  instagram: InstagramIcon,
};

export function SocialIcon({ name, ...props }: { name: SocialIconName } & IconProps) {
  const Icon = iconMap[name];
  return <Icon {...props} />;
}
