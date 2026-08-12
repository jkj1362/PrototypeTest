# PUBG Console Inventory 2-b Final Feature Specification

Status: finalized interactive HTML design prototype; Unreal implementation is deferred

Last updated: 2026-08-12

## 1. Scope

This document defines the current behavior and structure of the PUBG console
Inventory 2-b prototype. It records both the user's design decisions and the
mechanics currently implemented in `WBP_Inventory2B.html`.

Inventory 2-b is closed as the accepted baseline for subsequent variations.
Future variations should fork these decisions explicitly rather than silently
changing this document's description of the 2-b behavior.

If this document and the HTML disagree, the HTML is the executable truth and
this document must be updated. If the HTML and an explicit newer user decision
disagree, the user decision wins and both files must be updated together.

The prototype is intended to validate:

- television readability;
- controller focus distance and navigation flow;
- learnability of attachment compatibility and weapon context;
- repeated quick-equip and slot-selection behavior;
- item movement between Vicinity, Inventory, weapon sockets, and secondary
  slots;
- a UMG-friendly visual hierarchy for later Unreal implementation.

## 2. Artifact set and implementation boundary

- `WBP_Inventory2B.html`: layout, styling, preview data, and browser-only
  interaction simulation.
- `WBP_InventoryItemTile.html`, `WBP_GearSlot.html`, `WBP_WeaponCard.html`, and
  `WBP_ItemTooltip.html`: reusable widget-boundary references.
- `ASSET-AUDIT.md`: image provenance, visual decisions, and Unreal notes.
- `assets/`: Figma exports and mockup-only schematic slot art.

Session handoffs are historical workflow records, not normative feature
documents. This specification and the executable HTML together define the
finished 2-b baseline.

The HTML is designed at 1920 x 1080. `preview-stage`, JavaScript `zoom`,
keyboard input, Gamepad API polling, DOM mutation, and SVG connector generation
are browser-preview infrastructure. An Unreal authoring pass should translate
the behavior into a hand-written parent `UserWidget`; it should not attempt to
run the browser script inside UMG.

## 3. Design hierarchy

The root is `Panel_Root`, a fixed 1920 x 1080 overlay with a solid-black
background. Its main regions are:

1. Gear and outfit region.
2. Vicinity list.
3. Inventory list.
4. Weapon rack containing M16, M249, and P1911 cards.
5. Throwable and Melee/Tool secondary slots.
6. Attachment connector overlay.
7. Item and attachment-comparison tooltip overlays.
8. Controller/action guide.

The connector overlay is placed before the tooltip in DOM order so the tooltip
remains above connectors without `z-index`.

Repeated UI structures are declared as:

- `WBP_InventoryItemTile`
- `WBP_GearSlot`
- `WBP_WeaponCard`
- `WBP_ItemTooltip`

The intended generated parent widget is `WBP_Inventory2B`.

## 4. Bindable UMG API

These 29 names are the current binding surface and must remain unique:

- `Panel_Root`
- `Box_GearAndOutfit`
- `Txt_GearTitle`
- `Img_CharacterPreview`
- `Box_Vicinity`
- `Txt_VicinityTitle`
- `Box_VicinityGrid`
- `Bar_InventoryScroll`
- `Box_Inventory`
- `Txt_InventoryTitle`
- `Box_InventoryGrid`
- `Box_WeaponRack`
- `Overlay_AttachmentConnectors`
- `Box_ControllerGuide`
- `Txt_InteractionMessage`
- `Txt_GamepadStatus`
- `Panel_SelectedAttachmentTooltip`
- `Txt_SelectedAttachmentName`
- `Txt_SelectedAttachmentType`
- `Img_SelectedAttachment`
- `Txt_SelectedAttachmentDescription`
- `Txt_SelectedAttachmentCompatibility`
- `Panel_ItemTooltip`
- `Txt_TooltipItemName`
- `Txt_TooltipItemType`
- `Img_TooltipItem`
- `Txt_TooltipDescription`
- `Txt_TooltipCompatibility`
- `Box_TooltipActions`

Treat these names as an API. Renaming one requires a matching change in the
hand-written Unreal parent class.

## 5. Item data model

Loose item buttons use `data-*` attributes as a lightweight preview model.

