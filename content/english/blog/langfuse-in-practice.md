---
title: "Langfuse and LLM evals in practice"
meta_title: "Langfuse and LLM evals in practice"
description: "Langfuse and LLM evals in practice"
date: 2025-03-19
image: "images/langfuse_logo.jpeg"
categories: ["Blog", "Software", "Gear"]
author: "pk"
tags: ["software", "LLM", "QA", "evals"]
draft: false
---

## The problem I'm trying to solve

Writing software using LLMs has spawned a set of problems you're probably familiar with if you've ever dealt with production software: logging, tracing, and monitoring what prompts are being used and the responses that are generated.

This has subsquently generated interest in solving these problems in exchange for hard currency, and tools like Helicone and Langfuse do this - in addition to some cost management, structured evaluation, and compliance/audit functionality.

I was trying to evaluated whether this could solve two problems for me:
1. can we deploy new prompts without having to release code?
2. can we evaluate the "human-ness" of responses from our various reminder bots?


## The secondary problem: the tool used to solve the primary problem

Langfuse was not easy to get started. I don't want to focus on the limitations too much because they let me try their stuff out for free and it does actually help. So instead, here's what I wished I'd gotten from their docs - an end-to-end example for something basic yet tangible you can play with.

Behold! This is LangFuse as applied to Taggart, that which proposes tags for you blog content and was shared in the recent past.

And please forgive the mess...



```
import os
import re
import csv
import json
from pathlib import Path
from collections import Counter
from typing import List, Tuple
from langfuse import Langfuse
from langfuse.decorators import observe
from langfuse.openai import openai # OpenAI integration
from langfuse.decorators import langfuse_context



## weird it requires us to define this twice... see below
os.environ["LANGFUSE_PUBLIC_KEY"] = ""
os.environ["LANGFUSE_SECRET_KEY"] = ""
api_key = os.getenv("OPENAI_API_KEY")

langfuse = Langfuse(secret_key="sk-lf",
  public_key="pk-l3",
  host="https://us.cloud.langfuse.com")

@observe()
def analyze_posts_for_ontology(
    directory: str, 
    max_tags: int = 15, 
) -> List[str]:
    """
    Analyze blog posts in the given directory to propose an ontology of tags.
    Optionally use OpenAI for enhanced tag generation.
    """


    post_contents = []

    # Extract content from each Markdown file
    markdown_files = list(Path(directory).rglob("*.md"))
    for file in markdown_files:
        _, content = extract_content(file)
        post_contents.append(content)
    

    print("Generating ontology using OpenAI...")
    combined_text = " ".join(post_contents)

    ## use the production prompt
    # prompt = langfuse.get_prompt("taggart", label="production")
 
    ## to make it robotic 
    prompt = langfuse.get_prompt("taggart", label="robotic")

    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": prompt.compile(max_tags=max_tags, combined_text=combined_text),
            }
        ],
        temperature=0.8,
        max_tokens=5000,
        top_p=0.8,
        frequency_penalty=0.0,
        presence_penalty=0.0,
        langfuse_prompt=prompt
    )
    result = response.choices[0].message.content
    print(result)


    return result

@observe()
def main():
    blog_posts_directory = "/Users/pk/hugoplata/content/english"  # Replace with your directory path
    return analyze_posts_for_ontology(directory=blog_posts_directory, max_tags=15)

main()
```

## Now what?

With this I can pull different tagged prompt versions, and I do get that tracing/monitoring that's nice for troubleshooting.

What didn't work so hot? Their evaluation suite would up being not so great in terms of user experience and the prompts I used even when i made things as robotic as possible wouldn't change their scoring!

but still useful... and i'll keep track of them.

## Judges

For evals, I started to use this package:
https://github.com/quotient-ai/judges
and even made a PR to help out, I liked it that much.

This seems like an simpler way of managing evals but it does suck to have to use another piece of software.
