import type { Metadata } from "next";
import { FileText } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { resultStats, type ResultLink } from "@/lib/result-stats-data";

export const metadata: Metadata = {
  title: "Result Statistics | BISE Lahore",
  description: "Board-wide result statistics for Matric and Intermediate, 2020–2025.",
};

function Cell({ link }: { link: ResultLink }) {
  if (!link.href) {
    return <span className="text-muted-foreground">—</span>;
  }
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-primary hover:underline"
    >
      <FileText className="size-3.5" />
      {link.label}
    </a>
  );
}

export default function ResultStatisticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Data"
        title="Result Statistics"
        description="Board-wide result statistics for Matric and Intermediate examinations, 2020–2025."
        breadcrumbs={[{ label: "Result Statistics" }]}
      />
      <Section>
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/60 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <th rowSpan={2} className="px-4 py-3 align-bottom sm:px-6">
                    Year
                  </th>
                  <th colSpan={3} className="border-l border-border px-4 py-2 text-center sm:px-6">
                    Matric
                  </th>
                  <th colSpan={3} className="border-l border-border px-4 py-2 text-center sm:px-6">
                    Intermediate
                  </th>
                </tr>
                <tr className="border-b border-border bg-secondary/60 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <th className="border-l border-border px-4 py-2 sm:px-6">9th</th>
                  <th className="px-4 py-2 sm:px-6">10th</th>
                  <th className="px-4 py-2 sm:px-6">2nd Annual</th>
                  <th className="border-l border-border px-4 py-2 sm:px-6">11th</th>
                  <th className="px-4 py-2 sm:px-6">12th</th>
                  <th className="px-4 py-2 sm:px-6">2nd Annual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {resultStats.map((row) => (
                  <tr key={row.year} className="hover:bg-secondary/40">
                    <td className="px-4 py-3 font-medium sm:px-6">{row.year}</td>
                    <td className="border-l border-border px-4 py-3 sm:px-6">
                      <Cell link={row.ssc9th} />
                    </td>
                    <td className="px-4 py-3 sm:px-6">
                      <Cell link={row.ssc10th} />
                    </td>
                    <td className="px-4 py-3 sm:px-6">
                      <Cell link={row.sscSupply} />
                    </td>
                    <td className="border-l border-border px-4 py-3 sm:px-6">
                      <Cell link={row.hssc11th} />
                    </td>
                    <td className="px-4 py-3 sm:px-6">
                      <Cell link={row.hssc12th} />
                    </td>
                    <td className="px-4 py-3 sm:px-6">
                      <Cell link={row.hsscSupply} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </>
  );
}
