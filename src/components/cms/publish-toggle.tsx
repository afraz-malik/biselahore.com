"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Switch } from "@/components/ui/switch";

export function PublishToggle({
  id,
  isPublished,
  action,
}: {
  id: number;
  isPublished: boolean;
  action: (id: number) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Switch
      checked={isPublished}
      disabled={pending}
      onCheckedChange={() => {
        startTransition(async () => {
          try {
            await action(id);
            toast.success(isPublished ? "Unpublished" : "Published");
          } catch {
            toast.error("Could not update publish state.");
          }
        });
      }}
    />
  );
}
