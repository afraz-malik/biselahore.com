"use client";

import type { z } from "zod";
import { Plus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EntityFormSheet } from "@/components/cms/entity-form-sheet";
import { contactOfficialSchema, generalInquirySchema } from "@/lib/cms/schemas";
import { createContactOfficial, updateContactOfficial, updateGeneralInquiry } from "./actions";

type OfficialValues = z.infer<typeof contactOfficialSchema>;
type InquiryValues = z.infer<typeof generalInquirySchema>;

function OfficialFields({ form }: { form: import("react-hook-form").UseFormReturn<OfficialValues> }) {
  return (
    <>
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <FormControl>
              <Input {...field} />
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
        name="photo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Photo path (optional)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fax"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fax (optional)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} type="email" />
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

export function CreateContactOfficialForm({ nextSortOrder }: { nextSortOrder: number }) {
  return (
    <EntityFormSheet
      schema={contactOfficialSchema}
      defaultValues={{ role: "", name: "", phone: "", email: "", sortOrder: nextSortOrder, isPublished: true }}
      onSubmit={createContactOfficial}
      title="New contact"
      trigger={
        <Button type="button" size="sm">
          <Plus className="size-4" />
          New
        </Button>
      }
    >
      {(form) => <OfficialFields form={form} />}
    </EntityFormSheet>
  );
}

export function EditContactOfficialForm({ id, values }: { id: number; values: OfficialValues }) {
  return (
    <EntityFormSheet
      schema={contactOfficialSchema}
      defaultValues={values}
      onSubmit={(data) => updateContactOfficial(id, data)}
      title="Edit contact"
      trigger={
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Edit">
          <Pencil className="size-4" />
        </Button>
      }
    >
      {(form) => <OfficialFields form={form} />}
    </EntityFormSheet>
  );
}

export function EditGeneralInquiryForm({ id, values }: { id: number; values: InquiryValues }) {
  return (
    <EntityFormSheet
      schema={generalInquirySchema}
      defaultValues={values}
      onSubmit={(data) => updateGeneralInquiry(id, data)}
      title="Edit general inquiry"
      trigger={
        <Button type="button" variant="outline" size="sm">
          <Pencil className="size-4" />
          Edit
        </Button>
      }
    >
      {(form) => (
        <>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portalLabel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portal label</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portalHref"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portal link</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </EntityFormSheet>
  );
}
