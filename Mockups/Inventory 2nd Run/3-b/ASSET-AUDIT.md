# Inventory 3-b asset audit

Shared asset root: `../assets/`. This prototype does not own a separate asset copy.

Source designs:

- Collapsed/default: Figma node `402:1746`
- Gear/Outfit expanded: Figma node `402:2054`

Status: second-run 3-b interactive baseline; manual controller acceptance pending.

This is the former two-column-grid Inventory 3-a after the milestone naming
swap. No asset content changed during the rename.

## Inherited assets

3-b forks the historical original 2-b asset set. Although that layout is now
deprecated in favor of the active 2-b, its item icons, weapon renders, attachment
silhouettes, socket maps, character preview, occupied Gear icons, and
mockup-only Outfit silhouettes retain the provenance and production caveats in
`../2-b [Deprecated]/ASSET-AUDIT.md`.

The corrected M16, M249, and P1911 socket semantics from the 2-b implementation
spec remain authoritative. Do not infer socket identity from raw SVG path
order.

## New 3-b asset

- `../assets/controller-r3.png`: exact export of the Figma controller-key
  component at node `402:2403`, used for Show Character / Hide Character.

This is a mockup export. Unreal should use the corresponding approved PUBG
controller-key component or texture rather than importing a duplicate if that
asset already exists in the production UI library.

## Layout decisions with asset impact

- Weapon cards render `weapon-m16-oriented.png`, `weapon-m249-oriented.png`,
  and `weapon-p1911-oriented.png` vertically at natural aspect ratio. They are
  deliberately scaled below the full weapon-body height rather than distorted
  to fill it.
- Vertical image-relative socket markers and connector lines are procedural
  preview geometry, so no new socket-map asset is required. The socket SVGs
  remain provenance references. A procedural rail-collision guard keeps every
  socket marker outside the attachment-slot UI even where weapon art overlaps
  that rail.

- The default state reuses only Helmet, Backpack, and Vest presentation in the
  compact Gear summary.
- The expanded overlay reuses the existing character image and Outfit slot
  silhouettes.
- No new background, border, gradient, shadow, or rounded-corner asset is
  required. The browser gradient only previews the vertical capacity fill;
  Unreal should use a native ProgressBar with a centered TextBlock overlay.
- The drawer is an opaque solid-color overlay so it fully covers P1911 and the
  vertical secondary column.
- M16 and M249 are outside the drawer bounds and must never be masked.
- Browser focus, compatibility tint, and connector effects remain procedural
  and require no raster asset.

## Unreal decisions

- Resolve `PUBG Headline` and `PUBG Body` to licensed in-project fonts.
- Prefer the existing controller input glyph system for R3.
- Keep the character preview as a replaceable Image brush.
- Preserve all 2-b item-art and silhouette restrictions: loose items use real
  item art; gray attachment silhouettes appear only in empty weapon sockets.
- Replace the mockup-only Outfit silhouettes with approved production assets
  before shipping.

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
