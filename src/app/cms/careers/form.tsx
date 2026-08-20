"use client";

import { CreateTitleHrefForm, EditTitleHrefForm, type TitleHrefValues } from "@/components/cms/title-href-form";
import { careerSchema } from "@/lib/cms/schemas";
import { createCareer, updateCareer } from "./actions";

export function CreateCareerForm({ nextSortOrder }: { nextSortOrder: number }) {
  return <CreateTitleHrefForm schema={careerSchema} onSubmit={createCareer} nextSortOrder={nextSortOrder} entityLabel="opening" />;
}

export function EditCareerForm({ id, values }: { id: number; values: TitleHrefValues }) {
  return (
    <EditTitleHrefForm schema={careerSchema} values={values} onSubmit={(data) => updateCareer(id, data)} entityLabel="opening" />
  );
}
