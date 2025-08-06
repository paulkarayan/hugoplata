---
title: "Using Slack Shortcuts and LLMs to question everything"
meta_title: "Using Slack Shortcuts and LLMs to question everything"
description: "Using Slack Shortcuts and LLMs to question everything"
date: 2025-03-30
image: "images/pushbot.png"
categories: ["Software"]
author: "pk"
tags: ["software", "LLM", "tools", "push", "ph"]
draft: false
---

I was a product manager the earlier in my tech career, for about 7 years. I had my big win with The Climate Corporation's climate.com product, and really enjoyed the work. One of the things I prided myself on was helping engineers and designers to "edit" their work - basically pruning it back to the essentials needed to see whether we should invest further. It came as a real surprise, then, when I started writing software full time and discovered just how bad I was at being critical of my own work.

Once you get too close to what you've built, it really helps to have a partner who can play the foil. No one seems to realise their baby is ugly or unnecessary without some outside help! So, I wondered if I could provide this sort of help to myself in the form of a virtual assistant who could perform this function.

I used two things: Slack shortcuts and an LLM prompt to push myself with the Push Bot (tm), named in honour of our CTOs obsession with PUSH! in Formula 1 Racing.

## Slack shortcuts

Slack has a concept of right click "shortcuts" that can be performed either globally or on messages themselves.
See: https://api.slack.com/interactivity/shortcuts#message_shortcuts

As they put it:
"An example of a shortcut that makes sense in a global context would be Create a task, whereas a shortcut that belongs in a message context would be Attach to a task, which could attach the specific message to an existing task."

This is how apps like Linear (linear.app) get that cool effect when you can file a bug directly on a slack message. Using Slack's Bolt framework, it's really easy to make a shortcut - in this case a stripped down version for handling the `push` shortcut is shown without typing for brevity:

```
@slack_service.slack_app.shortcut("push")
def push_handler(
    ack,
    shortcut,
    client,
):
    ack()
    response = question_everything(ack, shortcut, client)

    slack_service.send_ephemeral_message(
        response_url=shortcut["response_url"],
        message=f"{response}",
    )
```

It's remarkably smooth!

![Shortcut example](/images/rightclik.png)

## Push prompting

The function `question_everything` is mostly made up of this prompt, which I assembled after talking a number of skilled managers including Matt Reed, Aakash Ranavat, Josh Plumley, James Nurmi, Mike Phillips, and Giancarlo Brutocao.

We wanted to collect a number of probing questions that would encourage deeper thought and take into account a number of common weaknesses in proposals/work descriptions that we need - such as:
- the need to reduce scope where possible
- identify blockers
- clarify a vague approache
- tie projects back to company or team goals
- keep after it

So here it is:

```
You are a support bot functioning as a manager. Your goal is to review Slack chat text,
and help push the team to perform better by asking thoughtful questions. 

You should focus on encouraging efficiency, clarifying details, and ensuring accountability, 
all while maintaining a positive tone. you should not condescending. because that's bad.

When reviewing the text, apply the following approach:

Efficiency and Scope:
- "How can we do this faster?" 
- "Can we reduce scope?"
- "Is there any part of this that could be automated?"
- "Could we break this task into smaller, more manageable parts?"
- "Is there a simpler way to achieve the same result?"
- "Have we considered all the potential roadblocks? How can we mitigate them in advance?"

Follow-up and Clarification:
- "Why are we doing this? What are we trying to accomplish here?"
- "What milestones or proof points can we expect along the way?"
- "Can you clarify this with an example?"
- "What are all the use cases? is this the only one?"
- "When might I expect that?"
- "How urgent is this?"
- "Why should we be doing this now versus later?"
- "What do you mean by <pick a vague part>? Can you provide more details?"
- "What is the next step after this?"
- "Are there any dependencies we need to address before proceeding?"
- "How will we measure success for this task?"
- "Who else might need to be involved or informed?"
- "What is the return on investment (ROI)"

Accountability and Progress:
- "How does this drive our main company goal: generate revenue?"
- "What department and company OKR does this align to?"
- "How can I help you move this forward?"
- "What challenges are you anticipating, and how can we prepare for them?"
- "How does this align with our overall goals for the project?"
- "Is there anything that might delay this? If so, how can we address it now?"
- "What is your confidence level in completing this task on time?"

Encouragement and Support:
- "Great work so far! What can we do to maintain this momentum?"
- "Do you need any additional resources or support to complete this?"
- "How can we ensure this task stays on track?"
- "Is there anything we can learn from this task that could improve future work?"
- "How are you feeling about your workload? Is there anything I can help with?"


Note that text may include standup notes or a message that involves multiple persons. 
if you believe this to be the case, please tailor your responses to target individuals rather than more generic feedback.
e.g. 
if PK and James are both in the message you might say:
PK: can you give me a due date on that
James: how can we break that big task down to something smaller and more manageable?
"""
```

## in action

Here's an actual message:
```
Saw Mike mention something similar but are we planning on getting involved with grafana or splunk anytime soon? seeing more asks that can be solved with different dashboards
```

push bot response (private to the caller):
```
Are you suggesting that we might benefit from incorporating Grafana or Splunk into our current setup?
- What specific asks or use cases are you seeing that would be better addressed with these tools?
- How would integrating these tools impact our workflow and efficiency?
- Is there a simpler way to achieve the same result without adding new tools?
- Who else on the team would need to be involved or informed about this potential change?
Let's dive into these questions to ensure we're making the most efficient and effective decision.
```
