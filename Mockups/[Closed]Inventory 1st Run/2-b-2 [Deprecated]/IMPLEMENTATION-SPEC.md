# PUBG Console Inventory 2-b-2 Feature Specification

Status: deprecated; superseded by `../2-b/WBP_Inventory2B.html`

## 1. Purpose

Inventory 2-b-2 is a controlled layout variation of the accepted 2-b baseline.
It tests whether grouping Vicinity beside Inventory, separating that combined
list group from Weapons, and allowing context-sensitive tooltip overlap
communicates the screen hierarchy more clearly.

The executable artifact is `WBP_Inventory2B2.html` on a 1920 x 1080 canvas.
The original `../2-b [Deprecated]/WBP_Inventory2B.html` remains unchanged for direct
comparison.

This comparison variant is retained for historical reference only. It is not
an active implementation candidate.

## 2. Inheritance

Unless this document explicitly overrides a rule, 2-b-2 inherits the complete
accepted contract in `../2-b [Deprecated]/IMPLEMENTATION-SPEC.md`, including:

- item-grid geometry and category organization;
- controller and keyboard navigation;
- item stacking, pickup, drop, and empty-list recovery;
- attachment quick equip and modal placement;
- green-only compatibility highlighting and A/X placement cues;
- normal and comparison tooltips plus the View-key visibility toggle;
- Gear/Outfit, weapon, secondary-slot, and socket behavior;
- all production deferments.

## 3. Horizontal-order delta

The primary experiment keeps Vicinity and Inventory together as a central list
group while allowing the tooltip to overlap adjacent groups according to focus
context. Area widths and vertical positions remain unchanged.

| Area | 2-b left | 2-b-2 left | Width |
|---|---:|---:|---:|
| Tooltip: Gear/Outfit focus | 642 | 416 | 225 |
| Tooltip: All other focus | 642 | 376 | 225 |
| Vicinity | 416 | 607 | 220 |
| Inventory | 873 | 833 | 220 |

The resulting persistent-area grouping is:

`Gear/Outfit | Vicinity + Inventory + Capacity | Weapons`

Vicinity and Inventory retain their six-pixel gap. The entire list group,
including the capacity indicator, moves 40 px left from the previous 2-b-2
pass. Vicinity begins at X=607, Inventory begins at X=833, and the capacity
indicator begins at X=1059. This creates a 44 px clear gap from the indicator's
right edge at X=1089 to the weapon rack at X=1133.

Gear/Outfit expands from 370 px to 386 px and now ends at X=410. Slot buttons remain 84 px;
their rail containers contract from 90 px to 84 px, while the character
preview expands from 184 px to 206 px. This uses the wider separation created
by relocating Vicinity. Tooltip overlap is governed separately by focus
context. The three-slot Gear rail has no leading spacer, so its top aligns with
the top of the Outfit rail.

The vertical Inventory capacity indicator remains immediately to the right of
Inventory: Inventory ends at X=1053 and the indicator starts at X=1059. The
weapon rack remains at X=1133 with its inherited 787 px width, ending at the
1920 px canvas boundary.

## 4. Context-sensitive tooltip placement

The moved list group no longer reserves a non-overlapping tooltip column.
Tooltip placement uses two positions with deliberate temporary overlap:

- Gear/Outfit focus: both tooltip panels use X=416, directly right of the
  Gear/Outfit area. They may cover the left portion of Vicinity.
- Every other focus context uses X=376, immediately left of Vicinity with a
  six-pixel gap. This includes Vicinity, Inventory, focusable empty lists,
  weapon attachments, and Throwable/Melee. These tooltips may cover the right
  edge of Gear/Outfit.

The normal and selected-attachment comparison tooltips always move together.
View still hides or restores them without changing focus.

A single normal tooltip is vertically centered on the 1080 px canvas. Its
510 px panel uses Y=285; the 350 px empty-slot variant uses Y=365. The existing
two-tooltip comparison layout remains unchanged at Y=60 and Y=530.

## 5. Comparison intent

Evaluate 2-b-2 against 2-b in both tooltip states:

- whether Vicinity and Inventory read as one item-management group;
- whether the 44 px list-to-weapon gap communicates the three persistent-area
  groups clearly;
- whether the shared non-Gear tooltip position is easier to predict despite
  being farther from weapon-side focus;
- whether Gear/Outfit feels too detached from Vicinity;
- whether Left/Right focus movement remains obvious despite the wider visual
  distance between Gear/Outfit and Vicinity.

## 6. Validation checklist

- Gear focus places tooltips at X=416.
- Vicinity, Inventory, attachment, and secondary focus place tooltips at X=376.
- Gear/Outfit is 386 px wide, ends at X=410, and leaves a six-pixel tooltip gap.
- Gear/Outfit slot buttons remain 84 px; their rails are 84 px and the
  character preview is 206 px wide.
- The three-slot Gear rail starts at the same Y position as the Outfit rail.
- Vicinity begins at X=607 and Inventory begins at X=833.
- Vicinity and Inventory have a six-pixel gap.
- The vertical capacity indicator is immediately right of Inventory at X=1059.
- Inventory and Weapons are separated by the 30 px indicator plus visible
  gaps; neither the indicator nor Inventory overlaps the weapon rack.
- A 44 px gap separates the capacity indicator from the weapon rack at X=1133.
- The weapon rack remains fully inside the canvas.
- Initial focus remains the first Vicinity item.
- Left/Right navigation follows the new visual order.
- All inherited item and attachment interactions remain functional.
- View hides and restores normal/comparison tooltips without moving focus.
- Single normal and empty-slot tooltips are vertically centered; the two-panel
  comparison positions remain unchanged.
- All inherited UMG binding names remain unique and unchanged.
- Browser console has no warnings or errors.
