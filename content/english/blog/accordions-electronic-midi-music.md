---
title: "Building a Cajun accordion I can live with... [mega edition]"
meta_title: "Building a Cajun Accordion I can live with... [mega edition]"
description: "Building a Cajun Accordion I can live with..."
date: 2023-10-26
image: "/images/numpads.png"
categories: ["Software", "Music", "Art"]
author: "pk"
tags: ["software", "bricolage", "art", "accordions", "zydeco", "cajun", "instruments"]
draft: false
---

I made a longer version of this so I can publish a snappier one, too. the actual date was 10/26/2024 but i'm going to put it a year ago so it doesnt show up.

## In which I discover Cajun accordions

As reported elsewhere, I am thoroughly obsessed with Zydeco music. The central player in Zydeco is the Cajun Accordion, which runs at around $2500 for a decent instrument... and they're typically made by hand by a handful of craftsmen/musicians in East Texas / Southwest Louisiana. Each may produce perhaps 50-100 in a lifetime, and supply is limited on the typical websites.

After months of looking, I have found a beautiful instrument but in the interim, I examined some curiosities about this instrument.


## Examining the diatonic melodeon

Without getting into too many details, Cajun Accordions preferred by Zydeco players are typically: 
- single-row, 10 left-hand button accordions for melody
- 2 right-hand buttons for bass/chords that are more prominent in Cajun music
- diatonic - meaning they're tuned to a specific key/scale.
- bisonoric -  meaning they have a different note on the push and pull for the same button.
- 4 reeds that allow for octaves/partial chording to create rich sounds.
- Bellows to push air through the reeds to make soud, as modulated by pressed buttons

I've heard it compared to a harmonica, and it just sounds divine.

I come from playing Oboe (in my childhood/young adulthood) and Electronic Drums / Production (in my 30s) - so while I've played some unique instruments, this is also pretty out there.


## Towards new UX on the accordion

What I was doing to get around my limitations, I started to think about how you'd modify the design of the instrument if you didn't have the same physical limitations.

if you aren't restricted to 10 buttons you play with your left hand, and 2 on the right, what does this instrument look like? How does the physical User Interface" influence the musicality and songs - does lifting restrictions lead to more creativity or flatten you out with too many options?

boundary conditions are often the source of much beauty and creative problem solving. but I do enjoy working a problem by playing with it, and so i wanted to find a chassis on which i could try some new ideas.

MIDI accordions are a thing, and I was particularly interested this article: 
https://www.instructables.com/Make-Your-MIDI-Accordion/
which uses arduino microcontrollers along with mechanical keyboard parts to create an instrument.

and some of the patterns like this that allow you to rethink simply rebuilding an existing layout:
https://musictech.com/news/gear/you-can-now-convert-old-keyboard-into-midi-controller/

I decided that i didnt need the microcontroller step because i could simply remap keys to those used as a shortcut by the DAW I like best, FL Studio:
https://www.image-line.com/fl-studio-learning/fl-studio-online-manual/html/img_glob/qwerty_keyboard.png

or with the keys written in:
![keys written on fl studio keyboard](/images/fl-studio-keyboard.png)


so i purchased two CIDOO V-21 that can be easily repogrammed by Via (such as: https://usevia.app/). i didnt want to mess with compilation!

![photo of numpads](/images/numpads.png)

## Initial ideas

### On scales

I just have been programming the numpads to be diatonic. i may have 18 keys but it does feel weird to make it chromatic if i'm looking at my midi microkey keyboard

### Separate push / pull
In my first configuration I place them side by side and play 10 "buttons" with both hands.

i use the same layout as the buttons on the accordion, so:
![button to note mappings](/images/accordion-button-scales.png)

this is pretty fun by i do get a bit confused between the two sides... not any more so than pushing/pulling, though!

### Full scale, duplicated hands

i wanted to see if chording/octaving, as well as trills, might be a little easier to pull off if i could duplicate the keys across hands. this means that i've gone for a scale but truncated it a bit.

here's an example in Corey Ledet's tuning (E):

![Ledet key loadout](/images/key-layout-ledet.png)


## Example video

[video can go here of me playing my contraption]


## Next steps / ideas

perhaps the most interesting area of play to me seems to be pulling the reed blocks out of the accordion (I bought a cheap chinese box just for this purpose, and to learn how they're put together without feeling bad if i break it) - and placing them on a tuning table such as this: 
![Tuning Table](/images/tuning-table.webp)

Then I can have motors that are managed by microcontroller, and subsequently controlled by numpads/keyboards/whathaveyou actually play the instrument.

others:

- a question of where to place the numpads - instead of flat as i do now, perhaps oriented like on a "real accordion"? 

- move the physical keys around within the numpad. both in terms of their ordering (after all, this is one of the pieces of genius in the cajun accordion to help you hit partial chords) and in their location on the board

- adding more triggers or numpad equivalents. i could try adding my feet in... for example, use foot pedals to trigger the push vs. pull?

- think about how to use the knobs. could be for tremolo or to signal the 
strength of the bellows?

- working with the sampling... Sytrus has limits, and i could pull the sounds from AppCordion (great product btw!)

- say to hell with the experiment and try to do it on a midi keyboard :) or use the WARBL - see: https://warbl.xyz/ - perfect for a wind player like me and i love mine :)


