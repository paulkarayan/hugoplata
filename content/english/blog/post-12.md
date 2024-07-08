---
title: "Defect Injection testing - the lost art of 'Bedbugging'"
meta_title: "Defect Injection testing - the lost art of Bedbugging"
description: ""
date: 2024-07-07
image: "images/bedbug.jpg"
categories: ["Blog", "Software", "QA"]
author: "pk"
tags: ["software", "testing", "qa"]
draft: false
---

*"Quis custodiet ipsos custodes"* - Juvenal 


## Let's get meta: how to test the tests?

One of the most irksome questions I've come across in QA (Automation in general) is figuring out whether you're doing what you expect. In the QA realm, this is summed up as: **are my tests (or manual testers) going to catch the bugs that I expect them to catch?**

Colleagues and friends tell tales of that time they ripped out huge swathes of test code, only to discover that it didn't matter. Bugs would 
slip right through the cracks, defeating the entire purpose, because they weren't really testing anything but patience. It's like [cargo cult science](https://en.wikipedia.org/wiki/Cargo_cult_science) - if you write automated tests, bugs just disappear. Right?

*So. Wrong.* Nevermind that automation code isn't special; it rots just like other any other code, calling forth **the supervillain of the 
software world: maintenence.** Just the friction that's being added to the average developer's workflow results in negative behaviours, such 
as skipping tests when no one is watching. 

Besides happenstance and heroism, I've wondered how one could programmatically address this problem (and slim down test suites in the process). I took inspiration from [Chaos Engineering](https://github.com/dastergon/awesome-chaos-engineering) a la [Netflix's Chaos Monkey](https://github.com/Netflix/chaosmonkey) to demonstrate one method: defect injection aka bedbugging.

## Defect Injection demo - the setup

Let's start with the Conduit application [a Medium clone](https://github.com/gothinkster/realworld) and a suite of [Cypress](https://www.cypress.io) E2E tests (link to code is coming) that cover some basic functionality. 
To create defects, we're going to mangle the responses & response codes from the APIs that we hit during the Cypress tests. The expectation is 
that our tests should catch the errors that we've created, and/or we see a graceful partial failure in line with expectations. We'll use 
[MITMProxy](https://mitmproxy.org/) to make this a reality.

Since we only care about the APIs that are called during a test run, I've used the ["automocker"](https://github.com/scottschafer/cypressautomocker) plugin, or better yet, the ["autorecord"](https://github.com/Nanciee/cypress-autorecord) plugin to identify the 
endpoints that we care about in each case. Note that there are a bunch of other ways to do this using traffic collection or proxies. 
![Example of captured requests](/images/autorecord.png)

Here's a graphic of the APIs called in each functional test:
![APIs we hit](/images/api-overview.png)

Now, we'll fire up MITMProxy in it's standard HTTP mode. This was tricky for me, but I'm not good at this. Let me know if I should post my notes if that'd help you... Let's set up a filter to make it easier to see what 
we're doing:

```bash
f:conduit|api
```

MITMProxy can be scripted to do some pretty fascinating stuff automatically. We're going to keep it simple and just intercept requests: 
```
i:tags
```

## Demonstrating Defect Injection for fun and profit

We're ready to rock. This screen recording shows how defect injection works with this setup. 


<div style="max-width:100%; width:600px; margin: 0 auto;">
  <video width="100%" controls>
    <source src="/videos/bedbug_example.mov" type="video/quicktime">
    Your browser does not support the video tag.
  </video>
</div>


Here's what you're seeing:

1. run an E2E test suite that covers homepage functionality, such as: login, article content, user settings, and popular tags. This runs without 
error.
2. intercept the /tags route, then run the E2E homepage test suite again. You'll notice that the "popular tags" don't show up, and we catch 
that with our final test:

```js
    it("can see popular tags on homepage", function() {
      cy.wait(500);
      cy.get(".tag-list").find('.tag-pill').should('have.length.greaterThan', 1)
    });
```

3. intercept the /articles route, then run the E2E homepage test suite again. You'll notice that the feed loads forever, and we don't have a
test failure. So - this is an opportunity to think through what we should do in this state, or to put a test in place that requires articles
to load in <5 secs or something. 

-----
Note: in the 2nd example, if we'd just checked that the class "tag-list" has loaded, we'd have missed this error:

![Tag list is easy to miss](/images/conduit-tag-list.png)

I'd argue that this feature isn't essential so the graceful failure is pretty solid, even without an error message in the UI.

-----

## Concluding musings

Hopefully the defect injection strategy to test your tests sparks your interest, too. There are some interesting parallels to Chaos Testing, though there's something nice about how this doesn't require you to actually take down services or machines - and also 
how directly it maps to the actual user experience. I imagine this would also have some interesting applications to root cause analysis or
reproducing nasty bugs, since we have pretty good control and visibility at the API layer. 

The next step here would be to automate the extraction of APIs hit by each E2E test, and programmatically mangling responses using MITMProxy's 
scripting facility. Also probably good to make the proxy setup a little bit easier or better documented. So do let me know if that would be 
useful to your organization so I feel like finishing it :P

One last thing: This doesn't just apply to automated testing; it can also be used to check that manual test scripts are working (and being run 
at all - a fear that many who outsource QA have). Turns out a similar technique, called ["bedbugging"](https://en.wikipedia.org/wiki/Bebugging), was employed to ensure that bored
radar operators didn't miss rare events  - spawning a popular software engineering test coverage
technique. Implementing this with a manual test team, and learning from the fault seeding efforts of yesteryear, would be super interesting 
as well!
