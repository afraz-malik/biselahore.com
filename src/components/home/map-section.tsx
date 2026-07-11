import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

export function MapSection() {
  return (
    <section className="border-t border-border">
      <Container className="pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Visit Us"
          title="Find BISE Lahore"
          description="86-Mozang Road, Lahore — Board of Intermediate & Secondary Education."
        />
      </Container>
      <div className="mt-8 h-[380px] w-full sm:h-[440px] md:h-[480px]">
        <iframe
          title="BISE Lahore location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1010.8004885291665!2d74.3253350534352!3d31.553973906971432!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904b1eb3bafe7%3A0x4c44fe92bd73cda9!2sBISE+Lahore!5e0!3m2!1sen!2s!4v1549314738502"
          className="h-full w-full grayscale-[15%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
