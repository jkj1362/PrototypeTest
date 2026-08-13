# PUBG Console Inventory 3-a Feature Specification

Status: accepted interactive HTML design prototype; manual controller acceptance pending

Last updated: 2026-08-12

## 1. Purpose

Inventory 3-a is the bold expandable Gear/Outfit variation built from the
historical original Inventory 2-b interaction baseline. That layout is now
deprecated in favor of the active 2-b, but it remains 3-a's behavioral source. 3-a
tests whether hiding the
low-frequency character, Gear, and Outfit presentation creates a more useful
default inventory experience without weakening the two main-weapon workflows.

Design sources:

- Default/collapsed Figma frame: `402:1746` (`개선 3-a`)
- Expanded Figma frame: `402:2054` (`개선 3-a - Character Collapse/Expand`)

The executable artifact is `WBP_Inventory3A.html`.

## 2. Inherited behavior

Unless this specification explicitly overrides a rule, 3-a inherits the
historical original 2-b behavior in
`../2-b [Deprecated]/IMPLEMENTATION-SPEC.md`, including:

- list categories, mutation, stacking, empty-list focus, and initial content;
- initial focus on the first Vicinity item;
- item actions and the blocked vicinity AUG actions;
- attachment compatibility, placement lock, quick equip, detach, and drop;
- the focused A placement cue and View tooltip-visibility toggle;
- tooltip comparison and connector behavior;
- M16, M249, and P1911 socket identities and corrected marker semantics;
- D-pad/right-stick directional navigation and the 2-b controller mapping;
- the 2-b deferred and out-of-scope production behavior.

The 2-b HTML is not imported at runtime. 3-a forks it so the layout experiment
can evolve independently while retaining equivalent interaction functions.

## 3. Fixed layout

The design canvas remains 1920 x 1080. Browser fitting remains preview-only.

The default layout contains:

1. Vicinity at the far left.
2. Inventory immediately to its right.
3. The tooltip gap between Inventory and the weapon rack.
4. Four equipment columns under `무기 & 장비`:
   - M16;
   - M249;
   - P1911;
   - a vertical secondary column containing Throwable above Melee/Tool.
5. A compact Gear summary at the far right.

The fourth-column secondary layout is mandatory. Throwable and Melee/Tool are
not a horizontal footer as they were in 2-b.

The vertical Inventory capacity indicator displays the current/max preview
value as `210 / 350`, stacked inside its narrow thumb for television
readability. The value is exposed through `Txt_InventoryCapacity`.

## 4. Collapse and expansion contract

### Default collapsed state

- The screen opens with `Box_GearAndOutfit` collapsed.
- The compact far-right summary shows Helmet, Backpack, and Vest.
- The character preview and Outfit rail are hidden.
- P1911, Throwable, and Melee/Tool remain visible and interactive.
- M16 and M249 remain visible and interactive.
- The control label reads `캐릭터 보기`.

### Expanded state

- Right-stick press (R3) expands the Gear/Outfit drawer.
- The drawer starts at the P1911 column boundary and covers exactly the
  combined P1911 plus secondary-column footprint.
- The drawer must never intrude into or obscure M16 or M249.
- The expanded drawer shows the three Gear slots, character preview, and the
  complete Outfit rail.
- The control label reads `캐릭터 숨기기`.
- A second R3 press collapses the drawer.

The R3 graphic is the controller-key component exported from Figma. Keyboard
`R` is the browser-preview equivalent.

R3 is unavailable while modal attachment placement is active because 2-b
defines B as the only cancellation/escape input in that mode.

## 5. Focus behavior

Expansion and collapse use these deterministic recovery rules:

- If focus is outside P1911/Throwable/Melee when the drawer expands, focus is
  preserved.
- If focus is on P1911, Throwable, or Melee when the drawer expands, focus
  moves to the first Gear slot (Helmet).
- If focus is inside Gear/Outfit when the drawer collapses, focus moves to the
  first available P1911 socket (Muzzle in the initial state).
- Covered P1911 and secondary controls are removed from the active focus graph
  while expanded.
- Sidearm-compatible attachment destinations are likewise unavailable while
  the drawer covers P1911.

The compact Gear slots remain ordinary focusable equipment slots. R3 itself is
a global view action; the visible control can also be clicked in the browser.

