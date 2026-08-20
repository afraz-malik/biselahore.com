"use client";

import { useState, useTransition } from "react";
import {
  useForm,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  type Resolver,
  type UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function zodFormResolver<TValues extends FieldValues>(schema: z.ZodType<TValues>): Resolver<TValues> {
  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    const errors: FieldErrors<TValues> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".") || "root";
      if (!(path in errors)) {
        (errors as Record<string, { type: string; message: string }>)[path] = {
          type: issue.code,
          message: issue.message,
        };
      }
    }
    return { values: {}, errors };
  };
}

export function EntityFormSheet<TSchema extends z.ZodType<FieldValues>>({
  schema,
  defaultValues,
  onSubmit,
  trigger,
  title,
  description,
  children,
  submitLabel = "Save",
}: {
  schema: TSchema;
  defaultValues: DefaultValues<z.infer<TSchema>>;
  onSubmit: (values: z.infer<TSchema>) => Promise<void>;
  trigger: React.ReactElement;
  title: string;
  description?: string;
  children: (form: UseFormReturn<z.infer<TSchema>>) => React.ReactNode;
  submitLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  type Values = z.infer<TSchema>;
  const form = useForm<Values>({
    resolver: zodFormResolver<Values>(schema as unknown as z.ZodType<Values>),
    defaultValues,
  });

  function handleSubmit(values: z.infer<TSchema>) {
    startTransition(async () => {
      try {
        await onSubmit(values);
        toast.success("Saved");
        setOpen(false);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Could not save.");
      }
    });
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          form.reset(defaultValues);
        }
      }}
    >
      <SheetTrigger render={trigger} />
      <SheetContent className="flex w-full flex-col overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description ? <SheetDescription>{description}</SheetDescription> : null}
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4"
          >
            {children(form)}
            <SheetFooter className="mt-auto px-0">
              <Button type="submit" disabled={pending}>
                {pending ? "Saving…" : submitLabel}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
