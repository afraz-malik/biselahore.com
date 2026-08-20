import type { GalleryAlbum } from "@/lib/gallery-data";

export interface EventEntry {
  title: string;
  description: string;
  album: GalleryAlbum;
}

/** Verbatim from the legacy events.html ("Latest Events"). */
export const latestEvent: EventEntry = {
  title: "Medal Awarding Ceremony",
  description:
    "Medal Awarding Ceremony was held in the Pearl Continental, Lahore for the Position Holders of Matric (Annual) Examination, 2019 on Monday July 15, 2019.",
  album: {
    id: "SSCA19",
    date: "2019-07-15",
    title: "Medal Awarding Ceremony",
    images: Array.from({ length: 23 }, (_, i) => {
      const n = String(i + 1).padStart(2, "0");
      return {
        full: `https://data.biselahore.com/dt/events/SSCA19_${n}.JPG`,
        thumb: `https://data.biselahore.com/dt/events/SSCA19_${n}.JPG`,
        alt: `Medal Awarding Ceremony — photo ${i + 1}`,
      };
    }),
  },
};
