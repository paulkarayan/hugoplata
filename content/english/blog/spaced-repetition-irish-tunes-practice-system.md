---
title: "Building a spaced repetition system for learning Irish tunes"
date: 2026-01-19
description: "How memory science informed a practice tool that cycles through 400+ traditional Irish tunes on a forgetting-curve schedule"
categories: ["Music", "Software"]
tags: ["music", "software", "tools", "automation"]
image: "/images/skronk-skreigh.png"
draft: false
---

I spent a week in New York recently and hit two sessions: [The Landmark Tavern](https://thelandmarktavern.com/) on Monday (Don Meade in Hell's Kitchen) and [Mary O's](http://www.maryossession.com/) on Thursday (Avenue A, super friendly folks and a PVC pipes setup).

I knew maybe 15% of what they played at the Landmark. Recorded a bunch of tunes on my phone so I could figure out what they were later. But "figure out what they were later" turned into a research project about how memory actually works, which turned into building a tool, which is what this post is about.

## The memory science (condensed)

I went down a rabbit hole about musical memory. A few things stood out:

**Your brain uses multiple memory systems for music.** Auditory memory (the internal "sound"), motor memory (finger patterns), and analytical memory (structure, harmony). Over-relying on any single system creates vulnerability. This is why tunes learned purely from sheet music can evaporate under pressure — you've only engaged visual decoding, not the deeper auditory encoding.

**Chunking determines capacity.** Working memory holds about 4±1 meaningful chunks. For music, those chunks are phrases. When you recognize "ascending scale", you're compressing multiple notes into single retrievable units. Irish tunes helpfully chunk themselves into 2-bar phrases within an AABB structure.

**Spaced repetition beats massed practice.** The Ebbinghaus forgetting curve shows that reviewing material at expanding intervals (Day 1 → 3 → 7 → 14 → 30) creates dramatically stronger retention than cramming. In the absence of being immersed in the tradition, seems like a good bet!

**Know the tune before you play it.** This one comes from traditional pedagogy more than lab research, but it keeps showing up: master players say "if you can hum it, you can play it." The sequence is listen → sing/lilt → play. Not the reverse.

## What I wanted

A system that would:
1. **Cycle tunes through my ears** on a spaced repetition schedule — not random shuffle, but "you haven't heard The Maid Behind the Bar in 14 days, time for a refresher"
2. **Separate listening from learning** — Spotify for passive absorption, YouTube tutorials for active practice
3. **Handle the mess of tune names** — "The Shannon Breeze" and "Rolling on the Ryegrase" are the same tune (or might not be, depending on who you ask). or try "Pipe on the Hob" since there are two separate tunes with that nume.

## The system I built

The core is simple: a JSON file for state that's tracking when I last reviewed each tune, and a cli that builds today's practice playlist based on the forgetting curve.

**Spaced repetition intervals:** [1, 3, 7, 14, 30] days. After you "learn" a tune (mark it as reviewed), it shows up again tomorrow, then 3 days later, then a week, then two weeks, then monthly. Miss a review and it resets. This directly implements the Ebbinghaus curve.

**Two-phase practice:** The tool pulls from my Spotify "learning" playlist for the listening phase — tunes I want to absorb but haven't actively practiced yet. Then for the playing phase, it generates a page with links to [Hatao's YouTube tutorials](https://www.youtube.com/@hatao).

Hatao is a Japanese flute player who's created 600+ tutorial videos with a brilliant three-layer structure for each tune:
- Tune played with sheet music on screen
- Tune played without score (just audio)
- Guitar accompaniment only (you play along)

This maps directly to the research i found: visual scaffold → auditory internalization → active production. He helpfully provides a spreadsheet that I also use to send myself the Tune of the Day - but that's for another time.

**Name resolution:** Irish tunes have aliases, regional variants, and alternate spellings. Could be "The Merry Blacksmith" vs "The Blacksmith" vs "An Gabha" (the Irish title). I sync with [TheSession.org](https://thesession.org)'s tune database — they've done the hard work of cataloging 10,000+ tunes with all their alternate names. When I search for a tune, fuzzy matching finds it even if I spell it wrong or use a different title. It's not perfect, and I do find gaps in the Recordings especially but sort of an orthogonal problem, that.

## What I might open source

Two components seem potentially useful to others:

**The SRS scheduling engine:** Generic spaced repetition logic that could work for any domain. Takes a list of items with review timestamps, returns which ones are due today. I'm sure there's a library for this but it was easy enough to build.

**The tune name resolver:** Name matching against TheSession database. Feed it a messy tune name, get back the canonical version plus aliases with some thresholding and comparing to TheSession recordings (which is a good way to deal with how bad Spotify search is!)

If you're interested in either component, let me know — I'll clean them up and put them on GitHub.

There's also a side benefit I didn't anticipate: when the fuzzy matcher *fails* to find a tune in TheSession, that's interesting. I've got prototypes for flagging these "not in the database" recordings — could be useful updating TheSession in the future, but would require some manual curation work.

## Six months later...

I hope I know maybe 40% of what gets played at these NYC sessions. Still not enough to keep up with everything, maybe not even enough to play each of the tunes (especially at speed) - but enough to really learn from the common sets.

The system doesn't solve the hard part, which is actually playing the tunes well. My concertina still sounds like my Siamese in distress sometimes. But at least I know *which* tune I'm butchering!

