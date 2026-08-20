"use client";

import { useTransition } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ReorderButtons({
  id,
  canMoveUp,
  canMoveDown,
  action,
}: {
  id: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  action: (id: number, direction: "up" | "down") => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  function move(direction: "up" | "down") {
    startTransition(async () => {
      try {
        await action(id, direction);
      } catch {
        toast.error("Could not reorder.");
      }
    });
  }

  return (
    <div className="inline-flex flex-col">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Move up"
        disabled={pending || !canMoveUp}
        onClick={() => move("up")}
      >
        <ChevronUp className="size-3.5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Move down"
        disabled={pending || !canMoveDown}
        onClick={() => move("down")}
      >
        <ChevronDown className="size-3.5" />
      </Button>
    </div>
  );
}
