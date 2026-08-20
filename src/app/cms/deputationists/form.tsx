"use client";

import type { z } from "zod";
import { Plus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { EntityFormSheet } from "@/components/cms/entity-form-sheet";
import { deputationistSchema } from "@/lib/cms/schemas";
import { createDeputationist, updateDeputationist } from "./actions";

type Values = z.infer<typeof deputationistSchema>;

function Fields({ form }: { form: import("react-hook-form").UseFormReturn<Values> }) {
  return (
    <>
      <FormField
        control={form.control}
        name="no"
        render={({ field }) => (
          <FormItem>
            <FormLabel>No.</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fromDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>From (DD-MM-YYYY)</FormLabel>
            <FormControl>
              <Input {...field} placeholder="10-01-1955" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="toDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>To (blank = current / incumbent)</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ""} placeholder="08-02-1956" />
            </FormControl>
            <FormDescription>Leave blank to mark as the current incumbent.</FormDescription>
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

export function CreateDeputationistForm({
  group,
  nextSortOrder,
  nextNo,
}: {
  group: "chairmen" | "secretaries" | "ces";
  nextSortOrder: number;
  nextNo: number;
}) {
  return (
    <EntityFormSheet
      schema={deputationistSchema}
      defaultValues={{ group, no: nextNo, name: "", fromDate: "", sortOrder: nextSortOrder, isPublished: true }}
      onSubmit={createDeputationist}
      title="New entry"
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

export function EditDeputationistForm({ id, values }: { id: number; values: Values }) {
  return (
    <EntityFormSheet
      schema={deputationistSchema}
      defaultValues={values}
      onSubmit={(data) => updateDeputationist(id, data)}
      title="Edit entry"
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
