---
title: "Midi Concertina - my second instrument attempt"
meta_title: "Midi Concertina - my second instrument attempt"
description: "Midi Concertina - my second instrument attempt!"
date: 2025-02-17
image: "/images/midicon.jpg"
categories: ["Software", "Music"]
author: "pk"
tags: ["software", "bricolage", "art", "accordions", "zydeco", "cajun", "instruments"]
draft: false
---

TLDR: i can play some basic metal on a midi concertina: https://youtu.be/S7r346o0ahg


## Concertinas lead the way

It's been a while since I've written about MIDI instruments (see https://paulkarayan.com/blog/brief-accordion-build-midi-music/) and I've learned a lot about what I want to build longer term since then.

One unusual source of inspiration has come from listening to a lot of concertina music, which is a diatonic smaller accordion that has more chromatic elements than the melodeons I've been playing.
Importantly:

1. Speed

it can create a very dynamic, fast paced sound - and can get some cool harmonies. People like Niall Vallely, Noel Hill, and especially the band Talisk have been inspirational. In that group, Mohsen Armini is able to create this incredibly fast, dynamic sound full of rapid fingering and a piping-style ornament ("crans"). This sounds metal af. see: https://www.youtube.com/watch?v=ZknSJwYdayI

2. Sampling

Each button corresponds to a single reed, and the sound reminds me of an oboe (which i used to play). so i am thinking: it's just sampling an oboe playing the perfect note each time. it's like a sampler!

I know this is an oversimplification, there's certainly a lot of technique involved with bellows as well as with the fingerings. But it's a useful mental model as I think about trying to build electronic instruments.


## Inspiration from the web

Scott Craver has been the most instrumental (har har) in my design thinking. You can see this is two mechanical keyboards along with a hall effect sensor to allow for the bellows mimickry (push/pull make different notes on the Anglo concertina, which is what i play)
![Scott Craver](/images/scottcraver.png)

Check it out here: https://www.youtube.com/watch?v=tUM156Rwuuk
he also uses an English Horn sound - clever! He was extremely generous to speak with me and also a security engineer!

I also have enjoyed chats with Roy Whiteley (https://www.youtube.com/watch?v=VEVKWOxbEHc) and Michael Eskin (https://michaeleskin.com/) who have been very kind with their time as well.

## The build

I, for the meantime, have been using the same VIA key mapping technique and have been using layers triggered with my thumb (which is usually used to play an air pressure release valve) instead of a sensor like Scott did.
At some point, I'll use a Hall effect sensor like as done above or some other clever thing. But that's to mimic an Anglo concertina, there are also unisonoric concertinas called the English system, which is what i've done out of sheer laziness.

So here's 50% of mine, which uses a https://www.boardsource.xyz/ Ferris Sweep, one for each hand - and blue switches for now.

![Mine](/images/midicon.jpg)

So I wanted to show that I could do something interesting here. I've started to use FL Studio with specifically the Hydra guitar from Shreddage (that runs on Native Instruments via Kontakt). I show here that I can play a fairly well-known metal tune called Blood and Thunder by Mastodon (https://www.youtube.com/watch?v=v-Su1YXQYek) albeit very poorly: https://youtu.be/S7r346o0ahg
with one hand.

I've also tried to explore some of the other options for keyboard layouts that don't look like a concertina map. One idea would be to adapt a left hand that plays sort of rhythm elements, probably a lot more of power chords and the right hand to play the solo elements. maybe some sort of combination to create the power chords (can we use a harmonizer to create the thirds and octaves?), so we're optimizing for speed as well as versatility.

I found that even the most advanced models with all of their reasoning capabilities really struggle here with correct output. There's a lot of hallucination that is fairly difficult to detect. But here's an example of a layout that we might use:

```
Drop D Optimized Layout (Example 3×5 Grid per Keyboard)
| D | A | E | B | F# |
| G | D | A | E | B |
| A | E | B | F# | C# |

Power Chord Positions in Drop D
One-Button Power Chords (Drop D Shape)

In Drop D, power chords are usually a single horizontal shape (like barring on a guitar).
This is reflected here: D-A-D, G-D-G, A-E-A can all be played as a simple sideways motion.
Standard Power Chords

The root-fifth pattern is still preserved, so you can also play power chords normally:
D-A (D power chord)
A-E (A power chord)
G-D (G power chord)
These are horizontal pairs, easy for fast playing.
Fuller Chords & Triads

Since thirds are nearby, you can easily add a major or minor third if needed.
Example:
D-A-F# (D major)
D-A-F (D minor)
A-E-C# (A major)
Fast Transitions

Moving between power chords is a single sideways move.
This setup makes it easy to gallop, chug, and slide between chords without awkward jumps.
```

You'll notice that the notes suggested aren't always correct or consistent. It's like it lacks a mental model... oh wait!

Would love any thoughts on how to do this better. cheers!
