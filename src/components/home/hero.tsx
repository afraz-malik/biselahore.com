import { HeroSlider } from "@/components/hero/hero-slider";
import type { HeroSlideData } from "@/components/hero/hero-data";

export function Hero({ heroSlides }: { heroSlides: HeroSlideData[] }) {
  return <HeroSlider heroSlides={heroSlides} />;
}
