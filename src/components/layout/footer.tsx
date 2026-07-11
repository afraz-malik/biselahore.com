import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Printer } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SocialIcon } from "@/components/icons/social-icons";
import { isNavGroup, primaryNav, socialLinks } from "@/lib/nav-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <Container className="grid gap-12 py-16 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/bise-logo.png"
              alt="BISE Lahore crest"
              width={40}
              height={47}
              className="h-10 w-auto"
            />
            <span className="text-base font-semibold tracking-tight">BISE Lahore</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground text-pretty">
            Board of Intermediate &amp; Secondary Education, Lahore — conducting
            Secondary and Higher Secondary School examinations with transparency
            and diligence.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socialLinks.map((social) => (
              <Link
                key={social.href + social.icon}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-primary"
              >
                <SocialIcon name={social.icon} className="size-4" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">Navigate</p>
          <ul className="mt-4 space-y-2.5">
            {primaryNav.map((item) =>
              isNavGroup(item) ? (
                item.items.map((sub) => (
                  <li key={sub.href}>
                    <Link
                      href={sub.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              86-Mozang Road, Lahore
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-primary" />
              +92 42 99200192-197
            </li>
            <li className="flex items-center gap-2.5">
              <Printer className="size-4 shrink-0 text-primary" />
              +92 42 99200113
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-primary" />
              <a href="mailto:info@biselahore.com" className="hover:text-foreground">
                info@biselahore.com
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} B.I.S.E, Lahore. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Board of Intermediate &amp; Secondary Education, Lahore
          </p>
        </Container>
      </div>
    </footer>
  );
}
