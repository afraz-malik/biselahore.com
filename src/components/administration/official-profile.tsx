import Image from "next/image";
import { Building2, Mail, PhoneCall, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";

interface OfficialProfileProps {
  name: string;
  title: string;
  appointment: string;
  imageSrc: string;
  message: string[];
  email: string;
  phone: string;
  breadcrumbLabel: string;
}

export function OfficialProfile({
  name,
  title,
  appointment,
  imageSrc,
  message,
  email,
  phone,
  breadcrumbLabel,
}: OfficialProfileProps) {
  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title={name}
        description={`${title} • ${appointment}`}
        breadcrumbs={[{ label: "Administration" }, { label: breadcrumbLabel }]}
      />

      <Section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-sky-200 bg-linear-to-br from-sky-50 via-white to-blue-50 p-4 shadow-[0_30px_70px_-30px_rgba(37,99,235,0.35)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.35),transparent_35%)]" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/80 p-3 shadow-inner">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={900}
                  height={1100}
                  className="h-107.5 w-full rounded-[1.2rem] object-cover object-top"
                />
              </div>
              <div className="relative mt-4 rounded-[1.25rem] border border-sky-200/80 bg-white/80 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                  <Sparkles className="size-4" />
                  Leadership
                </div>
                <p className="mt-2 text-base font-semibold text-foreground">{name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{title}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-sky-200/80 bg-white/90 p-8 shadow-[0_25px_70px_-30px_rgba(2,132,199,0.2)] backdrop-blur md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                <Building2 className="size-4" />
                Office of the {title}
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Message from the {title}
              </h2>

              <div className="mt-6 space-y-4 text-justify text-base leading-8 text-muted-foreground">
                {message.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-sky-100 bg-linear-to-br from-sky-50 via-white to-blue-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                  Contact Information
                </p>
                <div className="mt-4 space-y-3 text-sm text-foreground">
                  <div className="flex items-center gap-3 rounded-xl bg-white/70 px-3 py-3 shadow-sm">
                    <Mail className="size-4.5 text-sky-700" />
                    <span>{email}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/70 px-3 py-3 shadow-sm">
                    <PhoneCall className="size-4.5 text-sky-700" />
                    <span>{phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
