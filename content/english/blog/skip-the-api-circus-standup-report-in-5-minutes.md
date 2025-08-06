---
title: "Skip the API circus: /standup-report basics in 5 minutes, spend the rest of your time on storytelling"
meta_title: "Build standup reports with Claude slash commands instead of complex API integrations"
description: "Yesterday I needed standup reports. Instead of being stuck in SDK hell, I created a Claude slash command that took 5 minutes to set up using MCP."
date: 2025-08-06
image: "/images/standup-report-command.png"
categories: ["Software", "Productivity"]
author: "pk"
tags: ["automation", "tools", "workflows", "LLM", "AI", "time savings", "ph"]
draft: false
---

Yesterday I needed standup reports. Instead of being stuck in SDK hell to connect Github/Linear/Slack, I created a Claude slash command: `/standup-report`
in literally 5 min. 

In cases where you can safely use MCP, it's magical. I just told Claude Code:

> "Create a slash command called /standup-report that generates GitHub and Linear activity reports and posts them to Slack. It should accept an optional hours parameter (default 24) and a --terminal flag to output locally instead of posting to Slack."

That's it. Claude Code dropped a markdown file in `.claude/commands/` that I'll share with you below.

When you haven't spent all your free time for the day fighting integrations, you're able to focus on what you want the data to say. What's the story you want to tell?

Better yet - it's pretty easy to refocus around individual needs. You control the narrative in natural language. Want technical details? Need an executive summary? Tune the prompt. Want to emphasize certain repos or ignore others? Barely any effort.

The summarization is the real magical part for me. Instead of raw commit messages, you get coherent narrative. "Fixed bug in parser" can become "Resolved critical parsing issue affecting 30% of API traffic" (pieced together from bug reports, PR messages, and tracing/logging tools). Context matters.

Standup/productivity tools tend to be very general, so they're almost inherently solving the wrong problem for every user. Nobody needs another dashboard. We need clear, contextual updates that actually capture what matters TO YOU. When you own the prompt, you own the output.

I should say, at time of writing, the backing MCP technology isn't secure enough for a lot of purposes. You may not want to solve the problem like I did here.

Try it where you can though: Write your prompt. Get your report. Get back to work.

## The /standup-report Command

Here's the actual command file that powered my intial slash command - a simple markdown file that tells Claude what to do:

```markdown
# /standup-report

Generate and post GitHub/Linear standup report to Slack #product channel.

## Usage

/standup-report [hours] [--terminal]

## Arguments

- `hours` (optional): Number of hours to look back for activity (default: 24)
- `--terminal` or `-t` (optional): Output to terminal instead of posting to Slack

## Description

This command:
1. Collects recent commits from all repositories in the ultranautical GitHub organization
2. Automatically finds or clones repositories as needed
3. Fetches Linear ticket updates and completions
4. Generates a formatted progress report
5. Posts the report to the #product channel in Slack

## Examples

# Generate report for last 24 hours and post to Slack
/standup-report

# Generate report for last 48 hours
/standup-report 48

# Output to terminal instead of Slack (for testing)
/standup-report --terminal

## Output

The report includes:
- GitHub commits with hash, message, and timestamp
- Linear tickets created, updated, or completed
- Summary statistics for activity
- Formatted for Slack with proper mentions and links

## Configuration

The command uses:
- GitHub CLI (`gh`) - must be authenticated to access ultranautical org
- Linear API key from environment (`LINEAR_API_KEY`) - for ticket updates
- Slack webhook URL from environment (`PRODUCT_SLACK_WEBHOOK`) - for posting to #product

The script will:
- Check common local directories for existing repo clones (~/ph/, ~/code/, ~/projects/)
- Clone missing repositories to ~/gh/ if not found locally
- Pull latest changes for existing repositories
```


## How It Started

All I had to say was:

> "I need a standup report command that pulls my recent GitHub commits and Linear tickets, then posts a summary to our #product Slack channel. Make it look back 24 hours by default but let me specify different timeframes."

Claude Code then:
1. Created the `.claude/commands/standup-report.md` file with the command documentation
2. Created the `.claude/standup_report.py` implementation script
3. Set up the logic to fetch from GitHub and Linear APIs
4. Formatted the output for Slack
5. Handled the command-line arguments

The beauty is you describe what you want in natural language, and Claude Code creates both the documentation and implementation.

**Learn more about Claude Code slash commands:** https://docs.anthropic.com/en/docs/claude-code/slash-commands