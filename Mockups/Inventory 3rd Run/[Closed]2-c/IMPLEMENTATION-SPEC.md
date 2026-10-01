# PUBG Console Inventory 2-c Third-Run Specification

Updated: 2026-09-21
Status: closed and frozen on 2026-09-22; retained as a historical prototype.

## Authority

[Figma reference](https://www.figma.com/design/etHQBgFlvTuESYLwgH5CuH?node-id=545-3023)
is the layout authority. Executable: WBP_Inventory2C.html. Shared behavior:
../README.md. This replaces the previous 2-c layout.

## Layout

Reference coordinates are scaled by approximately 0.75 to a 1920 x 1080 canvas.
Vicinity and Inventory remain one-column scrolling lists.

| Region | Left | Top | Width | Height |
|---|---:|---:|---:|---:|
| Vicinity | 18 | 38 | 324 | 962 |
| Inventory | 351 | 37 | 324 | 962 |
| Weapon rack | 1036 | 84 | 875 | 922 |
| Secondary footer | 1036 | 797 | 606 | 209 |
| Collapsed Gear | 1655 | 797 | 256 | 209 |

Three weapon cards share a 706 px tall row, with width ratios 400:400:342
and 6 px gaps. Oriented weapon images retain their aspect ratios. Attachment
controls remain 75 px vertical chains with socket markers and connectors.
The secondary footer is 209 px tall. M16 keeps its yellow equipped border.

## Focus and interaction

Collapsed Gear is the footer's third cell. Helmet, Backpack, and Vest are
wide rows stacked vertically, with the R3 control beneath them. Up/Down
follows that order. Up from Helmet can return to the nearest weapon slot;
Left reaches the adjacent secondary cell. Right and bottom edges stop.
The former center Gear/Outfit bridge is removed.

Attachment placement remains modal: only valid destinations are focusable,
A confirms, B cancels, and invalid slots dim. Quick equip, pickup/drop,
stacking, tooltip toggle, and shared weapon switching remain available.
View/V toggles initially hidden tooltips without moving focus. R3/R toggles
initially collapsed Gear. Expanded state retains the 472 x 977 drawer at
(1448, 52); this is inherited behavior, not shown in the supplied frame.
Covered sidearm and Melee controls leave the focus graph while expanded.
Collapse from Outfit recovers focus to Helmet.

Tooltips use a 250 px corridor at X=780. Content-driven comparison panels
retain an 18 px gap and source anchoring. The corridor clears collapsed Gear
and the weapon rack. Six-category flag markers and current functional item
fixtures are retained rather than copying the reference's blank item art.

## Validation and production limits

- Inline scripts parse; named UMG bindings are unique and local assets resolve.
- Browser visual review was blocked by the local-file URL policy.
- Physical-controller navigation, comparison placement, and drawer acceptance
  remain pending for this replacement.
- Reference geometry extends outside the convention's 5% safe zone. Safe-zone
  adaptation and licensed font import are required before production.
- Existing browser-only preview fitting and procedural socket/flag rendering
  need their audited native UMG/material equivalents; no Widget Blueprint was
  generated or hand-edited in this pass.

## Shared information and category correction

The three variants display the same item and equipment information. 1-b now
uses the same attachment silhouettes, occupied-item art, equipped highlight,
and Gear levels as the 2-series, arranged in a different layout.

List flags use the exact Figma 550:663 atlas via ../shared/category-flags.css.
They overlay the first item slot at left=0, top=0 with no gutter. Heads are
36 x 31.5 and stems are 4.5 px wide, ending at the last item in the category.
Category compaction recalculates the stem without moving the head above the
slot. Gear level labels remain visible in the collapsed presentation.

## Character guide and empty slots (2026-09-22)

Show/Hide Character is a root-level key guide at the lower right, outside
the equipment panel. It has no button role, click handler, or tab stop.
R3 and keyboard R retain the existing toggle and focus-recovery behavior.
Navigation through Gear now visits only Helmet, Backpack, and Vest; the
key guide is never a destination. This supersedes earlier R3-button routing.
The binding changes from Btn_ToggleGearOutfit to Box_GearKeyGuide;
Txt_GearToggleLabel remains stable. Empty Gear/Outfit cells display their
existing representative silhouettes, and empty Melee uses slot-melee.svg.

## Gear drawer and focus layering (2026-09-22)

Expanded Gear no longer dims the weapon area and suppresses the weapon-socket
overlay while the drawer is visible. The full secondary area and other visually
covered controls leave the focus graph; Gear, Outfit, weapon attachments, and
the remaining inventory controls retain two-way directional navigation. The
external R3 guide sits beside Gear and uses `캐릭터 보기` / `캐릭터 숨기기`.

List rendering uses three explicit layers: the yellow focus overlay is highest,
the category flag is next, and the item slot is lowest. Focusing an item does
not move its slot artwork above the flag.
