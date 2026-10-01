# PUBG Console Inventory Second-Run Handoff

Last updated: 2026-09-21

## Purpose

This is the transition handoff from the completed second-run inventory mockup
suite to the active third run. The second run is closed and preserved as a
historical design reference. New experiments belong under `Inventory 3rd Run`
and must not revise the archived second-run artifacts unless the user
explicitly asks for a historical correction.

## Repository baseline

- Branch: `main`
- Local transition commit: `55c8c2b` (`Close second-run inventory mockups and
  start third run`)
- Current remote tip at handoff time: `92d8e63` (`Inventory second run
  iteration`)
- The local branch is one commit ahead of `origin/main`.
- The completed suite is stored at `Mockups/[Closed]Inventory 2nd Run/`.
- The active workstream is stored at `Mockups/Inventory 3rd Run/`.

The third-run tree already contains user-owned uncommitted work. Do not reset,
overwrite, delete, or fold these changes into the closed second run:

- modified `1-b` HTML, implementation spec, and asset audit;
- modified `2-a` HTML, implementation spec, and asset audit;
- untracked `2-d/` prototype files; and
- untracked category Gear and category glyph SVG assets.

Always run `git status --short` before continuing because this list may have
changed after the handoff was written.

## Read first in the next session

1. `GabrielOperation/README.md` and all guidance it requires.
2. This handoff.
3. `Mockups/Inventory 3rd Run/README.md`.
4. The `IMPLEMENTATION-SPEC.md` and `ASSET-AUDIT.md` beside the third-run
   prototype being changed.
5. The executable `WBP_Inventory*.html` for that prototype.
6. `Mockups/[Closed]Inventory 2nd Run/README.md` only when historical
   second-run behavior needs to be compared.

HTML owns the prototype layout and browser behavior. Generated Widget
Blueprint files are not edited directly. Unreal production behavior belongs
in a hand-written parent `UserWidget` that binds to the stable
`data-umg-name` API.

## Completed second-run suite

The archived second run contains ten active prototype variants:

| Prototype | Loose-item list | Main layout distinction |
|---|---|---|
| 1-b | One-column | Collapsible Gear/Outfit and first-series equipment layout |
| 1-c | Two-column grid | Grid counterpart of 1-b |
| 2-a | One-column | Wide tooltip corridor and three vertical weapon cards |
| 2-b | Two-column grid | Grid counterpart of 2-a |
| 2-c | One-column | Live PUBG-style center Gear/Outfit area |
| 3-a | One-column | Compact vertical weapon art and expandable Gear/Outfit |
| 3-b | Two-column grid | Grid counterpart of 3-a |
| 4-a | One-column | Diagonal weapon cards and lower secondary strip |
| 4-b | Two-column grid | Grid-list counterpart of 4-a |
| 4-c | Two-column grid | Compact 2 x 3 attachment matrices and marker-only sockets |

No second-run variant was selected as the production winner. The third run
deliberately carries forward only selected one-column directions. Its README
and per-prototype specifications are authoritative for that selection.

## Accepted second-run behavior

Preserve these mechanics in a third-run fork unless its specification records
an intentional delta:

- Gear/Outfit starts collapsed and can be expanded.
- Attachment placement entered with A is modal and restricts focus to valid
  destination slots. A confirms and B cancels.
- X and A destination cues use compact 24 px controller badges at the slot's
  lower-right while attachment art remains visible beneath them.
- Empty attachment, Gear, Outfit, and Melee/Tool slots provide slot guidance
  tooltips.
- Tooltips use content-driven height. Their text and images do not shrink or
  overflow to fit a fixed shell.
- One-column list prototypes start with tooltips hidden. Two-column grid
  prototypes start with tooltips visible. View toggles the tooltip layer
  without moving focus.
- During placement, the selected attachment tooltip remains anchored to its
  source. A target-slot tooltip uses the prototype-specific comparison anchor.
- Throwable and Melee/Tool art is centered in the usable space beneath the
  fixed name row.
- Category rails use separated colored segments in an 18 px gutter with a
  19 px inter-category break. Item tiles must not cover or merge into the
  rail.
- List item tooltips retain category identity and concise effect rows. Empty
  slot guidance omits the category badge.
- Blocked focus edges in the 2-series and 4-series do not wrap or jump to an
  unrelated region. Legacy 1-series and 3-series behavior remains documented
  by their individual specs.
- A focused loose weapon supports X quick-switch to primary firearm slot 1.
  A opens a two-slot primary-firearm choice; Left/Right selects, A confirms,
  and B cancels. The displaced firearm replaces the loose weapon tile.
- Weapon switching changes only the visible weapon name and image. The target
  card keeps its attachment composition, sockets, ammo display, and slot
  identity.

The shared weapon-switch implementation is
`Mockups/[Closed]Inventory 2nd Run/shared/weapon-switch.js`. Third-run forks
have their own copied shared implementation under `Inventory 3rd Run/shared/`.

## Important layout-specific conclusions

- 2-c keeps Gear and Outfit as two separate columns in the center bridge.
  Focus crosses that bridge when moving between lists and weapon cards, even
  while expanded. Tooltips must render above the expanded character area.
- Normal attachment-slot inspection uses an equipment-side tooltip anchor.
  Attachment placement keeps the original item tooltip at its source and
  places the target-slot guidance relative to that source state.
- 3-a and 3-b keep weapon art vertical but compact rather than stretched to
  fill the card. Weapon art may overlap the attachment-chain footprint, but
  socket markers may not overlap attachment cells.
- 4-a and 4-b use corrected diagonal weapon crops and socket positions.
  Their blocked Up/Down boundaries do not loop into lists or other chains.
- 4-c uses two-column loose-item grids and 2 x 3 attachment matrices. It uses
  highlighted socket markers without connector lines. Its loose weapon tile
  is a true 202 x 202 two-by-two square, and inventory tooltips anchor on the
  list's left side.

## Verification status

The final second-run pass established the following static checks:

- all ten active prototype inline scripts parsed successfully;
- every prototype loaded and invoked the shared weapon-switch controller;
- stable `data-umg-name` bindings were unique within each page;
- weapon-switch image profiles resolved;
- `git diff --check` passed, apart from line-ending warnings; and
- the shared README and affected prototype specs were synchronized with the
  implemented focus, tooltip, socket, and weapon-switch behavior.

Automated visual browser verification of local `file://` pages was blocked by
browser security policy during the final pass. Manual visual review and
physical-controller acceptance remain required before Unreal production
selection.

## Third-run starting state

Commit `55c8c2b` created the active third-run baseline with `1-b`, `2-a`, and
`2-c`, shared assets, shared weapon switching, and a third-run README. The
third-run rule removes two-column loose-item grids from carried-forward
baseline variants.

Work after that commit is already exploring additional category treatment and
prototype `2-d`. Those edits are intentionally outside this second-run
handoff. Read the live third-run specifications and inspect the current diff
instead of assuming this snapshot describes their final behavior.

## Recommended next-session sequence

1. Run `git status --short` and preserve every existing third-run change.
2. Read the third-run README and the selected prototype's current spec.
3. Confirm the next third-run design question from the user's latest request.
4. Treat the archived second-run suite as read-only comparison material.
5. Validate changed inline JavaScript, local assets, stable bindings, and
   `git diff --check` after implementation.
6. Perform manual controller and visual acceptance when browser access allows.
