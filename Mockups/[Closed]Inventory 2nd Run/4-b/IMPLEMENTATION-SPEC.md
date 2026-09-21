# PUBG Console Inventory 4-b Second-Run Feature Specification

Status: interactive second-run prototype; manual controller acceptance pending

Last updated: 2026-09-01

Shared behavior authority: `../README.md`. This file records 4-b-specific
layout and navigation overrides.

## 1. Purpose

Inventory 4-b is the two-column loose-item-list companion to 4-a. Its
executable artifact is `WBP_Inventory4B.html` on a 1920 x 1080 canvas.

Unless this document explicitly overrides a rule, 4-b inherits the complete
4-a layout and interaction contract in `../4-a/IMPLEMENTATION-SPEC.md`.
This includes the diagonal weapon rack, collapsed Gear/Outfit state, tooltip
anchors, attachment placement, connector lines, focus corrections, item
mutation, category treatment, and controller behavior.

## 2. Deliberate layout delta

Only the Vicinity and Inventory item presentation changes.

- Both regions retain 4-a's X positions, 324 px widths, 963 px heights,
  52 px fixed headers, capacity bar, and tooltip anchors.
- Each item panel is a two-column WrapBox-style list.
- The panel reserves an 18 px category gutter and uses two 135 x 135 px item
  tiles separated by an 8 px gap.
- A category divider spans the full 278 px two-tile row.
- Weapon items span both columns as a 278 x 278 px tile.
- Loose-item names move to the tooltip. The grid tile shows item art and a
  quantity badge only when a stackable item has a quantity greater than one.
- Attachments remain non-stackable and show no quantity badge.

No weapon, secondary-slot, Gear/Outfit, tooltip, or controller-guide geometry
changes from 4-a.

Because 4-b uses two-column grid lists, its tooltip layer is visible when the
screen opens. View/V still toggles the layer without changing focus.

## 3. Category treatment

The shared second-run category treatment is adapted to the two-column list:

- Each populated category owns one 4 px color rail in the 18 px gutter.
- Its 10 px marker is centered in the category break above the first tile row.
- The rail starts at the marker center and ends at the bottom of that
  category's final populated tile row.
- Adjacent category rails remain disconnected.
- List markers use color only; populated-item tooltips retain the category
  icon and label; empty-slot tooltips omit the category badge.

Category rails and dividers regenerate after pickup, drop, stacking, and list
compaction.

## 4. Focus navigation

Within either loose-item grid:

- Left and Right move between the two physical columns.
- Up and Down remain in the current visual column when a target exists.
- Movement at an outer list boundary remains contained.
- Cross-region movement continues to use 4-a's geometric focus engine.
- Empty-list focus recovery remains inherited from 4-a.

All attachment-chain, secondary-slot, collapsed Gear grid, expanded Gear and
Outfit, and modal-placement navigation is unchanged from 4-a.

The inherited hard boundaries are explicit in 4-b: Up from the top attachment
slot preserves focus, and Down from Throwable, Melee/Tool, or the final Gear
or Outfit control preserves focus. These inputs never wrap or jump to a loose-
item list.

Up from either top-row collapsed Gear control enters the physically closest
visible, focusable P1911 attachment slot. In the current geometry this is the
Scope slot; unavailable sidearm sockets are never considered.

## 5. Preserved 4-a contract

4-b preserves:

- the default-collapsed Gear/Outfit area and R3 expansion behavior;
- all item pickup, drop, stacking, use, equip, replacement, and recovery;
- Vicinity and Inventory attachment quick-equip differences;
- A-based modal placement with ineligible slots dimmed until confirm/cancel;
- lower-right X/A slot cues that leave attachment art visible;
- source-anchored comparison tooltips;
- content-driven tooltip height with an 18 px vertical comparison gap;
- connector lines and socket highlights on all three diagonal weapons;
- the 24 px right crop for M16 and M249 art plus matching socket offsets;
- empty attachment, Gear, Outfit, and Melee/Tool guidance tooltips;
- centered Throwable and Melee/Tool art; and
- the complete focusable nine-slot Outfit chain.

## 6. Bindable UMG API

4-b preserves 4-a's root bindings. `Box_VicinityGrid` and
`Box_InventoryGrid` translate as WrapBoxes rather than linear ScrollBoxes.
The reusable `WBP_InventoryItemTile` omits `Txt_ItemName` because the compact
grid tile does not render item names; `Panel_ItemTile`, `Box_CategoryRail`,
`Badge_Category`, `Box_ItemContent`, `Img_ItemIcon`, and `Txt_StackCount`
remain available. The root HTML exposes 37 unique `data-umg-name` bindings.

## 7. Validation checklist

- Both loose-item panels render exactly two 135 px tile columns.
- Category dividers and weapon tiles span the complete 278 px item row.
- Up/Down stay in a visual column; Left/Right cross columns.
- Initial focus remains the first Vicinity item.
- List mutation preserves category ordering, stacking, rails, and focus.
- Normal and comparison tooltips use the same anchors as 4-a.
- Tooltips are visible by default and remain toggleable with View/V.
- Gear expansion and every 4-a attachment-chain correction remain intact.
- Top-of-chain Up and secondary/Gear/Outfit bottom-boundary Down preserve the
  currently focused control.
- M16 and M249 fill the corrected right-side space without export bars.
- Gear-to-sidearm Up movement reaches the closest focusable P1911 socket.
- Inline JavaScript parses, local assets resolve, UMG names remain unique,
  and the browser console reports no warnings or errors.

Manual physical-controller acceptance remains pending.
