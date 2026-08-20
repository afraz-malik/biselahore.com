"use client";

import { z } from "zod";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { EntityFormSheet } from "@/components/cms/entity-form-sheet";
import { updateOfficial } from "./actions";

const formSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  title: z.string().trim().min(1, "Required"),
  appointment: z.string().trim().min(1, "Required"),
  imageSrc: z.string().trim().min(1, "Required"),
  email: z.string().trim().email("Must be a valid email"),
  phone: z.string().trim().min(1, "Required"),
  messageText: z.string().trim(),
  breadcrumbLabel: z.string().trim().min(1, "Required"),
  isPublished: z.boolean().default(true),
});

type Values = z.infer<typeof formSchema>;

export interface OfficialValues {
  roleSlug: "chairman" | "secretary" | "controller";
  name: string;
  title: string;
  appointment: string;
  imageSrc: string;
  email: string;
  phone: string;
  messageParagraphs: string[];
  breadcrumbLabel: string;
  isPublished: boolean;
}

function Fields({ form }: { form: import("react-hook-form").UseFormReturn<Values> }) {
  return (
    <>
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
        name="appointment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Appointment</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="breadcrumbLabel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Breadcrumb label</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="imageSrc"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Portrait image path</FormLabel>
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
        name="messageText"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea {...field} rows={10} />
            </FormControl>
            <FormDescription>Separate paragraphs with a blank line.</FormDescription>
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

export function EditOfficialForm({ id, values }: { id: number; values: OfficialValues }) {
  return (
    <EntityFormSheet
      schema={formSchema}
      defaultValues={{
        name: values.name,
        title: values.title,
        appointment: values.appointment,
        imageSrc: values.imageSrc,
        email: values.email,
        phone: values.phone,
        messageText: values.messageParagraphs.join("\n\n"),
        breadcrumbLabel: values.breadcrumbLabel,
        isPublished: values.isPublished,
      }}
      onSubmit={(data) =>
        updateOfficial(id, {
          roleSlug: values.roleSlug,
          name: data.name,
          title: data.title,
          appointment: data.appointment,
          imageSrc: data.imageSrc,
          email: data.email,
          phone: data.phone,
          messageParagraphs: data.messageText
            .split(/\n{2,}/)
            .map((p) => p.trim())
            .filter(Boolean),
          breadcrumbLabel: data.breadcrumbLabel,
          isPublished: data.isPublished,
        })
      }
      title={`Edit ${values.title}`}
      trigger={
        <Button type="button" variant="outline" size="sm">
          <Pencil className="size-4" />
          Edit
        </Button>
      }
    >
      {(form) => <Fields form={form} />}
    </EntityFormSheet>
  );
}
