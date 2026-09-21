# Inventory Second Run

Started: 2026-08-21

Documentation synchronized: 2026-09-01

## Baseline selection

The second run carries forward only first-run prototypes whose Gear/Outfit area
opens collapsed and can be expanded:

- `1-b`
- `1-c`
- `3-a`
- `3-b`

New second-run layout explorations are added after this baseline selection:

- `2-a` - linear loose-item lists with a large center tooltip corridor,
  three vertical weapon cards, a lower Throwable/Melee strip, and a compact
  one-column Gear rail, based on Figma frame `468:1535`.
- `2-b` - the paired two-column-grid list version of 2-a, based on Figma
  frame `487:698` and tooltip-state nodes `493:2623`, `493:2866`,
  `493:3111`, `493:3419`, and `493:3674`.
- `2-c` - a one-column 2-a variant that restores the live PUBG-style center
  Gear/Outfit rail while retaining the complete second-run mechanics. Its
  collapsed, Gear-tooltip, and expanded states follow Figma nodes `498:799`,
  `498:1481`, and `498:1072`.
- `4-a` - linear loose-item lists with three diagonal weapon cards, a
  horizontal secondary-equipment strip, and a lower-right collapsed Gear
  summary, based on Figma frame `464:399`.
- `4-b` - the paired two-column-grid loose-item-list version of 4-a. It keeps
  the complete 4-a weapon, secondary-equipment, Gear/Outfit, tooltip, focus,
  and attachment behavior while changing only Vicinity and Inventory tiles.
- `4-c` - the compact-grid 4-series variant based on Figma node `493:2176`,
  with normal-tooltip anchors from nodes `506:3196`, `506:3498`, `506:3760`,
  and `506:4025`. It combines two-column Vicinity/Inventory grids with a
  2 x 3 attachment matrix on every diagonal weapon card and a layout-specific
  focus graph. Standard loose items use 96 px square cells, while a loose
  weapon occupies one true 202 x 202 two-by-two cell. Like the 1-series, 4-c
  uses socket markers without attachment connector paths.

First-run `1-a`, `2-a`, and `2-b` remain preserved as historical design
artifacts. The new second-run 2-a/2-b are independent forks that add the
default-collapsed Gear/Outfit contract and all shared second-run behavior.

## Shared second-run interaction delta

- Gear/Outfit opens collapsed and remains expandable.
- During modal A-based attachment placement, focus remains restricted to valid
  destination slots. Every other attachment slot, including the source slot,
  is temporarily dimmed to communicate that it is inactive.
- Confirming with A or cancelling with B removes the temporary dim state and
  restores the normal slot presentation.
- The X action and A confirm indicators use a smaller 24 px controller
  badge at the lower-right of the destination slot. Their letter, fill, ring,
  and shadow layers share one visual center. Attachment artwork remains
  visible beneath the cue at reduced opacity.
- With the Vicinity convenience enabled, a focused compatible attachment shows
  the X cue on the held-weapon slot whether that destination is empty or
  occupied. Cue visibility does not change the existing pickup/replacement
  action contract.
- A focused Vicinity weapon supports two swap actions in every prototype. X
  quick-switches it into primary-firearm slot 1. A enters a modal two-slot
  choice between primary-firearm slots 1 and 2; Left/Right selects the slot,
  A confirms, and B cancels. The displaced firearm replaces the selected
  loose-weapon tile in Vicinity. A weapon swap changes the equipped name and
  rendered weapon image only: the destination card's attachment-slot contents,
  socket composition, loaded/reserve display, and held-slot identity remain
  unchanged.
- Empty attachment, Gear, Outfit, and Melee/Tool slots show a tooltip that
  identifies what can be equipped there.
- One-column list prototypes open with tooltips hidden; two-column grid
  prototypes, including 4-b and 4-c, open with tooltips visible. View toggles the
  tooltip layer without moving focus.
- Occupied Throwable and Melee/Tool item art is centered horizontally and
  vertically within the remaining slot space below its fixed name row.
- Every visible Outfit slot is focusable. The expanded Outfit rail contains
  nine navigable slots. Boundary behavior remains prototype-specific: the
  legacy 1/3 layouts retain their documented rail wrap, while the 2/4 layouts
  stop at blocked Up/Down edges.
- Figma section `468:2072` supplies a shared category and tooltip treatment.
  It is not a 5-a prototype layout: every existing second-run layout keeps its
  composition while adding colored category rails to Vicinity/Inventory and
  matching category badges plus concise effect rows to tooltips.
- Each inter-category break is 19 px: a compact 3 px divider plus the two
  native 8 px row gaps. The 10 px marker is centered in that full break, and
  the 4 px rail starts at the marker center and ends at the bottom edge of the
  category's last populated row. Adjacent category rails remain disconnected;
  the upper half of each break stays empty. Both occupy an 18 px gutter beside
  the item area. The first marker is centered in the 10 px list-top inset.
- List badges are solid category-color circles without icons. Populated-item
  tooltips retain the exported category icon and text label for explicit
  identification.
- The 4 px rail is a separately centered element beneath each 10 px circle.
  It emerges from the circle's bottom edge and never protrudes above it.
- Empty-slot guidance tooltips omit the category badge. Their slot-specific
  guidance label and representative artwork remain visible.
- Tooltip panels use content-driven height in every prototype. Text, images,
  metadata, and action rows keep their standard size instead of shrinking or
  overflowing a fixed shell. Vertical comparison pairs preserve an 18 px gap
  and reposition as a unit when their natural combined height approaches the
  controller guide.
- Normal attachment-slot inspection and modal placement are separate tooltip
  states. During placement, the selected attachment remains at the anchor of
  its original Vicinity, Inventory, or equipped-slot source. Layouts that use
  one tooltip corridor stack the focused target-slot tooltip 18 px beneath it;
  layouts with intentionally separate corridors retain their documented
  side-by-side treatment. Normal slot inspection keeps its own equipment-side
  anchor and does not override the placement source anchor.

All prototypes share `assets/` through their existing `../assets/` references
and use `shared/weapon-switch.js` for the common primary-firearm swap state.
The initial four forks introduced no new image assets. 4-a adds exact baked
Figma exports for its three diagonal weapon renders and socket-map references;
the shared category treatment adds five exact Figma icon exports. See each
prototype's `ASSET-AUDIT.md`.
