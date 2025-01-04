---
title: "SlackZen - just leave (tm) - and the noise of the modern office"
meta_title: "SlackZen - just leave (tm)"
description: "SlackZen - just leave (tm). experience to clean feeling of just leaving a bunch of slack channels"
date: 2025-01-03
image: "images/slackzen.png"
categories: ["Blog", "Software", "Gear"]
author: "pk"
tags: ["software", "time savings", "gear", "marimo", "notebooks"]
draft: false
---

## TLDR: Check out the code on [GitHub](https://github.com/paulkarayan/marimo-tricks/blob/main/slackzen.py).
It even worked at one point in time! Please take a look and hopefully it's useful to you.

## On a new type of office noise
One of the most common complaints I hear is how noisy Slack can be. It's not so much the pace, 
though that's part of it - it's the volume and the signal/noise ratio. Filtering out people
having a conversation versus trying to provide important updates can be difficult. 

It's not limited to Slack. I have seen the same issues with every other communication modality, including email (oh my goodness the threading is still awful), and in-person (ever had someone take a conference call on speakerphone next to you in the office?). It gets worse when you layer on multiple different systems that all demand your attention! The article [Modern Work Fucking Sucks](https://medium.com/westenberg/modern-work-fucking-sucks-2560da424a82) does the best job of describing the amount of information overload particularly across multiple systems that don't play nicely together (thanks Colton Evans for sharing with me). As in the memes, it's particularly funny given the names of these tools border on the absurd sometimes! 

In DevOps and Information Security, we spend an awful lot of time tuning monitoring and alerting systems to avoid these problems. You really do have to spend some time cultivating a good environment when you don't have the luxury of ignoring important information. The [Google SRE book](https://sre.google/sre-book/table-of-contents/) has some chapters which form a good starting point for a deeper dive.

But today, in the spirit of the new year, I wanted to share a radical idea: just leave.
Behold! SlackZen is a tool that I put into Marimo (yay) that prunes your slack channels down to just a whitelist of basic channels. 

You can use it anytime you need to regain some sanity, get to that baseline you can't live without, and slowly add yourself back in. Some of my favourite zen quotes are also included to add peace to your busy life. Aren't I kind?

This highlights what I love about [Marimo](https://www.marimo.io), as well - after setting your minimal set of channels you want to be a part of in code, you get a nice GUI to use!

![SlackZen GUI](/images/slackzen-gui.png)

Go back and check that code out now.

