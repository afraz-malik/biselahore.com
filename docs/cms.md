# CMS (/cms)

Password-protected admin at `/cms` for managing site content, backed by
SQLite (Drizzle ORM + `better-sqlite3`). There are two database files:

| File | Role | Git |
|---|---|---|
| `data/cms.sqlite` | Production content | Tracked / pushed to GitHub |
| `data/cms.dev.sqlite` | Local development | Gitignored |

`next start` / deploy scripts use the production file (`NODE_ENV=production`).
`next dev`, `npm run db:migrate`, and `npm run db:seed` use the dev file
unless you set `CMS_DB_PATH`.

## Links, downloads, and media — one source of truth

Every href and image path in the CMS (hero slide images, gallery photos,
official portraits, notification/download/tender links, everything) is
stored as a **full absolute URL**, computed once at seed time and then
edited directly as plain URLs in the admin forms from then on. There is no
`downloadUrl()`-style runtime helper anywhere in the app — what's in the
database is exactly what gets rendered, with no env-driven rewriting at
request time.

Relative paths in the original static source files (`/hero/slide1.jpg`,
`/downloads/notifications/...`, `/people/chairman1.jpg`, etc.) get prefixed
with `MEDIA_BASE_URL` (default `https://data.biselahore.com/dt`) exactly
once, inside `scripts/seed.ts`, via a small local `mediaUrl()` helper.
Already-absolute values (`http(s)://`, `mailto:`, `tel:`) pass through
unchanged — so external links (other boards' websites, social media, the
board's own subdomains like `sscpvt.biselahore.com`) are untouched by the
transform. If you re-seed against a different media host, set
`MEDIA_BASE_URL` before running `npm run db:seed`.

The old `/public/hero`, `/public/gallery`, `/public/people` folders are no
longer referenced by any CMS-backed page — production images are expected
to live at `MEDIA_BASE_URL` instead.

## First-time setup

1. Copy `.env.example` to `.env.local` and fill in the CMS secrets (see
   below). Do **not** put secrets in the tracked `.env` file.
2. Generate a session secret:
   ```bash
   openssl rand -base64 32
   ```
3. Generate the admin password hash:
   ```bash
   npm run cms:hash-password -- "your-chosen-password"
   ```
   Paste the output into `CMS_ADMIN_PASSWORD_HASH`.
4. Apply migrations and seed the **dev** database from the existing static content
   (or copy production if you already have one):
   ```bash
   # Option A: migrate + seed a fresh local DB
   npm run db:migrate
   npm run db:seed

   # Option B: start from the tracked production DB
   cp data/cms.sqlite data/cms.dev.sqlite
   ```
   The seed script is idempotent — it only inserts into a table if that
   table is currently empty, so re-running it after content has been edited
   in the CMS is safe and will not overwrite anything.
5. `npm run dev`, then sign in at `http://localhost:3000/cms/login`.

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `CMS_SESSION_SECRET` | yes | Random string, 32+ chars. Signs the admin session cookie. |
| `CMS_ADMIN_PASSWORD_HASH` | yes | `scrypt` hash in `salt:hash` hex format, from `npm run cms:hash-password`. |
| `CMS_DB_PATH` | no | Override DB file path. Default: `data/cms.sqlite` in production, `data/cms.dev.sqlite` otherwise. |
| `MEDIA_BASE_URL` | no | Seed-time only (never read by the app at runtime). Defaults to `https://data.biselahore.com/dt`. |

## Deploying (PM2 / `deployment.sh`)

`deployment.sh` runs `NODE_ENV=production npm run db:migrate` and
`NODE_ENV=production npm run db:seed` on every deploy (before
`npm run build`), so it always targets `data/cms.sqlite`. The seed step is a
no-op after the first successful run. Make sure the production secrets
(`CMS_SESSION_SECRET`, `CMS_ADMIN_PASSWORD_HASH`) are present in a
gitignored `.env.production.local` on the server — Next.js loads this file
automatically for both `next build` and `next start`.

Production content lives in the tracked `data/cms.sqlite`. After editing
content on the server (or locally against the prod file), checkpoint and
commit that file so GitHub stays the source of truth:

```bash
sqlite3 data/cms.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
git add data/cms.sqlite && git commit -m "Update production CMS database"
```

No changes to `ecosystem.config.cjs` or the PM2 process itself are needed.

### Native module note (`better-sqlite3`)

`better-sqlite3` compiles a native addon during `npm install` (via
`node-gyp`). This happens automatically as part of `npm i` in
`deployment.sh`. If the server's Node.js version, OS, or CPU architecture
ever changes, run `npm rebuild better-sqlite3` (or a clean `npm i`) to
recompile the addon — a stale binary will fail to load at startup with a
clear "invalid ELF header" / "wrong architecture" style error, not a silent
failure.

## Backing up the databases

The database runs in WAL mode, so it's safe to copy the file while the app
is running. Simplest options:

```bash
# Plain file copy (safe under WAL) — production
cp data/cms.sqlite data/cms.sqlite.bak-$(date +%Y%m%d)

# Or use SQLite's own consistent-snapshot backup command
sqlite3 data/cms.sqlite ".backup data/cms-backup-$(date +%Y%m%d).sqlite"

# Reset local dev from production
cp data/cms.sqlite data/cms.dev.sqlite
```

Also back up the two WAL-mode sidecar files if present
(`*.sqlite-wal`, `*.sqlite-shm`) if you're copying the raw
file rather than using `.backup`. Store ad-hoc backups outside the repo
directory (they're gitignored and won't be picked up by `git`).

## Modules

Every content module listed in the admin sidebar (Home / Content / Pages
groups) supports list, create, edit, delete, publish/unpublish, and
reorder — except:

- **Administration** (Chairman/Secretary/Controller) — edit only, three
  fixed rows, no create/delete/reorder.
- **Contact → General Inquiry** — a single edit-only row (no list).
- **Gallery** — albums have full CRUD; each album's images are managed on
  a nested `/cms/gallery/[albumId]` page.

Public pages only render rows with `isPublished` on. Mutations call
`revalidatePath` for the affected public route(s) (`revalidatePath("/",
"layout")` for content rendered in the root layout — the announcement bar
and social sidebar — since those appear on every page).
