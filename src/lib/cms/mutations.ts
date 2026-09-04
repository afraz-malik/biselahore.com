import "server-only";

import { asc, eq, sql } from "drizzle-orm";
import type { AnySQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";

import { db } from "@/lib/db/client";

type TableWithId = SQLiteTable & { id: AnySQLiteColumn };
type Sortable = TableWithId & {
  sortOrder: AnySQLiteColumn;
};
type SortablePublishable = Sortable & {
  isPublished: AnySQLiteColumn;
};

export function insertRow<T extends SQLiteTable>(table: T, values: T["$inferInsert"]): number {
  const result = db.insert(table).values(values).run();
  return Number(result.lastInsertRowid);
}

export function insertRowAtTop<T extends Sortable>(
  table: T,
  values: T["$inferInsert"],
  scope?: { column: AnySQLiteColumn; value: unknown }
): number {
  const bump = db.update(table).set({
    sortOrder: sql`${table.sortOrder} + 1`,
  } as Partial<T["$inferInsert"]>);

  if (scope) {
    bump.where(eq(scope.column, scope.value)).run();
  } else {
    bump.run();
  }

  const rest = { ...values } as T["$inferInsert"] & { sortOrder?: number };
  delete rest.sortOrder;
  return insertRow(table, { ...rest, sortOrder: 0 } as T["$inferInsert"]);
}

export function updateRow<T extends TableWithId>(
  table: T,
  id: number,
  values: Partial<T["$inferInsert"]>
): void {
  db.update(table).set(values).where(eq(table.id, id)).run();
}

export function deleteRow<T extends TableWithId>(table: T, id: number): void {
  db.delete(table).where(eq(table.id, id)).run();
}

export function togglePublished<T extends SortablePublishable>(table: T, id: number): void {
  const row = db
    .select({ isPublished: table.isPublished })
    .from(table)
    .where(eq(table.id, id))
    .get() as { isPublished: boolean } | undefined;

  if (!row) {
    throw new Error("Row not found.");
  }

  updateRow(table, id, { isPublished: !row.isPublished } as Partial<T["$inferInsert"]>);
}

export function reorderRow<T extends SortablePublishable>(table: T, id: number, direction: "up" | "down"): void {
  const rows = db
    .select({ id: table.id, sortOrder: table.sortOrder })
    .from(table)
    .orderBy(asc(table.sortOrder))
    .all() as { id: number; sortOrder: number }[];

  const index = rows.findIndex((r) => r.id === id);
  if (index === -1) {
    throw new Error("Row not found.");
  }

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= rows.length) {
    return;
  }

  const current = rows[index];
  const swapWith = rows[swapIndex];

  updateRow(table, current.id, { sortOrder: swapWith.sortOrder } as Partial<T["$inferInsert"]>);
  updateRow(table, swapWith.id, { sortOrder: current.sortOrder } as Partial<T["$inferInsert"]>);
}