| Attribute | Meaning |
|---|---|
| `data-item-name` | Korean player-facing item name |
| `data-item-type` | Korean item type shown in tooltip |
| `data-item-category` | `consumable`, `throwable`, `ammunition`, `attachment`, or `weapon` |
| `data-image` | Local item image path |
| `data-description` | Tooltip description |
| `data-compatibility` | Attachment socket type: `muzzle`, `grip`, `mag`, `scope`, or `stock` |
| `data-compatible-weapon-groups` | Comma-separated compatibility groups such as `main` or `sidearm` |

The visible `.item-count` child is the stack quantity. A missing count means
quantity 1.

The JavaScript `itemPayload()` function serializes this preview state for item
movement. `populateListItem()` performs the inverse operation when creating a
new list tile.

## 6. List categories and reflow

Both Vicinity and Inventory are two-column WrapBox-style panels. Categories are
kept in this order:

1. Consumables
2. Throwables
3. Ammunition
4. Attachments
5. Weapons, when the list contains them

Full-width divider nodes mark category boundaries:

| Divider id | Boundary |
|---|---|
| `consumables-throwables` | Consumables / Throwables |
| `throwables-ammo` | Throwables / Ammunition |
| `ammo-attachments` | Ammunition / Attachments |
| `attachments-weapons` | Attachments / Weapons |

`categoryEndReference()` maps a category to its following divider.
`createListDestination()` inserts a new tile immediately before that divider.
`compactCategory()` preserves item order inside that segment.

`updateCategoryDividers()` recalculates divider visibility after initialization
and every list mutation. Empty categories contribute no divider. Among the
remaining populated categories, exactly one divider is shown immediately before
each category after the first populated category. This prevents consecutive or
orphaned lines when one or more category segments become empty.

When an item leaves either list, `clearListItem()` removes the complete tile
wrapper from the DOM. It does not leave a disabled or visually empty tile.
Items below it therefore reflow upward automatically. The category divider
does not move relative to other categories. With an odd number of items, the
unused half-row is natural WrapBox space, not an empty widget.

Vicinity and Inventory use the same removal, insertion, stacking, and category
placement functions.

`updateEmptyListFocus()` makes a list panel focusable only while it contains no
item tiles. Removing the final tile returns the empty panel as the focus-recovery
target, keeping focus inside the list rather than jumping to another region.
Restoring any item removes the panel from the focus graph again. Empty-panel
focus shows neither an item tooltip nor contextual item actions.

## 7. Stacking rules

`restoreItemToList()` implements stack merging.

### Stackable categories

- Consumables stack with an item of the same `data-item-name`.
- Throwables stack with an item of the same `data-item-name`.
- Ammunition stacks with ammunition of the same `data-item-name`.

Consumables and throwables have no artificial tile maximum in this prototype.
Ammunition has a maximum of 30 per tile. Incoming ammunition first fills
matching partial stacks, then creates additional tiles in quantities of 30 or
the remaining amount.

Example:

`30, 30, 15` plus an incoming stack of `30` becomes `30, 30, 30, 15`.

### Non-stackable category

Attachments never merge. Every loose attachment occupies its own tile even if
another attachment has the same name and socket type.

### Quantity consumed by actions

- X pickup transfers the complete focused stack.
- Y drop transfers the complete focused stack.
- A use on a consumable consumes one unit.
- A equip on a throwable consumes one unit and updates the Throwable secondary
  slot.
- Attachment equip always consumes its single source tile.

Partial pickup/drop and a quantity selector are outside the current prototype.

## 8. Initial list content

### Vicinity

- Consumables: Bandage x1, Med Kit x2
- Throwables: Molotov Cocktail x4, Frag Grenade x1
- Ammunition: 5.56mm x30, 5.56mm x15
- Attachments: Extended Quickdraw Magazine, Quickdraw Magazine
- Weapon: AUG (X and A guides are shown, but both equip flows are intentionally
  blocked in this prototype)

### Inventory

- Consumables: Bandage x1, Med Kit x1
- Throwables: Molotov Cocktail x1
- Ammunition: 5.56mm x30, x30, x15; 9mm x30
- Attachments: Extended Quickdraw Magazine, Muzzle, Quickdraw Magazine,
  3x Scope, Tactical Stock, Angled Grip

