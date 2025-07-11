---
title: "YouSum on the Command line - a CLI function for summarising long YouTube videos to get right to the point! "
meta_title: "YouSum - summarising long YouTube videos to get right to the point!"
description: "YouSum on the Command line - a CLI function for summarising long YouTube videos to get right to the point!"
date: 2025-01-27
image: "/images/yousum.png"
categories: ["Software"]
author: "pk"
tags: ["software", "marketing", "DIY"]
draft: false
---

# But Wait - it's on the command line

After the debacle of not being able to host my YouSum program, I've gotten back in the habit
of just running it locally on the command line. I mentioned the `llm` utility in a prior
post as well... and you should make sure to export your OpenAI API key before making this happen

but here you go!

```
yousum() {
  if [ -z "$1" ]; then
    echo "Usage: yousum <YouTube URL>"
    return 1
  fi

  # Extract the video ID using macOS-compatible regex in sed
  local video_id=$(echo "$1" | sed -E 's/.*v=([a-zA-Z0-9_-]+).*/\1/')

  if [ -z "$video_id" ]; then
    echo "Invalid YouTube URL. Please provide a valid one."
    return 1
  fi

  # Run the command
  youtube_transcript_api "$video_id" | llm -s "You are an information extraction service. Perform the following:\
                STEP 0: Provide a SUMMARY of the content in 100 words or less.\
                STEP 1: Extract the 5-10 most interesting FACTS"
}
```

usage example: 
> yousum https://www.youtube.com/watch?v=CO-6iqCum1w
