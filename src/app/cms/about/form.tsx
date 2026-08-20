"use client";

import { z } from "zod";
import { Plus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { EntityFormSheet } from "@/components/cms/entity-form-sheet";
import { createAboutSection, updateAboutSection } from "./actions";

const formSchema = z.object({
  slug: z.string().trim().min(1, "Required"),
  title: z.string().trim().min(1, "Required"),
  bodyText: z.string().trim(),
  listItemsText: z.string().trim(),
  ordered: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});

type Values = z.infer<typeof formSchema>;

export interface AboutSectionValues {
  slug: string;
  title: string;
  body: string[];
  listItems?: string[] | null;
  ordered: boolean;
  sortOrder: number;
  isPublished: boolean;
}

function toFormValues(values: AboutSectionValues): Values {
  return {
    slug: values.slug,
    title: values.title,
    bodyText: values.body.join("\n\n"),
    listItemsText: (values.listItems ?? []).join("\n"),
    ordered: values.ordered,
    sortOrder: values.sortOrder,
    isPublished: values.isPublished,
  };
}

function fromFormValues(values: Values): AboutSectionValues {
  const body = values.bodyText.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const listItems = values.listItemsText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return {
    slug: values.slug,
    title: values.title,
    body,
    listItems: listItems.length > 0 ? listItems : undefined,
    ordered: values.ordered,
    sortOrder: values.sortOrder,
    isPublished: values.isPublished,
  };
}

function Fields({ form }: { form: import("react-hook-form").UseFormReturn<Values> }) {
  return (
    <>
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug (unique id)</FormLabel>
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
        name="bodyText"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Body</FormLabel>
            <FormControl>
              <Textarea {...field} rows={8} />
            </FormControl>
            <FormDescription>Separate paragraphs with a blank line.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="listItemsText"
        render={({ field }) => (
          <FormItem>
            <FormLabel>List items (optional)</FormLabel>
            <FormControl>
              <Textarea {...field} rows={5} />
            </FormControl>
            <FormDescription>One item per line.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ordered"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-3">
            <Label htmlFor="ordered" className="cursor-pointer">
              Numbered list
            </Label>
            <FormControl>
              <Switch id="ordered" checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
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

export function CreateAboutSectionForm({ nextSortOrder }: { nextSortOrder: number }) {
  return (
    <EntityFormSheet
      schema={formSchema}
      defaultValues={{ slug: "", title: "", bodyText: "", listItemsText: "", ordered: false, sortOrder: nextSortOrder, isPublished: true }}
      onSubmit={(data) => createAboutSection(fromFormValues(data))}
      title="New section"
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

export function EditAboutSectionForm({ id, values }: { id: number; values: AboutSectionValues }) {
  return (
    <EntityFormSheet
      schema={formSchema}
      defaultValues={toFormValues(values)}
      onSubmit={(data) => updateAboutSection(id, fromFormValues(data))}
      title="Edit section"
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
