"use client";

import { CreateTitleHrefForm, EditTitleHrefForm, type TitleHrefValues } from "@/components/cms/title-href-form";
import { tenderSchema } from "@/lib/cms/schemas";
import { createTender, updateTender } from "./actions";

export function CreateTenderForm({ nextSortOrder }: { nextSortOrder: number }) {
  return <CreateTitleHrefForm schema={tenderSchema} onSubmit={createTender} nextSortOrder={nextSortOrder} entityLabel="tender" />;
}

export function EditTenderForm({ id, values }: { id: number; values: TitleHrefValues }) {
  return <EditTitleHrefForm schema={tenderSchema} values={values} onSubmit={(data) => updateTender(id, data)} entityLabel="tender" />;
}
