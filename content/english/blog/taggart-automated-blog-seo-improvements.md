---
title: "Boosting Blog SEO with AI: Smarter Titles, Tags, and Meta Descriptions"
meta_title: "Boost Your Blog's Reach with AI: Smarter Titles, Tags, and SEO Insights"
description: "Discover how AI can optimize your blog's titles, meta descriptions, and tags for better SEO without losing authenticity. Learn about the tools and processes behind the transformation."
tags: ["AI", "software tools", "marketing strategies", "digital marketing", "personal reflections"]
date: 2025-01-11
image: "/images/taggart.png"
categories: ["Software"]
author: "pk"
draft: false
---

# framing - why use AI to help with tags and titles and such...

I know I'm leaving views on the table when I write my blog posts because I don't optimise 
my titles, meta titles, descriptions, or tags. These are very useful for SEO.

I do this organically - kind of like how I write - because otherwise the articles seem like inauthentic, corporate drivel. It's pretty clear what has gone through compliance review or was ghost-written!

One pretty obvious way to address this problem is to utilise AI to make suggestions after the
writing has concluded. I'm going to present my efforts on that here, and please do get in touch
if you'd make use of this tooling. I have a lot fo ideas and not as much time, so this helps me
figure out when to put the effort in!

# framing the problem in my terms

so here's an example of how I setup this very blog post in Hugo (which is how i make this 
labour of love here you're reading)

Here is the metadata I put for the 1st version of this blog (note that it's going to be updated
now... ooo how meta!)

```
title: "Taggart - automation blog improvements using AI"
meta_title: "Taggart - automation blog improvements using AI"
description: "Taggart - automation blog improvements using AI"
date: 2024-1-8
image: "/images/taggart.png"
categories: ["Software"]
author: "pk"
tags: ["software", "marketing", "DIY"]
draft: false
```

You can see I've used very copy-pasta approaches and the title isn't very nuanced.

I wrote a tool called "Taggart" (after the Scottish detective, natch) that takes the following steps:
1. ingests all of your blog posts
2. process the blog posts to come up with a "tag ontology" (we of the Palantir/Addepar heritage love
using this word and not always correctly) 
3. ingest the current metadata and content of a net new blog post
4. suggest improvements to the selected metadata

so in our case - let's go all meta on this - here's what we got out the other end:
```
title: "Boosting Blog SEO with AI: Smarter Titles, Tags, and Meta Descriptions"
meta_title: "Boost Your Blog's Reach with AI: Smarter Titles, Tags, and SEO Insights"
description: "Discover how AI can optimize your blog's titles, meta descriptions, and tags for better SEO without losing authenticity. Learn about the tools and processes behind the transformation."
tags: ["AI", "software tools", "marketing strategies", "digital marketing", "personal reflections"]
```

# next steps

how do we know this is better? i'm not sure. i dont know how to benchmark this, would love to
know if anyone else does... for now the proof of the pudding is in the eating!

i want to add the following:
- slug analysis (current slugs i also make up organically)
- categories vs. tags
- SaaS hosting (along with my LinkedIn tool I will publish shortly) so you can use it too
=> it'll probably go to www.piratehat.io but you can sign up for notifications on my blog
- anything you lovely readers come up with that makes sense

can you help me out, then? please email me if you're interested in this or extensions. I'd
love to co-develop this with customers, paid or otherwise. 
