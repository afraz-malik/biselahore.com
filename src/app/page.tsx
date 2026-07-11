import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Hero } from "@/components/home/hero";
import { BiseAtAGlance } from "@/components/ui/bise-at-a-glance";
import { QuickServices } from "@/components/home/quick-services";
import { UtilityQuickAccess } from "@/components/home/utility-quick-access";
import { ActiveSystems } from "@/components/home/active-systems";
import { NewsPreview } from "@/components/home/news-preview";
import { ChairmanMessage } from "@/components/home/chairman-message";
import { MediaPanel } from "@/components/home/media-panel";
import { MapSection } from "@/components/home/map-section";
import { RelatedLinks } from "@/components/home/related-links";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickServices />
      <UtilityQuickAccess />
      <ActiveSystems />
      <BiseAtAGlance />
      <Section>
        <SectionHeading
          eyebrow="Community"
          title="News & Community"
          description="Recent notices, plus a word from the Chairman and how to stay in touch."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-6">
            <NewsPreview />
            <ChairmanMessage />
          </div>
          <MediaPanel />
        </div>
      </Section>

      <MapSection />
      <RelatedLinks />
    </>
  );
}
