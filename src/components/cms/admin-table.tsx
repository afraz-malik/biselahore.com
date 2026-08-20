import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface AdminColumn<TRow> {
  header: string;
  render: (row: TRow) => React.ReactNode;
  className?: string;
}

export function AdminTable<TRow extends { id: number }>({
  rows,
  columns,
  actions,
  emptyMessage = "Nothing here yet.",
}: {
  rows: TRow[];
  columns: AdminColumn<TRow>[];
  actions?: (row: TRow, index: number) => React.ReactNode;
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.header} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
              {actions ? <TableHead className="w-px text-right">Actions</TableHead> : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.header} className={col.className}>
                    {col.render(row)}
                  </TableCell>
                ))}
                {actions ? (
                  <TableCell className="whitespace-nowrap text-right">{actions(row, index)}</TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
