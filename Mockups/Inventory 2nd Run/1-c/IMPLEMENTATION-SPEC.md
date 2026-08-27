# PUBG Console Inventory 1-c Second-Run Feature Specification

Status: second-run interactive baseline; layout and controller review pending

Last updated: 2026-08-21

## 1. Purpose and authority

This second-run Inventory 1-c is a direct fork of the completed first-run 1-c
artifact. Its established loose-item presentation uses the tile grid language
from 2-b and 3-a instead of 1-b's linear rows.

The secondary weapon column, collapsible Gear/Outfit drawer, firearm layout,
item mechanics, and focus recovery remain the 1-b system. The intentional
tooltip-default override is documented below.
The executable artifact is `WBP_Inventory1C.html` on a 1920 x 1080 canvas.

The second-run fork keeps Gear/Outfit collapsed by default, dims every
ineligible attachment slot during modal A placement, and restores the original
slot presentation after either confirmation or cancellation. X and A cues are
reduced to centered 24 px lower-right badges so the attachment artwork remains visible.

## 2. Grid presentation

Vicinity remains at X=42 and Inventory moves to X=516. Each list is deliberately
capped at 220 px wide. The resulting gaps are reserved for the provisional
tooltip panels. Each 198 px inner item area is a flex-wrap UMG WrapBox preview:

- at most two 96 x 96 item tiles per row;
- 6 px horizontal and 8 px vertical gaps;
- 198 x 3 category dividers that occupy a complete row; and
- a 198 x 202 wide firearm tile.

The Vicinity list retains its headerless treatment. Inventory retains the fixed
68 px capacity header, with the capacity value centered on the complete bar
independently of fill.

The grid is implemented with wrapping FlexBox CSS rather than CSS Grid so the
prototype remains structurally portable to a native UMG WrapBox.

Vicinity ends at X=262 and Inventory begins at X=516, leaving 254 px between
them. Inventory ends at X=736, leaving 253 px before Weapons at X=989. The
divider sits at X=388. The provisional 225 px list tooltip is centered inside
the first gap at X=277 and does not overlap either list. Attachment-slot and
Gear/Outfit focus move the primary tooltip to X=756, inside the second gap and
8 px left of the Weapon region. During attachment comparison, the selected
loose attachment remains at X=277 while the target-slot tooltip remains at
X=756; both retain their normal vertically centered position instead of
forming a vertical stack.

## 3. Grid navigation and mutation

Focus follows the rendered grid:

- Left/Right selects the neighboring tile in the visual row when one exists.
- Up/Down selects the closest tile in the same visual column.
- Geometric fallback handles category dividers, partial rows, the wide firearm
  tile, and transitions between Vicinity, Inventory, and equipment.
- Empty-list focus recovery remains available on the list container.

Pickup, drop, use, equip, stacking, category compaction, divider visibility,
and restoration of a replaced equipped Throwable are unchanged. Newly created
or restored list entries use the same square or wide tile geometry as initial
entries. Attachment entries never display a quantity badge because they are
non-stackable.

## 4. Preserved 1-b equipment contract

The equipment group remains at X=989, Y=90 and reaches Y=989:

- three equal-fill horizontal firearm cards in a 518 x 899 column;
- a 176 x 899 Throwable/Melee secondary column at X=1515;
- a compact Gear summary at X=1776, Y=280; and
- an expanded Gear/Outfit drawer at X=1515, Y=38 that covers only the
  secondary column.

All 1-b navigation is preserved. Attachment focus follows its two-column grid,
firearm edges enter the nearest secondary slot, secondary Left returns to the
latest firearm attachment, secondary Right enters Gear, and R/R3 toggles the
drawer with deterministic focus recovery. Every successful collapse returns
focus from Outfit to the first Gear slot (Helmet), while preserving any
focused Gear slot or focus outside Outfit. Directional entry from any outside
region cannot jump directly into the Outfit rail; it enters the Gear rail first.

Attachment groups remain packed against the top of each taller firearm card;
only the cards themselves divide the 899 px weapon-column height proportionally.

## 5. Preserved interaction contract

1-c retains all current 1-b behavior, including:

- initial focus on the first Vicinity item;
- consumable/Throwable stacking and 30-round ammunition stacks;
- replaced Throwables returning to Inventory;
- Vicinity X pickup with optional empty-slot quick equip, Inventory X quick
  equip with replacement, modal placement, comparison, detach/drop, and
  socket-highlight feedback without connector paths;
