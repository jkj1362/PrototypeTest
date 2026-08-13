# PUBG Console Inventory 2-a Feature Specification

Status: active first-pass interactive prototype; design and controller acceptance pending

## 1. Purpose and authority

Inventory 2-a is the conservative linear-list variation of the accepted 2-b
inventory baseline. It tests whether readable, single-column Vicinity and
Inventory lists improve scanning and controller navigation without changing
the accepted equipment model.

Authoritative visual reference:

- Figma file `etHQBgFlvTuESYLwgH5CuH`
- Frame `339:1503` (`2-a`)

This document records the 2-a delta. Unless it explicitly overrides a rule,
2-a inherits `../2-b/IMPLEMENTATION-SPEC.md`, including item actions, list
mutation and stacking, category preservation, attachment placement, quick
equip, comparison tooltips, the View-key tooltip toggle, weapon socket maps,
controller bindings, empty-list focus, and deliberate production deferments.

## 2. Executable artifact

- Parent mockup: `WBP_Inventory2A.html`
- Linear item widget: `WBP_InventoryItemTile.html`
- Other reusable widgets and all raster/vector assets are forked from 2-b.
- Design canvas: 1920 x 1080.

The HTML is a standalone fork. It does not import the 2-b HTML at runtime.

## 3. Layout delta

Gear/Outfit and the weapon rack retain the accepted 2-b placement and sizing.
Only the two loose-item regions change.

| Region | Left | Top | Width | Height |
|---|---:|---:|---:|---:|
| Vicinity | 407 | 37 | 324 | 962 |
| Inventory | 769 | 37 | 324 | 963 |

Each item panel is a vertical ScrollBox with the same transparent fill and
light-gray 1 px border used by 2-b and 3-a. It has 8 px interior horizontal
padding (9 px from the outside edge when the border is included) and 8 px
row/category spacing. Each region places a fixed 52 px header above its actual
ScrollBox, so header content never moves or gets covered while the item rows
scroll. The two ScrollBoxes begin at the same Y position.

The inventory capacity indicator is horizontal, 306 px wide, and 30 px high.
It is vertically centered in the fixed Inventory header and retains the same
horizontal inset as the rows. This replaces the vertical 2-b indicator. Its
thumb explicitly displays the current/max preview value `210 / 350` through
the `Txt_InventoryCapacity` binding.

Vicinity uses a fixed 306 x 3 line centered in its corresponding header. It
preserves the reference-frame spacer and keeps the two lists' item rows aligned
while the Inventory capacity bar lives inside its list bounds. Because neither
header is part of a ScrollBox, Vicinity items cannot intrude into the line area.

## 4. Linear item row

Every item, including weapons, uses one 306 x 90 row. The row contains:

1. an 84 x 84 item image cell;
2. a flexible item-name cell;
3. a 30 x 84 stack-count cell.

Cells use the accepted dark item background and 8 px separation. Category
dividers span 306 x 3 and remain lifecycle-aware: a divider is visible only
between populated categories.

Unlike 2-b, stack count `1` remains visible. The reusable row adds the binding
`Txt_ItemName` while preserving `Panel_ItemTile`, `Img_ItemIcon`, and
`Txt_StackCount`.

## 5. Focus navigation

- Up and Down move to the previous or next visible row in the current list.
- Movement at the first or last row remains contained; 2-a does not loop.
- The focused row is scrolled into view by native browser/ScrollBox behavior.
- Left and Right remain deliberate cross-region navigation using the inherited
  geometric focus engine.
- Empty Vicinity or Inventory panels retain the inherited focusable-empty-list
  behavior.
- All gear, weapon, attachment-slot, and modal-placement navigation remains the
  accepted 2-b behavior.

## 6. Actions and attachment feedback

All accepted 2-b actions remain available:

- A confirms/equips; B returns; X quick-equips compatible attachments;
- Y drops, or hold-Y detaches where applicable;
- 2-a starts with tooltips hidden; View shows or hides them without adding a
  permanent controller-guide row or moving focus;
- attachment availability uses green fill and the X Tap cue without a yellow
  border; the actual navigation focus alone uses the yellow outline;
- focusing an equippable attachment slot shows the A Tap placement cue.

## 7. Provisional tooltip placement

The Figma 2-a frame removes the 225 px gap that 2-b used for non-overlapping
tooltips. Tooltips are hidden by default and can be shown with View. For loose
items and weapon contexts, the tooltip layer remains at `left 174`, over the
secondary character/gear-preview area, so neither linear item list is covered.

When focus is in Gear/Outfit, the primary tooltip moves to `left 407`, directly
to the right of the Gear/Outfit region. It may cover part of Vicinity, as
explicitly allowed, but it must not cover the Gear/Outfit controls being
inspected. Leaving Gear/Outfit restores the normal 2-a tooltip position.

Tooltip content, comparison stacking, actions, and the View-key visibility
option otherwise remain inherited.

This is a 2-a-specific evaluation choice, not an accepted production rule.
Design review must decide whether this overlay adds less friction than covering
a list or changing the overall frame geometry.

## 8. Validation checklist

- 1920 x 1080 reference geometry matches Figma frame `339:1503`.
- Both loose-item panels are one-column vertical lists with no wrapping.
- List areas use the shared transparent-fill/light-gray-border treatment.
- The 30 px capacity bar and fixed Vicinity header line preserve first-row
  alignment between lists and remain stationary while either list scrolls.
- The capacity thumb visibly reads `210 / 350`.
- Tooltips are hidden on entry; View reveals them without moving focus.
- Gear/Outfit focus moves the visible primary tooltip to the Vicinity side and
  leaving Gear/Outfit restores the normal position.
- Every visible row shows icon, item name, and count, including count `1`.
- Category dividers appear only between populated groups after mutations.
- Up/Down stay within one list and contain at both ends.
- Left/Right move between regions predictably.
- A, B, X, Y, View, quick equip, modal placement, drop/detach, stacking, and
  empty-list recovery still match 2-b.
- Green compatibility highlighting does not gain a yellow outline.
- Browser console has no errors.
- Physical-controller testing remains pending until performed by the user.
