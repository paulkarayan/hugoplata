---
title: "That one where a Slack quotes formatting screws your code up again..."
meta_title: "That one where a slack formatting issue screws you again..."
description: "That one where a slack formatting issue screws you again..."
date: 2025-04-03
image: "images/smartquotes.png"
categories: ["Software"]
author: "pk"
tags: ["software", "time savings", "gear", "tek", "slack"]
draft: false
---

Beautiful Edit: 
I've upgraded to macOS 15.4 (24E248) and the slack native client appears to be honouring the system config!
> defaults write NSGlobalDomain
Thank you to Michael Schwegel!

Prior:
If you’ve ever copied and pasted code snippets to and from Slack, only to find that your code chokes when you excute it, you're not alone.

The largest culprit? Slack’s auto-formatting of plain double quotes (") into “smart quotes” (“ and ”). We got bit by one during a high stakes database operation just this week!

While this might make your writing look prettier in chat (hot take: it doesn't), it wreaks havoc in programming. Code expects plain ASCII characters, and these curly quotes are entirely different Unicode characters. They can silently break scripts, JSON, shell commands, and config files — and are especially maddening because they look so similar.

## What's actually happening?

Slack tries to help by auto-replacing straight quotes with typographically correct curly quotes. This is arguably great for English prose, but disastrous for code — especially when you’re copying something like:

```json
{ “name”: “Paul” }
```

This looks fine, but your JSON parser will choke on it.

```json
{ "name": "Paul" }
```
^^ This is what you wanted. Typography be damned! 


## Is there a fix?

Not really. At time of writing, Slack doesn’t provide a setting to turn this off in messages — but code blocks (i.e. wrapping in ```) will work.

you could also set some formatting rules in your editor (see what i did with CSS in this page???), or do something like this:
```
def fix_quotes(text):
    return text.replace("“", '"').replace("”", '"').replace("‘", "'").replace("’", "'")
```
but I find myself using find/replace.