No loose item tile uses an attachment silhouette. All loose items use actual
item art exported from Figma.

## 9. Weapon and socket model

The rack contains three weapon cards:

| Weapon | Group | Held | Initially available socket types |
|---|---|---|---|
| M16 | `main` | Yes | Muzzle, Grip, Magazine, Scope, Stock |
| M249 | `main` | No | Muzzle, Magazine, Scope, Stock; Grip unavailable |
| P1911 | `sidearm` | No | Muzzle, Magazine, Scope; Grip and Stock unavailable |

Every rail always renders five positions in this order:

`Muzzle -> Handle/Grip -> Magazine -> Scope -> Stock`

Marker identity was audited against the explicitly named ellipse layers in the
original Figma 2-b frame (`393:917`):

- M16 `Attachment sockets` (`404:3740`): `Socket - Muzzle`,
  `Socket - Handle`, `Socket - Magazine`, `Socket - Scope`, `Socket - Stock`;
- M249 `Attachment sockets` (`404:3768`): `Socket - Muzzle`,
  `Socket - Magazine`, `Socket - Scope`, `Socket - Stock`;
- P1911 `Attachment sockets` (`404:3797`): `Socket - Muzzle`,
  `Socket - Magazine`, `Socket - Scope`.

The P1911 visual therefore renders exactly three marker points. Its unavailable
Handle/Grip and Stock rail positions do not have gun-image markers.

The final browser-aligned marker centers are expressed in each socket SVG's
native viewBox coordinates:

| Weapon | Muzzle | Handle/Grip | Magazine | Scope | Stock |
|---|---:|---:|---:|---:|---:|
| M16 | `74,12` | `56,282` | `12,426` | `137,450` | `24,651` |
| M249 | `82,12` | unavailable | `12,345.5` | `148,453` | `39,648` |
| P1911 | `105,12` | unavailable | `42,150` | `156,176` | unavailable |

The P1911 Magazine and Scope assignments include the final visual correction:
the Magazine marker is the lower-left point placed near the pistol grip, while
the Scope marker uses the right-side point. These accepted coordinates override
the stale exported P1911 path order.

Each slot has one of three `data-slot-state` values:

- `empty`: focusable and shows the designated gray silhouette;
- `occupied`: focusable and shows the actual attached item image;
- `unavailable`: disabled and dimmed, with no misleading empty silhouette.

Gray silhouettes are instructional socket art only.

## 10. Attachment compatibility

`compatibleSlots(payload)` requires both:

1. matching socket type; and
2. a weapon group included in `payload.weaponGroups`.

Current loose attachments declare `main`, so they can highlight compatible M16
and M249 sockets. They do not highlight P1911 sockets. A future sidearm item
must explicitly declare `sidearm`.

When a loose attachment is focused:

- all compatible sockets receive the green compatible state;
- the compatible socket on the held M16 receives the controller X quick-equip
  icon while retaining the same green-only compatible treatment;
- compatible and quick-equip targets never receive a yellow border or outline;
  yellow is reserved for the actual navigation focus;
- the cue is recalculated on every focus and after every action;
- it is not a first-time tutorial or a one-shot state.

When the user traverses weapon sockets without a loose or pending attachment,
no cross-weapon synchronized compatibility highlight is shown.

During A-based slot selection, every compatible destination remains green and
the currently focused valid destination receives an A-button tap icon. The A
icon moves with placement focus and is removed as soon as placement is
confirmed or cancelled. The yellow outline continues to identify the actual
navigation focus.

## 11. Attachment interaction state machine

The browser preview uses four variables:

- `pendingAttachment`: payload being placed through A slot selection;
- `pendingSourceSlot`: occupied weapon socket when moving an attached item;
- `returnFocus`: loose source item or source socket used for cancellation;
- `placementFocus`: last valid socket focused inside the locked placement mode.

### X quick equip from a loose attachment

1. Serialize the focused loose attachment.
2. Find its compatible socket on the held M16.
3. If that socket is occupied, restore its existing attachment to Inventory.
4. Populate the socket with the selected attachment.
5. Remove the source tile from Vicinity or Inventory.
6. Focus the next same-category item when possible.
7. Recompute compatibility and the X cue immediately.

