"use client";

import type { z } from "zod";
import { Plus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EntityFormSheet } from "@/components/cms/entity-form-sheet";
import { galleryImageSchema } from "@/lib/cms/schemas";
import { createGalleryImage, updateGalleryImage } from "./actions";

type Values = z.infer<typeof galleryImageSchema>;

function Fields({ form }: { form: import("react-hook-form").UseFormReturn<Values> }) {
  return (
    <>
      <FormField
        control={form.control}
        name="full"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full image path</FormLabel>
            <FormControl>
              <Input {...field} placeholder="/gallery/01/101.jpg" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="thumb"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Thumbnail path</FormLabel>
            <FormControl>
              <Input {...field} placeholder="/gallery/01/101-1.jpg" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="alt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alt text</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export function CreateGalleryImageForm({ albumId, nextSortOrder }: { albumId: number; nextSortOrder: number }) {
  return (
    <EntityFormSheet
      schema={galleryImageSchema}
      defaultValues={{ albumId, full: "", thumb: "", alt: "", sortOrder: nextSortOrder }}
      onSubmit={createGalleryImage}
      title="New image"
      trigger={
        <Button type="button" size="sm">
          <Plus className="size-4" />
          New image
        </Button>
      }
    >
      {(form) => <Fields form={form} />}
    </EntityFormSheet>
  );
}

export function EditGalleryImageForm({ id, values }: { id: number; values: Values }) {
  return (
    <EntityFormSheet
      schema={galleryImageSchema}
      defaultValues={values}
      onSubmit={(data) => updateGalleryImage(id, data)}
      title="Edit image"
      trigger={
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Edit">
          <Pencil className="size-4" />
        </Button>
      }
    >
      {(form) => <Fields form={form} />}
    </EntityFormSheet>
  );
}
