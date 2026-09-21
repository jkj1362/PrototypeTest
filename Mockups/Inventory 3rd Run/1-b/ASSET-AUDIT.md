# Inventory 1-b asset audit

Shared asset root: `../assets/`. This prototype does not own a separate asset copy.

Status: complete for the third-run 1-b HTML baseline, carried forward unchanged from the second run; visual acceptance pending.

## Asset decision

1-b reuses the complete 1-a image, silhouette, font, and socket-map set. No
weapon, item, character, Gear, or Outfit asset is regenerated.

The only added file is `../assets/controller-r3.png`, copied from the accepted
3-a prototype for the collapsed/expanded Gear control. Production should use
the approved shared controller-glyph system instead of importing a duplicate.

## Presentation decisions

- Secondary slots move into a CSS/UMG vertical column.
- The expanded drawer is a solid-color root overlay and needs no new material.
- The browser capacity gradient remains a preview of a native ProgressBar fill
  with a centered TextBlock overlay.
- Existing horizontal firearm images and the smaller P1911 presentation are
  unchanged from 1-a.

Generated Widget Blueprints remain layout artifacts; collapse state, focus
recovery, and item behavior belong in the hand-written parent UserWidget.

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
