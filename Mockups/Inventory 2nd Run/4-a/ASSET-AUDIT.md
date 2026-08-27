# Inventory 4-a asset audit

Shared asset root: `../assets/`.

Source design: Figma frame `464:399` (`4-a`).

Status: complete for the interactive HTML prototype; manual visual acceptance
pending.

## New exact Figma exports

4-a adds six shared assets exported from the linked frame:

- `weapon-m16-diagonal-4a.png` from node `464:1019`;
- `weapon-m249-diagonal-4a.png` from node `464:1052`;
- `weapon-p1911-diagonal-4a.png` from node `464:1083`;
- `sockets-m16-diagonal-4a.svg`;
- `sockets-m249-diagonal-4a.svg`; and
- `sockets-p1911-diagonal-4a.svg`.

The PNG files are baked exports of the Figma transforms. They preserve the
new diagonal presentation without a browser transform. The M16 and M249 PNGs
also contain an unintended pair of bars at the extreme right edge; the HTML
prototype shifts those images 24 px right so the bars are cropped outside the
card without reserving empty space. Production should use clean re-exports
without those bars. The SVG files preserve the frame's exact socket marker
geometry as implementation references. The interactive prototype draws its
highlight markers procedurally so compatible and focused states can still
change at runtime.
The current interactive maps are positioned relative to the rendered diagonal
PNG bounds, not the surrounding weapon-body container, so resizing or empty
card space does not pull markers away from the weapon anatomy.

## Reused assets

All item, ammunition, attachment silhouette, Gear, Outfit, controller, and
character assets remain the accepted second-run shared files. The category
exports below are the only new iconography in this update.

## Presentation decisions

- The X/A indicator continues to use the existing layered controller vectors.
- Ineligible placement tinting remains procedural and needs no material asset.
- Slot-to-socket connector lines and their focused/compatible colors are
  procedural SVG preview geometry and require no new raster asset.
- The capacity bar, category dividers, card borders, and slot backgrounds are
  CSS/UMG primitives.
- Unreal should use clean versions of the baked diagonal PNGs and must not
  recreate the Figma rotation or the right-edge export artifacts at runtime.

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
