import { defineConfig } from "drizzle-kit";

import { resolveCmsDbPath } from "./src/lib/db/path";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: resolveCmsDbPath(),
  },
});
