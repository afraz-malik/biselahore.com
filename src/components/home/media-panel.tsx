import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MediaPanel() {
  return (
    <div className="flex flex-col gap-7">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="aspect-video w-full">
          <iframe
            className="size-full"
            src="https://www.youtube.com/embed/DW7J_62FWr4"
            title="Strict Ban on Guess Papers — BISE Lahore"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="p-5">
          <p className="text-base font-semibold">Strict Ban on Guess Papers</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
        <p className="text-base font-semibold">Model Papers</p>
        <div className="mt-5 flex flex-col gap-3">
          <Button
            variant="secondary"
            className="justify-between"
            nativeButton={false}
            render={<Link href="/model-papers/ssc" />}
          >
            Matric
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="secondary"
            className="justify-between"
            nativeButton={false}
            render={<Link href="/model-papers/hssc" />}
          >
            Intermediate
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