- gamepad Menu toggling the Vicinity convenience, enabled by default;
- blocked Vicinity AUG equip simulation;
- tooltips visible by default in 1-c and toggled by View/V; and
- the smaller P1911 image treatment.

Tooltip positions remain provisional and are intentionally context-sensitive.

## 6. Bindable UMG API

1-c exposes 36 unique root bindings, including
`Img_SelectedAttachmentCategory` and `Img_TooltipItemCategory`.
`Box_VicinityGrid` and `Box_InventoryGrid` map to WrapBoxes, while the remaining bindings and
hand-written parent UserWidget responsibilities are unchanged.

## Shared category and tooltip treatment (2026-08-24)

Figma node `468:2072` is a component-treatment reference only. Its 5-a frame
does not define a new prototype layout.

- The two-column lists reserve an 18 px left rail and adapt tiles to 84 px so
  category markers do not change the surrounding screen layout.
- Green Recovery/Boost, red Throwable, ochre Ammunition, blue Attachment, and
  purple Weapon rails each show one marker on their first visible row.
- Pickup, drop, stacking, and compaction regenerate markers and rail lengths.
- Tooltips use the dark reference panel, white border, category badge and
  label, large item art, and concise green-valued effect rows.
- A 3 px divider plus the two native 8 px row gaps creates a 19 px category
  break. The 10 px marker is centered in that full break. The 18 px gutter
  keeps the rail close to the tile area. The first marker is centered in the
  10 px list-top inset.
- Empty-slot guidance tooltips suppress the category badge while retaining the
  slot-specific guidance label and representative artwork.
- List markers contain no icon. Populated-item tooltips retain the exported
  category icon and text label.
- Each populated category owns one independent 4 px rail. It starts at the
  center of that category's 10 px marker and ends exactly at the bottom edge
  of the category's final tile row. The previous rail stops before the next
  marker, leaving a visible unconnected gap between categories.
- Occupied Throwable and Melee/Tool item art is centered within the remaining
  secondary-slot space below the fixed name row.

## 7. Validation checklist

- Vicinity and Inventory are 220 px wide and capped at two grid columns.
- The reserved tooltip gaps remain open between persistent groups.
- Vicinity-to-Inventory and Inventory-to-Weapons gaps differ by only 1 px.
- Dividers and the AUG tile occupy complete rows.
- Focus follows visible rows and columns through partial-category rows.
- Mutated/restored list items retain grid geometry and category order.
- All 1-b secondary-column and Gear drawer routes remain functional.
- Default Gear state is collapsed; R/R3 expands and collapses it.
- Modal A placement dims every non-destination attachment slot, including the
  source slot, while navigation remains restricted to eligible destinations.
- A confirmation and B cancellation both restore normal attachment-slot styling.
- X and A indicators use a centered 24 px lower-right badge and do not hide slot artwork.
- The empty Melee/Tool slot shows its equip-guidance tooltip when focused.
- All nine expanded Outfit slots are focusable and participate in the rail loop.
- Expanded Gear covers only the secondary column.
- Firearm and secondary columns fill the content area to Y=989.
- Attachment rows remain gathered upward with no distributed vertical space.
- Attachment feedback brightens and enlarges mapped socket points without
  drawing lines.
- Replaced Throwables return to Inventory.
- Vicinity X never replaces an equipped attachment; occupied/off cases enter Inventory.
- Inventory X retains replacement quick equip.
- Menu toggles the Vicinity empty-slot convenience.
- While that convenience is enabled, a focused compatible Vicinity attachment
  shows the X cue on the held slot regardless of whether it is empty or occupied.
  This cue-visibility rule does not change the preceding action behavior.
- Capacity text stays centered.
- Tooltips are visible on entry and remain toggleable with View/V.
- Attachment and Gear/Outfit tooltips occupy the Inventory-to-Weapons gap.
- Comparison keeps the selected loose attachment in the list gap and the
  target-slot tooltip in the equipment gap, with both vertically centered.
- Attachment list tiles do not display quantity badges.
- Both grid lists expose one marker per populated category, and rail state
  remains correct after category compaction.
- Attachment tooltips show the blue Attachment badge and concise effect rows.
- All 34 `data-umg-name` values are unique.
- No media query, CSS grid, z-index, transform, or non-root absolute child is introduced.
- Browser console has no errors.
