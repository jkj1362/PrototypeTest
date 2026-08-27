# PUBG Console Inventory 4-a Second-Run Feature Specification

Status: interactive second-run prototype; manual controller acceptance pending

Last updated: 2026-08-27

## 1. Purpose and authority

Inventory 4-a tests a new equipment composition while preserving the accepted
second-run behavior. Its visual authority is Figma file
`etHQBgFlvTuESYLwgH5CuH`, frame `464:399` (`4-a`). The executable artifact is
`WBP_Inventory4A.html` on a 1920 x 1080 canvas.

4-a inherits the linear loose-item system and complete interaction contract
from second-run 1-b. The deliberate layout delta is the weapon and secondary
equipment rack described below.

## 2. Layout

The 2560 x 1440 Figma frame is scaled by 0.75 for the project canvas.

- Vicinity begins at X=16 and Inventory at X=356. Each is 324 px wide and
  uses the established single-column 306 x 90 item rows.
- `WEAPONS & GEARS` begins at X=695 and spans the remaining content width.
- M16 and M249 each use a 448 x 611 upper card. P1911 uses a 299 x 611 card.
- Each weapon uses one vertical rail of five 90 x 90 attachment slots.
- Weapon art is baked diagonally from the Figma transforms. No runtime CSS or
  UMG rotation is required.
- Throwable and Melee/Tool form a horizontal 897 x 311 lower strip.
- The collapsed Gear summary occupies the lower-right 305 x 311 area and
  presents Helmet, Backpack, Vest, and the R3 view toggle as a two-by-two set.

The screen therefore reads as two loose-item columns on the left, three
diagonal weapon cards across the upper-right, and secondary equipment across
the lower-right.

## 3. Gear and Outfit state

Gear/Outfit opens collapsed. R3, keyboard R, or the visible toggle expands the
drawer at X=1531. The drawer covers the P1911 region while leaving M16, M249,
Throwable, and Melee/Tool visible. Covered P1911 controls and placement targets
are removed from the active focus graph.

The expanded drawer retains the complete three-slot Gear rail, character
preview, and nine-slot Outfit rail. Collapsing from Outfit recovers focus to
Helmet. Expanding while P1911 has focus also recovers focus to Helmet. R3 is
blocked during modal attachment placement.

## 4. Physical focus navigation

Directional navigation follows the visible 4-a geometry:

- Up and Down move through each vertical attachment rail while skipping
  unavailable sockets. Up from a chain's top slot is blocked and preserves
  focus; it never wraps or jumps to another region. Down from the M16 chain's
  bottom slot retains the explicit transition to Throwable.
- Left and Right cross to the nearest visible weapon rail or adjacent region.
- With Gear/Outfit expanded, Right from the M249 chain's bottom slot enters the
  Gear rail at Helmet instead of dropping into Melee/Tool.
- Throwable and Melee/Tool use physical Left/Right movement; upward movement
  returns to the nearest weapon socket. Down from either secondary slot is a
  hard boundary and preserves focus.
- Collapsed Gear is entered from the nearest right or lower neighbor. Its four
  controls form a true two-by-two focus grid: Helmet/Backpack above Vest/R3.
  Left/Right stays in the current row and Up/Down stays in the current column.
  Up from either top-row control enters the physically closest visible,
  focusable P1911 attachment slot. Unavailable sidearm sockets are excluded.
- Expanded Gear and Outfit rails move linearly. Movement beyond either end is
  blocked, including Down from the final Gear or Outfit control.
- Directional entry from outside Gear/Outfit excludes Outfit until focus has
  first entered the Gear group.
- During modal placement, navigation remains restricted to valid destination
  slots only.

## 5. Preserved second-run interaction contract

4-a preserves all current 1-b behavior, including:

- initial focus on the first Vicinity item;
- linear-list mutation, category compaction, stacking, and empty-list recovery;
- Vicinity pickup, Inventory quick equip with replacement, and the Menu toggle
  for the Vicinity convenience;
- occupied held-slot X cue visibility for compatible Vicinity attachments
  without changing the inherited pickup/replacement action contract;
- A-based modal attachment placement, comparison tooltips, detach/drop, and
  socket highlight feedback;
- connector lines from focused or compatible attachment slots to their mapped
  sockets on the diagonal weapon art, matching first-run prototypes 2 and 3;
- temporary dimming of every ineligible attachment slot during placement and
  full restoration after A confirmation or B cancellation;
- centered 24 px X/A badges at the lower-right with attachment art remaining
  visible at reduced opacity;
- guidance tooltips for empty attachment, Gear, Outfit, and Melee/Tool slots;
- all nine Outfit slots focusable; and
- hidden-by-default tooltips toggled by View/V.

## 6. Tooltip placement

Normal tooltips use context-specific anchors:

- Vicinity: X=340, following the Vicinity list treatment;
- Inventory: X=123, immediately left of the Inventory list;
- weapon attachment rail: X=462, ending 8 px before Weapons & Gears at X=695;
  and
- Gear/Outfit: X=1300.

During modal comparison, both the selected-attachment and destination-slot
tooltips retain the anchor of the original attachment source for the complete
placement state. A Vicinity source uses X=340, an Inventory source uses X=123,
and an occupied weapon-slot source uses X=462. Moving focus among destination
slots does not change that source anchor. Confirmation or cancellation clears
the source state and restores normal context-based positioning.

