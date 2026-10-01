# PUBG Console Inventory 2-a Third-Run Specification

Updated: 2026-10-01
Status: reference replacement implemented; visual and controller acceptance pending.

## Authority

[Figma reference](https://www.figma.com/design/etHQBgFlvTuESYLwgH5CuH?node-id=545-2625)
is the layout authority. Executable: WBP_Inventory2A.html. Shared behavior:
../README.md. This replaces the previous 2-a layout.

## Layout

Reference coordinates are scaled by approximately 0.75 to a 1920 x 1080 canvas.
Vicinity and Inventory remain one-column scrolling lists.

| Region | Left | Top | Width | Height |
|---|---:|---:|---:|---:|
| Vicinity | 18 | 46 | 324 | 962 |
| Inventory | 351 | 44 | 324 | 962 |
| Weapon rack | 1036 | 92 | 875 | 922 |
| Collapsed Gear | 684 | 703 | 99 | 303 |
| Expanded Gear/Outfit | 684 | 92 | 346 | 927 |
| Secondary footer | 1036 | 805 | 875 | 209 |

Three weapon cards share a 706 px tall row, with width ratios 400:400:342
and 6 px gaps. Weapon art is tilted -10 degrees while retaining its aspect
ratio. Attachment controls use 88 px vertical cells with socket markers and
connectors. The secondary footer is 209 px tall. Weapon cards turn yellow only
while one of their attachment cells is focused.

Vicinity and Inventory retain a 2 px top border directly on their list panels.
Inventory has no list-top capacity bar. A narrow, unlabeled vertical fill bar
is owned by Gear and remains visible in both collapsed and expanded states.
Loose-item rows use a uniform 4 px gap, including category boundaries.

The passive common-ammunition summary is contained in the Inventory header,
directly above the scroll list. Figma 616:917 keeps the five common types in a
single row (180, 54, 30, 30, 30). The block never enters the focus graph. A
future second row is reserved for special ammunition such as P90 or AWM ammo;
it is not shown while only the five common types are present.

Tilted M16 and M249 art uses 76% of the available visual height. P1911 uses
82% of the available visual width so its grip and muzzle remain inside the
card. Secondary weapon art uses contained sizing. Procedural socket markers
are clamped inside the corresponding weapon-card border.

## Focus and interaction

Collapsed Gear is beside Inventory with its bottom edge aligned to the
Inventory list. Up/Down follows Helmet, Backpack, and Vest;
the R3 guide is grouped visually with those slots but remains non-focusable.
Horizontal routing follows the visible vertical bands. Inventory rows above
the collapsed Gear band move directly to the nearest attachment in the weapon
chain. Left/Right then traverses M16, M249, and P1911 at the same attachment
row; only Left from the M16 chain exits to the nearest visible Inventory row.
Rows whose center overlaps collapsed Gear move through the nearest Gear slot
before continuing to the nearest weapon control. Secondary weapon slots
form a horizontal Throwables ↔ Melee chain. Only Left from Throwables reverses
the lower route through Gear. Gear Left returns to the nearest visible
Inventory row; Gear Right chooses the closest attachment or secondary slot.

Attachment placement remains modal: only valid destinations are focusable,
A confirms, B cancels, and invalid slots dim. Quick equip, pickup/drop,
stacking, tooltip toggle, and shared weapon switching remain available.
View/V toggles initially hidden tooltips without moving focus. R3/R toggles
initially collapsed Gear. Expanded Gear fills the open middle corridor at
(684, 92), between Inventory and the weapon rack. The secondary footer leaves
the focus graph while expanded. Collapse from Outfit recovers focus to Helmet.

Loose-list tooltips use a 250 px panel at X=684, directly beside Inventory.
Attachment and secondary-weapon tooltips use X=780, immediately left of the
weapon rack. Content-driven comparison panels retain an 18 px gap and source
anchoring. Six-category flag markers and current functional item fixtures are
retained rather than copying the reference's blank item art.

Collapsed Gear tooltips share the list X=684 anchor and use their bottom edge
at Y=695, eight pixels above the Gear chain. Vertically stacked comparison
tooltips are centered as one combined group against the 1080 px screen height,
while remaining above the controller guide.

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

The two active variants display the same item and equipment information. 1-b
uses the same attachment silhouettes, occupied-item art, focus highlight, and
Gear levels as 2-a, arranged in a different layout.

List flags use the exact Figma 550:663 atlas via ../shared/category-flags.css.
They overlay the first item slot at left=0, top=0 with no gutter. Heads are
36 x 31.5 and stems are 4.5 px wide, ending at the last item in the category.
Category compaction recalculates the stem without moving the head above the
slot. Gear level labels remain visible in the collapsed presentation.

## Character guide and empty slots (2026-09-22)

Show/Hide Character is contained in the Gear rail for 2-a. It has no button
role, click handler, or tab stop.
R3 and keyboard R retain the existing toggle and focus-recovery behavior.
Navigation through Gear now visits only Helmet, Backpack, and Vest; the
key guide is never a destination. This supersedes earlier R3-button routing.
The binding remains Box_GearKeyGuide; Txt_GearToggleLabel remains stable and
uses compact `의상 보기` / `의상 숨기기` labels. Empty Gear/Outfit cells display their
existing representative silhouettes, and empty Melee uses slot-melee.svg.

## Gear drawer and focus layering (2026-09-22)

Expanded Gear no longer dims the weapon area and suppresses the weapon-socket
overlay while the drawer is visible. The full secondary area and other visually
covered controls leave the focus graph; Gear, Outfit, weapon attachments, and
the remaining inventory controls retain two-way directional navigation.

Expanded Outfit slots are 64 x 64 px with 54 px silhouettes and 8 px gaps, so
the complete nine-slot chain remains inside the Gear/Outfit panel.

List rendering uses three explicit layers: the yellow focus overlay is highest,
the category flag is next, and the item slot is lowest. Focusing an item does
not move its slot artwork above the flag.
