---
title: "How to use just one task tracker without lock-in; well sorta"
meta_title: "How to use just one task tracker without lock-in; well sorta"
description: ""
date: 2024-07-05
image: "/images/linear.jpeg"
categories: ["Blog", "Software"]
author: "pk"
tags: ["software", "bricolage", "linear"]
draft: false
---

So I am a huge shill for Linear (linear.app), but I don't want to keep my personal tasks in it:
1. they're sometimes private
2. i dont want to lose them if my employement status with the company changes

There's not a way to deal with this particularly nicely. So what's a boy to do?

Behold! I attempt to sync them. Hopefully you'll find it useful.

```
import things
import requests
import pandas as pd
import os
import argparse
import logging
from rich.console import Console
from rich.table import Table

console = Console()

linear_api_token = os.getenv("LINEAR_API_KEY")
if not linear_api_token:
    console.print("Error: LINEAR_API_KEY environment variable not set.", style="red")
    exit(1)

linear_team_id = '175xxxxxxxxxxxxxxxxxx' # PK Personal Team
linear_project_id = 'None'
linear_api_url = 'https://api.linear.app/graphql'

headers = {
    'Authorization': f'{linear_api_token}',
    'Content-Type': 'application/json',
}

def create_linear_ticket(
    linear_api_key,
    team_id,
    issue_title,
    issue_description,
):

    mutation = """
    mutation CreateIssue($teamId: String!, $title: String!, $description: String) {
        issueCreate(input: {teamId: $teamId, title: $title, description: $description}) {
            issue {
                id
                title
                description
                url
            }
        }
    }
    """

    variables = {
        "teamId": team_id,
        "title": issue_title,
        "description": issue_description,
    }


    response = requests.post(
        linear_api_url,
        json={
            "query": mutation,
            "variables": variables,
        },
        headers=headers,
    )

    if response.status_code == 200:
        response_data = response.json()
        print(response_data)
        parent_issue_id = response_data["data"]["issueCreate"]["issue"]["id"]
        issue_url = response_data["data"]["issueCreate"]["issue"]["url"]
        logging.info(f"Created ticket: {issue_url}")

        return issue_url, parent_issue_id
    else:
        logging.error(f"Failed to create parent issue. Status code: {response.status_code}, Response: {response.text}")
        return None

def get_things_tasks():
    today_tasks = things.today()
    selected_tasks = [
        task for task in today_tasks 
        if task.get('area_title') in ['In Progress', 'On Deck', 'Backlog']
    ]
    return selected_tasks

def create_linear_tasks(tasks, debug=False):
    for task in tasks:
        task_title = task['title']
        task_notes = task.get('notes', '')

        if debug:
            console.print(f'[DEBUG] Task to be created in Linear: {task_title}, Notes: {task_notes}', style="yellow")
        else:
            result = create_linear_ticket(
                linear_api_token,
                linear_team_id,
                task_title,
                task_notes,
            )

            if result:
                issue_url, parent_issue_id = result
                console.print(f'Successfully created task: {task_title}', style="green")
                console.print(f'Task URL: {issue_url}', style="blue")
            else:
                console.print(f'Failed to create task: {task_title}', style="red")

def extract_linear_tasks():
    query = {
        'query': '''
            query {
                issues(filter: {team: {id: {eq: "%s"}}}) {
                    nodes {
                        title
                        description
                        state {
                            name
                        }
                    }
                }
            }
        ''' % linear_team_id
    }

    response = requests.post(linear_api_url, headers=headers, json=query)
    
    if response.status_code == 200:
        issues = response.json()['data']['issues']['nodes']
        return issues
    else:
        console.print(f'Failed to fetch tasks from Linear. Status code: {response.status_code}, Response: {response.text}', style="red")
        return []

def save_tasks_to_csv(tasks, filename='linear_tasks.csv'):
    task_data = []
    for task in tasks:
        task_data.append({
            'title': task['title'],
            'notes': f"Imported from Linear - {task.get('description', '')}",
            'state': task['state']['name']
        })
    df = pd.DataFrame(task_data)
    df.to_csv(filename, index=False)
    console.print(f'Tasks saved to {filename}', style="blue")

def fetch_linear_teams():
    query = '''
        query Teams {
            teams {
                nodes {
                    id
                    name
                }
            }
        }
    '''

    response = requests.post(linear_api_url, headers=headers, json={'query': query})

    if response.status_code == 200:
        teams = response.json()['data']['teams']['nodes']
        table = Table(title="Linear Teams")
        table.add_column("ID", justify="right", style="cyan")
        table.add_column("Name", style="magenta")
        for team in teams:
            table.add_row(team['id'], team['name'])
        console.print(table)
    else:
        console.print(f'Failed to fetch teams from Linear. Status code: {response.status_code}, Response: {response.text}', style="red")


def main(target, debug):
    if target == 'linear':
        things_tasks = get_things_tasks()
        console.print(f'Found tasks: {things_tasks}', style="green")
        create_linear_tasks(things_tasks, debug)
    elif target == 'things':
        linear_tasks = extract_linear_tasks()
        save_tasks_to_csv(linear_tasks)
    
    console.print("Sync completed successfully.", style="bold green")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync tasks between Things3 and Linear")
    parser.add_argument('--target', choices=['linear', 'things'], help="Specify the target system: 'linear' to sync from Things3 to Linear, 'things' to sync from Linear to Things3")
    parser.add_argument('--debug', action='store_true', help="Enable debug mode to only show tasks without creating them in the target system")
    parser.add_argument('--fetch-teams', action='store_true', help="Fetch and display Linear teams")
    args = parser.parse_args()

    if args.fetch_teams:
        fetch_linear_teams()
    else:
        if not args.target:
            parser.error("The --target argument is required if not using --fetch-teams")
        main(args.target, args.debug)
```
