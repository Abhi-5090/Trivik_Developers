#!/usr/bin/env bash
# Builds a single self-contained index.html the client can double-click to view.
# Vite (base './') already relativises CSS url() to ./images/ ; this only needs to
# fix absolute "/images/..." strings that live in the inlined JS.
set -e
cd "$(dirname "$0")"
VITE_PREVIEW=true npm run build
# Make every /images/ reference relative for file:// use, regardless of quote style
# (JS strings, template literals) — while protecting CSS url() paths Vite already
# relativised to ./images/.
sed -i 's|\./images/|@@IMG@@|g; s|/images/|./images/|g; s|@@IMG@@|./images/|g' dist/index.html
echo "✅ Preview build ready: client/dist/  (open dist/index.html)"
