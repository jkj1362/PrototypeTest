# PUBG Console Inventory 3-b Second-Run Feature Specification

Status: second-run interactive baseline; manual controller acceptance pending

Last updated: 2026-08-27

## 1. Purpose

This second-run Inventory 3-b is a direct fork of the completed first-run 3-b.
It remains the former Inventory 3-a: the bold expandable Gear/Outfit
variation with two-column grid-style Vicinity and Inventory lists, built from the
historical original Inventory 2-b interaction baseline. That layout is now
deprecated in favor of the active 2-b, but it remains 3-b's behavioral source. 3-b
tests whether hiding the
low-frequency character, Gear, and Outfit presentation creates a more useful
default inventory experience without weakening the two main-weapon workflows.

The second-run interaction delta keeps the default collapsed state, dims every
ineligible attachment slot during modal A placement, and restores the original
presentation after A confirmation or B cancellation. X and A cues are reduced
to centered 24 px lower-right badges so the attachment artwork remains visible.

Design sources:

- Default/collapsed Figma frame: `402:1746` (originally named Improvement 3-a)
- Expanded Figma frame: `402:2054` (originally named Improvement 3-a - Character Collapse/Expand)

The executable artifact is `WBP_Inventory3B.html`.

## 2. Inherited behavior

Unless this specification explicitly overrides a rule, 3-b inherits the
historical original 2-b behavior in
`../2-b [Deprecated]/IMPLEMENTATION-SPEC.md`, including:

- list categories, mutation, stacking, empty-list focus, and initial content;
- replacing the equipped Throwable returns the previous Throwable to Inventory;
- initial focus on the first Vicinity item;
- item actions and the blocked vicinity AUG actions;
- attachment compatibility, placement lock, conditional Vicinity empty-slot
  quick equip, Inventory replacement quick equip, detach, and drop;
- gamepad Menu toggling the Vicinity convenience, enabled by default;
- the focused A placement cue and View tooltip-visibility toggle;
- tooltip comparison and connector behavior;
- M16, M249, and P1911 socket identities and corrected marker semantics;
- D-pad/right-stick directional navigation and the 2-b controller mapping;
- the 2-b deferred and out-of-scope production behavior.

The 2-b HTML is not imported at runtime. 3-b forks it so the layout experiment
can evolve independently while retaining equivalent interaction functions.

## 3. Fixed layout

The design canvas remains 1920 x 1080. Browser fitting remains preview-only.

The default layout contains:

1. Vicinity at the far left.
2. Inventory immediately to its right.
3. The tooltip gap between Inventory and the weapon rack.
4. Four equipment columns under Weapons & Gears:
   - M16;
   - M249;
   - P1911;
   - a vertical secondary column containing Throwable above Melee/Tool.
5. A compact Gear summary at the far right.

Vicinity and Inventory remain 220 px wide WrapBox previews with two 96 px
item columns. Attachments are non-stackable and therefore do not display a
quantity badge in these two-column grid lists. The Inventory capacity preview
remains the separate vertical bar between Inventory and Weapons. Under the
shared visibility rule, this two-column grid-list prototype starts with
tooltips visible.

The fourth-column secondary layout is mandatory. Throwable and Melee/Tool are
not a horizontal footer as they were in 2-b.

The vertical Inventory capacity indicator displays the current/max preview
value as `210 / 350`, stacked inside its narrow thumb for television
readability. The value is exposed through `Txt_InventoryCapacity` and remains
centered on the complete vertical bar independently of the fill height.

## 4. Collapse and expansion contract

### Default collapsed state

- The screen opens with `Box_GearAndOutfit` collapsed.
- The compact far-right summary shows Helmet, Backpack, and Vest.
- The character preview and Outfit rail are hidden.
- P1911, Throwable, and Melee/Tool remain visible and interactive.
- M16 and M249 remain visible and interactive.
- The control label reads Show Character.

### Expanded state

- Right-stick press (R3) expands the Gear/Outfit drawer.
- The drawer starts at the P1911 column boundary and covers exactly the
  combined P1911 plus secondary-column footprint.
- The drawer must never intrude into or obscure M16 or M249.
- The expanded drawer shows the three Gear slots, character preview, and the
  complete Outfit rail.
- The control label reads Hide Character.
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
- Collapse from an Outfit slot moves focus to the first Gear slot (Helmet).
- Collapse preserves the focused Gear slot or any focus outside Outfit.
- Directional entry from outside Gear/Outfit enters the Gear rail first; Outfit
  is eligible only after focus is already inside the group.
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

All 29 inherited 2-b bindings remain. 3-b adds:

- `Txt_WeaponsAndGearsTitle`
- `Box_SecondarySlots`
- `Btn_ToggleGearOutfit`
- `Txt_GearToggleLabel`
- `Txt_OutfitTitle`
- `Txt_InventoryCapacity`
- `Img_SelectedAttachmentCategory`
- `Img_TooltipItemCategory`

