import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Hero } from "@/components/home/hero";
import { BiseAtAGlance } from "@/components/ui/bise-at-a-glance";
import { QuickServices } from "@/components/home/quick-services";
import { ActiveSystems } from "@/components/home/active-systems";
import { NewsPreview } from "@/components/home/news-preview";
import { FacebookFeed } from "@/components/home/facebook-feed";
import { MapSection } from "@/components/home/map-section";
import { RelatedLinks } from "@/components/home/related-links";
import {
  getPublishedHeroSlides,
  getPublishedGlanceStats,
  getPublishedOnlineSystems,
  getPublishedNewsPreview,
} from "@/lib/db/queries/home";

export default async function Home() {
  const [heroSlides, glanceStats, activeSystems, newsPreview] = await Promise.all([
    getPublishedHeroSlides(),
    getPublishedGlanceStats(),
    getPublishedOnlineSystems(),
    getPublishedNewsPreview(),
  ]);

  return (
    <>
      <Hero heroSlides={heroSlides} />
      <QuickServices />
      <ActiveSystems activeSystems={activeSystems} />
      <BiseAtAGlance glanceStats={glanceStats} />
      <Section>
        <SectionHeading
          eyebrow="Community"
          title="Latest News"
          description="Recent notices, tenders, and schedule updates from the Board."
        />
        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          <NewsPreview newsPreview={newsPreview} />
          <FacebookFeed />
        </div>
      </Section>

      <MapSection />
      <RelatedLinks />
    </>
  );
}
