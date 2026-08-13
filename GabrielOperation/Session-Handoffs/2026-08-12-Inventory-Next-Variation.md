# PUBG Console Inventory Next Variation Session Handoff

Last updated: 2026-08-12

## Purpose

This is the resume point for choosing and building the next Inventory mockup
after the accepted 2-b prototype. No next-variation artifact has been created
yet. The first action in the next session is to choose between 2-A and 3-A with
the user; do not begin both branches or infer a selection.

## Repository baseline

- Branch: `main`
- Final 2-b commit: `b1f0acb` (`Finalize Inventory 2-b mockup`)
- Remote status at handoff request: commit pushed to `origin/main`
- Final executable baseline: `Mockups/Inventory/2-b/WBP_Inventory2B.html`
- Final feature contract: `Mockups/Inventory/2-b/IMPLEMENTATION-SPEC.md`
- Asset decisions: `Mockups/Inventory/2-b/ASSET-AUDIT.md`

The historical 2026-08-11 2-b handoff describes an earlier unfinished state.
Do not use its old limitations or verification list as the current baseline.
The final 2-b feature specification and executable HTML are authoritative.

## Read first in the next session

1. `GabrielOperation/README.md` and every document it lists.
2. This handoff.
3. `Mockups/Inventory/2-b/IMPLEMENTATION-SPEC.md`.
4. `Mockups/Inventory/2-b/ASSET-AUDIT.md`.
5. `Mockups/Inventory/2-b/WBP_Inventory2B.html` when implementation begins.

Do not edit generated Widget Blueprints directly. The chosen HTML variation
defines layout; production behavior belongs in a hand-written parent
`UserWidget`.

## Decision required before implementation

### Option 2-A: conservative list-layout variation

Keep the accepted 2-b screen organization and interaction model, except:

- Vicinity uses the live PUBG-style one-column vertical list.
- Inventory uses the live PUBG-style one-column vertical list.

All item actions, attachment behavior, tooltip behavior, category behavior,
and other accepted 2-b interactions should remain functionally equivalent
unless the one-column layout makes a specific navigation rule inapplicable.

The one-column lists simplify vertical navigation: Up and Down stay in the
single list column, and the focus remains on the first or last entry at its
boundary. Left and Right still handle deliberate movement between UI regions.

### Option 3-A: expandable gear/outfit variation

Keep the accepted 2-b item interaction model, except:

- The Gear/Outfit area is hidden by default.
- The Gear/Outfit area can be expanded and collapsed.
- The collapsed state frees space for the other UI elements and their layout.

Before building 3-A, confirm the following layout-specific decisions with the
user if they are not supplied in the selection message:

- the toggle control and controller input used to expand/collapse;
- whether the character preview collapses with Gear/Outfit;
- where focus moves after collapsing while focus is inside that area;
- where focus enters when the area is expanded;
- which UI regions receive the freed space in the default collapsed state.

Do not invent new item interactions merely because the layout is more
experimental. Unless explicitly changed, 3-A inherits the 2-b behavior.

## Shared behavioral baseline from 2-b

Whichever option is selected, preserve these accepted rules unless the user
explicitly changes them:

- Fixed 1920 x 1080 console/television design canvas.
- Korean player-facing text.
- Initial focus on the first Vicinity item.
- D-pad and right-stick directional navigation.
- Column-boundary containment: Up/Down never escapes a list or gear/outfit
  column at its first or last entry.
- An empty Vicinity or Inventory panel becomes focusable, retains focus inside
  that list, and shows no tooltip.
- Category dividers appear only between populated item categories.
- Consumables and throwables stack by item name; ammunition stacks to 30 per
  tile; attachments do not stack.
- Pickup/drop moves the complete stack; consumable use and throwable equip
  consume one unit.
- Loose attachments highlight compatible sockets by socket type and weapon
  group. Only the held compatible weapon receives the X Quick Equip target.
- A-based attachment placement is modal: focus is locked to compatible
  destination sockets, A confirms, and B is the only cancel/escape input.
- Replaced or detached attachments return to Inventory. Dropped attachments
  move to Vicinity. The mockup assumes sufficient Inventory capacity.
- Attachment selection displays two comparison tooltips in the gap between
  Vicinity and Inventory without covering either list.
- M16, M249, and P1911 use the final accepted socket maps. P1911 has exactly
  three markers; its Magazine marker is near the pistol grip and is not
  interchangeable with Scope.
- The vicinity AUG shows X Quick Equip and A Select Equip Slot guides, but
  both actions remain blocked with the yellow not-implemented system message.
- Hold-Y whole-weapon drop remains a visual mockup simulation.

See the final 2-b feature specification for the complete interaction state
machine, focus graph, action table, tooltip content, socket coordinates, and
Unreal translation requirements. Do not duplicate and then independently
reinterpret those details in the new variation spec.

## Artifact and documentation strategy

After the user selects an option:

1. Create only the chosen directory:
   - `Mockups/Inventory/2-a/` for 2-A, or
   - `Mockups/Inventory/3-a/` for 3-A.
2. Use 2-b as the behavioral baseline, but give the new variation its own HTML,
   feature specification, asset audit, and required reusable widget files.
3. Record inherited behavior by reference where practical, then document every
   intentional difference explicitly.
4. Inspect the relevant Figma frame and named layers before assigning exported
   assets or socket semantics. Do not rely on raw SVG path order.
5. Keep browser-only fitting, Gamepad API polling, DOM mutation, and SVG line
   generation out of the eventual Unreal Widget Blueprint.

## First next-session sequence

1. Ask the user to select 2-A or 3-A if the resume message does not already
   contain a choice.
2. Restate the selected variation's layout delta in one short paragraph.
3. Inspect the corresponding Figma frame or ask for its node if it cannot be
   discovered safely.
4. Create the selected variation directory and its initial feature spec.
5. Implement the layout change while preserving the shared 2-b behavior.
6. Validate JavaScript parsing, unique UMG bindings, local assets, focus
   boundaries, empty-list focus, attachment placement lock, and tooltip
   containment.

## Deferred behavior that remains out of scope

- Returning a previously equipped throwable when it is replaced.
- Actual AUG equip-slot selection and whole-weapon replacement.
- Inventory capacity, weight, partial quantities, persistence, replication,
  and server authority.
- Production-scale list scrolling and stress behavior.
- Full whole-weapon serialization/drop behavior.

These deferments are inherited from 2-b. Do not silently implement them during
variation layout work without a new user decision.
