---
title: "Building a Cajun Accordion I can live with... [brief edition]"
meta_title: "Building a Cajun Accordion I can live with... [brief edition]"
description: "Building a Cajun Accordion I can live with..."
date: 2024-10-26
image: "/images/numpads.png"
categories: ["Blog", "Software", "Music", "Art"]
author: "pk"
tags: ["software", "bricolage", "art", "accordions", "zydeco", "cajun", "instruments"]
draft: false
---

I made a [longer version](https://paulkarayan.com/blog/accordions-electronic-midi-music/) of this so I don't have to provide background here. i set the date to 2023-10-26 so it won't show up. and i'll link to it here when i finish it!

## Examining the Diatonic Melodeon

My obessesion with Zydeco has entered a new phase where I have both a) gotten an accordion I can live with / afford and b) continued to explore electronic and new user experiences (UX) to perform the music

Without getting into too many details, Cajun Accordions preferred by Zydeco players are typically: 
- single-row, 10 left-hand button accordions for melody
- 2 right-hand buttons for bass/chords that are more prominent in Cajun music
- diatonic - meaning they're tuned to a specific key/scale.
- bisonoric -  meaning they have a different note on the push and pull for the same button.
- 4 reeds that allow for octaves/partial chording to create rich sounds.
- Bellows to push air through the reeds to make soud, as modulated by pressed buttons


## Towards new UX on the accordion

Boundary Conditions spur all kinds of interesting innovation. Our boundary condition was that I didn't have an instrument... but also:
if you aren't restricted to 10 buttons you play with your left hand, and 2 on the right, what does this instrument look like? How does the physical User Interface" influence the musicality and songs - does lifting restrictions lead to more creativity or flatten you out with too many options?

I do enjoy working a problem by playing with it, and so i wanted to find a chassis on which i could try some new ideas.


MIDI accordions are a thing, and I was particularly interested this article:
https://www.instructables.com/Make-Your-MIDI-Accordion/
which uses arduino microcontrollers along with mechanical keyboard parts to create an instrument. so i purchased two CIDOO V-21 that can be easily repogrammed by Via (such as: https://usevia.app/) and use them to feed inputs to FL Studio. 

## Some experiments

I have tried splitting push/pull across the right and left hands, or just duplicating them on both for faster playing… nothing that's really perfect.

Here are the numpads and how i mapped them for an example
![photo of numpads](/images/numpads.png)


here's an example in Corey Ledet's tuning (E):

![Ledet key loadout](/images/key-layout-ledet.png)

i wanted to see if chording/octaving, as well as trills, might be a little easier to pull off if i could duplicate the keys across hands. this means that i've gone for a scale but truncated it a bit. 

they both have their advantages.

## a physical manifestation - future approach

There's also the problem of the tonal quality so unless I sample the new beautiful instrument, I'm going to be stuck with crappy VSTs… so perhaps going to pull the reed box out of a cheap Chinese accordion i found on EBay, and place it onto a tuning table or other pressure source. Then operate the bellow to provide air pressure using motors that are managed by microcontroller, and subsequently controlled by numpads/keyboards/whathaveyou actually play the instrument.


## Other ideas

- a question of where to place the numpads - instead of flat as i do now, perhaps oriented like on a "real accordion"?

- move the physical keys around within the numpad. both in terms of their ordering (after all, this is one of the pieces of genius in the cajun accordion to help you hit partial chords) and in their location on the board

- adding more triggers or numpad equivalents. i could try adding my feet in... for example, use foot pedals to trigger the push vs. pull?

- think about how to use the knobs. could be for tremolo or to signal the
strength of the bellows?

- working with the sampling... Sytrus has limits, and i could pull the sounds from AppCordion (great product btw!)

- say to hell with the experiment and try to do it on a midi keyboard :) or use the WARBL - see: https://warbl.xyz/ - perfect for a wind player like me and i love mine :)
