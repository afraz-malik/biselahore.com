#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "==> Pulling latest changes..."
git pull

echo "==> Installing dependencies..."
npm i

# Ubuntu 20.04 (glibc 2.31): npm's better-sqlite3 prebuild needs GLIBC 2.33,
# and the default gcc 9 cannot compile Node 24 addons (needs C++20).
if ! node -e "require('better-sqlite3')(':memory:').close()" >/dev/null 2>&1; then
  echo "==> Rebuilding better-sqlite3 from source (g++-10)..."
  (cd node_modules/better-sqlite3 && CXX=g++-10 CC=gcc-10 npm run build-release)
  cp -f node_modules/better-sqlite3/build/Release/better_sqlite3.node \
    node_modules/better-sqlite3/prebuilds/linux-x64.node
fi

echo "==> Applying database migrations (production DB)..."
NODE_ENV=production npm run db:migrate

echo "==> Seeding database (no-op if already seeded)..."
NODE_ENV=production npm run db:seed

echo "==> Building..."
npm run build

echo "==> Restarting PM2 (biselahore.com)..."
pm2 restart biselahore.com

echo "==> Deploy complete."
pm2 status biselahore.com
