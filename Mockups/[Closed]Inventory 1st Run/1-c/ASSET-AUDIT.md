# Inventory 1-c asset audit

Shared asset root: `../assets/`. This prototype does not own a separate asset copy.

Status: complete for the first-pass 1-c HTML prototype; visual acceptance pending.

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
