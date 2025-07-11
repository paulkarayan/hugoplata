---
title: "SlackZen - just leave (tm) - and the noise of the modern office"
meta_title: "SlackZen - just leave (tm)"
description: "SlackZen - just leave (tm). experience to clean feeling of just leaving a bunch of slack channels"
date: 2025-01-03
image: "images/slackzen.png"
categories: ["Software"]
author: "pk"
tags: ["software", "time savings", "gear", "marimo", "notebooks"]
draft: false
---

## TLDR: Check out the code on [GitHub](https://github.com/paulkarayan/marimo-tricks/blob/main/slackzen.py).
It even worked at one point in time! Please take a look and hopefully it's useful to you.

## On a new type of office noise
One of the most common complaints I hear is how noisy Slack can be. Both the volume and the signal/noise ratio are non ideal. Filtering out people having a conversation versus trying to provide important updates can be difficult.

But that's true beyond Slack, right? I have seen the same issues with every other communication modality, including email (oh my goodness the threading is still awful), and in-person (ever had someone take a conference call on speakerphone next to you in the office?). It gets worse when you layer on multiple different systems that all demand your attention! The article [Modern Work Fucking Sucks](https://medium.com/westenberg/modern-work-fucking-sucks-2560da424a82) does an excellent job of describing the information overload across multiple systems (thanks Colton Evans for sharing with me). It's particularly funny given the names of these tools border on the absurd sometimes!

In DevOps and Information Security, we spend an awful lot of time tuning monitoring and alerting systems to avoid these problems. You really do have to spend some time cultivating your environment when you don't have the luxury of ignoring important information. The [Google SRE book](https://sre.google/sre-book/table-of-contents/) has some chapters which form a good starting point for a deeper dive.

But today, in the spirit of the new year, I wanted to share a radical idea: just leave.
Behold! SlackZen is a tool that I put into Marimo (yay) that *prunes your slack channels down to just a minimal set*. You can use it anytime you need to regain some sanity and slowly add yourself back in. Some of my favourite zen quotes are also included to add peace to your busy life. Aren't I kind?

Finally, the project highlights what I love about [Marimo](https://www.marimo.io) - you get a nice GUI to use almost for free!

![SlackZen GUI](/images/slackzen-gui.png)

