FROM node:25-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       git \
       curl \
       openssl \
       ca-certificates \
       zsh \
       gpg \
       bat \
    && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
       | gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
       | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get install -y --no-install-recommends gh \
    && rm -rf /var/lib/apt/lists/* \
    && curl -Lo /tmp/eza.tar.gz "https://github.com/eza-community/eza/releases/latest/download/eza_$(uname -m)-unknown-linux-gnu.tar.gz" \
    && tar -xzf /tmp/eza.tar.gz -C /usr/local/bin \
    && rm /tmp/eza.tar.gz

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

RUN git clone https://github.com/zsh-users/zsh-autosuggestions.git ${ZSH_CUSTOM:-/root/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-/root/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
    && git clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git ${ZSH_CUSTOM:-/root/.oh-my-zsh/custom}/plugins/fast-syntax-highlighting \
    && git clone --depth 1 -- https://github.com/marlonrichert/zsh-autocomplete.git ${ZSH_CUSTOM:-/root/.oh-my-zsh/custom}/plugins/zsh-autocomplete \
    && git clone https://github.com/MichaelAquilina/zsh-you-should-use.git ${ZSH_CUSTOM:-/root/.oh-my-zsh/custom}/plugins/you-should-use

COPY .devcontainer/.zshrc /root/.zshrc
COPY .devcontainer/.zsh_aliases /root/.zsh_aliases

RUN npx playwright install-deps chromium

RUN npm install -g pnpm@10.33.0
