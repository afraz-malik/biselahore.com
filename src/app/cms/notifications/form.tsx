"use client";

import { Plus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EntityFormSheet } from "@/components/cms/entity-form-sheet";
import { notificationSchema } from "@/lib/cms/schemas";
import { createNotification, updateNotification } from "./actions";

type Values = {
  title: string;
  href: string;
  urgent: boolean;
  showOnHome: boolean;
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
        name="urgent"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-3">
            <Label htmlFor="urgent" className="cursor-pointer">
              Urgent
            </Label>
            <FormControl>
              <Switch id="urgent" checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="showOnHome"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-3">
            <Label htmlFor="showOnHome" className="cursor-pointer">
              Show on homepage
            </Label>
            <FormControl>
              <Switch id="showOnHome" checked={field.value} onCheckedChange={field.onChange} />
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

export function CreateNotificationForm({ nextSortOrder }: { nextSortOrder: number }) {
  return (
    <EntityFormSheet
      schema={notificationSchema}
      defaultValues={{ title: "", href: "", urgent: false, showOnHome: false, sortOrder: nextSortOrder, isPublished: true }}
      onSubmit={createNotification}
      title="New notification"
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

export function EditNotificationForm({ id, values }: { id: number; values: Values }) {
  return (
    <EntityFormSheet
      schema={notificationSchema}
      defaultValues={values}
      onSubmit={(data) => updateNotification(id, data)}
      title="Edit notification"
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
