---
title: "LLMs let you show, not tell"
meta_title: "How LLMs Enable Living Documentation and Show, Not Tell Development"
description: "The Agile Manifesto nailed it: Working software over comprehensive documentation. Twenty years later, we're still writing specs nobody reads."
date: 2025-08-11T12:00:00-08:00
image: "/images/llms-show-not-tell.png"
categories: ["Software", "Engineering"]
author: "pk"
tags: ["software", "AI", "LLM", "testing", "automation", "tools"]
draft: false
---

The Agile Manifesto nailed it: ["Working software over comprehensive documentation"](https://agilemanifesto.org/). Twenty years later, we're still writing specs nobody reads.

At Climate.com, our killer app was way simpler than we'd expected - email farmers how much rain fell on their fields yesterday. When we needed SMS, I built a Twilio prototype overnight.
Didn't solve scale. Didn't handle edge cases. But then everyone else could _touch_ it. UX designers could _feel_ the interaction. That prototype informed more decisions than any architecture diagram, spec, or document every could have.

This is what I love talking about ["living documentation"](https://paulkarayan.com/blog/software-zombies-qa-llm/). The spec isn't a document - it's working code reflected into another form. Tests aren't just tests - they're executable requirements. LLMs finally make this practical because they excel at translation. The same Platonic ideal can be expressed as production code, Cucumber test, API doc, or video demo. LLMs traverse these representations effortlessly. We should take advantage of that!

Dijkstra warned that "premature optimization is the root of all evil." We obsess over scale while domain experts can't even see what we're building (or thinking about, for that matter). They need to click buttons, watch data flow, experience the lag. Their expertise emerges through interaction, not abstraction. The time is right to give that to them!

The debate about the AI code slop overfixates on production code. Software engineering isn't about code. Code is just our primary tool for building systems. You cannot miss the forest for the trees here: the point is that good engineers solve meaningful problems for actual humans. LLMs help us show solutions immediately, iterate faster, and keep everyone - technical or not - grounded in what actually works.

Stop telling. Start showing.