#!/bin/bash
# Generates .env.local with defaults — runs via onCreateCommand
ENV_FILE="/workspace/.env.local"

if [[ -f "$ENV_FILE" ]]; then
  exit 0
fi

AUTH_SECRET=$(openssl rand -base64 32)

cat > "$ENV_FILE" <<EOF
BETTER_AUTH_SECRET=$AUTH_SECRET
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
DATABASE_URL=postgresql://skeleton:skeleton@localhost:5432/skeleton
EOF
