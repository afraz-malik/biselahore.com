"use client";

import type { z } from "zod";
import { Plus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EntityFormSheet } from "@/components/cms/entity-form-sheet";
import { resultStatSchema } from "@/lib/cms/schemas";
import { createResultStat, updateResultStat } from "./actions";

type Values = z.infer<typeof resultStatSchema>;

const pairs: { key: "ssc9th" | "ssc10th" | "sscSupply" | "hssc11th" | "hssc12th" | "hsscSupply"; heading: string }[] = [
  { key: "ssc9th", heading: "SSC — 9th" },
  { key: "ssc10th", heading: "SSC — 10th" },
  { key: "sscSupply", heading: "SSC — Supply" },
  { key: "hssc11th", heading: "HSSC — 11th" },
  { key: "hssc12th", heading: "HSSC — 12th" },
  { key: "hsscSupply", heading: "HSSC — Supply" },
];

function Fields({ form }: { form: import("react-hook-form").UseFormReturn<Values> }) {
  return (
    <>
      <FormField
        control={form.control}
        name="year"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {pairs.map((pair, i) => (
        <div key={pair.key} className="flex flex-col gap-3">
          {i > 0 ? <Separator /> : null}
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{pair.heading}</p>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name={`${pair.key}Label` as "ssc9thLabel"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} placeholder="e.g. 9th" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`${pair.key}Href` as "ssc9thHref"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link (blank = —)</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
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

export function CreateResultStatForm({ nextSortOrder }: { nextSortOrder: number }) {
  return (
    <EntityFormSheet
      schema={resultStatSchema}
      defaultValues={{ year: new Date().getFullYear(), sortOrder: nextSortOrder, isPublished: true }}
      onSubmit={createResultStat}
      title="New year row"
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

export function EditResultStatForm({ id, values }: { id: number; values: Values }) {
  return (
    <EntityFormSheet
      schema={resultStatSchema}
      defaultValues={values}
      onSubmit={(data) => updateResultStat(id, data)}
      title={`Edit ${values.year}`}
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
