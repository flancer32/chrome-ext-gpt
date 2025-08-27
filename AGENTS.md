# Base Instructions for LLM Agents

## Purpose

This document is intended for an LLM agent performing tasks related to the development of the Chrome extension.  
It defines the project goals, architectural principles, and interaction rules with the Operator.  
The agent works autonomously, relying on the provided context, and delivers results as changes committed to the repository.

---

## Project Goals

- Implement a Chrome browser extension for sending requests to an OpenAI-compatible API (GPT and other models).
- Provide a user-friendly interface for composing and sending requests directly from the browser.
- Keep the codebase in English: all comments, messages, and product templates must be written in English.
- Maintain documentation and auxiliary instructions (README, CONTRIBUTING, etc.) up to date.

---

## Architectural Principles

- The repository contains the source code of the extension (JavaScript/HTML/CSS), the manifest, and helper scripts.
- Extension logic is separated from the cognitive context (stored in the external repo `chrome-ext-gpt-ctx`).
- All comments and messages in the code must be written in English.
- Documentation inside the product repo (README, build/install instructions) must also be written in English.

## NPM and Project Structure

- The project uses npm for dependency management and building.
- First dependency: `@teqfw/di` provides a lightweight DI container.
- Source files are organized under `./src/`:
  - `html/` for HTML files
  - `js/` for JavaScript sources
    - `di/` for modules loaded through the DI container
  - `css/` for style sheets
  - `img/` for images and icons

---

## Cognitive Context Usage

During Codex-agent execution, the cognitive context repository (`chrome-ext-gpt-ctx`) is mounted into this product repository under the path `./ctx/`.

### Rules

- The `./ctx/` directory is **read-only** for the agent.
- Files from `./ctx/` can be used as reference materials (product overview, specifications, plans, etc.).
- The agent **must not** commit, modify, or copy files from `./ctx/` into the product repository.
- All product-related code and documentation remain in English and are stored directly in this repository.
- The cognitive context itself is maintained separately in its own repository (`chrome-ext-gpt-ctx`).

---

## Agent Responsibilities

The agent performs tasks autonomously based on Operator instructions.  
Results must be committed to the repository and accompanied by a report.

Allowed actions:

- Generate or update the extension source code;
- Edit documentation (`README.md`, `docs/`);
- Propose architectural, structural, or functional improvements;

Prohibited actions:

- Modify dependencies or external libraries without Operator approval;
- Trigger publication or deployment manually;
- Work outside the clearly defined task scope.

---

## Communication Protocol

The agent provides feedback in two forms:

### 1. Inline Comments

- Use the `AGENT:` prefix in code for short remarks.

```js
// AGENT: consider extracting this function to utils
```

### 2. Final Report (Mandatory)

- One file per task, stored as:
  `agent/task/YYYY/MM/DD/HHMM-{task-name}.md`

- A final report is mandatory for **every task**.

- Tasks without a final report are considered incomplete.

The report must include:

- Task summary;
- Observations and findings;
- Suggestions or concerns;
- Optional checklist.

Example:

```md
# Task: Add background script for logging requests

## Summary

Implemented `src/background.js` to capture and log all outgoing API requests.

## Observations

- Logs appear correctly in the console.
- No persistence between sessions.

## Suggestions

- Add option to export logs.
```

---

## Execution and Handoff

Upon completing a task, the agent must:

- Write all file changes to the repository;
- Add inline comments where relevant;
- Create a final report in `agent/task/YYYY/MM/DD/HHMM-{task-name}.md`;
- Wait for Operator feedback or the next assignment.
