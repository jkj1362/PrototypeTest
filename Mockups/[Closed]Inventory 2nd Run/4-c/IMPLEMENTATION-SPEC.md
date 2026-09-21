# PUBG Console Inventory 4-c Second-Run Feature Specification

Status: interactive second-run prototype; manual controller acceptance pending

Last updated: 2026-09-01

Shared behavior authority: `../README.md`. This file records 4-c-specific
layout and focus-navigation overrides.

## 1. Purpose

Inventory 4-c is the compact-grid companion to the 4-series diagonal weapon
rack. Its executable artifact is `WBP_Inventory4C.html` on a 1920 x 1080
canvas and follows Figma node `493:2176`.

Unless this document explicitly overrides a rule, 4-c inherits the complete
4-a interaction contract in `../4-a/IMPLEMENTATION-SPEC.md`. This includes the
default-collapsed Gear/Outfit area, tooltip states, item mutation, attachment
placement, controller actions, and expanded drawer behavior. 4-c explicitly
overrides the inherited connector-line treatment with socket markers only.

## 2. Deliberate layout delta

4-c changes two layout systems:

- Vicinity and Inventory are compact two-column WrapBox-style grids.
- Every weapon attachment rail is a 2 x 3 grid at the lower-left of its card.

The attachment matrix is stable across the three weapons:

| Row | Left cell | Right cell |
| --- | --- | --- |
| 1 | Muzzle | structural blank |
| 2 | Grip | Magazine |
| 3 | Scope | Stock |

Weapon-specific unsupported sockets remain visible but disabled. The
structural blank is not a socket, never receives focus, never participates in
placement, and draws no socket marker.

The three diagonal weapon cards remain arranged left-to-right as M16, M249,
and P1911. The lower row aligns Throwable below M16, Melee/Tool below M249,
and the collapsed Gear summary below P1911. The collapsed Gear summary is a
centered 2 x 2 block: empty Gear slot and backpack on the upper row, vest and
Show Character on the lower row.

Unlike 4-a/4-b, 4-c has no horizontal Inventory capacity bar. A separate
vertical scrollbar sits in the 132 px corridor between Inventory and the
weapon rack. Both list grids begin on the same horizontal rule beneath their
titles.

## 3. Loose-item grids

- Both lists use two physical columns of 96 x 96 px item tiles.
- Weapon tiles occupy a true two-column by two-row square: the wrapper and its
  focusable inner tile are both 202 x 202 px (96 + 10 + 96).
- Both list panels are 240 px wide. Their 27 px left inset accommodates the
  same 18 px category gutter used by 4-b while preserving the 96 px tiles,
  10 px column gap, and 8 px right inset.
- Item names remain in the tooltip; compact tiles show art and a quantity
  badge only for stackable quantities greater than one.
- Category rails retain the shared color-only 10 px marker and 4 px line in an
  18 px gutter. The rail line remains separated from the item-tile edge rather
  than sharing the tile's horizontal position.
- Tooltips are visible when the screen opens because both lists are grids.
  View/V toggles the tooltip layer without changing focus.

## 4. Attachment-grid focus navigation

Within one weapon attachment grid:

- Left and Right first move to the focusable socket in the adjacent physical
  cell of the same row.
- Up and Down prefer the same column. If that physical cell is structural or
  disabled, navigation uses the other focusable cell in that row, then the
  next row in the requested direction.
- Up from the top row is blocked and preserves focus.

Across weapon grids:

- At a horizontal grid edge, focus moves to the closest socket in the same
  visual row of the neighboring weapon grid.
- If that exact cell is unavailable, the closest focusable socket in the
  neighboring grid is used.
- Left from the left edge of M16 crosses to the Inventory grid.
- Right from the right edge of P1911 is blocked.

Downward exits reflect the lower-row geometry:

- M16 exits to Throwable.
- M249 exits to Melee/Tool.
- P1911 exits to the closest visible Gear control.

Down from Throwable, Melee/Tool, or the final Gear/Outfit control remains
blocked. The 4-series rule that prevents unrelated wrap or list jumps remains
in force.

