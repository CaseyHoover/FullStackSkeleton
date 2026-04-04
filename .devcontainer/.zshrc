export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="robbyrussell"
ZSH_DISABLE_COMPFIX=true

plugins=(git z)

source $ZSH/oh-my-zsh.sh

export PATH="$HOME/.local/bin:$PATH"
