# PUBG Console Inventory 2-b Session Handoff

Last updated: 2026-08-11

## Purpose

This document is the resume point for continued iteration on the PUBG console
Inventory 2-b HTML prototype. The prototype is intentionally still in active
design development. Do not treat it as approved for Unreal conversion yet.

The immediate goal is to continue controller testing and visual cleanup while
preserving the interaction decisions already established with the user.

## Read first in the next session

1. `GabrielOperation/README.md` and every document it lists.
2. `Mockups/Inventory/2-b/IMPLEMENTATION-SPEC.md` for the complete current
   behavioral contract.
3. `Mockups/Inventory/2-b/ASSET-AUDIT.md` for asset and Unreal handoff notes.
4. `Mockups/Inventory/2-b/WBP_Inventory2B.html`, which remains the executable
   source of truth.

Do not edit a generated Widget Blueprint directly. The HTML defines layout;
production behavior belongs in a hand-written parent `UserWidget`.

## Current files

- Prototype: `WBP_Inventory2B.html`
- Implementation contract: `IMPLEMENTATION-SPEC.md`
- Asset and Unreal decisions: `ASSET-AUDIT.md`
- Visual assets: `assets/`

## Figma references

Figma file key: `etHQBgFlvTuESYLwgH5CuH`

- Baseline 2-b: node `393:917`
- Loose attachment focused: node `343:1335`
- Compatible attachment sockets highlighted: node `391:622`
- Attachment socket focused: node `412:4737`

The named Figma slot order is:

`Muzzle -> Handle/Grip -> Magazine -> Scope -> Stock`

## Stable design decisions

- The target platform is console and television viewing distance is a primary
  constraint.
- The fixed design canvas is 1920 x 1080. Browser fitting is preview-only.
- The root background is solid black; no dim gameplay image is rendered.
- Vicinity and Inventory are kept close together because they are the most
  frequently traversed areas.
- Weapons and their attachment sockets are visually prominent.
- Gear and outfit slots remain visible but are intentionally lower-priority.
- Character preview may eventually be collapsed; gear slots must remain.
- Player-facing text is Korean.
- Tooltip visibility is controlled by a game setting, not a controller input.
- The M16 is the currently held weapon.
- Attachment compatibility uses both socket type and weapon group.
- Current loose attachments are compatible with `main` weapons, not the
  `sidearm` P1911.
- Weapon rails always contain five attachment positions. Each position is
  occupied, empty with its type silhouette, or dimmed/unavailable.
- Attachment silhouettes appear only in empty weapon sockets, never as loose
  Inventory or Vicinity items.
- Item-category dividers remain in place while list items reflow.

## Latest implementation changes

The following changes were made in the final pass of this session:

- Shortened the localized hold-Y weapon-drop label. See the implementation
  spec for the exact Korean copy.
- Replaced straight attachment connectors with rounded orthogonal paths based
  on the Figma connector vector.
- Changed list removal so an item tile widget is removed entirely. Inventory
  and Vicinity should now reflow with the same behavior and no disabled blank
  placeholder.
- Added stacking for consumables and throwables.
- Added ammunition stacking with a maximum of 30 per tile and overflow into a
  new tile.
- Kept attachments non-stackable.
- A consumable use or throwable equip consumes one unit from its stack.
- Pickup and drop currently transfer the complete focused stack.
- Added an explicit focus-state refresh after every action so the held-weapon
  X quick-equip cue can appear repeatedly instead of behaving like a one-time
  prompt.
- Widened and darkened the tooltip panel.

## Verification status

Static validation passed after the latest changes:

- JavaScript parses successfully.
- All referenced local assets exist.
- All 23 `data-umg-name` values are unique.
- No forbidden responsive, grid, transform, `calc()`, or `z-index` CSS was
  introduced.
- No list item uses `data-empty-category` or the old empty-tile markup.

The latest stacking, tile-removal, repeated-X, connector, and tooltip changes
have not yet been manually accepted by the user. Browser automation could not
open the local `file://` page because of the browser safety policy. Treat the
next controller test as required, not optional.

## First test sequence for the next session

Reload `WBP_Inventory2B.html`, connect a controller, and test these in order:

1. Confirm the initial focus is the first Vicinity item, Bandage.
2. Press X on the Vicinity Bandage.
   - The Vicinity tile must disappear rather than become blank.
   - Med Kit must move into the first consumable position.
   - Inventory Bandage should become a stack of 2.
3. Press X on the Vicinity Med Kit stack of 2.
   - The tile must disappear.
   - Inventory Med Kit should become 3.
4. Pick up the Vicinity 5.56mm stack of 30.
   - Existing Inventory stacks `30, 30, 15` should become
     `30, 30, 30, 15` without any stack exceeding 30.
5. Focus several different loose attachments in succession.
   - The held M16 compatible socket must show the X cue every time.
   - The cue must move to the correct M16 socket for muzzle, grip, magazine,
     scope, and stock.
   - Compatible M249 sockets may highlight, but must not receive the X cue.
   - The P1911 must not highlight for the current main-weapon attachments.
6. Quick-equip several attachments with X.
   - Each source tile must disappear and the remaining attachment tiles must
     reflow.
   - The next focused loose attachment must immediately produce a fresh X cue.
7. Detach an occupied attachment with X.
   - It must return as a separate Inventory tile.
8. Drop an Inventory stack with Y.
   - The complete stack must move to or merge into Vicinity.
9. Use a stacked consumable with A and equip a stacked throwable with A.
   - Only one unit should be consumed per action.
10. Inspect focused and compatible connector lines.
    - They should use a short horizontal lead, a rounded vertical bend, and a
      horizontal endpoint like the Figma vector.
11. Check that the tooltip is visibly wider and darker without obscuring
    essential focused content.

## Known limitations and open questions

- Gun-part socket markers and connector endpoints are still approximate. Their
  semantic types are correct, but final coordinates need a later visual pass.
- Quick-equipping onto an already occupied socket overwrites the previous
  attachment instead of returning the displaced attachment to Inventory.
- Equipping a new throwable replaces the secondary-slot display without
  returning the previously equipped throwable to Inventory.
- Weapon pickup is simplified: the Vicinity weapon tile is removed and a
  message is shown, but the weapon rack is not rebuilt.
- Hold-Y weapon drop currently dims the card; it does not fully remove or
  serialize the weapon and its attachments.
- Inventory capacity and weight are not modeled. Detach assumes capacity is
  available, with a Vicinity fallback retained in code.
- Partial-stack pickup/drop and a quantity selector are not implemented.
  Pickup/drop currently transfer the whole stack.
- Scrolling and very large dynamic lists are not production-complete.
- The tooltip setting itself is not exposed in this prototype; it represents
  an external game option.

Do not silently resolve these limitations during unrelated cleanup. Confirm
behavioral changes with the user because several affect live-game semantics.

## Recommended next-session priorities

1. Run the controller sequence above and fix any regression.
2. Decide displaced-attachment behavior for repeated quick equip.
3. Decide whether throwable replacement should return the old throwable.
4. Continue visual refinement, including exact socket-marker placement.
5. Only after the interaction baseline is accepted, branch into 2-c design
   exploration. Keep 2-a separate as previously agreed.
