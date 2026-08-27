# Inventory Second Run

Started: 2026-08-21

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
- `4-a` - linear loose-item lists with three diagonal weapon cards, a
  horizontal secondary-equipment strip, and a lower-right collapsed Gear
  summary, based on Figma frame `464:399`.
- `4-b` - the paired two-column-grid loose-item-list version of 4-a. It keeps
  the complete 4-a weapon, secondary-equipment, Gear/Outfit, tooltip, focus,
  and attachment behavior while changing only Vicinity and Inventory tiles.

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
- Empty attachment, Gear, Outfit, and Melee/Tool slots show a tooltip that
  identifies what can be equipped there.
- One-column list prototypes open with tooltips hidden; two-column grid
  prototypes, including 4-b, open with tooltips visible. View toggles the
  tooltip layer without moving focus.
- Occupied Throwable and Melee/Tool item art is centered horizontally and
  vertically within the remaining slot space below its fixed name row.
- Every visible Outfit slot is focusable. The expanded Outfit rail contains
  nine navigable slots and loops through the complete chain on Up/Down.
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

All prototypes share `assets/` through their existing `../assets/` references.
The initial four forks introduced no new image assets. 4-a adds exact baked
Figma exports for its three diagonal weapon renders and socket-map references;
the shared category treatment adds five exact Figma icon exports. See each
prototype's `ASSET-AUDIT.md`.
