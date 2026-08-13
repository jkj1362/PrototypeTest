# PUBG Console Inventory Prototype Set Session Handoff

Last updated: 2026-08-13

## Purpose

This is the resume point after completing the current Inventory HTML prototype
set. Three active design directions are available for review:

- 2-a: linear Vicinity and Inventory lists;
- 2-b: the selected three-group grid design; and
- 3-a: the expandable Gear/Outfit design.

The immediate next-session decision is whether to continue comparative design
review and controller acceptance, or select one prototype for Unreal UMG
translation. Do not infer a winner without the user.

## Repository baseline

- Branch: `main`
- Remote: `https://github.com/jkj1362/PrototypeTest.git`
- This handoff is included with the prototype-set commit pushed after it was
  written. Use `git log -1` for the exact commit hash.

## Read first in the next session

1. `GabrielOperation/README.md` and every document it lists.
2. This handoff.
3. The implementation specification beside the prototype being discussed.
4. The matching asset audit.
5. The executable HTML when implementation or validation begins.

Do not edit a generated Widget Blueprint directly. HTML owns layout, while
production behavior belongs in a hand-written parent `UserWidget`.

## Active prototype artifacts

### Inventory 2-a

- HTML: `Mockups/Inventory/2-a/WBP_Inventory2A.html`
- Spec: `Mockups/Inventory/2-a/IMPLEMENTATION-SPEC.md`
- Audit: `Mockups/Inventory/2-a/ASSET-AUDIT.md`
- Purpose: conservative one-column linear Vicinity and Inventory lists.
- Tooltips are hidden by default. View toggles them without moving focus.
- Gear/Outfit tooltips move to the right of Gear/Outfit; other list tooltips
  use the normal list-side position.

### Inventory 2-b

- HTML: `Mockups/Inventory/2-b/WBP_Inventory2B.html`
- Spec: `Mockups/Inventory/2-b/IMPLEMENTATION-SPEC.md`
- Audit: `Mockups/Inventory/2-b/ASSET-AUDIT.md`
- Status: the former 2-b-3 experiment is now the only active 2-b.
- Persistent grouping is:
  `Gear/Outfit | Vicinity + Inventory | Weapons`.
- Gear/Outfit to lists is 150 px. Lists to Weapons is 151 px.
- Gear/Outfit rails and slots use the compact 72 px treatment.
- Vicinity and Inventory remain 220 px wide with a six-pixel internal gap.
- The horizontal capacity bar is enclosed inside the Inventory list border.
- A matching fixed line is enclosed inside the Vicinity list border.
- Contextual tooltip X positions are:
  - Gear/Outfit: 392;
  - Vicinity/Inventory: 305; and
  - weapon attachments or Throwable/Melee: 902.
- Single tooltips are vertically centered. The two-tooltip comparison layout
  remains at Y=60 and Y=530.

### Inventory 3-a

- HTML: `Mockups/Inventory/3-a/WBP_Inventory3A.html`
- Spec: `Mockups/Inventory/3-a/IMPLEMENTATION-SPEC.md`
- Audit: `Mockups/Inventory/3-a/ASSET-AUDIT.md`
- Purpose: bold collapsed/expanded Gear and Outfit design.
- Default state is collapsed.
- R3 expands or collapses Gear/Outfit.
- The expanded drawer covers only P1911 plus the vertical secondary column. It
  never covers M16 or M249.
- Throwable and Melee/Tool remain a vertical fourth column.
- The attachment, secondary, and Gear/Outfit focus-loop rules in the 3-a spec
  are mandatory.

## Deprecated prototypes

These folders remain only as historical visual references:

- `Mockups/Inventory/2-b [Deprecated]/`
- `Mockups/Inventory/2-b-2 [Deprecated]/`

Do not implement from them, restore their former active status, or treat their
specifications as current 2-b authority. The canonical 2-b folder is
`Mockups/Inventory/2-b/`.

## Shared capacity display

Every active prototype now shows the current/max capacity preview value:

`210 / 350`

The binding is `Txt_InventoryCapacity`.

- 2-a and 2-b show the value horizontally inside the capacity thumb.
- 3-a stacks the same value inside its narrow vertical capacity thumb.

The number is preview data. Production must bind it to live current weight and
maximum capacity.

## Shared accepted interaction behavior

Unless a variation specification overrides a rule, preserve:

- initial focus on the first Vicinity item;
- D-pad and right-stick navigation;
- contained Up/Down movement within list and equipment columns;
- category-aware list reflow and focus recovery;
- consumable and Throwable stacking by item name;
- ammunition stacks limited to 30 per tile;
- non-stacking loose attachments;
- green-only attachment compatibility highlights;
- X quick equip on the held compatible weapon;
- A modal slot placement with B as the only cancellation input;
- A Tap cues on focused destination sockets;
- no yellow border on compatibility-only highlights;
- View tooltip visibility without a visible key guide;
- comparison tooltips during attachment placement;
- corrected M16, M249, and P1911 socket semantics; and
- the blocked Vicinity AUG equip simulation.

Read the active variation specification before changing focus navigation or
tooltip placement because those rules intentionally differ by layout.

## Verification status

The final active set passed the following checks:

- 2-a has 30 unique `data-umg-name` bindings.
- 2-b has 30 unique `data-umg-name` bindings.
- 3-a has 35 unique `data-umg-name` bindings.
- Each active prototype has exactly one `Txt_InventoryCapacity` binding.
- Initial focus is Vicinity Bandage in all three prototypes.
- The displayed capacity value is `210 / 350` in all three prototypes.
- Browser console logs are empty in all three prototypes.
- Active 2-b list headers and panels form continuous borders.
- Active 2-b tooltip contexts, comparison placement, and View toggle were
  exercised after the layout promotion.
- No media query, CSS grid, z-index, or transform was introduced.
- `git diff --check` passes.

Manual controller acceptance at television viewing distance remains advisable
before Unreal implementation.

## Recommended next-session sequence

1. Ask whether the user wants comparative review, controller acceptance, or
   Unreal implementation.
2. If comparing, open 2-a, 2-b, and 3-a at the same 1920 x 1080 state and use
   the same focus targets.
3. If testing, prioritize rapid cross-region focus movement, tooltip movement,
   attachment comparison, and focus recovery after item mutation.
4. If one design is selected for production, follow its HTML, spec, and audit
   through the documented HTML-to-UMG pipeline.
5. Keep the deprecated folders unchanged unless the user explicitly requests
   deletion.

## Deferred production behavior

- returning a previously equipped Throwable when replaced;
- real AUG equip-slot selection and weapon replacement;
- partial-stack pickup/drop and quantity selection;
- persistence, replication, and server authority;
- production-scale list stress and scrolling;
- full whole-weapon serialization/drop behavior; and
- binding the capacity preview to live gameplay data.

Do not silently implement these during unrelated layout cleanup.
