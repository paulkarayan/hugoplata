---
title: "build your own quote of the day + reminder system"
meta_title: "build your own quote of the day"
description: "build your own quote of the day"
date: 2025-01-18
image: "/images/quoter.png"
categories: ["Blog", "Fun", "Productivity"]
author: "pk"
tags: ["quotes", "pipedream", "workflows"]
draft: true
---

I enjoy this Daily Zen quotes site - a Slack reminder pushes me to explore my belief system and also produces many of the quotes I include here:
https://www.dailyzen.com/

but can i make one on my own?

# the pipedream

Of course I make stuff like this at work all the time, but for a fun project I don't want to fuss with infrastructure. I use www.pipedream.com to run actions on a cron or in response to events - the sort of stuff i'd recommend people use Zapier for if they're less technical, or run on a Lambda if they want it to be super scalable / cheap. Their CEO is cool, too :)

Here's what the flow looks like:

![1](/images/quoter.png)

# make moar quotes

i store the quotes in text files that i copy/paste in, which doesnt make for easy use in python programs - which want lists of strings in my usual thinking.

however, you can take advantage of the ability of LLMs to "translate" to go from your representation to one that can be used in a python program like the one below.

chatgpt prompt to extend my code:
```
--- this is my quoter program. please add the following quotes to it. don't duplicate. thanks. 
```

and voila!


# conclusion

let me know if you're interested... in getting quotes, in learning how to do this. i will send over more pointers and code snippets. happy coding!
