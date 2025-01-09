---
title: "YouSum - summarising long YouTube videos to get right to the point!"
meta_title: "YouSum - summarising long YouTube videos to get right to the point!"
description: "YouSum - summarising long YouTube videos to get right to the point!"
date: 2025-1-8
image: "/images/yousum.png"
categories: ["Blog", "Software", "Marketing", "Tools"]
author: "pk"
tags: ["software", "marketing", "DIY"]
draft: false
---

# Master Your Time. Instantly Distill YouTube Knowledge.

*Save 9 minutes. Unleash your genius.*

The Problem:
YouTube titles like "Master Your Anxiety. Unleash Your Genius." promise life-changing insights, but the video is, like, 9:15 long. You know deep down that there's going to be:

- Maybe 3 bullet points of actual info.
- At least 1 unnecessarily long personal story.
- Too much dramatic pacing.

Behold! I have produced your answer:
(YouSum)[https://github.com/paulkarayan/yousum]

An example of it in use:
![yousum response](/images/yousum-two.png)

# The Project itself

I first made this as a CLI that takes a youtube video transcript, and then runs it through OpenAI. 
The prompt is quite simple:
```
You are an information extraction service. Perform the following:
STEP 0: Provide a SUMMARY of the content in 100 words or less.
STEP 1: Extract the 5-10 most interesting FACTS:
{transcript_text}
```

It's pretty damn useful. then I put a UI on it, and thought hey - this would be great to share with 
the world. 

Unfortunately, YouTube blocks grabbing the transcript if the request is from AWS IP addresses,
so my plot to save the world oodles of time was foiled within 24 hours of getting the site live.

A friend showed me that Gemini has a version of this they're testing... so maybe thats why?

Anyway - i cant host it for you but please still enjoy it!