## 6. Secondary-column navigation delta

The physical vertical layout replaces the 2-b cross-area boundary jump with an
area-based horizontal chain:

- Up and Down loop within every firearm attachment rail. Pressing Up at its
  first available socket wraps to the last available socket, and pressing Down
  at its last available socket wraps to the first available socket.
- Right from any focused P1911 socket moves to Throwable.
- Down from Throwable moves to Melee/Tool.
- Up from Melee/Tool returns to Throwable.
- Up from Throwable wraps to Melee/Tool, and Down from Melee/Tool wraps to
  Throwable.
- Each Gear and Outfit slot column loops independently in the same way, in both
  collapsed and expanded states.
- Vicinity and Inventory list columns retain their existing non-looping
  boundary behavior.
- Left from either secondary slot returns to the most recently focused P1911
  socket, falling back to its first available socket.
- Right from Throwable moves to the first collapsed Gear slot (Helmet).
- The collapsed Gear slots remain focusable.
- Inventory cannot enter a secondary slot directly.

All other 2-b focus-boundary rules remain unchanged.

## 7. Bindable UMG API

All 29 inherited 2-b bindings remain. 3-a adds:

- `Txt_WeaponsAndGearsTitle`
- `Box_SecondarySlots`
- `Btn_ToggleGearOutfit`
- `Txt_GearToggleLabel`
- `Txt_OutfitTitle`
- `Txt_InventoryCapacity`

The intended generated parent widget is `WBP_Inventory3A`. Treat all binding
names as an API shared with its hand-written parent `UserWidget`.

## 8. Unreal translation requirements

- Generate the layout from `WBP_Inventory3A.html`; never hand-edit the
  generated Widget Blueprint.
- Implement the expanded area as a top overlay whose bounds match the P1911
  and secondary columns. Do not resize or cover the two main-weapon cards.
- Bind R3 to the view-state toggle in the hand-written parent widget.
- Default the state to collapsed every time the screen opens unless a later
  product decision introduces persistence.
- Remove covered controls from controller navigation while expanded.
- Apply the focus recovery rules in Section 5 after every state change.
- Preserve the full 2-b gameplay behavior and data-driven list handling.
- Bind View to the inherited tooltip-visibility setting without adding a key
  guide.
- Do not translate browser-only `zoom`, Gamepad API polling, DOM mutation, or
  SVG generation into the generated Widget Blueprint.

## 9. Validation record

Automated browser checks on 2026-08-12 confirmed:

- initial focus remains the first Vicinity item;
- R/preview R3 toggles both visual states and updates the Korean label;
- expanded bounds cover P1911 and the secondary column while leaving M16 and
  M249 fully visible;
- P1911 expansion recovery moves to Helmet;
- Gear/Outfit collapse recovery moves to the P1911 Muzzle socket;
- firearm Up/Down movement wraps at rail boundaries;
- P1911 -> Right -> Throwable -> Right -> Helmet works;
- Throwable -> Down -> Melee and Melee -> Up -> Throwable work;
- secondary Up/Down movement wraps at column boundaries;
- collapsed and expanded Gear rails, and the expanded Outfit rail, wrap at
  their own column boundaries;
- Vicinity retains its non-looping boundary behavior;
- compatible and quick-equip targets use green only, with the X icon marking
  the held quick-equip target while yellow remains exclusive to actual focus;
- A-based placement shows one A tap icon on the focused valid destination and
  moves that icon with placement focus;
- View hides and restores the normal tooltip or both comparison tooltips
  without moving focus or cancelling attachment placement;
- no browser console warnings or errors were produced.

Manual physical-controller acceptance remains pending. The design and its value
as a foundation for further inventory exploration are accepted.

## 10. Evaluation questions

The prototype should be evaluated against 2-b for:

- whether the collapsed state makes core inventory scanning feel calmer;
- whether retaining compact Helmet/Backpack/Vest visibility is sufficient;
- whether R3 is discoverable and memorable;
- whether covering the sidearm/secondary area feels acceptable during Gear or
  Outfit inspection;
- whether the vertical secondary column improves navigation comprehension;
- whether the 3-a hierarchy remains understandable with tooltips hidden;
- whether the expanded state adds enough value to justify its state and focus
  complexity.
