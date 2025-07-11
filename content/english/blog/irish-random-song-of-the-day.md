---
title: "Irish song of the day - with google sheets and pipedream"
meta_title: "Learning an Irish song of the day - every day - with google sheets and pipedream"
description: "Learning an Irish song of the day - every day - with google sheets and pipedream"
date: 2025-04-07
image: "/images/hatao.jpg"
categories: ["Blog", "Software", "Music"]
author: "pk"
tags: ["software", "bricolage", "music", "google sheets", "pipedream"]
draft: false
---

A common trope of folk musicians is to do a Tune of the Day - it's all over youtube and it's a great resource for a beginner like me. One that stands out is [Hatao's song of the day](http://irishflute.info/), because of its breadth and quality - but also because he publishes this spreadsheet:
https://docs.google.com/spreadsheets/d/1bdquYIFZy1nfOItR9BMxazVB6aoE-rkE/edit?gid=353424089#gid=353424089


I thought it'd be fun to do this without code, so i set up a pipedream job and used this in google sheets to randomly pull and send myself an email every day.
```
=INDEX('Irish tune'!C2:D2000, RANDBETWEEN(1, ROWS('random selection'!A2:D100)), 0)
```

![configuration](/images/itm-config.png)


For a quick sample of what you might get: [click here](https://www.youtube.com/watch?v=Tw8DZfCPIog)

There's so much yet to learn, but this is a fun way to make it easier! Let me know if you want to learn more.
