"use client";

import { Plus, Pencil } from "lucide-react";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EntityFormSheet } from "@/components/cms/entity-form-sheet";
import { heroSlideSchema } from "@/lib/cms/schemas";
import { createHeroSlide, updateHeroSlide } from "./actions";

type Values = z.infer<typeof heroSlideSchema>;

function Fields({ form }: { form: import("react-hook-form").UseFormReturn<Values> }) {
  return (
    <>
      <FormField
        control={form.control}
        name="eyebrow"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Eyebrow</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} rows={3} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="backgroundImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Background image path</FormLabel>
            <FormControl>
              <Input {...field} placeholder="/hero/slide1.jpg" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="imageAlt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image alt text</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="primaryCtaLabel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary CTA label</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="primaryCtaHref"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary CTA link</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="secondaryCtaLabel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Secondary CTA label (optional)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="secondaryCtaHref"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Secondary CTA link (optional)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="isPublished"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-3">
            <Label htmlFor="isPublished" className="cursor-pointer">
              Published
            </Label>
            <FormControl>
              <Switch id="isPublished" checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}

export function CreateHeroSlideForm({ nextSortOrder }: { nextSortOrder: number }) {
  return (
    <EntityFormSheet
      schema={heroSlideSchema}
      defaultValues={{
        eyebrow: "",
        title: "",
        description: "",
        backgroundImage: "",
        imageAlt: "",
        primaryCtaLabel: "",
        primaryCtaHref: "",
        sortOrder: nextSortOrder,
        isPublished: true,
      }}
      onSubmit={createHeroSlide}
      title="New hero slide"
      trigger={
        <Button type="button" size="sm">
          <Plus className="size-4" />
          New
        </Button>
      }
    >
      {(form) => <Fields form={form} />}
    </EntityFormSheet>
  );
}

export function EditHeroSlideForm({ id, values }: { id: number; values: Values }) {
  return (
    <EntityFormSheet
      schema={heroSlideSchema}
      defaultValues={values}
      onSubmit={(data) => updateHeroSlide(id, data)}
      title="Edit hero slide"
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
