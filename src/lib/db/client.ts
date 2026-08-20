import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { resolveCmsDbPath } from "./path";
import * as schema from "./schema";

const dbPath = resolveCmsDbPath();

declare global {
  var __cmsSqlite: Database.Database | undefined;
}

const sqlite = globalThis.__cmsSqlite ?? new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

if (process.env.NODE_ENV !== "production") {
  globalThis.__cmsSqlite = sqlite;
}

export const db = drizzle(sqlite, { schema });
