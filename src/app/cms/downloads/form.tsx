"use client";

import { CreateTitleHrefForm } from "@/components/cms/title-href-form";
import { downloadSchema } from "@/lib/cms/schemas";
import { createDownload } from "./actions";

export function CreateDownloadForm({ nextSortOrder }: { nextSortOrder: number }) {
  return <CreateTitleHrefForm schema={downloadSchema} onSubmit={createDownload} nextSortOrder={nextSortOrder} entityLabel="download" />;
}
