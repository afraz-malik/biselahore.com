"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { GalleryAlbum } from "@/lib/gallery-data";
import { cn } from "@/lib/utils";

export function GalleryGrid({ album }: { album: GalleryAlbum }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;
  const active = openIndex !== null ? album.images[openIndex] : null;

  const show = (next: number) => {
    setOpenIndex(((next % album.images.length) + album.images.length) % album.images.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {album.images.map((image, i) => (
          <button
            key={image.full}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open photo ${i + 1} from ${album.title}`}
            className="group relative aspect-4/3 overflow-hidden rounded-xl bg-muted ring-1 ring-border transition-shadow hover:ring-primary/40"
          >
            <Image
              src={image.thumb}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
              <Expand className="size-5 text-white" />
            </span>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(next) => !next && setOpenIndex(null)}>
        <DialogContent
          showCloseButton
          className="max-w-[min(94vw,1000px)] gap-0 border-none bg-black p-0 ring-0 sm:max-w-[min(94vw,1000px)]"
        >
          <DialogTitle className="sr-only">
            {active ? active.alt : album.title}
          </DialogTitle>
          {active ? (
            <div className="relative aspect-4/3 w-full sm:aspect-16/10">
              <Image
                src={active.full}
                alt={active.alt}
                fill
                sizes="94vw"
                className="object-contain"
                priority
              />
              <button
                type="button"
                onClick={() => openIndex !== null && show(openIndex - 1)}
                aria-label="Previous photo"
                className={cn(
                  "absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
                )}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => openIndex !== null && show(openIndex + 1)}
                aria-label="Next photo"
                className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
