# PUBG Console Inventory First Milestone Session Handoff

Last updated: 2026-08-21

## Purpose

This is the resume point after completing and pushing the first milestone of
the PUBG console Inventory HTML prototype suite. Seven active prototypes now
cover conservative and experimental list, equipment, tooltip, and collapsible
Gear/Outfit layouts.

No prototype has been selected as the production winner. The next session
should preserve the completed first run, confirm what the new second run is
intended to test, and only then choose a prototype to fork or translate. Do
not infer a second-run direction from the empty folder name alone.

## Repository baseline

- Branch: `main`
- Remote: `https://github.com/jkj1362/PrototypeTest.git`
- Last pushed commit: `ec72ba3` (`Replace attachment connectors with socket highlights`)
- Previous milestone commits:
  - `3891fda` (`Complete first milestone inventory prototype suite`)
  - `4692ab0` (`Fix gear entry and list tooltip positioning`)
- At the time `ec72ba3` was pushed, `main` and `origin/main` matched and the
  worktree was clean.

After that push, the user began a local folder reorganization while this
handoff was being prepared:

- the tracked `Mockups/Inventory/` tree is deleted in the working tree;
- the same suite now appears under untracked `Mockups/Inventory 1st Run/`;
- `Mockups/Inventory 2nd Run/` exists and is currently empty; and
- Git currently represents the reorganization as deletions plus an untracked
  directory because the move has not been staged or committed.

A blob-by-blob comparison confirmed that all 193 tracked first-run files exist
at the new path with identical content and that the new tree has no extra
files. The pending prototype-tree change is therefore a pure path move.

Treat this as user-owned work. Do not restore the old path, delete either new
folder, or commit the move without confirming the user's intent. Start the
next session with `git status` and resolve this repository organization before
making another prototype fork.

## Read first in the next session

1. `GabrielOperation/README.md` and every document it requires.
2. This handoff.
3. The implementation specification beside the prototype being discussed.
4. Its matching `ASSET-AUDIT.md`.
5. Its executable `WBP_Inventory*.html` before implementation or validation.

The current working-tree paths are under `Mockups/Inventory 1st Run/`. Until
the reorganization is committed, the same tracked files remain under
`Mockups/Inventory/` in `HEAD` and on `origin/main`.

Do not edit generated Widget Blueprints directly. HTML owns layout. Production
behavior belongs in a hand-written parent `UserWidget` that binds to the stable
`data-umg-name` API.

## First-run prototype suite

| Prototype | Loose-item list | Equipment and Gear/Outfit | Tooltip default |
|---|---|---|---|
| 1-a | One-column linear | Three stacked horizontal firearms, full Gear/Outfit, Throwable and Melee footer | Hidden |
| 1-b | One-column linear | 1-a firearms plus a vertical Throwable/Melee column and collapsible Gear/Outfit | Hidden |
| 1-c | Two-column grid | Same equipment and collapsible Gear/Outfit system as 1-b | Shown |
| 2-a | One-column linear | Persistent Gear/Outfit and accepted weapon rack | Hidden |
| 2-b | Two-column grid | Persistent Gear/Outfit, lists, and Weapons three-group layout | Shown |
| 3-a | One-column linear | Expandable Gear/Outfit covering P1911 plus the secondary column | Hidden |
| 3-b | Two-column grid | Expandable Gear/Outfit covering P1911 plus the secondary column | Shown |

The 3-a and 3-b names were deliberately swapped during this milestone: 3-a is
the conservative one-column list version, while 3-b is the two-column grid
version formerly called 3-a.

Historical `2-b [Deprecated]` and `2-b-2 [Deprecated]` folders remain visual
and behavioral references only. The active 2-b is `2-b/`.

## Shared accepted behavior

Preserve these rules unless the selected prototype specification explicitly
overrides layout or focus geometry:

- Initial focus is the first Vicinity item.
- D-pad and right-stick navigation follow the visible list, grid, attachment,
  secondary, Gear, and Outfit geometry.
- Directional entry into Gear/Outfit from any outside region reaches the Gear
  rail first. It must never jump directly into the Outfit rail.
- Collapsing Gear/Outfit while Outfit is focused moves focus to Helmet.
  Collapsing while Gear is focused preserves that Gear slot. Collapsing while
  focus is outside the area preserves the outside focus.
