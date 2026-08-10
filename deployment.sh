#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "==> Pulling latest changes..."
git pull

echo "==> Installing dependencies..."
npm i

echo "==> Building..."
npm run build

echo "==> Restarting PM2 (biselahore.com)..."
pm2 restart biselahore.com

echo "==> Deploy complete."
pm2 status biselahore.com
