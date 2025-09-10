---
title: "Dock timer hack: Break email addiction with macOS automation"
meta_title: "Dock Timer Hack: Break Email Addiction with macOS Automation"
description: "A simple bash script that temporarily removes apps from your dock to break muscle memory habits and improve focus"
date: 2025-07-12
image: "/images/chainsaw.png"
categories: ["Software"]
author: "pk"
tags: ["productivity", "bash", "automation", "macos", "focus"]
draft: false
---

Every time I finish a task, my cursor drifts to that Superhuman icon like a moth to flame. It's not even conscious — just muscle memory from years of inbox-as-default-state. The worst part? I know it's happening but can't stop myself.

Notification settings don't work when the problem is _me_, not the app. Focus modes feel like overkill. What I needed was friction at exactly the right moment — something that breaks the automatic click without requiring willpower.

So I remove Superhuman from my dock for exactly one hour:

```bash
# Install dockutil if you haven't
brew install dockutil
# Remove Superhuman
dockutil --remove 'Superhuman'
# Add it back after timer
(sleep 3600 && dockutil --add /Applications/Superhuman.app) &
```

That `&` at the end is doing the heavy lifting — it backgrounds the whole thing so I can keep working. When I finish a task and reach for email, there's... nothing. Just empty dock space where my bad habit used to live.

By the time it reappears, I've usually knocked out 2-3 focused work blocks. 

Sometimes the simplest hacks are the best hacks!