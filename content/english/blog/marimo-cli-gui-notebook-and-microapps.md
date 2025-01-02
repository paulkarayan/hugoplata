---
title: " Marimo - a great new tool for building micro- & internal apps"
meta_title: " Marimo - a great new tool for building micro- & internal apps"
description: " Marimo - a great new tool for building micro- & internal apps"
date: 2025-01-01
image: "images/marimo.svg"
categories: ["Blog", "Software", "Gear"]
author: "pk"
tags: ["software", "time savings", "gear", "tek"]
draft: false
---

## Introduction to Marimo

I'm a huge fan of [Marimo](https://marimo.io/) - a next generation Python "notebook" which, like predecessors such as Jupyter & Hex, provide a useful paradigm that's more reusable than a script but has great REPL-like interactivity. 

I gave a talk in 2020 about using [Jupyter Notebooks beyond data science](https://www.youtube.com/watch?v=apJLsYTiouM), such as in DevOps and QA - so Marimo has absolutely captured my attention. 

Here's my pitch:

```
Imagine that with the effort it takes to create a Jupyter notebook or write a Python scrip, with minimal extra effort you also get:
- a “mini app” that runs as a gui OR runs as a script you trigger via CLI OR as a notebook
- that runs either locally or hosted on the web
- is equally happy to run with a human in the loop OR work fully automatically (such as in CI/CD)
```

Later, I intend to show my light wrapper ("Rifleman") that makes the above easier, and also:
- adds itself to a browse/search engine experience enabling other people to discover it (i.e. semantic search for the use case itself)
- enables us to host Beta features for end clients and prospects
- rapidly create bespoke demos for prospects/clients in a Forward-Deployed Engineering style, as made famous by Palantir

## Run your code 3 different ways

Go here, right now:
https://github.com/paulkarayan/marimo-tricks/blob/main/secrets_manager.py

Check out this simple implementation of a util to work with AWS Secrets Manager secrets. It's pretty easy to extend it to be useful, but I really want you to see this:

```
# you can use the notebook gui:
> marimo edit secrets_manager.py 

# or the web app
> marimo run secrets_manager.py 

# or use the cli:
> python secrets_manager.py -- --secret_name gas-service/METHANE_API_KEY --secret_string 'IamGrosNain'
```

Here are some pretty pictures, but it's actually got some great UI Elements:
![Marimo CLI](/images/marimo-gui.png)
![Marimo GUI](/images/marimo-gui.png)

## BASHing up the Marimo

I really missed the magic method to run commands in the terminal, but if you read the code above, you can see a hacky way to do it in Marimo:

```
@app.cell
def __():
    import subprocess
    import marimo as mo

    def bash(command):
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        return result.stdout.strip()
    return bash, mo, subprocess
```
