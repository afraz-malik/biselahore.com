import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/faqs-data";

export const metadata: Metadata = {
  title: "FAQs | BISE Lahore",
  description: "Answers to common questions about results, roll number slips, corrections, and other BISE Lahore services.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Frequently Asked Questions"
        description="Quick answers about results, roll number slips, corrections, and other Board services."
        breadcrumbs={[{ label: "FAQs" }]}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <Accordion>
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground text-pretty">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </>
  );
}