The resulting root HTML exposes 37 unique binding names.

The intended generated parent widget is `WBP_Inventory3B`. Treat all binding
names as an API shared with its hand-written parent `UserWidget`.

## Shared category and tooltip treatment (2026-08-24)

Figma node `468:2072` is a component-treatment reference only; its 5-a frame
must not be built as another prototype. The two-column lists reserve an 18 px
left rail and adapt tiles to 84 px. Green Recovery/Boost, red Throwable, ochre
Ammunition, blue Attachment, and purple Weapon rails regenerate after list
mutation. Tooltips use the dark reference panel, white border,
icon-plus-category row, large item art, and concise effect lines with green
values. A 3 px category divider plus the two native 8 px row gaps creates a
19 px category break. The 10 px marker is centered in that full break, while
the first marker is centered in the 10 px list-top inset. The compact rail
stays beside the tile area. List markers are solid category-color circles
without icons. Each populated category owns one independent 4 px rail. It
starts at the marker center, ends at the bottom edge of the category's final
tile row, and stays disconnected from the next category rail. Populated-item
tooltips retain the exported icon and
category label. Empty-slot guidance tooltips omit the category
badge but retain the slot-specific guidance label and representative artwork.
The surrounding 3-b composition and navigation are unchanged.

## Compact vertical weapon presentation (2026-08-27)

M16, M249, and P1911 remain vertical and use their `*-oriented.png` exports at
natural aspect ratio. The long guns occupy 72% of the weapon-body height and
P1911 occupies 38%, so none of the art is stretched to fill the tall card.
Weapon art may sit beneath part of the attachment-slot rail, while the rail
remains visually and interactively above it.

The interactive socket markers and connector endpoints use the rendered
vertical image bounds. The socket SVGs remain reference assets only. Weapon
art may pass beneath the attachment rail, but socket-marker UI may not: every
marker uses a 14 px collision envelope and is moved at least 8 px beyond the
rail when that envelope would overlap the attachment chain.

## 8. Unreal translation requirements

- Generate the layout from `WBP_Inventory3B.html`; never hand-edit the
  generated Widget Blueprint.
- Implement the expanded area as a top overlay whose bounds match the P1911
  and secondary columns. Do not resize or cover the two main-weapon cards.
- Bind R3 to the view-state toggle in the hand-written parent widget.
- Default the state to collapsed every time the screen opens unless a later
  product decision introduces persistence.
- Remove covered controls from controller navigation while expanded.
- Apply the focus recovery rules in Section 5 after every state change.
- Preserve the full 2-b gameplay behavior and data-driven list handling.
- Center occupied Throwable and Melee/Tool item art within the remaining
  secondary-slot space below the fixed name row.
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
- Outfit collapse recovery moves to Helmet, while Gear and outside focus are
  preserved;
- firearm Up/Down movement wraps at rail boundaries;
- P1911 -> Right -> Throwable -> Right -> Helmet works;
- outside directional entry reaches Gear before Outfit;
- Throwable -> Down -> Melee and Melee -> Up -> Throwable work;
- secondary Up/Down movement wraps at column boundaries;
- collapsed and expanded Gear rails, and the expanded Outfit rail, wrap at
  their own column boundaries;
- Vicinity retains its non-looping boundary behavior;
- compatible and X-action targets use green only. With the Menu setting enabled,
  focused compatible Vicinity attachments show the X icon on the held slot
  whether it is empty or occupied; Inventory attachments retain their X cue.
  This cue-visibility rule does not change the inherited Vicinity action contract;
- modal A placement dims every non-destination attachment slot, including the
  source slot, and both confirmation and cancellation restore normal styling;
- X and A indicators use a centered 24 px lower-right badge without hiding slot artwork;
- the empty Melee/Tool slot shows its equip-guidance tooltip when focused;
- all nine expanded Outfit slots remain focusable and participate in the rail loop;
- A-based placement shows one A tap icon on the focused valid destination and
  moves that icon with placement focus;
- View hides and restores the normal tooltip or both comparison tooltips
  without moving focus or cancelling attachment placement;
- no browser console warnings or errors were produced.
- replacing an equipped Throwable restores the previous item to Inventory;
- capacity text remains centered independently of the fill amount.
- attachment list tiles do not display quantity badges.
- both lists expose one marker per populated category, with correct marker
  migration after category compaction;
- attachment tooltips show the blue Attachment badge and concise effect rows;
- M16, M249, and P1911 remain vertical, preserve their natural aspect ratios,
  and leave deliberate space above and below the rendered art;
- no neutral, compatible, or focused socket circle overlaps an attachment-slot
  rail at any supported marker size;

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
- whether the 3-b hierarchy remains understandable with tooltips hidden;
- whether the expanded state adds enough value to justify its state and focus
  complexity.
