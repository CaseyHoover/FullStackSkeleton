#!/bin/bash
# Warns if .env.local has empty values — sourced from .zshrc and pnpm dev
ENV_FILE="/workspace/.env.local"

if [[ ! -f "$ENV_FILE" ]]; then
  echo ""
  echo "⚠️  .env.local not found — run the devcontainer setup or create it manually."
  echo ""
  return 1 2>/dev/null || exit 1
fi

missing=()
while IFS='=' read -r key value; do
  [[ -z "$key" || "$key" == \#* ]] && continue
  [[ -z "$value" ]] && missing+=("$key")
done < "$ENV_FILE"

if [[ ${#missing[@]} -gt 0 ]]; then
  echo ""
  echo "⚠️  .env.local has empty values: ${missing[*]}"
  echo "   Fill them in before running 'pnpm dev'"
  echo ""
  return 1 2>/dev/null || exit 1
fi

# Rebuild if .env.local is newer than the last build
if [[ "$ENV_FILE" -nt /workspace/apps/web/.next ]]; then
  echo ""
  echo "🔄 .env.local changed since last build — rebuilding..."
  echo ""
  pnpm build
fi