## 7. Bindable UMG API

4-a preserves the second-run 1-b bindings and adds
`Txt_WeaponsAndGearsTitle`. The category treatment also exposes
`Img_SelectedAttachmentCategory` and `Img_TooltipItemCategory`. The HTML
exposes 37 unique `data-umg-name` bindings. `WBP_Inventory4A.html` owns layout only; gameplay state, focus
recovery, item mutation, and controller handling belong in the hand-written
parent UserWidget.

## Shared category and tooltip treatment (2026-08-24)

Figma node `468:2072` is a component-treatment reference only. Its 5-a frame
must not become a separate prototype or replace 4-a's layout.

- Vicinity and Inventory use colored category markers with a continuous rail:
  green Recovery/Boost, red Throwable, ochre Ammunition, blue Attachment, and
  purple Weapon.
- Rail markers are regenerated after pickup, drop, stacking, and category
  compaction, so the icon remains on the first visible item in each category.
- Tooltips use the reference's dark panel, white border, icon-plus-category
  row, large item art, and concise effect lines with green values.
- A 3 px divider plus the two native 8 px row gaps creates a 19 px category
  break. The 10 px marker is centered in that full break. The 18 px gutter
  keeps the rail close to the item area. The first marker is centered in the
  10 px list-top inset.
- Empty-slot guidance tooltips suppress the category badge while retaining the
  slot-specific guidance label and representative artwork.
- List markers contain no icon. Populated-item tooltips retain the exported
  category icon and text label.
- Each populated category owns one independent 4 px rail. It starts at the
  center of that category's 10 px marker and ends exactly at the bottom edge
  of the category's final item row. The previous rail stops before the next
  marker, leaving a visible unconnected gap between categories.
- The linear 4-a list keeps its existing one-column behavior; the rail consumes
  18 px inside the list width rather than changing the screen composition.
- Occupied Throwable and Melee/Tool item art is centered within the remaining
  secondary-slot space below the fixed name row.
- The M16 and M249 right-edge bars were Figma-export artifacts and are cropped
  outside the cards by shifting both weapon images 24 px right. Their socket
  endpoints receive the same 24 px offset. No empty mask strip is reserved.

## 8. Validation record

Automated and browser checks on 2026-08-21 confirmed:

- inline JavaScript parses and all local asset references resolve;
- all 35 UMG binding names are unique;
- the default state is collapsed and expansion shows nine visible, focusable
  Outfit slots;
- collapse from the final Outfit slot recovers focus to Helmet;
- the final Outfit slot is focusable and now preserves focus on Down;
- the empty Melee/Tool tooltip identifies what can be equipped there;
- M16 Right reaches the corresponding M249 socket and Down skips M249's
  unavailable Grip socket;
- modal placement produces one A cue, dims 13 ineligible slots for a main-
  weapon magazine, and restores every slot after B cancellation;
- the normal X cue leaves slot art at 0.62 opacity;
- a focused compatible Vicinity magazine shows one X cue on an occupied M16
  magazine slot; and
- the three baked weapon exports render diagonally without runtime transforms.

Additional browser checks on 2026-08-24 confirmed:

- the normal Inventory tooltip spans X=123 to X=348, ending 8 px before the
  Inventory list at X=356;
- Vicinity-, Inventory-, and weapon-slot-origin comparisons keep both tooltip
  panels at X=340, X=123, and X=462 respectively;
- comparison origin remains stable after focus moves to another weapon;
- the collapsed Gear routes are Helmet Right to Backpack, Helmet Down to Vest,
  Backpack Down to R3, Vest Right to R3, and R3 Up to Backpack;
- Up from Helmet or Backpack enters the closest focusable P1911 slot;
- a normal attachment-slot tooltip spans X=462 to X=687, ending 8 px before
  Weapons & Gears, and a weapon-slot-origin comparison keeps both panels there;
- both lists expose one category marker per populated category, and attachment
  tooltips show the blue Attachment badge plus two concise effect rows;
- category markers migrate or disappear correctly after list compaction;
- normal slot focus draws one focused connector, while main-weapon magazine
  placement draws two compatible connectors with one focused connector; and
- the browser console reports no warnings or errors.

Additional focus-navigation checks on 2026-08-27 confirmed:

- Down from the M16 Stock slot enters Throwable;
- Up from M16, M249, and P1911 top attachment slots preserves focus instead of
  wrapping to the bottom of the chain or jumping to another region;
- Down from Throwable, Melee/Tool, and the final Gear or Outfit control
  preserves focus instead of escaping to a loose-item list;
- Down within M249 and P1911 skips their unavailable Grip slots; and
- with Gear/Outfit expanded, Right from M249 Stock enters the Helmet slot in
  the Gear rail.

Manual physical-controller acceptance remains pending.

Additional browser checks on 2026-08-27 confirmed:

- M16, M249, and P1911 socket markers are positioned relative to the rendered
  diagonal image bounds rather than the complete weapon-body container;
- the corrected markers sit on the weapon muzzle, grip/magazine, receiver,
  optic, and stock geometry; and
- Up from either collapsed Gear top-row control enters the P1911 Scope slot,
  which is the closest available sidearm socket in the current layout.
