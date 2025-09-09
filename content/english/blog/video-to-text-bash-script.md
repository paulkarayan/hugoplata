---
title: "Turn Any Video Into Text With This Simple Bash Script"
meta_title: "Local Video Transcription with OpenAI Whisper - Simple Bash Script"
description: "A simple 15-line bash script that transcribes videos locally using OpenAI Whisper. No cloud services, no subscriptions."
date: 2025-09-08
image: "/images/vid-to-text.png"
categories: ["Software", "Productivity"]
author: "pk"
tags: ["automation", "tools", "software", "bricolage", "time savings"]
draft: false
---

I built a simple transcription tool that converts videos to text using OpenAI's Whisper. Nothing fancy - just a bash script that runs locally.

The script extracts audio from any video file (or processes audio directly), converts it to the right format, and generates a transcript. Perfect for capturing video directions, interviews, voice notes, or any spoken content you need in written form.

This pairs nicely with summarization tools - transcribe first, then feed the text into a summariser. 
something like what i did in [YouSum](https://www.paulkarayan.com/blog/yousum-summarising-youtube-videos/) to get the key points. 

It'll work for client meetings, tutorial videos, and random voice memos. Amusingly, I get a bullet point list of what my concertina teacher tells me to do better - and it handles her Dublin accent flawlessly!

Setup takes two minutes: install Whisper and ffmpeg, make the script executable, and you're done. The whole thing is 15 lines of bash that just works - and most of that is error handling.

## The Script

```bash
#!/bin/bash

# pip install openai-whisper
# brew install ffmpeg 
# chmod +x video_transcribe.sh
# ./video_transcribe.sh ~/video.mp4 

if [ -z "$1" ]; then
  echo "Usage: ./video_transcribe.sh file.mp4 or file.mp3"
  exit 1
fi

FILE=$1
AUDIO="audio.wav"

# Extract audio if file is video
ffmpeg -i "$FILE" -ar 16000 -ac 1 -f wav "$AUDIO"

# Transcribe
whisper "$AUDIO" --model base --language en

# Clean up
rm "$AUDIO"
```

Sometimes the simplest solutions are the best.