### A slot selection from a loose attachment

1. Store the loose attachment as `pendingAttachment`.
2. Highlight every compatible socket.
3. Move focus to the held compatible socket when available, otherwise the
   first compatible socket.
4. Show the A-button tap icon on the currently focused compatible destination.
5. Lock directional focus to compatible sockets of the same type and weapon
   group. If there is only one destination, directional input leaves focus on
   it.
6. While locked, X and Y actions are unavailable. A confirms placement and B
   is the only cancellation/escape input.
7. If the destination is occupied, return its existing attachment to Inventory.
8. Remove the loose source tile and clear pending state after confirmation.
9. B cancels and returns focus to the source item without changing inventory.

### A slot selection from an occupied socket

1. Serialize the attached item and remember its source socket.
2. Highlight compatible sockets other than the source.
3. Lock focus to those destinations, using the same A-confirm/B-cancel rules as
   loose attachment placement.
4. A on a compatible destination returns any displaced destination attachment
   to Inventory, moves the selected item, and restores the source socket to its
   empty silhouette state.
5. B cancels and returns to the source socket.

### X detach from an occupied socket

1. Serialize the attached item.
2. Insert it as a new, non-stacked Inventory attachment tile.
3. Restore the socket's designated empty silhouette.
4. If Inventory insertion fails, use Vicinity as a fallback.

### Y attachment drop

Y tap on an occupied socket creates a separate Vicinity attachment tile and
restores the socket's empty silhouette.

### Hold-Y weapon drop

Hold Y for at least 650 ms while an available empty or occupied attachment
socket is focused. The action guide label is `무기 버리기`.

The browser prototype currently applies `weapon-dropped` opacity to the entire
card. It does not yet remove the weapon or serialize all attached items.

## 12. Focus and navigation model

### Initial focus

The first enabled Vicinity item receives focus when the page opens. In the
initial data this is Bandage. This default is mandatory.

### General navigation

For ordinary buttons, `nearestInDirection()` chooses the closest valid button
in the requested geometric direction. The preview accepts keyboard arrow keys,
controller D-pad, and controller right-stick axes.

The right stick, not the left stick, is the intended analog navigation input.

### Vicinity, Inventory, Gear, and Outfit columns

Up/down navigation is contained within the current visual column. Vicinity and
Inventory use horizontal-overlap testing so a two-column tile never jumps into
the neighboring column when its own column ends. A full-width tile may still
be entered from either column because it overlaps both. Each Gear/Outfit rail
is a separate vertical column.

At the top or bottom of one of these columns, another up/down input leaves focus
on the boundary item. It never escapes into a neighboring or external region.
Left/right navigation remains available for deliberate cross-column movement.

If every item is removed from Vicinity or Inventory, focus moves to that empty
list panel. The panel participates in navigation only until an item is added
again and never produces a tooltip.

### Weapon rails

Within a weapon rail, up/down traverses focusable attachment sockets in rail
order while skipping unavailable sockets.

From the lowest focusable socket, Down moves to Throwable.

### Attachment placement focus lock

While `pendingAttachment` is active, the normal navigation graph is suspended.
Every direction searches only the compatible destination sockets returned by
`compatibleSlots()`, excluding `pendingSourceSlot` when moving an already
attached item. Directional input with no compatible socket in that direction
does nothing, and a single compatible destination cannot lose focus.

Successful A confirmation ends the mode. B is the only way to cancel and exit
without placing the attachment. X, Y, list navigation, gear navigation,
secondary-slot navigation, and incompatible weapon sockets are unavailable.

### Secondary slots

- Down from a weapon's lowest available socket -> Throwable.
- Right from Throwable -> Melee/Tool.
- Left from Melee/Tool -> Throwable.
- Up from either secondary slot -> the lowest available socket of the most
  recently focused weapon.
- Left from Throwable -> the last enabled Inventory item.
- Inventory directional navigation never enters Throwable or Melee/Tool
  directly.

This asymmetry is intentional.

## 13. Input mapping

