# Inventory Third Run

Started: 2026-09-21

## Baseline selection

The second run is closed. Its folder is preserved as historical reference at
`../[Closed]Inventory 2nd Run/`. The third run carries forward only two
second-run prototypes:

- `1-b`
- `2-a`

Series 3 (`3-a`, `3-b`) and series 4 (`4-a`, `4-b`, `4-c`) are not transferred
to this run.

`2-c` is also carried forward as a one-column layout variant of `2-a` that
keeps the live PUBG-style center Gear/Outfit rail; it and `1-b` remain in this
run alongside `2-a`.

## New third-run rule

Two-column grid list layouts are no longer used for the loose-item Vicinity
and Inventory lists. This is why `1-c` and `2-b` -- the two-column grid
counterparts of `1-b` and `2-a` in the second run -- were not carried
forward. Every prototype in this run uses a one-column list.

## Shared behavior (inherited from the second run)

`1-b`, `2-a`, and `2-c` carry forward unchanged, so the complete second-run
interaction contract remains in force until a spec in this run documents a
delta:

- Gear/Outfit opens collapsed and remains expandable.
- During modal A-based attachment placement, focus remains restricted to
  valid destination slots. Every other attachment slot, including the source
  slot, is temporarily dimmed to communicate that it is inactive.
- Confirming with A or cancelling with B removes the temporary dim state and
  restores the normal slot presentation.
- The X action and A confirm indicators use a smaller 24 px controller badge
  at the lower-right of the destination slot. Their letter, fill, ring, and
  shadow layers share one visual center. Attachment artwork remains visible
  beneath the cue at reduced opacity.
- With the Vicinity convenience enabled, a focused compatible attachment
  shows the X cue on the held-weapon slot whether that destination is empty
  or occupied. Cue visibility does not change the existing
  pickup/replacement action contract.
- A focused Vicinity weapon supports two swap actions: X quick-switches it
  into primary-firearm slot 1. A enters a modal two-slot choice between
  primary-firearm slots 1 and 2; Left/Right selects the slot, A confirms, and
  B cancels. The displaced firearm replaces the selected loose-weapon tile in
  Vicinity. A weapon swap changes the equipped name and rendered weapon image
  only.
- Empty attachment, Gear, Outfit, and Melee/Tool slots show a tooltip that
  identifies what can be equipped there.
- One-column list prototypes open with tooltips hidden. View toggles the
  tooltip layer without moving focus.
- Occupied Throwable and Melee/Tool item art is centered horizontally and
  vertically within the remaining slot space below its fixed name row.
- Every visible Outfit slot is focusable. The expanded Outfit rail contains
  nine navigable slots. Boundary behavior remains prototype-specific.
- Vicinity/Inventory categories use colored list rails and matching category
  badges plus concise effect rows in tooltips, per Figma section `468:2072`.
- List badges are solid category-color circles without icons. Populated-item
  tooltips retain the exported category icon and text label.
- Empty-slot guidance tooltips omit the category badge.
- Tooltip panels use content-driven height. Vertical comparison pairs
  preserve an 18 px gap and reposition as a unit when their natural combined
  height approaches the controller guide.
- Normal attachment-slot inspection and modal placement are separate tooltip
  states, each with its own prototype-specific anchor.

All prototypes share `assets/` through their existing `../assets/`
references and use `shared/weapon-switch.js` for the common primary-firearm
swap state. No new image assets were introduced when forking these three
prototypes into this run. See each prototype's `ASSET-AUDIT.md`.
