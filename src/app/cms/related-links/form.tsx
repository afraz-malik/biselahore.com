"use client";

import { Plus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EntityFormSheet } from "@/components/cms/entity-form-sheet";
import { relatedLinkSchema } from "@/lib/cms/schemas";
import { createRelatedLink, updateRelatedLink } from "./actions";

type Values = {
  group: "boards" | "organizations";
  label: string;
  href: string;
  sortOrder: number;
  isPublished: boolean;
};

function Fields({ form }: { form: import("react-hook-form").UseFormReturn<Values> }) {
  return (
    <>
      <FormField
        control={form.control}
        name="group"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Group</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="boards">Other Education Boards</SelectItem>
                <SelectItem value="organizations">Government &amp; Partner Organizations</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="label"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Label</FormLabel>
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

export function CreateRelatedLinkForm({ group, nextSortOrder }: { group: "boards" | "organizations"; nextSortOrder: number }) {
  return (
    <EntityFormSheet
      schema={relatedLinkSchema}
      defaultValues={{ group, label: "", href: "", sortOrder: nextSortOrder, isPublished: true }}
      onSubmit={createRelatedLink}
      title="New related link"
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

export function EditRelatedLinkForm({ id, values }: { id: number; values: Values }) {
  return (
    <EntityFormSheet
      schema={relatedLinkSchema}
      defaultValues={values}
      onSubmit={(data) => updateRelatedLink(id, data)}
      title="Edit related link"
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
