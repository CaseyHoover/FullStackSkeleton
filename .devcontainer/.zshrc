HISTFILE=/root/.zsh_history_data/.zsh_history
HISTSIZE=10000
SAVEHIST=10000

export ZSH="$HOME/.oh-my-zsh"
ZSH_DISABLE_COMPFIX=true
ZSH_THEME="robbyrussell"
plugins=(git zsh-autosuggestions zsh-syntax-highlighting fast-syntax-highlighting zsh-autocomplete you-should-use z)

source $ZSH/oh-my-zsh.sh

[[ -f ~/.zsh_aliases ]] && source ~/.zsh_aliases

# Warn if .env.local has empty values
source /workspace/.devcontainer/check-env.sh

