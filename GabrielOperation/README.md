# Gabriel Operation

Single source of guidance for **every** LLM or agent working on this project --
Claude Code, Codex, ChatGPT, Cursor, Gemini, or anything else.

The point is tool independence. Any model can be swapped in for any task, and
the output should be indistinguishable, because all of them work from the
documents in this folder rather than from whatever convention they'd default
to on their own.

---

## The rule

**Read every document in this folder before doing work on this project.**
These documents outrank a model's own habits and defaults. Where a document
says to do something a particular way, do it that way even if another approach
would be idiomatic elsewhere.

If a document is wrong or blocks the task, say so and propose a change to the
document -- don't silently work around it. A convention only holds if
deviations are visible.

## Documents

| Document | Read when |
|---|---|
| [UMG-Mockup-Convention.md](UMG-Mockup-Convention.md) | Writing or converting an HTML UI mockup destined for Unreal UMG |
| [UMG-Authoring-Setup.md](UMG-Authoring-Setup.md) | Setting up a new project or machine for generated UI, upgrading engine version, or extending what script can do to widgets |
| [Session-Handoffs/README.md](Session-Handoffs/README.md) | Resuming unfinished work; use its index to read the handoff for the active workstream |

## How each tool picks this up

| Tool | Mechanism |
|---|---|
| Claude Code | `CLAUDE.md` at the project root points here; loaded automatically |
| Codex / Cursor / most coding agents | `AGENTS.md` at the project root points here; loaded automatically |
| ChatGPT (web), Gemini (web) | **Manual** -- paste the relevant document into the chat or project instructions before asking for work |

Web chat interfaces cannot read this repository. When using one, paste the
document you need; the documents are written to be self-contained for exactly
that reason.

## Adding a document

Keep each document scoped to one subject, and:

1. Name it for the subject, not the tool -- guidance is tool-independent
2. Write it to be understood without the surrounding conversation, since it
   will be pasted into tools that have no other context
3. Add a row to the table above, with a concrete "read when" trigger
4. State the reasoning behind non-obvious rules -- a rule whose purpose is
   understood survives contact with a new situation; one that isn't gets
   dropped the moment it's inconvenient

## Project context

Unreal Engine 5.8 project. The UI pipeline runs:

```
HTML mockup  ->  asset audit  ->  generate & import assets  ->  Widget Blueprint
```

Widget Blueprints are **generated artifacts**. They are rebuilt from the mockup
on every iteration, so they carry layout only -- never hand-edit them. Behavior
lives in a hand-written parent `UserWidget` class that binds to widgets by
name via `BindWidget`, which is why the naming rules in the mockup convention
are strict.

Generation relies on `UUMGAuthoringLibrary`, provided by the `UMGAuthoring`
plugin in `Plugins/`, which exposes the parts of UMG authoring the engine does
not expose to script. See [UMG-Authoring-Setup.md](UMG-Authoring-Setup.md).

Keep these documents ASCII-only. They are read through terminals and pasted
between tools that do not always decode UTF-8, and a mangled rule is worse
than a plain one.
