---
title: "Skronk and Skreigh: Building an Irish Tune Practice Toolkit"
meta_title: "Skronk and Skreigh: Building an Irish Tune Practice Toolkit"
description: "A Python tool for managing Irish traditional music practice sessions, extracting tune sets from recordings, and creating Spotify playlists with multiple interpretations"
date: 2025-07-11
image: "/images/skronk-skreigh.png"
categories: ["Software", "Music"]
author: "pk"
tags: ["software", "bricolage", "music", "tools"]
draft: false
---

So I'm learning Irish traditional music, and here's a thing: tunes are often performed is in "sets" - groups of 2-4 tunes played back-to-back. You can't just learn "The Maid Behind the Bar" in isolation. You need to learn to play it alongside "The Silver Spear" and "The Reconciliation". You might think it's because of tradition, like "that's how Tommy Peoples plays them on that one recording from 1976". But it's not just because Tommy did it. Part of the musicality expressed in Irish trad is which tunes you put together - how they flow into each other, the key relationships, the emotional arc.

The Foinn 1 book alone has 116 tunes. That's overwhelming when you're starting out. You need to break it into chunks you can actually handle. Plus, sessions often announce their sets ahead of time, or have tunes that show up every week. You want to prepare for those, not just randomly flail through a tune book.

## The specific hell this solves

I built skronk-and-skreigh (named after the sounds I make while practicing - and it also evokes two animal friends, like in the above pic lulz) to solve one core problem: how do I collect the tunes I want to learn into something repeatable and regimented? It's automating what I'd do manually to prepare for a session - finding recordings, extracting the specific sets, creating practice loops.

When I get home from a session, I add the tunes I didn't know (and the sets from Foinn 1) immediately while they're fresh. The tool uses simple markdown files - one catalogs tune sets with timestamps, another specifies what I want to practice this week. Comment out sets when you're sick of them. FFmpeg does the extraction and stitching.

But here's where it got interesting. I was using this as a test case for Claude Code - building something I knew I could build myself, to evaluate the tool properly. Claude kept suggesting tunes that weren't from the standard books, which annoyed me at first. Then I realized: that's actually useful. Different interpretations help you understand the tune's bones and make the underlying melody stick in your head where it belongs.

So I added the Spotify integration. The --overload flag creates playlists with N versions of each tune from different artists. I can solve for hunting for the tunes, but I can't filter out all the versions of "The Butterfly" that sound like a MIDI file from 1997. That's on you.

## The nerdy bits

Python, because of course. FFmpeg for the audio extraction - it's the swiss army knife of audio processing and I'm not reinventing that wheel. The Spotify integration uses OAuth2, which is exactly as annoying as you remember. Spotipy makes it tolerable.

The BPM detection turned into a rabbit hole. Irish music has this tempo ambiguity problem - is that reel at 116 or 232 BPM? Depends if you're counting every beat or every other beat. So I implemented four different librosa-based detection methods and let them fight it out. But honestly? The results were wildly inconsistent - off by an average of ~15 BPM when I spot-checked. Open area for improvement.

This also convinced me not to attempt key detection. Irish tunes are often modal - they don't follow standard major/minor patterns but use modes like Dorian or Mixolydian. A tune might technically be "in D" but use a C natural throughout, making it D Dorian. Automated key detection gets confused by this, and frankly, so do I.

The whole thing parses markdown files, because I refuse to use JSON for something I need to edit constantly. Each tune set has a type (reel, jig, hornpipe), number, list of tunes, and timestamp. Dead simple.

Architecture-wise, it's deliberately boring. Core logic for matching and extracting, separate module for Spotify, another for BPM detection. Each does one thing. No frameworks, no magic, just functions that take data and return data.

I put it up at https://github.com/paulkarayan/skronk-and-skreigh. It's built for me, but if it's useful to you, please use it and ask questions. We'll see where it takes us.