# PUBG Console Inventory 2-c Second-Run Feature Specification

Status: second-run interactive prototype

Last updated: 2026-08-31

Shared behavior authority: `../README.md`. This file records 2-c-specific
layout and navigation overrides.

## 1. Purpose and authority

Inventory 2-c is a layout variant of 2-a that preserves the live PUBG
inventory composition more closely. Gear/Outfit occupies the middle band
between the loose-item lists and weapon rack while all established second-run
mechanics remain unchanged.

Visual authority:

- Figma `498:799`: collapsed Gear and list-item tooltip state.
- Figma `498:1481`: collapsed Gear item-tooltip state.
- Figma `498:1072`: expanded Gear/Outfit and character state.

The executable artifact is `WBP_Inventory2C.html` on a 1920 x 1080 canvas.

## 2. Layout

The Figma frames are scaled from 2559 x 1439 to 1920 x 1080.

| Region | Left | Top | Width | Height |
|---|---:|---:|---:|---:|
| Vicinity | 18 | 59 | 324 | 962 |
| Inventory | 351 | 59 | 324 | 962 |
| Collapsed Gear | 674 | 112 | 140 | 342 |
| Expanded Gear/Outfit | 677 | 112 | 421 | 908 |
| Weapon/secondary rack | 1106 | 112 | 788 | 910 |

The compact Gear state places a vertical capacity meter beside Helmet,
Backpack, Vest, and the R3 character toggle. The expanded state keeps the
meter and converts the same center band into a full-height equipment/outfit
layout plus character preview: Gear is the short left column and Outfit is the
independent full-height right column. The three vertical weapon cards and the
lower Throwable/Melee strip remain visible at the right.

Neither loose-item list reserves an internal capacity-header row. Vicinity has
no decorative header line, and its first item row aligns exactly with the
first Inventory item row.

## 3. Lists and tooltips

Vicinity and Inventory use the one-column 2-a item rows and shared disconnected
category rails. Tooltips open hidden, because 2-c is a one-column-list
prototype, and View/V toggles them without moving focus.

- Normal list tooltip: X=675, Y=458.
- Weapon attachment-slot tooltip: X=839, Y=458, immediately beside the
  weapon rack's left edge.
- Collapsed Gear tooltip: X=814, Y=155.
- Expanded Gear/Outfit tooltip: X=425, Y=408.

All tooltip shells retain the shared content-driven height behavior. Images,
text, metadata, and action rows keep their normal size. Comparison stacks keep
an 18 px gap and shift as a unit when required to avoid the controller guide.
Tooltip overlays paint after the complete center Gear/Outfit panel, so the
expanded character and slot area can never cover a tooltip. Inside the center
panel, the character preview paints first and the capacity and slot controls
paint above it.

Normal attachment-slot inspection and attachment placement use distinct
tooltip layouts. A normally focused weapon attachment slot uses the
weapon-adjacent X=839 anchor. During placement, the selected item tooltip stays
at its original source-list anchor, and the focused target-slot tooltip is
stacked 18 px beneath it. A placement initiated from an equipped attachment
uses the weapon-adjacent anchor for both stacked tooltips.

## 4. Interaction contract

2-c inherits 2-a behavior rather than defining a separate ruleset:

- Gear/Outfit opens collapsed and toggles through R3.
- Attachment placement restricts focus to valid destinations and dims every
  invalid slot until confirmation or cancellation.
- X/A slot indicators remain compact, lower-right overlays.
- Filled and empty attachment slots retain tooltips and socket connectors.
- Empty Gear, Outfit, and Melee/Tool slots show slot-specific guidance.
- Tooltip comparison placement follows the source list or attachment chain.
- Throwable and Melee art remains centered in the space below the title row.
- Directional focus stops at blocked edges rather than looping or jumping to
  an unrelated list.
- The center equipment area is the mandatory horizontal bridge. Collapsed
  routing is Inventory ⇄ Gear ⇄ weapon attachments. Expanded routing follows
  the physical two-column layout: Inventory ⇄ Gear/Outfit ⇄ weapon
  attachments.
- Horizontal movement within the weapon rack crosses adjacent attachment
  chains first. Only the leftmost M16 attachment chain and the Throwable slot
  may move left into the center Gear/Outfit bridge.
- Expanded Gear and Outfit are independent vertical chains. Helmet, Backpack,
  Vest, and Hide form the short left chain; all nine Outfit slots form the
  separate right chain.
- Left/Right movement may cross between Gear and Outfit when they are the
  nearest controls in that direction. Lower Outfit slots may return directly
  to the vertically closest Inventory row because no Gear control occupies
  that height.
- The expanded Hide control is centered beneath the Gear column, matching the
  updated Figma frame.

## 5. Validation checklist

- 2-c opens with Gear collapsed and tooltips hidden.
- Center Gear geometry matches all three Figma reference states.
- Expanding Gear shows the full character and all Outfit controls without
  covering the weapon rack.
- Horizontal focus cannot skip the center equipment area in either state.
- Gear and Outfit each stop independently at their own Up/Down boundaries.
- The three weapon cards preserve vertical, unstretched weapon art.
- Socket UI does not overlap the attachment chain.
- Responsive tooltips do not clip, shrink, or overflow their borders.
- Expanded Gear/Outfit never paints above a list, slot, or comparison tooltip.
- Normal attachment-slot inspection remains 8 px left of the weapon rack.
- Inventory/Vicinity placement keeps the target-slot tooltip 18 px beneath the
  selected source-item tooltip at X=675; equipped-slot placement stacks both
  panels at X=839.
- Left movement traverses P1911 → M249 → M16 before entering Gear/Outfit.
- All local assets resolve and every `data-umg-name` remains unique.
