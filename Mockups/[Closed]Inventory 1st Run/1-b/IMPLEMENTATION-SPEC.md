# PUBG Console Inventory 1-b Feature Specification

Status: first-pass interactive prototype; layout and controller review pending

## 1. Purpose and authority

Inventory 1-b is a direct fork of the latest accepted 1-a artifact. It keeps
the conservative linear Vicinity and Inventory lists, horizontal firearm
presentation, two-by-three attachment grids, item behavior, tooltip default,
centered capacity label, and all current item-mutation fixes.

Its two intentional layout changes are:

1. Throwable and Melee/Tool move from the footer to a vertical column beside
   the stacked firearm cards.
2. Gear/Outfit is collapsed by default and expands with the R3 system adapted
   from 3-a.

The executable artifact is `WBP_Inventory1B.html` on a 1920 x 1080 canvas.

## 2. Layout

Vicinity remains at X=42 with width 384. Inventory remains at X=593 with width
384. Both retain the 1-a linear row system and fixed Inventory capacity header.

The equipment group begins at X=989 and Y=90 and reaches the shared content
bottom at Y=989:

- three equal-fill firearm cards remain stacked in a 518 x 899 column;
- a 176 x 899 secondary column begins at X=1515;
- Throwable occupies its upper half and Melee/Tool its lower half; and
- the P1911 remains deliberately smaller than the main firearms.

The three firearm cards divide the added vertical space evenly. Attachment
slots remain a compact two-by-three group packed against the top of each card;
the added card height does not create spacing between attachment rows. Firearm
imagery remains horizontal and centered. This removes the obsolete lower
footer void without changing the equipment group's horizontal footprint.

The compact Gear summary is at X=1776, Y=280, width 112, height 470. The
expanded drawer begins at X=1515, Y=38, width 373, height 970. It overlays the
secondary column only and never covers M16, M249, or P1911.

## 3. Secondary-column navigation

Attachment navigation retains the visible 1-a grid:

- Left/Right moves within a row when an enabled neighbor exists.
- Up/Down moves within the same column and continues through the vertically
  stacked firearm cards.
- Right from a right-edge attachment, or a left cell whose right neighbor is
  unavailable, enters the nearest secondary slot by vertical position.
- The bottom edge of the P1911 grid is contained because the secondary area is
  now to its right, not below it.
- Up/Down toggles between Throwable and Melee/Tool.
- Left from either secondary slot returns to the most recently focused firearm
  attachment, falling back to the first P1911 attachment.
- Right from either secondary slot enters the first Gear slot.
- Any directional entry from outside Gear/Outfit excludes the Outfit rail until
  focus has first entered the Gear rail.

When Gear is expanded, Right from a firearm edge enters Gear because the
secondary column is covered and removed from the active focus graph.

## 4. Gear/Outfit collapse contract

The screen opens collapsed. The compact panel shows Helmet, Backpack, Vest,
and the R3 toggle. Character and Outfit controls are hidden.

R3, keyboard R, or the visible toggle expands the drawer. Expanded state shows
the three Gear slots, character preview, complete Outfit rail, and a hide label.
R3 is blocked during modal attachment placement because B remains the only
placement cancellation input.

Focus recovery is deterministic:

- expansion preserves focus unless it is in the covered secondary column;
- covered secondary focus moves to Helmet;
- collapse from an Outfit slot returns focus to the first Gear slot (Helmet);
- collapse preserves the focused Gear slot or any focus outside Outfit; and
- Gear and Outfit rails loop independently on Up/Down.

## 5. Preserved interaction contract

All current 1-a behavior remains, including:

- initial focus on the first Vicinity item;
- linear-list category mutation and focus recovery;
- consumable/Throwable stacking and 30-round ammunition stacks;
- replaced Throwables returning to Inventory;
- Vicinity X pickup with optional empty-slot quick equip, Inventory X quick
  equip with replacement, modal placement, comparison tooltips, detach/drop,
  and socket-highlight feedback without connector paths;
- gamepad Menu toggling the Vicinity convenience, enabled by default;
- blocked Vicinity AUG equip simulation;
- tooltips hidden by default and toggled by View/V; and
- capacity text centered on the complete bar independently of fill.

Tooltip positions remain provisional. The normal Vicinity tooltip uses X=426
at the Vicinity panel's right edge. Normal Inventory and attachment-comparison
tooltips retain X=360; Gear/Outfit retains the inherited X=1309 position.

## 6. Bindable UMG API

1-b preserves the 30 bindings inherited from 1-a and adds:

- `Box_SecondarySlots`
- `Btn_ToggleGearOutfit`
- `Txt_GearToggleLabel`
- `Txt_OutfitTitle`

Generated Widget Blueprints remain layout-only. R3 state, focus recovery, item
mutation, and gameplay behavior belong in the hand-written parent UserWidget.

## 7. Validation checklist

- The linear loose-item lists match 1-a.
- Three equal-height horizontal firearm cards fill the content area to Y=989.
- The secondary column fills the same 899 px height.
- Every attachment group is packed upward with 2 px row and column gaps.
- Throwable and Melee/Tool form a separate vertical column beside the firearms.
- Attachment-to-secondary, secondary-to-attachment, and secondary-to-Gear
  movement follow Section 3.
- Attachment feedback brightens and enlarges mapped socket points without
  drawing lines.
- Default Gear state is collapsed; R/R3 expands and collapses it.
- Expanded Gear covers only the secondary column.
- Drawer focus recovery follows Section 4.
- Replaced Throwables return to Inventory.
- Vicinity X never replaces an equipped attachment; occupied/off cases enter Inventory.
- Inventory X retains replacement quick equip.
- Menu toggles the Vicinity empty-slot convenience.
- Capacity text stays centered.
- Tooltips remain hidden on entry.
- Every `data-umg-name` is unique.
- No media query, CSS grid, z-index, transform, or non-root absolute child is introduced.
- Browser console has no errors.
