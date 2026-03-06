# StateFrame Demo

A demo of state-aware design review for vibe-coded prototypes.

## The problem

Vibe coding interactive prototypes is a fantastic way to perform user research, iterate on design ideas, and share with a team.

Thanks to LLM code generation, we can take the review process a step further. This is a demo of an idea: vibe coded prototypes sit in sub-folders and are displayed on a canvas as iframes.

Reviewers can click through the prototypes and comment, and when they comment both the "state" of the app and the scroll position are recorded, allowing designers to see the exact state the reviewer was seeing when they commented. 

## In this demo

Three versions of the same appointment booking flow, built as interactive HTML prototypes:

- **A: All-in-One** - a single scrolling form
- **B: Step by Step** - a multi-step wizard
- **C: Chat-Style** - a conversational interface

Each prototype sits on a canvas alongside a comment panel. The comments are linked to a captured state: form values, current step, scroll position. Clicking a comment restores the prototype to exactly what the reviewer was seeing when they wrote it.

## The stack
State communication happens via the browser's `postMessage` functionality to communicate from the canvas to the iframe.

Vibe coded prototypes are given a file or library that the LLM is instructed to use to always allow state to be retrieved and sent via `postMessage`.

## Running locally

```
npm install
npm run dev
```
