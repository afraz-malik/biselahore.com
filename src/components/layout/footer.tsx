import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Printer } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SocialIcon } from "@/components/icons/social-icons";
import { socialLinks } from "@/lib/nav-data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/15 bg-[linear-gradient(135deg,#062a6f_0%,#0b4ea8_35%,#1f6df2_70%,#0a2e63_100%)] text-slate-100 shadow-[0_-25px_90px_-30px_rgba(2,29,71,0.6)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(191,219,254,0.24),transparent_28%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.2),transparent_30%),linear-gradient(120deg,rgba(255,255,255,0.16),transparent_35%,rgba(255,255,255,0.05))]" />
      <Container className="relative grid gap-14 py-20 md:grid-cols-3 md:py-24 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-3.5">
            <Image
              src="/brand/BISE_LogoF.png"
              alt="BISE Lahore crest"
              width={48}
              height={57}
              className="h-12 w-auto"
            />
            <span className="text-lg font-semibold tracking-tight text-white">BISE Lahore</span>
          </Link>
          <p className="mt-5 text-base leading-relaxed text-slate-100/95 font-medium text-pretty">
            Board of Intermediate &amp; Secondary Education, Lahore — conducting
            Secondary and Higher Secondary School examinations with transparency
            and diligence.
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            {socialLinks.map((social) => (
              <Link
                key={social.href + social.icon}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-slate-100 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:scale-110 hover:border-cyan-200/70 hover:bg-cyan-300/20 hover:text-cyan-100"
              >
                <SocialIcon name={social.icon} className="size-4.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-base font-semibold text-white">Navigate</p>
          <ul className="mt-5 space-y-3">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Notifications", href: "/notifications" },
              { label: "Contact Us", href: "/contact" },
              // { label: "SiteMap", href: "/sitemap" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-base text-slate-100/95 font-medium transition-all duration-200 hover:-translate-y-0.5 hover:text-cyan-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-base font-semibold text-white">Contact</p>
          <ul className="mt-5 space-y-3.5 text-base text-slate-100/95 font-medium">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4.5 shrink-0 text-cyan-200" />
              86-Mozang Road, Lahore
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4.5 shrink-0 text-cyan-200" />
              +92 42 99200192-197
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4.5 shrink-0 text-cyan-200" />
              <a href="mailto:info@biselahore.com" className="transition-all duration-200 hover:text-cyan-100 hover:underline">
                info@biselahore.com
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10 bg-slate-950/35 backdrop-blur-xl">
        <Container className="flex flex-col items-center justify-between gap-2 py-7 sm:flex-row">
          <p className="text-sm font-semibold text-slate-200">
            © {new Date().getFullYear()} B.I.S.E, Lahore. All Rights Reserved.
          </p>
          <p className="text-sm font-semibold text-slate-200">
            Board of Intermediate &amp; Secondary Education, Lahore
          </p>
        </Container>
      </div>
    </footer>
  );
}
