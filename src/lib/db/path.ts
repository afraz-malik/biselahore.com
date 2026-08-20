import path from "node:path";

/**
 * Resolve the CMS SQLite file path.
 *
 * - `CMS_DB_PATH` wins when set (absolute or cwd-relative).
 * - Production (`NODE_ENV=production`) → `data/cms.sqlite` (tracked in git).
 * - Everything else (local `next dev`, migrate, seed) → `data/cms.dev.sqlite`
 *   (gitignored).
 */
export function resolveCmsDbPath(): string {
  const override = process.env.CMS_DB_PATH?.trim();
  if (override) {
    return path.isAbsolute(override)
      ? override
      : path.resolve(process.cwd(), override);
  }

  const file =
    process.env.NODE_ENV === "production" ? "cms.sqlite" : "cms.dev.sqlite";
  return path.join(process.cwd(), "data", file);
}
