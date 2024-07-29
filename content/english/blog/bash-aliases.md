---
title: "Aliases I have known and loved"
meta_title: "Aliases I have known and loved"
description: ""
date: 2024-07-07
image: "images/Gnu-bash-logo.png"
categories: ["Blog", "Software", "Gear"]
author: "pk"
tags: ["software", "time savings", "gear", "tek"]
draft: false
---

At the core of my development is VSCode, iterm2, and zsh. But configuring everything well is essential!
I ask thee: dost thou enjoy saving time?


```
## Prompt
# i use the zsh plugin
zsh-kubectl-prompt
# and then this 
RPROMPT='%{$fg[blue]%}($ZSH_KUBECTL_PROMPT)%{$reset_color%}'

## Github
alias gco='git checkout'
alias gcob='git checkout -b'
alias gpb='git push origin $(git rev-parse --abbrev-ref HEAD)' # pushes to current branch
alias gpbf='git push -f origin $(git rev-parse --abbrev-ref HEAD)' # force pushes to current branch
alias gcam='git add . && git commit -m' #must include commit message
alias gcrh='git checkout main && git fetch && git reset --hard origin/main'

__make_github_pr() {
  export REPOURL=$(git config --get remote.origin.url | egrep -o ':(.*).git'  | cut -d : -f 2 | cut -d . -f 1)
  export CURBRANCH=$(git rev-parse --abbrev-ref HEAD)
  curl --silent --location --output /dev/null --write-out "%{url_effective}" -G "https://github.com/${REPOURL}/compare/main...${CURBRANCH}" | xargs open
}

alias gmr=__make_github_pr

# K8s
alias k='kubectl'
alias kl='kubectl logs'
alias klf='kubectl logs --tail=200  -f'
alias k='kubectl'
alias kl='kubectl logs'
alias klf='kubectl logs --tail=200  -f'
alias kaf='kubectl apply -f'
alias ke='kubectl exec -it'
alias kg='kubectl get'
alias kd='kubectl describe'
alias kre='kubectl get pod | sort -nk 4 | grep -v "Running   0"'
alias kns="kubens"

# aws
alias asso="aws sso login --profile "
alias assod="aws sso login --profile opto-dev"
alias assop="aws sso login --profile opto-prod"
alias aukd="aws eks update-kubeconfig --name opto-dev --region us-east-2 --profile opto-dev"
alias aukp="aws eks update-kubeconfig --name opto-prod --region us-east-2 --profile opto-prod"

# misc
alias ll='ls -lash'
alias tf="terraform "
alias p="pulumi "
alias fd='find / -name' # include search term in double quotes
```

Others you might enjoy but have fallen off for me:

```
alias c='code .'

alias s='sudo'

alias ll='ls -lash'

# Easier directory jumping

alias ..='cd ..'

alias ...='cd ../..'

alias ....='cd ../../..'

alias .....='cd ../../../..'
```

and I used an expanded set of kubernetes aliases in the past I can post at some point, too. 
