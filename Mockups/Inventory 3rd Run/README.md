# Inventory Third Run

Started: 2026-09-21

## Baseline selection

The first and second runs are closed historical references. Only prototype
families 1 and 2 continue in this directory. Series 3 and 4 and all two-column
loose-item variants remain in the archives.

The active designs replace the earlier third-run layouts:

| Prototype | Figma frame | Current design |
|---|---|---|
| [1-b](1-b/WBP_Inventory1B.html) | 545:1887 | Stacked horizontal weapons, icon-based attachment cells, right-side secondary/Gear column |
| [2-a](2-a/WBP_Inventory2A.html) | 545:2625 | Vertical weapons, Gear beside Inventory, two-cell secondary footer |

Prototype 2-c was closed on 2026-09-22 and moved to [[Closed]2-c](<[Closed]2-c/WBP_Inventory2C.html>).
It remains a frozen historical prototype and receives no further third-run changes.

The former 2-d experiment was deleted by user request. Its Figma direction
was assigned to the now-closed 2-c snapshot; the former center-bridge 2-c
layout was replaced before closure.

## New third-run rule

Two-column grid list layouts are no longer used for the loose-item Vicinity
and Inventory lists. This is why `1-c` and `2-b` -- the two-column grid
counterparts of `1-b` and `2-a` in the second run -- were not carried
forward. Every prototype in this run uses a one-column list.

## Shared behavior (inherited from the second run)

The second-run interaction contract remains in force except where the current
per-prototype specification records a layout or focus delta. Both active
variants retain six categories (Ammunition, Throwable, Attachment, Weapon,
Heal/Boost, Gear), flag markers, category icons, and the same item/equipment
information, including attachment art and Gear levels.

The no-two-column-list rule applies to Vicinity/Inventory. Prototype 1's
two-column attachment controls are a separate equipment control.

Inherited behavior:

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
- List badges use flag markers with category icons. Populated-item tooltips
  retain the exported category icon and text label.
- Empty-slot guidance tooltips omit the category badge.
- Tooltip panels use content-driven height. Vertical comparison pairs
  preserve an 18 px gap and reposition as a unit when their natural combined
  height approaches the controller guide.
- Normal attachment-slot inspection and modal placement are separate tooltip
  states, each with its own prototype-specific anchor.

All prototypes share `assets/` through their existing `../assets/`
references and use `shared/weapon-switch.js` for the common primary-firearm
swap state. The initial forks added no image assets; subsequent category
work added the Gear badge and category glyph assets documented in
`2-a/ASSET-AUDIT.md`.

Latest replacement validation: inline JavaScript parsing, local asset references,
unique bindings, component references, and diff whitespace checks. Browser visual
review was blocked by the local-file URL policy; visual and physical-controller
acceptance remain pending. Expanded drawers are inherited interaction states,
since the supplied frames show collapsed Gear only. The reference geometry also
extends beyond the convention's 5% safe zone; console-safe adaptation and font
licensing/import remain production work, not an accepted UMG delivery.

## Category flag alignment

Both active layouts use the exact Figma 550:663 flag heads from
assets/category-flags-550-663.png. shared/category-flags.css overlays each
head on the first item slot's top-left border with zero gutter; the stem
ends at the final category item. The head and glyph scale together. The old
24 px gutter, negative top offset, and clipped tooltip-badge icons are removed.

## Character key guide

Both active prototypes treat Show/Hide Character as a non-focusable key guide.
R3/R toggles the drawer, with no guide click action or navigation stop. The
1-b guide is screen-level; the 2-a guide is grouped inside Gear. Empty
Gear/Outfit and Melee slots show representative icons. Yellow weapon-card
borders indicate attachment focus only; being equipped does not add a yellow
border.
