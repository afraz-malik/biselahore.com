"use client";

import type { z } from "zod";
import { Plus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EntityFormSheet } from "@/components/cms/entity-form-sheet";

export interface TitleHrefValues {
  title: string;
  href: string;
  sortOrder: number;
  isPublished: boolean;
}

function Fields({ form }: { form: import("react-hook-form").UseFormReturn<TitleHrefValues> }) {
  return (
    <>
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
        name="href"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link</FormLabel>
            <FormControl>
              <Input {...field} placeholder="/downloads/... or https://..." />
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

export function CreateTitleHrefForm({
  schema,
  onSubmit,
  nextSortOrder,
  entityLabel,
}: {
  schema: z.ZodType<TitleHrefValues>;
  onSubmit: (values: TitleHrefValues) => Promise<void>;
  nextSortOrder: number;
  entityLabel: string;
}) {
  return (
    <EntityFormSheet
      schema={schema}
      defaultValues={{ title: "", href: "", sortOrder: nextSortOrder, isPublished: true }}
      onSubmit={onSubmit}
      title={`New ${entityLabel}`}
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

export function EditTitleHrefForm({
  schema,
  values,
  onSubmit,
  entityLabel,
}: {
  schema: z.ZodType<TitleHrefValues>;
  values: TitleHrefValues;
  onSubmit: (values: TitleHrefValues) => Promise<void>;
  entityLabel: string;
}) {
  return (
    <EntityFormSheet
      schema={schema}
      defaultValues={values}
      onSubmit={onSubmit}
      title={`Edit ${entityLabel}`}
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
