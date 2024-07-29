---
title: "All about how I use VSCode - especially the integrated terminal"
meta_title: "All about how I use VSCode - especially the integrated terminal"
description: ""
date: 2024-07-07
image: "images/vscode-logo.png"
categories: ["Blog", "Software", "Gear"]
author: "pk"
tags: ["software", "time savings", "gear", "tek"]
draft: false
---

At the core of my development is VSCode, iterm2, and zsh. What killer app got me to stick with VSCode? Probably the integrated terminal - and this sickness... 

# VSCode's killer app

I realised that i relied a ton on terminal history, and as i ssh'ed my way to different places, I would lose it. so i started to use vscode and execute my "notes" in the integrated terminal. that way i had something that persisted across machines. here's the crux:

```
# run line in console
ctrl + b
```

You can do this by setting:
```
VSCODE keybindings
        { "key": "ctrl+shift+b", "command": "workbench.action.terminal.runActiveFile" },
        { "key": "ctrl+b", "command": "workbench.action.terminal.runSelectedText" },
```


# VSCODE Plugins I actually use

- FindItFaster   # this is a new one! fuzzy search.
- python
- trailing spaces
- prettify json
- prettier
- yaml support by redhat
- python extension pack
- indent rainbow
- indenticator
- markdown lint

# more shortcuts i will use too


```
# Move around 5x as fast
alt + arrow left/right

# Select from cursor to end of line
ctrl + shift + right

# Goto line
ctrl + g

# Switch to and from terminal/text
ctrl + `

# Multi cursor
cmd + option + up/down

# Top of file, bottom of file
command + up/down

# Go to beginning of line, go to end of line
command + e

# Select all
command + a

# Select from cursor to beginning of line
ctrl + shift + right

# Select from cursor to beginning of file
ctrl + shift + up

# Select from cursor to end of file
ctrl + shift + down

# Select full current line
cmd + l

===

Select from cursor to end of line great for a nice little chord. For example, ctrl + shift + right + del will delete the line...
```


# VSCODE settings
User Settings

```
{
    "editor.renderWhitespace": "boundary",
    "window.zoomLevel": 0,
    "editor.multiCursorModifier": "ctrlCmd",
    "terminal.integrated.cursorStyle": "underline",
    "terminal.integrated.cursorBlinking": true,
    "terminal.integrated.scrollback": 5000
    "editor.rulers": [80, 120],
    "python.linting.pylintArgs": [
        "--ignore=E302,E221,E201,W291,E123,E126,E202,E203,E303,E225"
    ],
    "workbench.editor.enablePreview": false,
    "python.linting.flake8Args": ["--ignore=E501", "--verbose"]
}
```
