---
title: "read my blog posts to me, please? now with command line browser cleanup action!"
meta_title: "read my blog posts to me, please?"
description: ""
date: 2024-07-6
image: "/images/think-2.jpg"
categories: ["Blog", "Software"]
author: "pk"
tags: ["software", "bricolage", "linear"]
draft: false
---

Sometimes I'm running short on time, and I'd rather listen to something while I'm doing drivel work than read it. So, I often want blog posts to be read to me, like the bougeouisie. 

For example, take the new Paul Graham piece that everyone's talking about. I found out that on the command line you can use `say` on macOS. But how do you get the contents of the web page without it reading a whole bunch of HTML crap?? 

Well you can use one of the command line browsers. I found that this works a lot better than using sed and awk

```bash
brew install w3m


w3m -dump https://paulgraham.com/foundermode html | say                                                                                  
```

this will say:

bg image(https://s.turbifycdn.com/aah/paulgraham/bel-6.gif)
[bel-7] * [bel-8]

          Founder Mode

          September 2024

          At a YC event last week Brian Chesky gave a talk that
          everyone who was there will remember. Most founders I
          talked to afterward said it was the best they'd ever
          heard. Ron Conway, for the first time in his life,
          forgot to take notes. I'm not going to try to
          reproduce it here. Instead I want to talk about a
          question it raised.

and so on...
