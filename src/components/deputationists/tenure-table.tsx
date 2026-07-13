import { Badge } from "@/components/ui/badge";
import type { TenureRow } from "@/lib/deputationists-data";

export function TenureTable({ rows }: { rows: TenureRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              <th className="px-4 py-3 sm:px-6">#</th>
              <th className="px-4 py-3 sm:px-6">Name</th>
              <th className="px-4 py-3 sm:px-6">From</th>
              <th className="px-4 py-3 sm:px-6">To</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.no} className="hover:bg-secondary/40">
                <td className="px-4 py-3 text-muted-foreground sm:px-6">{row.no}</td>
                <td className="px-4 py-3 font-medium text-foreground sm:px-6">{row.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground sm:px-6">{row.from}</td>
                <td className="px-4 py-3 whitespace-nowrap sm:px-6">
                  {row.to ?? <Badge className="bg-primary text-primary-foreground">Incumbent</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