Modal A-based placement restricts focus to compatible sockets only. The
physical nearest-in-direction search is used across valid destinations, while
all other sockets remain dimmed until confirm or cancel.

## 5. Preserved 4-series contract

4-c preserves:

- the default-collapsed Gear/Outfit state and R3 expansion behavior;
- all pickup, drop, stacking, use, equip, replacement, and recovery actions;
- Vicinity and Inventory attachment quick-equip differences;
- lower-right compact X/A cues that leave slot art visible;
- source-anchored comparison tooltips and separate normal slot inspection;
- content-driven tooltip height and the 18 px comparison gap;
- marker-only socket highlights on all three diagonal weapons. No path is
  drawn between an attachment tile and its weapon socket;
- empty attachment, Gear, Outfit, and Melee/Tool guidance tooltips;
- centered Throwable and Melee/Tool art; and
- the complete focusable nine-slot Outfit chain when expanded.

## 6. 4-c tooltip anchors

The Figma tooltip-state frames are authoritative for normal inspection:

| Focus source | Figma node | 1920 x 1080 tooltip anchor |
| --- | --- | --- |
| Vicinity item | `493:2176` | x 509; vertically centered on the list |
| Inventory item | `506:3196` | x 0, left of Inventory; vertically centered on the list |
| Weapon attachment socket | `506:3498` | x 381, y 422 |
| Throwable or Melee/Tool | `506:3760` | x 381, y 704 |
| Gear control | `506:4025` | x 381, y 726 |

These are normal-inspection anchors, not placement-comparison anchors. List
tooltip Y is calculated from the responsive tooltip height so its panel center
matches the source list center. During A-based attachment placement, the
selected source-item tooltip remains at its source anchor and the candidate
socket tooltip is laid out beneath it with the shared 18 px gap. Tooltip height
remains content-driven.

## 7. Bindable UMG API

4-c preserves 4-a's root bindings. `Box_VicinityGrid` and
`Box_InventoryGrid` translate as WrapBoxes. In `WBP_WeaponCard`,
`Box_AttachmentSockets` translates as a two-column WrapBox with a nonfocusable
`Spacer_AttachmentGridTopRight` in row 1, column 2.

The HTML/SVG socket overlay is a prototype-only visualization. It preserves
the inherited overlay binding and `updateConnectorLines` function name for API
stability, but creates circle markers only and never creates SVG paths.
Production UMG should bind socket markers to named anchors or equivalent
runtime geometry rather than translate DOM measurement code. The root HTML
exposes 36 unique `data-umg-name` bindings.

## 8. Validation checklist

- Both loose-item panels render exactly two compact columns.
- The Vicinity weapon tile is a 202 x 202 square whose inner focusable tile
  fills the complete two-by-two footprint.
- The list titles use the Figma labels, both list top rules align, and the
  external Inventory scrollbar remains inside the center corridor.
- Both lists preserve the 4-b category gutter; markers and rails remain fully
  visible inside the list border and separated from tile edges.
- Every attachment rail renders a 2 x 3 matrix with the correct structural
  blank and weapon-specific disabled cells.
- Horizontal input traverses local cells before neighboring weapon grids.
- Vertical input follows columns, skips disabled cells, and uses the aligned
  lower destination only at the grid bottom.
- Top-row Up and P1911-edge Right preserve the currently focused control.
- Placement focus reaches compatible sockets only and restores normal state
  on confirm or cancel.
- Socket markers stay attached to weapon anatomy, never target the structural
  blank, and the overlay contains no connector-path elements.
- Category rails occupy the shared 18 px gutter without touching item tiles.
- Each normal tooltip uses its source-specific 4-c anchor; placement keeps the
  selected source tooltip at its origin and stacks the candidate tooltip below.
- Comparison mode's source-defined top position takes precedence over the
  normal list-centering rule, preserving the 18 px source/target gap.
- Tooltip default visibility, responsive sizing, and comparison source
  behavior match the shared 4-series rules.
- Inline JavaScript parses, local assets resolve, UMG names remain unique,
  and the browser console reports no warnings or errors.

Manual physical-controller acceptance remains pending.
