export interface GalleryImage {
  full: string;
  thumb: string;
  alt: string;
}

export interface GalleryAlbum {
  id: string;
  date: string;
  title: string;
  images: GalleryImage[];
}

function album(id: string, date: string, title: string, count: number): GalleryAlbum {
  return {
    id,
    date,
    title,
    images: Array.from({ length: count }, (_, i) => {
      const n = 101 + i;
      return {
        full: `/gallery/${id}/${n}.jpg`,
        thumb: `/gallery/${id}/${n}-${n % 10}.jpg`,
        alt: `${title} — photo ${i + 1}`,
      };
    }),
  };
}

/** Legacy jssor slider albums (folders 01–03), rebuilt as a responsive grid + lightbox. */
export const galleryAlbums: GalleryAlbum[] = [
  album("03", "2021-02-24", "BISE Lahore Event — 24 February 2021", 12),
  album("02", "2021-04-03", "BISE Lahore Event — 3 April 2021", 3),
  album("01", "2021-04-06", "BISE Lahore Event — 6 April 2021", 5),
];
