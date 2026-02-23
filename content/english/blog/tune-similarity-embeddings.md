---
title: "Tune Similarity Search: Embeddings from ABC Notation for Irish Traditional Music"
meta_title: "Tune Similarity Search: Embeddings from ABC Notation for Irish Traditional Music"
description: "Building a tune similarity engine for Irish traditional music by parsing ABC notation into interval sequences, running TF-IDF and SVD, and training a contrastive model on multi-setting pairs."
date: 2026-02-22
image: "/images/similar.png"
categories: ["Software", "Music"]
tags: ["software", "music", "AI", "tools", "bricolage"]
author: "pk"
draft: true
---

Listening to Irish music, i'm frequently reminded of similarities between tunes. in some cases, they're probably mashups of different melodies - in others, perhaps they started from a proto-melody and evolved. The example my teacher brought up was Maggie Pickens sounds an awful lot like Charming Lovely Nancy... and that's never really left my mind.

## The Data

[TheSession.org](https://thesession.org) has a massive community-contributed database of traditional tunes in ABC notation — a text format where `|:GABc dedB|dedB dedB|c2ec B2dB|A2A2 A2:|` represents the musical notes. The dataset has around 20,000 jigs and reels, many with multiple "settings" (different transcriptions of the same tune contributed by different players).

The core problem is: how do you represent a melody in a way that captures its shape, independent of what key it's played in?

The answer is intervals. Instead of encoding the absolute pitch of each note, I encode the *movement between* consecutive notes. A tune that goes up a step, up a step, down a third has a distinctive contour regardless of whether it starts on D or G. FolkRNN solved this elegantly by transposing everything to C. 

I tried multiple encoding strategies, but settled on **Quantized-5**, which collapses every interval into one of five buckets: big jump down, small step down, same note, small step up, big jump up. This is deliberately coarse - it throws away a lot of detail, but it's robust to the kind of variation you see between different settings of the same tune. Turns out Quantized-5 is surprisingly good. Throwing away pitch magnitude information forces the model to focus on melodic contour, which suggests it's an important signal for perceived similarity. Finer-grained encodings pick up more subtle relationships but also more noise.

The vectors were all loaded into an instance of FAISS - because Annoy (my fave) takes up a lot of disk space and i didn't feel like deleting anything today.
FAISS handles the nearest-neighbor search at build time, and the frontend just looks up pre-computed results.

## Does It Work?

Evaluation uses those multi-setting tunes as ground truth. Take a tune with two settings, embed the second setting, and check if the first setting appears in the top 10 nearest neighbors. there is some variability in how true this holds - there are some settings that massively diverge and others that are just slight melodic variations that aren't captured terribly well (think about how my method would work if you took C-E-F-G and extended the C to a quarter note like C--FG). so it's not a clean test but it's decent.

the real test is qualitative — browsing the results and checking whether the similar tunes actually *sound* similar. When I spot checked, it's somewhat true  at least enough to be useful. The system surfaces tunes that share melodic contour, common phrases, or structural similarity.

![Tune similarity results](/images/similar.png)

Here's a great example, which has a comment on The Session of: "Reminds me a bit of Drowsy Maggie, but they are different tunes."

yup!