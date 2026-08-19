# PUBG Console Inventory 2-b Active Feature Specification

Status: selected active 2-b design; Unreal implementation is deferred

## 1. Purpose and authority

The former 2-b-3 prototype is now the only active 2-b design. Its executable
artifact is `WBP_Inventory2B.html` on a 1920 x 1080 canvas.

The original `../2-b [Deprecated]/` and intermediate
`../2-b-2 [Deprecated]/` variants are retained only for historical reference.
This specification and `WBP_Inventory2B.html` govern future 2-b implementation
work.

The selected design establishes three persistent groups with nearly equal
spacing and places tooltips contextually beside the focused group:

`Gear/Outfit | Vicinity + Inventory | Weapons`

## 2. Inherited interaction contract

The active design retains the functional behavior validated through the
earlier 2-b prototypes:

- controller and keyboard navigation;
- item stacking, pickup, drop, use, equip, and empty-list recovery;
- replacing the equipped Throwable returns the previous Throwable to Inventory;
- Vicinity attachment pickup with optional empty-slot quick equip, Inventory
  attachment quick equip with replacement, and modal placement;
- gamepad Menu toggling the Vicinity convenience, enabled by default;
- green-only compatibility highlighting and A/X placement cues;
- normal and selected-attachment comparison tooltips;
- the View-key tooltip visibility toggle;
- Gear/Outfit, weapon, secondary-slot, and socket behavior; and
- all previously recorded production deferments.

The deprecated original `../2-b [Deprecated]/IMPLEMENTATION-SPEC.md` remains
the detailed historical record for those mechanics. Layout and tooltip rules
in this active document override it.

## 3. Three-group layout

| Area | Left | Width | Right |
|---|---:|---:|---:|
| Gear/Outfit | 24 | 362 | 386 |
| Vicinity | 536 | 220 | 756 |
| Inventory | 762 | 220 | 982 |
| Weapons | 1133 | 787 | 1920 |

The gap between Gear/Outfit and Vicinity is 150 px. The gap between Inventory
and Weapons is 151 px. The one-pixel difference is the integer rounding needed
to center the 446 px Vicinity/Inventory group in the available interval.

Vicinity and Inventory retain their six-pixel internal gap. The weapon rack
retains its accepted dimensions and position.

## 4. Compact Gear/Outfit treatment

Gear/Outfit is a lower-priority group and uses a reduced footprint:

- each rail contracts from 84 px to 72 px;
- each slot contracts from 84 x 84 px to 72 x 72 px;
- slot borders contract from 6 px to 5 px;
- slot imagery contracts from 70 x 70 px to 60 x 60 px;
- the 206 px character preview remains unchanged; and
- the Outfit and three-slot Gear rails remain top-aligned.

The resulting Gear/Outfit region is 362 px wide and ends at X=386.

## 5. Inventory capacity inside the list group

The external vertical capacity indicator is removed. Inventory now uses the
same structural treatment established by 2-a:

- a fixed 36 px header sits between the Inventory title and item panel;
- a horizontal 198 x 24 px capacity indicator is centered in that header;
- its thumb is 116 x 14 px; and
- a matching fixed 198 x 3 px line occupies the Vicinity header so both item
  panels begin at the same Y position.

Neither fixed header is part of the item WrapBox. List content cannot intrude
into the header area. Each header supplies the top and side portions of the
same light-gray border continued by its item panel, so the line and capacity
bar visibly sit inside their respective list boundaries.

The thumb displays the current/max preview value `210 / 350` through the new
`Txt_InventoryCapacity` binding. The value remains centered on the complete
bar independently of the current-capacity fill.

## 6. Contextual tooltip placement

Both normal and selected-attachment comparison tooltips use the horizontal
position associated with focus:

- Gear/Outfit focus: X=392, six pixels right of Gear/Outfit;
- Vicinity or Inventory focus, including a focusable empty list: X=305, six
  pixels left of Vicinity; and
- weapon attachment or Throwable/Melee focus: X=902, six pixels left of the
  weapon rack.

The approximately 150 px persistent group gaps reduce worst-case tooltip
overlap to about 80 px in each context. Temporary overlap remains intentional.

A single 510 px tooltip is vertically centered at Y=285. Its 350 px empty-slot
variant is centered at Y=365. The two-tooltip comparison layout remains at
Y=60 and Y=530.

View hides or restores all visible tooltip panels without changing focus.
As a two-column grid-list prototype, 2-b starts with tooltips visible.

## 7. Validation checklist

- Gear/Outfit ends at X=386.
- Vicinity begins at X=536 and Inventory begins at X=762.
- Weapons begin at X=1133 and remain fully inside the canvas.
- Persistent group gaps are 150 px and 151 px.
- Gear and Outfit slots are 72 x 72 px and their rails remain top-aligned.
- The horizontal capacity indicator is inside the Inventory header.
- Capacity text remains centered independently of the fill amount.
- The fixed Vicinity line and Inventory bar are enclosed by their list borders
  and preserve item-row alignment.
- Gear focus places both tooltip types at X=392.
- Vicinity/Inventory focus places both tooltip types at X=305.
- Attachment or secondary focus places both tooltip types at X=902.
- Normal and empty-slot tooltips are vertically centered.
- Comparison tooltip Y positions remain unchanged.
- Attachment list tiles do not display quantity badges.
- Initial focus remains the first Vicinity item.
- Left/Right navigation follows the visual order across the wider gaps.
- View preserves focus while hiding or restoring tooltips.
- All inherited item and attachment interactions remain functional.
- Vicinity X never replaces an equipped attachment; occupied/off cases enter Inventory.
- Inventory X retains replacement quick equip.
- Menu toggles the Vicinity empty-slot convenience.
- Replacing an equipped Throwable restores the previous item to Inventory.
- All 30 UMG binding names, including `Txt_InventoryCapacity`, remain unique.
- Browser console has no warnings or errors.
