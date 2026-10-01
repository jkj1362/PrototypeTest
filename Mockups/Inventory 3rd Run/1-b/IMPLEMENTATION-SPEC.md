# PUBG Console Inventory 1-b Third-Run Specification

Updated: 2026-09-22
Status: latest Figma revision implemented; visual/controller acceptance pending.

## Authority and shared information

[Figma 545:1887](https://www.figma.com/design/etHQBgFlvTuESYLwgH5CuH?node-id=545-1887)
is the layout authority. Executable: WBP_Inventory1B.html. Shared behavior is
documented in ../README.md.

1-b, 2-a, and 2-c display the same inventory and equipment information. Their
layout differs, not their information model. The current 1-b reference replaces
the old English text-only attachment cells with the same slot silhouettes and
equipped-item artwork as 2-a/2-c. M16 uses the yellow equipped border, and
Backpack/Vest retain their level labels in collapsed Gear.

## Layout

The 2559 x 1439 reference is scaled approximately 0.75 to 1920 x 1080.

| Region | Left | Top | Width | Height |
|---|---:|---:|---:|---:|
| Vicinity | 18 | 48 | 324 | 962 |
| Inventory | 354 | 48 | 324 | 962 |
| Stacked weapon cards | 1133 | 90 | 615 | 924 |
| Melee/Throwable column | 1760 | 90 | 136 | 612 |
| Collapsed Gear | 1760 | 710 | 136 | 304 |
| Expanded Gear/Outfit | 1424 | 90 | 472 | 924 |

Each card places a 153 px attachment matrix on the left and the weapon's
name, type, ammo summary, and horizontal art on the right. Cells are 75 px
squares separated by 3 px gaps. In row-major order:

| Left cell | Right cell |
|---|---|
| Muzzle | Scope |
| Grip | Stock |
| Magazine | Unavailable |

Weapon-specific unavailable sockets are blank but remain focusable, using the
same socket definitions as 2-a. They expose no action and reject attachment
placement. Occupied cells show item artwork; empty cells show the socket
silhouette. Equipping, replacement, detachment, and dropping all restore the
appropriate artwork and tooltip metadata.

Melee aligns with M16; Throwable aligns with M249; Gear aligns with P1911.
Collapsed Gear has three 124 x 86 rows and a compact R3 control. The expanded
drawer is inherited behavior, not a state supplied by the updated reference.

## Categories

All three prototypes share ../shared/category-flags.css and the exact Figma
550:663 PNG export. No gutter is reserved. The 36 x 31.5 flag head overlays the
first item slot's top-left border, and its 4.5 px stem ends at the final item
in that category. Category breaks remain unconnected. Pickup/drop and category
compaction regenerate these bounds. The same overlay is represented in the
reusable WBP_InventoryItemTile template.

## Interaction and navigation

- Initial focus is the first Vicinity item; tooltips and Gear start hidden
  and collapsed respectively. View/V toggles tooltips; R3/R toggles Gear.
- Left/Right follows the attachment matrix. Right past its right-edge cell
  enters the corresponding Melee/Throwable/Gear area.
- Up/Down follows every cell in the same attachment column and
  continues to the next weapon at a card boundary.
- Secondary/Gear navigation follows its visible vertical arrangement.
- A placement is modal and restricts focus to compatible destinations;
  A confirms, B cancels, and invalid destinations dim. X quick equip and
  shared primary weapon switching retain the common interaction contract.
- Normal and comparison tooltips retain source anchoring and content-driven
  height. Slot names and effects are available through the common tooltips.
- Vicinity and Inventory tooltips begin at X=686, directly beside the loose-item
  lists. Attachment and secondary-weapon tooltips begin at X=875, immediately
  left of the stacked weapon grid. Gear tooltips use that same X=875 anchor.
- Vertically stacked comparison tooltips are centered as one combined group
  against the 1080 px screen height, while remaining above the controller guide.
- Socket markers use the horizontal map and contained image bounds. Weapon
  swaps retain the established destination slot composition.

## Validation and remaining acceptance

Static verification covers inline script parsing, asset paths, unique UMG
bindings, child-template references, attachment order, shared item fixtures,
and category geometry after category removal. Browser visual review remains
blocked by the local-file URL policy; physical-controller acceptance is pending.
The reference extends outside the 5% safe zone; production needs safe-zone
adaptation and licensed font import. Flag heads map to an atlas brush in a
UMG Overlay, with a tinted Border for the variable-height stem.

## 2026-09-22 review adjustments (1-b only)

- Mask the unused triangle in each exported flag head, keeping its exact
  glyph and colored flag. The native atlas brush needs the same alpha mask.
- Lists use a 4 px flex gap for every adjacent item. Category divider nodes
  remain insertion anchors but display none and consume no layout space.
- The weapon row fills the 924 px equipment region, overriding the legacy
  611 px flex basis. All three cards now reach the Gear bottom at Y=1014.
- M16 art scales by available width rather than its transparent canvas height;
  socket positions use the same scale. Its transparent vertical margins may
  be clipped while the visible gun stays inside the image area.
- Secondary slots omit category labels; Throwable keeps the item name,
  including after replacement. Tooltip and accessibility metadata are retained.
- Render socket circles/highlights only; no attachment connector paths.

Inline scripts, unique bindings, marker-only rendering, row sizing, and both
initial/replacement secondary-label paths passed source checks. Visual and
physical-controller acceptance remain pending. Other variants are unchanged.

## Character guide and empty slots (2026-09-22)

Show/Hide Character is a root-level key guide at the lower right, outside
the equipment panel. It has no button role, click handler, or tab stop.
R3 and keyboard R retain the existing toggle and focus-recovery behavior.
Navigation through Gear now visits only Helmet, Backpack, and Vest; the
key guide is never a destination. This supersedes earlier R3-button routing.
The binding changes from Btn_ToggleGearOutfit to Box_GearKeyGuide;
Txt_GearToggleLabel remains stable. Empty Gear/Outfit cells display their
existing representative silhouettes, and empty Melee uses slot-melee.svg.

Weapon assets now use self-contained SVG wrappers with a -12 degree tilt
and a viewBox fitted to the visible PNG bounds. Socket positions are mapped
through the same rotation. This supersedes the preceding width-only M16
scaling. The held weapon does not have a yellow border by default: yellow
appears on the card only while one of its attachment cells is focused,
including modal attachment placement. Weapon-swap selection uses a white
outline, keeping yellow exclusive to attachment focus.

The two main-gun renders, M16 and M249, use 112% of their visual area's width
after tilting. Their socket-highlight calculation uses the same 1.12 scale
from the same center. P1911 retains its previous contained size.

Outside modal placement, Left from the attachment matrix's left edge returns
to the vertically nearest visible Inventory item. Left from a right-column
cell first enters its left-column neighbor regardless of socket availability.
Modal placement remains restricted to compatible attachment destinations
until confirmation or cancellation.

All six cells in every attachment matrix participate in normal directional
navigation, including sockets marked unavailable. Unavailable cells use
`aria-disabled` rather than the native disabled state, expose no item action,
and remain excluded from compatible placement destinations. This keeps the
grid's movement predictable without making invalid sockets equip targets.

## Gear drawer and focus layering (2026-09-22)

Expanded Gear no longer dims the weapon area and suppresses the weapon-socket
overlay while the drawer is visible. Melee and Throwable leave the focus graph;
Gear, Outfit, weapon attachments, and the remaining inventory controls retain
two-way directional navigation. The external R3 guide sits directly beside the
collapsed Gear area and uses `캐릭터 보기` / `캐릭터 숨기기`.

Expanded Outfit slots are 64 x 64 px with 54 px silhouettes and 8 px gaps, so
the complete nine-slot chain remains inside the Gear/Outfit panel.

List rendering uses three explicit layers: the yellow focus overlay is highest,
the category flag is next, and the item slot is lowest. Focusing an item does
not move its slot artwork above the flag.