- Vicinity X is pickup. With the Menu option enabled, it may quick-equip a
  compatible attachment only when the held weapon socket is empty. If the
  socket is occupied or the option is disabled, the item enters Inventory.
- Inventory X is explicit quick equip and may replace the equipped attachment;
  the displaced attachment returns to Inventory.
- Menu toggles the Vicinity empty-slot convenience and defaults enabled.
- Replacing an equipped Throwable returns the previous Throwable to Inventory.
- The capacity label remains centered on the complete bar independently of
  the current fill amount.
- Attachments are non-stackable. Two-column grid list tiles do not show a
  quantity badge for them.
- One-column text-list prototypes start with tooltips hidden. Two-column grid
  prototypes start with tooltips shown. View toggles the tooltip layer without
  moving focus or cancelling attachment placement.
- Comparison tooltip placement is prototype-specific. Read the selected spec
  before changing it.
- Modal A attachment placement remains locked to compatible destinations and
  B remains its only cancellation input.
- The Vicinity AUG equip interaction remains a deliberately blocked mockup
  simulation.

## 1-series socket-highlight rule

Inventory 1-a, 1-b, and 1-c no longer draw a line from an attachment cell to
the firearm. They retain the same socket maps and use marker-only feedback:

- neutral socket: 6 px gray circle;
- compatible socket: 10 px bright green circle with a light outline; and
- focused destination: 11 px bright yellow circle with a light outline.

The overlay keeps its existing binding and function names for API stability,
but creates no SVG path elements. This change is limited to the 1-series;
other prototypes retain the connector behavior documented by their own specs.

## Assets

The seven active prototypes use one common asset directory. In the reorganized
working tree it is:

`Mockups/Inventory 1st Run/assets/`

Each active prototype references it through `../assets/`. The folder currently
contains 44 shared files. Deprecated historical prototypes may retain their
own copies; do not treat those copies as active asset authority.

No further active-prototype asset convergence is required. After the folder
move is finalized, rerun a local-reference audit to confirm every HTML and
component file still resolves its assets.

## Verification status

The final 1-series socket pass was validated before commit `ec72ba3`:

- inline JavaScript parsed successfully in 1-a, 1-b, and 1-c;
- `git diff --check` passed;
- loose compatible attachments produced only 10 px compatible markers;
- modal placement produced one 11 px focused marker and retained remaining
  10 px compatible markers;
- the attachment overlay contained zero SVG path elements in all three pages;
- 1-c passed a visual browser review; and
- no browser console errors were reported.

Earlier milestone passes validated the listed tooltip, Gear-entry, capacity,
item mutation, focus recovery, and collapse behavior across the active suite.
Manual physical-controller acceptance at television viewing distance remains
pending and should precede Unreal production selection.

## Known limitations and documentation debt

- The folder reorganization is not committed and is the first repository issue
  to resolve next session.
- `1-a/ASSET-AUDIT.md` still contains one stale sentence mentioning connector
  lines. The executable HTML and `1-a/IMPLEMENTATION-SPEC.md` are authoritative:
  1-a uses socket markers only. Correct the audit after the move path is settled.
- Unreal translation has not started. Browser fitting, Gamepad API polling,
  DOM mutation, and SVG generation are preview implementation details, not
  generated Widget Blueprint behavior.
- Manual controller acceptance remains pending.
- AUG replacement, full weapon serialization/drop, partial-stack quantity
  selection, persistence, replication, server authority, and production-scale
  list stress behavior remain deferred unless a later spec explicitly adds them.

## Recommended next-session sequence

1. Run `git status` and confirm whether the user wants the first-run/second-run
   folder reorganization finalized and committed.
2. Ask what design question `Inventory 2nd Run` should test. Do not choose a
   first-run winner or fork automatically.
3. Read the chosen first-run prototype's spec and asset audit from its settled
   path.
4. If evaluating the first run, compare prototypes with equivalent focus and
   tooltip states and perform physical-controller acceptance.
5. If starting a second-run fork, copy only the selected baseline, preserve its
   interaction contract, and document every intentional delta in a new spec.
6. Keep the shared asset root unless the second run genuinely introduces a new
   asset.
