"use client";

import { Plus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EntityFormSheet } from "@/components/cms/entity-form-sheet";
import { onlineSystemSchema } from "@/lib/cms/schemas";
import { createOnlineSystem, updateOnlineSystem } from "./actions";

type Values = {
  title: string;
  href: string;
  description?: string;
  featured: boolean;
  sortOrder: number;
  isPublished: boolean;
};

function Fields({ form }: { form: import("react-hook-form").UseFormReturn<Values> }) {
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
              <Textarea {...field} rows={2} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="featured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-3">
            <Label htmlFor="featured" className="cursor-pointer">
              Featured
            </Label>
            <FormControl>
              <Switch id="featured" checked={field.value} onCheckedChange={field.onChange} />
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

export function CreateOnlineSystemForm({ nextSortOrder }: { nextSortOrder: number }) {
  return (
    <EntityFormSheet
      schema={onlineSystemSchema}
      defaultValues={{ title: "", href: "", description: "", featured: false, sortOrder: nextSortOrder, isPublished: true }}
      onSubmit={createOnlineSystem}
      title="New online system"
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

export function EditOnlineSystemForm({ id, values }: { id: number; values: Values }) {
  return (
    <EntityFormSheet
      schema={onlineSystemSchema}
      defaultValues={values}
      onSubmit={(data) => updateOnlineSystem(id, data)}
      title="Edit online system"
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
