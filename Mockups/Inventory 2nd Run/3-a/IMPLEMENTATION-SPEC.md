# PUBG Console Inventory 3-a Second-Run Feature Specification

Status: second-run conservative interactive baseline; manual controller acceptance pending

Last updated: 2026-09-01

Shared behavior authority: `../README.md`. This file records 3-a-specific
layout and navigation overrides.

## 1. Purpose and naming

This second-run Inventory 3-a is a direct fork of the completed first-run 3-a.
It remains the conservative one-column-list version of the expandable
Gear/Outfit prototype. During this milestone's final naming swap, the former
two-column-grid 3-a became Inventory 3-b and this live-PUBG-style list variant
became Inventory 3-a.

The second-run interaction delta keeps the default collapsed state, dims every
ineligible attachment slot during modal A placement, and restores the original
presentation after A confirmation or B cancellation. X and A cues are reduced
to centered 24 px lower-right badges so the attachment artwork remains visible.

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
- shared Vicinity weapon switching through X quick-swap or A-based primary
  slot selection, with attachment composition preserved per destination slot;
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
from either secondary slot--including Melee/Tool--moves to the first Gear slot
(Helmet). Gear/Outfit collapse returns Outfit focus to Helmet while preserving
any focused Gear slot or focus outside Outfit. Directional entry from outside
Gear/Outfit excludes Outfit until focus has first entered the Gear rail.

## 5. Tooltip behavior

The shared visibility rule is layout-based: one-column text-list prototypes
start with tooltips hidden, while two-column grid-list prototypes start with
tooltips visible. Therefore 3-a starts hidden and View toggles visibility
without changing focus.

When a normal Vicinity or Inventory item has focus, the primary tooltip moves
to X=704, immediately right of the 324 px Inventory list. Normal equipment
tooltips keep the inherited X=504 position. Attachment comparison remains
at X=504. The selected attachment begins from base Y=60, the target-slot
tooltip follows 18 px below its natural-height panel, and the pair shifts
upward together when required to avoid the controller guide.

## 6. Bindable UMG API

The 37 root bindings include
`Txt_InventoryCapacity`, `Btn_ToggleGearOutfit`, and
`Txt_GearToggleLabel`, plus `Img_SelectedAttachmentCategory` and
`Img_TooltipItemCategory`. The row component adds `Txt_ItemName` beside the
existing icon, category-rail, and quantity bindings.

The intended generated parent widget is `WBP_Inventory3A`. Binding names are
an API shared with its hand-written parent `UserWidget`.

## Shared category and tooltip treatment (2026-08-24)

Figma node `468:2072` is a component-treatment reference only; 5-a is not a
new prototype. The one-column rows reserve 18 px for green Recovery/Boost, red
Throwable, ochre Ammunition, blue Attachment, and purple Weapon category rails. Rails regenerate
after list mutation, and the dark tooltip now presents a category badge and
label plus concise effect lines with green values. A 3 px category divider
plus the two native 8 px row gaps creates a 19 px category break. The 10 px
marker is centered in that full break, while the first marker is centered in
the 10 px list-top inset. The compact rail stays beside the item area. List
markers are solid category-color circles without icons. Each populated
category owns one independent 4 px rail. It starts at the marker center, ends
at the bottom edge of the category's final item row, and stays disconnected
from the next category rail. Populated-item tooltips retain the
exported icon and category label. Empty-slot
guidance tooltips omit the category badge but retain the slot-specific guidance
label and representative artwork. The surrounding 3-a layout and focus model
remain unchanged.

## Compact vertical weapon presentation (2026-08-27)

M16, M249, and P1911 remain vertical. Each card uses its `*-oriented.png`
export at the asset's natural aspect ratio, centered in the weapon body and
scaled below the full available height. The long guns occupy 72% of the body
height and P1911 occupies 38%, leaving deliberate breathing room instead of
stretching the art into a thin full-height silhouette. The weapon image may
extend beneath part of the attachment-slot rail; the rail remains visually
and interactively above the art.

Socket markers and connector endpoints are generated from the rendered
vertical image bounds. The socket SVGs remain provenance references and are
not layered over the interactive presentation. Weapon art may pass beneath
the attachment rail, but socket-marker UI may not: every marker uses a
14 px collision envelope and is moved at least 8 px beyond the rail when that
envelope would overlap the attachment chain.

## 7. Unreal translation requirements

- Generate the layout from `WBP_Inventory3A.html`; never hand-edit the
  generated Widget Blueprint.
- Use vertical ScrollBoxes for Vicinity and Inventory.
- Use the row structure in `WBP_InventoryItemTile.html` for every list item.
- Implement the capacity header as a native horizontal ProgressBar with a
  centered TextBlock overlay.
- Preserve every inherited 3-b mechanic and focus rule outside the list delta.
- Center occupied Throwable and Melee/Tool item art within the remaining
  secondary-slot space below the fixed name row.
- Do not translate browser-only viewport fitting, Gamepad API polling, DOM
  mutation, or SVG connector generation into the generated Widget Blueprint.

## 8. Validation checklist

- Vicinity and Inventory are exactly one item wide.
- Every row contains icon, name, and quantity areas.
- Attachment rows display quantity `1`.
- Capacity text remains centered independently of fill amount.
- Tooltips are hidden on entry and remain toggleable with View.
- Normal Vicinity/Inventory tooltips use X=704; equipment tooltips use X=504.
- Comparison tooltips retain X=504 and use a content-driven 18 px vertical
  stack rather than fixed Y positions.
- List Up/Down movement is linear and non-looping.
- List Left/Right transitions reach the expected neighboring region.
- The collapsed and expanded Gear/Outfit states match 3-b behavior.
- Modal A placement dims every non-destination attachment slot, including the
  source slot, while navigation remains restricted to eligible destinations.
- A confirmation and B cancellation both restore normal attachment-slot styling.
- X and A indicators use a centered 24 px lower-right badge and do not hide slot artwork.
- With the Vicinity convenience enabled, focused compatible attachments from
  either loose-item list show the X cue on the held slot regardless of occupancy.
  Occupied Vicinity X still follows the inherited pickup-to-Inventory behavior.
- The empty Melee/Tool slot shows its equip-guidance tooltip when focused.
- All nine expanded Outfit slots remain focusable and participate in the rail loop.
- Right from both Throwable and Melee/Tool reaches Helmet.
- Outside directional entry reaches Gear before Outfit.
- Gear/Outfit collapse sends Outfit focus to Helmet and preserves Gear or
  outside focus.
- Both lists expose one marker per populated category, with correct marker
  migration after category compaction.
- Attachment tooltips show the blue Attachment badge and concise effect rows.
- Item mutation, attachment placement, and replacement rules remain functional.
- M16, M249, and P1911 remain vertical, preserve their natural aspect ratios,
  and do not fill the complete weapon-body height.
- No neutral, compatible, or focused socket circle overlaps an attachment-slot
  rail at any supported marker size.
- All 35 root `data-umg-name` values are unique.
- No media query, CSS grid, z-index, transform, or non-root absolute child is
  introduced.
- Browser console has no warnings or errors.

Manual physical-controller acceptance remains pending.
