# Multi-Agent Workflow System

## Overview

This directory contains the orchestration system for the CertFast AI team.

## How It Works

### Every 30 Minutes: Task Agent Cycle
1. An AI agent wakes up with a specific role
2. Reads the assigned task from `current-sprint/ASSIGNED_TASK.md`
3. Loads its role definition from `roles/[role-name].md`
4. Executes the task with x-high thinking
5. Writes output to the appropriate project folder
6. Creates a handoff note in `handoffs/`
7. Updates `current-sprint/ASSIGNED_TASK.md` with the next task

### Every 6 Hours: Project Manager Review
1. PM agent reviews all work from the last sprint
2. Updates `../dashboard.md` with progress
3. Archives completed sprint to `completed/`
4. Creates new sprint tasks in `backlog/`
5. Assigns first task of new sprint

## Directory Structure

```
workflow/
├── roles/              # Role definitions (24 roles)
├── current-sprint/     # Active task and state
├── handoffs/           # Handoff notes between agents
├── backlog/            # Sprint backlogs
├── completed/          # Archive of completed sprints
└── README.md           # This file
```

## Role Categories

- **Strategy**: product-strategist, market-researcher, business-analyst, product-manager
- **Design**: brand-designer, ux-researcher, ui-designer, design-reviewer
- **Technical**: system-architect, api-designer, database-architect, security-architect, devops-engineer, tech-reviewer
- **Content**: content-writer, technical-writer, communication-strategist, editor-reviewer
- **Quality**: file-organizer, quality-assurance, documentation-synthesizer, project-librarian
- **Management**: project-manager, sprint-coordinator
