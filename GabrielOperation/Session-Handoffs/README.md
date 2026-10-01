# Session Handoffs

This directory is the central index for unfinished-work handoffs across the
project.

## How to use this directory

1. Read `GabrielOperation/README.md` and its required project guidance first.
2. Find the active workstream in the index below.
3. Read only the handoff relevant to the task being resumed.
4. Follow the artifact-specific implementation spec linked from that handoff.

Implementation specifications stay beside their artifacts. Session handoffs
stay in this directory so a new model or chat can quickly find the current
resume point without searching every mockup folder.

## Hard rules

- A session handoff is an immutable historical snapshot. Never edit, correct,
  refresh, or otherwise bring an existing handoff up to date after it is
  written.
- Never create a new handoff unless the user explicitly asks for a handoff for
  the next session. Finishing work, reaching a milestone, or ending a chat is
  not permission to create one.
- Update the handoff index only as part of that explicit handoff request.
- Record ongoing work in the artifact and its implementation specification.
  Do not use a past handoff as living project documentation.

## Naming convention

Use:

`YYYY-MM-DD-Workstream-Variant.md`

When the user explicitly requests a next-session handoff, create a new dated
file. Never overwrite or revise an older handoff. Mark older entries superseded
in the index only as part of the same explicit request.

Keep every document in this directory ASCII-only, matching the
GabrielOperation portability rule.

## Handoff index

| Date | Workstream | Handoff | Artifact spec | Status |
|---|---|---|---|---|
| 2026-08-11 | PUBG Console Inventory 2-b | [2026-08-11-Inventory-2-b.md](2026-08-11-Inventory-2-b.md) | [IMPLEMENTATION-SPEC.md](<../../Mockups/Inventory/2-b [Deprecated]/IMPLEMENTATION-SPEC.md>) | Superseded historical snapshot |
| 2026-08-12 | PUBG Console Inventory next variation | [2026-08-12-Inventory-Next-Variation.md](2026-08-12-Inventory-Next-Variation.md) | [IMPLEMENTATION-SPEC.md](../../Mockups/Inventory/2-b/IMPLEMENTATION-SPEC.md) | Superseded; both proposed variations were built |
| 2026-08-13 | PUBG Console Inventory prototype set | [2026-08-13-Inventory-Prototype-Set.md](2026-08-13-Inventory-Prototype-Set.md) | [IMPLEMENTATION-SPEC.md](../../Mockups/Inventory/2-b/IMPLEMENTATION-SPEC.md) | Superseded by the first-milestone suite handoff |
| 2026-08-21 | PUBG Console Inventory first milestone | [2026-08-21-Inventory-First-Milestone.md](2026-08-21-Inventory-First-Milestone.md) | Per-prototype specs (see handoff) | Superseded by the second-run handoff |
| 2026-09-21 | PUBG Console Inventory second run | [2026-09-21-Inventory-Second-Run.md](2026-09-21-Inventory-Second-Run.md) | [Second-run README](<../../Mockups/[Closed]Inventory 2nd Run/README.md>) | Active transition handoff; continue in the third-run workstream |
