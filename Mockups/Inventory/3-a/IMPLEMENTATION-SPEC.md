# PUBG Console Inventory 3-a Feature Specification

Status: first-milestone conservative interactive HTML prototype; manual controller acceptance pending

Last updated: 2026-08-19

## 1. Purpose and naming

Inventory 3-a is the conservative one-column-list version of the expandable
Gear/Outfit prototype. During this milestone's final naming swap, the former
two-column-grid 3-a became Inventory 3-b and this live-PUBG-style list variant
became Inventory 3-a.

Design sources:

- Default/collapsed Figma frame: `451:1799`
- Expanded Figma frame: `451:2023`

The executable artifact is `WBP_Inventory3A.html`.

## 2. Inherited behavior

Unless this specification explicitly overrides a list-layout rule, 3-a is
behaviorally identical to `../3-b/WBP_Inventory3B.html` and its specification.
This includes:

- all item pickup, drop, use, equip, stacking, and focus-recovery behavior;
- replaced Throwables returning to Inventory;
- conditional Vicinity empty-slot quick equip and the Menu toggle;
- Inventory replacement quick equip;
- attachment placement, comparison, socket connectors, detach, and drop;
- blocked Vicinity AUG equip simulation;
- tooltip visibility controlled by View, with one-column text-list tooltips
  hidden by default;
- collapsed/expanded Gear and Outfit behavior controlled by R3;
- the vertical Throwable/Melee secondary column;
- firearm, secondary, Gear, and Outfit navigation and loop rules; and
- the smaller sidearm presentation and all corrected socket semantics.

## 3. One-column list delta

The design canvas remains 1920 x 1080. Browser fitting remains preview-only.

Vicinity starts at X=15 and Inventory at X=378. Both list regions are 324 px
wide and use a vertical `ScrollBox`. The Weapon region remains at X=729, so the
entire equipment and collapse/expand layout is unchanged from 3-b.

Each list has a 52 px header inside its border:

- Vicinity shows the fixed category line;
- Inventory shows the horizontal capacity bar and centered `210 / 350` value.

The separate vertical capacity bar used by 3-b does not appear in 3-a.

Each item is one 306 x 90 px horizontal row:

- 84 px icon area;
- flexible name area;
- 30 px quantity area.

The quantity area is part of the live-style row and displays `1` for
non-stackable items, including attachments. Consumables and Throwables still
stack by item name, and ammunition remains capped at 30 per row. Category
dividers span the full 306 px inner list width. The AUG uses the same row
geometry rather than a two-column-wide card.

## 4. List focus behavior

- Up and Down follow the visible one-column order without looping at list
  boundaries.
- Left and Right leave a list toward the neighboring persistent region; there
  is no horizontal movement inside a list.
- Empty-list focus recovery remains on the list container.
- Category compaction and scrolling preserve the focused row after mutation.
- Initial focus remains the first Vicinity item.

All non-list focus rules remain exactly as documented for 3-b, except Right
from either secondary slot—including Melee/Tool—moves to the first Gear slot
(Helmet). Gear/Outfit collapse returns Outfit focus to Helmet while preserving
any focused Gear slot or focus outside Outfit.

## 5. Tooltip behavior

The shared visibility rule is layout-based: one-column text-list prototypes
start with tooltips hidden, while two-column grid-list prototypes start with
tooltips visible. Therefore 3-a starts hidden and View toggles visibility
without changing focus.

When a normal Vicinity or Inventory item has focus, the primary tooltip moves
to X=704, immediately right of the 324 px Inventory list. Normal equipment
tooltips keep the inherited X=504 position. Attachment comparison remains
unchanged: both comparison panels stay at X=504, with the selected attachment
at Y=60 and target slot at Y=530.

## 6. Bindable UMG API

The 35 root bindings remain identical to 3-b, including
`Txt_InventoryCapacity`, `Btn_ToggleGearOutfit`, and
`Txt_GearToggleLabel`. The row component adds `Txt_ItemName` beside the
existing icon and quantity bindings.

The intended generated parent widget is `WBP_Inventory3A`. Binding names are
an API shared with its hand-written parent `UserWidget`.

## 7. Unreal translation requirements

- Generate the layout from `WBP_Inventory3A.html`; never hand-edit the
  generated Widget Blueprint.
- Use vertical ScrollBoxes for Vicinity and Inventory.
- Use the row structure in `WBP_InventoryItemTile.html` for every list item.
- Implement the capacity header as a native horizontal ProgressBar with a
  centered TextBlock overlay.
- Preserve every inherited 3-b mechanic and focus rule outside the list delta.
- Do not translate browser-only viewport fitting, Gamepad API polling, DOM
  mutation, or SVG connector generation into the generated Widget Blueprint.

## 8. Validation checklist

- Vicinity and Inventory are exactly one item wide.
- Every row contains icon, name, and quantity areas.
- Attachment rows display quantity `1`.
- Capacity text remains centered independently of fill amount.
- Tooltips are hidden on entry and remain toggleable with View.
- Normal Vicinity/Inventory tooltips use X=704; equipment tooltips use X=504.
- Comparison tooltips retain X=504 and their existing stacked Y positions.
- List Up/Down movement is linear and non-looping.
- List Left/Right transitions reach the expected neighboring region.
- The collapsed and expanded Gear/Outfit states match 3-b behavior.
- Right from both Throwable and Melee/Tool reaches Helmet.
- Gear/Outfit collapse sends Outfit focus to Helmet and preserves Gear or
  outside focus.
- Item mutation, attachment placement, and replacement rules remain functional.
- All 35 root `data-umg-name` values are unique.
- No media query, CSS grid, z-index, transform, or non-root absolute child is
  introduced.
- Browser console has no warnings or errors.

Manual physical-controller acceptance remains pending.
