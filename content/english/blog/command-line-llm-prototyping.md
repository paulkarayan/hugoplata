---
title: "llm - for command line LLM Prototyping"
meta_title: "LLM Command Line Tool: Rapid AI Prototyping with VS Code Integration"
description: "Speed up LLM prototyping with the 'llm' CLI tool - iterate prompts quickly using VS Code hotkeys"
date: 2024-08-05
image: "/images/think-2.jpg"
categories: ["Software"]
author: "pk"
tags: ["software", "bricolage", "linear"]
draft: false
---

I have been doing a lot of exploration and prototyping for "The Intelligent Enterprise" (tm mine obvi) using LLMs. One technique I'd love to share with y'all is using `llm` - a command line package - to do this.

Here's the rough setup:
```bash
brew install llm

# Paste your OpenAI API key into this
llm keys set openai

# Run a prompt
llm "Ten fun names for a pet pelican"

# Run a system prompt against a file
cat myfile.py | llm -s "Explain this code"
```

Now comes the fun part. I've got a nice setup in vs code so I can quickly run the last command in the integrated terminal.

So, what I do is take the system prompt and put it in one file (e.g. system-prompt.txt) and take the data (e.g. data.txt) that I'm working up and put it in a second file. I can simply use the cat program to cat those files together and pipe them into LLM.

```bash
cat ~/system-prompt.txt ~/data.txt | llm
```

hotkey to change back to the prompt, edit, rerun. repeat!
