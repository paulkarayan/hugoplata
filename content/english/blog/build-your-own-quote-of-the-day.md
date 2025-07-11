---
title: "build your own quote of the day + reminder system"
meta_title: "build your own quote of the day"
description: "build your own quote of the day"
date: 2025-01-18
image: "/images/quoter.png"
categories: ["Fun", "Productivity"]
author: "pk"
tags: ["quotes", "pipedream", "workflows"]
draft: false
---

I enjoy this Daily Zen quotes site - a Slack reminder pushes me to explore my belief system and also produces many of the quotes I include here:
https://www.dailyzen.com/

but can i make one on my own?

# the pipedream

Of course I make stuff like this at work all the time, but for a fun project I don't want to fuss with infrastructure. I use www.pipedream.com to run actions on a cron or in response to events - the sort of stuff i'd recommend people use Zapier for if they're less technical, or run on a Lambda if they want it to be super scalable / cheap. Their CEO is cool, too :)

Here's what the flow looks like:

![1](/images/quoter.png)

and some code for pipedream:

```
import random

def handler(pd: "pipedream"):
    print(pd.steps["trigger"]["context"]["id"])

    quotes = [
        "Just Do(nt qu)It",
        "Never delegate understanding. –Charles Eames",
        "Zen mind is not Zen mind.\nThat is, if you are attached to Zen mind,\nThen you have a problem,\nAnd your way is very narrow.\nThrowing away Zen mind\nIs correct Zen mind.\nOnly keep the question,\n“What is the best way of helping other people?”\n\nSeung Sahn",
        "Don’t seek enlightenment, just drop your illusions.\n- Sawaki",
        # Add all your existing quotes here...
    ]

    return random.choice(quotes)

```

in other cases i've had an LLM make some commentary of the relevance of the quote. cute!

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
