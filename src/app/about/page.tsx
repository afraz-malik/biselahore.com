import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { getPublishedAboutSections } from "@/lib/db/queries/about";

export const metadata: Metadata = {
  title: "About Us | BISE Lahore",
  description:
    "Establishment, jurisdiction, administrative structure, vision, and constitution of the Board of Intermediate & Secondary Education, Lahore.",
};

export default async function AboutPage() {
  const aboutSections = await getPublishedAboutSections();

  return (
    <>
      <PageHeader
        eyebrow="About the Board"
        title="About Us"
        description="The history, mandate, and governance of the Board of Intermediate & Secondary Education, Lahore."
        breadcrumbs={[{ label: "About Us" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Section navigation" className="hidden lg:block">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              On this page
            </p>
            <ul className="sticky top-28 mt-4 flex flex-col gap-1 border-l border-border pl-4">
              {aboutSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block py-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-12">
            {aboutSections.map((section) => {
              const ListTag = section.ordered ? "ol" : "ul";
              return (
                <div key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
                  <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground text-pretty">
                    {section.body.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                    {section.list ? (
                      <ListTag
                        className={
                          section.ordered
                            ? "list-decimal space-y-2.5 pl-5 marker:font-medium marker:text-foreground"
                            : "space-y-2.5 pl-5"
                        }
                      >
                        {section.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ListTag>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
