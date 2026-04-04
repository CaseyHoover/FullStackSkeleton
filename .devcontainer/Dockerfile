FROM node:24-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       git \
       curl \
       openssl \
       ca-certificates \
       zsh \
    && rm -rf /var/lib/apt/lists/*

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

RUN git config --global --add safe.directory /workspace

COPY .devcontainer/.zshrc /root/.zshrc

RUN corepack enable && corepack prepare pnpm@10.8.1 --activate
