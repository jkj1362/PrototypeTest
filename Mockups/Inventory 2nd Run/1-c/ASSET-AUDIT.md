# Inventory 1-c asset audit

Shared asset root: `../assets/`. This prototype does not own a separate asset copy.

Status: complete for the second-run 1-c HTML baseline; visual acceptance pending.

## Asset decision

1-c reuses the complete 1-b asset set, including the R3 controller glyph. No
weapon, item, character, Gear, Outfit, or controller asset is regenerated.

`WBP_InventoryItemTile.html` reuses the 96 px square-tile dimensions from the
2-b/3-a grid language. The list width is intentionally capped at two columns.
Production should continue to use the approved shared controller-glyph and item
image systems rather than importing duplicates.

## Presentation decisions

- Existing loose-item images become centered tile backgrounds.
- Stack count moves to the lower-right tile overlay.
- Category dividers and the wide AUG item require no new image assets.
- The browser capacity gradient remains a preview of a native ProgressBar fill
  with a centered TextBlock overlay.
- Horizontal firearm images, the smaller P1911 treatment, the secondary column,
  and both Gear drawer states are unchanged from 1-b.

Generated Widget Blueprints remain layout artifacts. Item mutation, grid focus,
drawer state, focus recovery, and gameplay behavior belong in the hand-written
parent UserWidget.

## Second-run cue decision

No new asset is required. The existing X and A controller layers are scaled to
a centered 24 px lower-right badge, while the attachment image remains visible at 62%
opacity. Placement dimming is a procedural slot-state tint and opacity change.

## Shared category exports (2026-08-24)

Figma sections `468:2072` and `468:2378` contribute five exact shared
category assets:

- `category-attachment.png` from node `468:1098`;
- `category-ammunition.svg` from node `468:1070`;
- `category-consumable.svg` from node `468:1156`;
- `category-throwable.svg` from node `468:1165`; and
- `category-weapon.svg` from node `468:2382`.

These exact exports drive populated-item tooltip category badges. List rails
and their solid-color markers use CSS/UMG color primitives without icon assets.
