# Inventory 3-a asset audit

Source designs:

- Collapsed/default: Figma node `402:1746`
- Gear/Outfit expanded: Figma node `402:2054`

Status: initial 3-a interactive prototype; manual design acceptance pending.

## Inherited assets

3-a forks the finalized 2-b asset set. Item icons, weapon renders, attachment
silhouettes, socket maps, character preview, occupied Gear icons, and
mockup-only Outfit silhouettes retain the provenance and production caveats in
`../2-b/ASSET-AUDIT.md`.

The corrected M16, M249, and P1911 socket semantics from the 2-b implementation
spec remain authoritative. Do not infer socket identity from raw SVG path
order.

## New 3-a asset

- `assets/controller-r3.png`: exact export of the Figma controller-key
  component at node `402:2403`, used for `캐릭터 보기` / `캐릭터 숨기기`.

This is a mockup export. Unreal should use the corresponding approved PUBG
controller-key component or texture rather than importing a duplicate if that
asset already exists in the production UI library.

## Layout decisions with asset impact

- The default state reuses only Helmet, Backpack, and Vest presentation in the
  compact Gear summary.
- The expanded overlay reuses the existing character image and Outfit slot
  silhouettes.
- No new background, border, gradient, shadow, or rounded-corner asset is
  required.
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