| Input | Preview action |
|---|---|
| D-pad / right stick | Directional focus navigation |
| A tap | Use, equip throwable, begin/confirm attachment slot selection, or select context item |
| X tap | Pick up from Vicinity, quick-equip loose attachment, or detach occupied attachment |
| Y tap | Drop focused Inventory item/stack or attached attachment |
| Y hold, 650 ms | Drop focused weapon while an available attachment socket is focused |
| B tap | Cancel pending slot selection or back/close Inventory |
| View tap | Hide or show all focused-item tooltip panels |

Keyboard preview equivalents are arrow keys, A/Enter, X, Y, B/Escape, and V
for View.

## 14. Contextual action guides and blocked weapon actions

`availableActions()` determines the contextual action rows inside the item
tooltip. The footer is separate and always retains B Back, the yellow system
message, and controller connection status.

| Context | Actions |
|---|---|
| Vicinity non-attachment, non-weapon | X Pick Up |
| Vicinity AUG | X Quick Equip, A Select Equip Slot (guides only; both actions are blocked) |
| Inventory ammunition | Y Drop |
| Inventory consumable | A Use, Y Drop |
| Inventory throwable | A Equip, Y Drop |
| Loose attachment | X Quick Equip, A Select Slot; Inventory also has Y Drop |
| Pending attachment placement | A Confirm Slot; B remains the global cancel action |
| Occupied attachment socket | A Select Slot, X Detach, Y Drop Attachment, hold-Y Drop Weapon |
| Empty available attachment socket | hold-Y Drop Weapon |
| Empty gear/outfit slot | No action guide |
| Occupied gear/outfit slot | A Select, Y Drop (message-only simulation) |
| Throwable or Melee/Tool secondary slot | No contextual action guide |

Ammunition never exposes Use, Equip, or Attach.

Pressing X or A while the vicinity AUG is focused shows the yellow
`무기 장착 기능은 아직 구현되지 않았습니다` system message. The AUG remains
in Vicinity and no weapon or inventory state changes.

## 15. Tooltip behavior

The tooltip is a top-layer overlay with a dark gray panel. Its width and
horizontal position keep it fully inside the open space between Vicinity and
Inventory, so it does not cover either list.

During normal navigation, one tooltip is shown for the focused item or occupied
equipment. During A-based attachment slot selection, two tooltips are stacked
in that same gap:

- the upper tooltip remains locked to the selected attachment;
- the lower tooltip follows the focused destination socket and shows either
  the empty-slot tooltip or the currently attached item.

This comparison state remains active until placement is confirmed or cancelled.

Normal tooltip content includes:

- item name;
- item type;
- actual item image;
- description;
- compatible weapon names when applicable;
- every currently available action.

Empty gear/outfit and empty attachment sockets use a simplified version of the
same tooltip:

- slot name;
- attachable item type;
- designated silhouette;
- no description or compatibility metadata.

Empty gear/outfit slots show no key guide. Empty weapon sockets retain hold-Y
`무기 버리기` because socket focus also represents focus on that weapon.

Focused-item tooltips are visible by default. View toggles the complete tooltip
layer without changing focus, compatibility highlights, placement state, or
the connector layer. In comparison mode, both the selected-attachment and
destination-slot panels hide and return together. This is a mockup convenience
for comparing the setting's visible and hidden states; it has no action guide.

## 16. Connector behavior

The connector overlay is an SVG preview layer generated by
`updateConnectorLines()`.

For every compatible or focused socket, it calculates:

1. the center-right point of the rail slot;
2. the matching gun-part marker from `socketMaps`;
3. a short horizontal lead;
4. a rounded quarter-turn into a vertical segment;
5. a second rounded quarter-turn into the horizontal endpoint.

Compatible connectors are green. The focused socket connector is yellow and
slightly thicker.

The geometry follows the Figma connector vector. Marker semantics originate
from the named ellipse layers in baseline frame `393:917`, while the final
coordinates are the accepted browser-aligned values recorded in Section 9.
They must not be reconstructed from raw SVG path order. Unreal should reproduce
this with an overlay or custom paint pass, not by importing the
browser-generated SVG.

## 17. Gear, outfit, and character preview

Gear and outfit slots are visually separated from the high-frequency looting
path. Empty slots show schematic silhouettes only in their focused tooltip.

