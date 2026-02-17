---
title: "Why we trained a DeBERTa classifier to catch AI slop"
meta_title: "Why we trained a DeBERTa classifier to catch AI slop (instead of just a naive LLM approach)"
description: "LLMs can't reliably detect their own writing patterns. Here's how we trained a DeBERTa v3 model to do the pattern-matching part of slop detection, and why disentangled attention was the right architectural choice."
date: 2026-02-17
image: "/images/distilled-slop-content-factory.jpg"
categories: ["Software"]
tags: ["AI", "LLM", "automation", "tools"]
author: "pk"
draft: false
---

When we create AI-assisted content, we run it through a QC pipeline before it ships. That pipeline used LLMs to detect AI writing patterns — what we call "AI slop." Go open LinkedIn and read your feed, and you'll see what I mean by slop quickly: "it's not X, it's Y!"

Before we go further:

- No, this is not an easy problem to solve if you just put it into Claude Code
- Yes, I am aware that Wikipedia has an article on this, and no — it doesn't exhaustively catch everything
- Yes, I have tried having LLMs check each other's slop

If you go the "ooo, meta" route of using LLMs to detect their own (or each other's) slop, it fails consistently.

There is a whole other problem covered by Andrej Karpathy on the Dwarkesh Patel show about how LLMs produce vague, uninventive takes on content. This is not in scope but it's fascinating and we tackled it too.

So, in short, I went back to my Primer.ai era chops and trained a DeBERTa model to do the pattern-matching part of slop detection with much success. Here's how it works and why.

## Pay attention!

The underlying issue is attention. When an LLM processes a 2,000-word article in a single pass, it front-loads attention on the opening paragraphs. Patterns in paragraph twelve get less scrutiny than identical patterns in paragraph two. Within our 10+ agent system was a workaround for this — break the task into focused chunks (typically a paragraph) so the model doesn't have to hold everything in attention at once.

This still doesn't work very well, particularly at the slop density we usually see. As a human, I would find about 60% of sentences contained some sort of AI tell (generated with Sonnet 4.5, still best at time of writing for this task). I ran about 10 separate agents each with about 700 lines of examples and instructions, and I could get down to about 30% being slop before editing. You could run a 2nd pass but the reduction in slop was minimal — perhaps an order of magnitude less — and it was slow / expensive.

I have written about [prompting approaches that help with attention distribution](/blog/llm-attention-distribution-prompting-trick/), and those are included in the above numbers. Cool, but not helpful enough.

## Why DeBERTa

I used BERT at Primer.ai for classification tasks, so encoder models were the natural starting point. My first thought was DistilBERT but the specific problem here pointed to something better.

DeBERTa v3 uses disentangled attention. In standard transformers, content and position get combined into a single vector. DeBERTa separates them, computing content-to-content and content-to-position attention independently. That means the phrase "Here's the thing:" gets the same attention treatment whether it appears at token 10 or token 400.

For a model that needs to detect the same patterns at any position in a document, disentangled attention is the right architectural choice.

## Synthesizing the training data

I didn't hand-label thousands of examples. I was inspired by Snorkel.ai and its programmatic labelling approach to use an LLM (Claude Opus 4.5) to inject slop into clean text I had.

I couldn't go the full ironic route and just have it generate text. I wanted to be more controlled and work around a taxonomy I'd developed for different kinds of slop. Let's take this category for example:

**MANUFACTURED_PROFUNDITY** — False depth through negation contrasts: "isn't X — it's Y", "not about X, about Y", "over decades, not quarters." I selected a dozen grammatical variants that all do the same thing — negate something obvious to elevate something equally obvious.

I pulled down about 850 paragraphs of real, human-written content from B2B blogs known to be AI free. YAML frontmatter, images, HTML artifacts, and headers were stripped out, and I filtered to body text of less than 350 words per chunk.

The program I wrote marked each injection with XML tags:

```xml
<slop type="SEMANTIC_NULL">This reflects a growing recognition of the
need to understand how organizations navigate these complex dynamics
in meaningful ways.</slop>
```

Each document got 4–8 randomly selected categories at a target density of 60% to match what we saw in the wild.

The XML tags gave character-level span boundaries. Then I converted those to token-level IOB2 labels using DeBERTa's tokenizer. The parsing step handles edge cases, ensuring no orphaned I-tags without a preceding B-tag, flagging suspiciously short (e.g. 1-token) or long (e.g. 50+ token) spans, and verifying token counts match tag counts.

You know what's great? Most of the stuff that would have tripped me up here was easily handled by Claude Code, particularly since I knew what to look for. So that's a win!

## What worked and what didn't

After training remotely on HuggingFace AutoTrain, I was able to run this across another pile of real world slop data for testing.

Pattern-based categories performed well, upwards of 95% accuracy on the "golden corpus" of new text (all about 2000-3000 words), because they expressed through a specific, recurring phrase. This is far better than the accuracy you get with an LLM across the same data, even with all the chunking and prompting.

Items that required maths or reasoning didn't perform well, as expected. For example, the "lists of 3" slop pattern is noticed by humans because of density. You can have a list of three items in a blog post say 25% of the time and it's fine — it's when every piece of information is presented this way that you start to think: oh, that's AI.

Ultimately, I was able to build a multi-tiered system that allowed me to use the best of both worlds to strip the slop — first pass with a classic classifier and a network of a subset of the LLM agents behind it. Any items missed by the classifier, like another "it's not X, it's Y" variant, were collected and fed back into a new training set. This allowed me to trivially add those examples the next training run.

So there you have it. This is an example of how you can use synthetic data in a cool way towards the noble cause of eliminating AI slop in writing.
