import type { QuickServiceIcon } from "@/lib/home-data";

function ServiceIcon({ icon }: { icon: QuickServiceIcon }) {
  const stroke = "#1d84c6";
  const secondary = "#5aa9de";

  switch (icon) {
    case "attestation":
      return (
        <svg viewBox="0 0 72 72" className="size-13" fill="none" aria-hidden>
          <rect x="18" y="14" width="24" height="34" rx="3" stroke={stroke} strokeWidth="2.4" />
          <path d="M26 22h10M24 28h12M24 34h12" stroke={secondary} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M24 40h6" stroke={secondary} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M44 40l8 8" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
          <path d="M41 43l4-4 10 10-4 4-10-10Z" stroke={stroke} strokeWidth="2" />
          <circle cx="46" cy="45" r="8" fill="white" stroke={stroke} strokeWidth="2.4" />
          <path d="m42.5 45 2.2 2.2 5-5" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "verification":
      return (
        <svg viewBox="0 0 72 72" className="size-13" fill="none" aria-hidden>
          <path d="M22 14h22l6 6v28H22V14Z" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M44 14v8h8" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M28 26h16M28 32h16M28 38h10" stroke={secondary} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M36 56c8-3 12-7 12-13v-8l-12-4-12 4v8c0 6 4 10 12 13Z" fill="white" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="m31.5 43.5 3 3 6.5-6.5" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "migration":
      return (
        <svg viewBox="0 0 72 72" className="size-13" fill="none" aria-hidden>
          <path d="M10 48h14V31l-7-5-7 5v17ZM48 48h14V33l-7-5-7 5v15Z" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M17 31v17M55 33v15M13 37h8M51 39h8" stroke={secondary} strokeWidth="2.1" strokeLinecap="round" />
          <rect x="25" y="14" width="22" height="28" rx="3" stroke={stroke} strokeWidth="2.4" />
          <path d="M30 21h12M30 27h9" stroke={secondary} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M20 54c7 4 25 4 32 0" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          <path d="m48 50 4 4-4 4" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "duplicate":
      return (
        <svg viewBox="0 0 72 72" className="size-13" fill="none" aria-hidden>
          <rect x="17" y="19" width="22" height="28" rx="3" stroke={secondary} strokeWidth="2.2" />
          <rect x="33" y="15" width="22" height="30" rx="3" fill="white" stroke={stroke} strokeWidth="2.4" />
          <path d="M39 23h10M37 29h14M37 35h14" stroke={secondary} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="28" cy="47" r="6.5" fill="white" stroke={stroke} strokeWidth="2.2" />
          <path d="m25.5 47 1.8 1.8 3.8-3.8" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="52" cy="45" r="6.5" fill="white" stroke={stroke} strokeWidth="2.2" />
          <path d="m49.5 45 1.8 1.8 3.8-3.8" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "name-change":
      return (
        <svg viewBox="0 0 72 72" className="size-13" fill="none" aria-hidden>
          <rect x="20" y="15" width="32" height="40" rx="3" stroke={stroke} strokeWidth="2.4" />
          <circle cx="30" cy="29" r="4.5" stroke={stroke} strokeWidth="2.2" />
          <path d="M24 39c1.5-3 4-4.5 6-4.5s4.5 1.5 6 4.5" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M40 27h7M40 33h9" stroke={secondary} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M40 44h8" stroke={secondary} strokeWidth="2.2" strokeLinecap="round" />
          <path d="m26 50 6-6M32 50l-6-6" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "father-name":
      return (
        <svg viewBox="0 0 72 72" className="size-13" fill="none" aria-hidden>
          <circle cx="36" cy="19" r="5" stroke={stroke} strokeWidth="2.2" />
          <circle cx="24" cy="42" r="5" stroke={stroke} strokeWidth="2.2" />
          <circle cx="48" cy="42" r="5" stroke={stroke} strokeWidth="2.2" />
          <path d="M36 24v9M24 37v-4h24v4" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 52c1.8-3.6 4.7-5.4 7-5.4 2.3 0 5.2 1.8 7 5.4M41 52c1.8-3.6 4.7-5.4 7-5.4 2.3 0 5.2 1.8 7 5.4" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "dob":
      return (
        <svg viewBox="0 0 72 72" className="size-13" fill="none" aria-hidden>
          <rect x="18" y="19" width="36" height="30" rx="4" stroke={stroke} strokeWidth="2.4" />
          <path d="M18 28h36M27 15v8M45 15v8" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M27 35h4M36 35h4M45 35h4M27 42h4M36 42h4" stroke={secondary} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
  }
}

export function ServiceCard({
  icon,
  title,
  description,
  ctaLabel,
}: {
  icon: QuickServiceIcon;
  title: string;
  description: string;
  ctaLabel: string;
}) {
  return (
    <div className="flex h-full min-h-60 flex-col rounded-[1.55rem] border border-slate-200/90 bg-white px-5 py-5 shadow-[0_18px_40px_-26px_rgba(30,64,175,0.28)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_22px_46px_-24px_rgba(37,99,235,0.22)]">
      <div className="flex size-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(191,219,254,0.95)_0%,rgba(186,230,253,0.9)_100%)] shadow-inner shadow-white/70">
        <ServiceIcon icon={icon} />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="text-[1.05rem] leading-snug font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <span className="mt-auto pt-5 text-sm font-medium text-blue-700">{ctaLabel}</span>
      </div>
    </div>
  );
}