The top slot of the leftmost Outfit rail is `모자 슬롯` and is classified as
an Outfit slot. The top Gear slot immediately above the backpack is
`헬멧 슬롯`. They are distinct equipment locations despite both using the
current schematic head-slot silhouette in this mockup.

Level 3 Backpack and Level 3 Vest are occupied examples. Helmet, backpack, and
vest visibility must be preserved in the eventual design. Character preview is
lower priority and may later be collapsible if more space is needed.

## 18. Browser-only implementation functions

The script is organized around these responsibilities:

- View fitting: `fitPrototypeToViewport()`
- Tooltip visibility: `toggleTooltipVisibility()`
- Context and actions: `itemContext()`, `availableActions()`,
  `renderActionGuides()`
- Compatibility and focus presentation: `compatibleSlots()`,
  `updateSelectedAttachmentTooltip()`, `updateFocusState()`,
  `focusAndRefresh()`
- Connectors: `socketMaps`, `updateConnectorLines()`
- Navigation: `nearestInDirection()`, `attachmentButtons()`,
  `lowestAttachment()`, `verticalColumnCandidates()`, `moveFocus()`
- Item serialization and counts: `itemPayload()`, `itemQuantity()`,
  `setItemQuantity()`
- List lifecycle: `categoryEndReference()`, `categoryWrappers()`,
  `updateCategoryDividers()`, `updateEmptyListFocus()`, `compactCategory()`,
  `clearListItem()`, `createListDestination()`, `populateListItem()`,
  `restoreItemToList()`, `consumeListUnit()`
- Attachment lifecycle: `equipIntoSlot()`, `emptyAttachmentSlot()`,
  `quickEquip()`, `selectOrConfirmSlot()`
- Secondary throwable display: `equipThrowable()`
- Input dispatch: `handleXAction()`, `handleYAction()`, `cancelOrBack()`,
  `handleAction()`, `pollGamepad()`

These names describe the current prototype architecture; they are not required
Unreal function names.

## 19. Unreal translation requirements

- Generate layout from the HTML under the UMG convention.
- Preserve all `data-umg-name` bindings.
- Put gameplay behavior in a hand-written parent `UserWidget`.
- Represent lists with category-aware data, not static placeholder widgets.
- Use production inventory events to rebuild or diff list entries after every
  pickup, use, equip, detach, and drop.
- Preserve focus after list mutation by choosing the next same-category entry,
  then the previous entry, then the nearest remaining list entry. If none
  remains, focus the now-empty list panel without displaying a tooltip.
- Recompute attachment compatibility and the held quick-equip target after
  every focus or inventory-state change.
- Return an occupied destination socket's displaced attachment to Inventory
  before installing its replacement. The current mockup assumes capacity is
  always available.
- Preserve the dual-tooltip attachment comparison state during slot selection,
  with both panels contained between Vicinity and Inventory.
- Bind View to the setting-backed tooltip visibility toggle without adding it
  to the contextual action guide.
- Keep stack limits and item compatibility in gameplay data rather than hard
  coding them in generated layout.
- Rebuild connector geometry through UMG/Slate drawing or an overlay.
- Preserve the final marker semantics and coordinates in Section 9, especially
  the corrected three-point P1911 map.
- Keep vicinity AUG X/A equip handling blocked until a later variation or
  production feature explicitly defines weapon-slot selection and replacement.
- Resolve `PUBG Headline` and `PUBG Body` to licensed in-project font assets.
- Replace mockup-only schematic assets with approved production assets where
  required by `ASSET-AUDIT.md`.

## 20. Deferred and out-of-scope behavior

The 2-b mockup is accepted with the following deliberate deferments. They do
not block using this document as the baseline for the next variation.

- The previous throwable is not returned when another throwable is equipped.
- Vicinity AUG equip/slot-selection guides are visible, but pressing X or A
  only reports that weapon equipment is not implemented and never removes the
  weapon tile. Whole-weapon drop remains only a visual simulation.
- Capacity, weight, partial quantities, persistence, replication, and server
  authority are not modeled.
- Large-list scrolling, production-scale list stress, and exhaustive focus
  recovery remain Unreal implementation concerns rather than mockup features.
