# Inventory 2-a Asset Audit

Updated: 2026-10-01
Layout source: Figma 545:2625.

The replacement reuses existing local exports: oriented M16/M249/P1911 art,
attachment silhouettes, item art, Gear/Outfit and character art, controller
glyphs, and the six-category badge/glyph set. The category correction adds the exact shared flag export described below.
The R3 image is controller-r3.png. Code Connect mapping to Stick_R_push was
requested and approved, but Figma rejected it with "Published component not
found"; no successful mapping is claimed.

Category files include category-gear.svg and category-glyph-weapon.svg,
category-glyph-heal.svg, category-glyph-gear.svg, from the existing 550:663
category work. Flag shapes are procedural material candidates; rounded
badges and controller cues retain the existing asset treatment. Socket
markers/connectors are dynamic Overlay drawing, not new image exports.

PUBG Headline/Body declarations currently fall back to system fonts when
unavailable. Production requires licensed imported fonts and an explicit
UMG material/brush decision for non-native CSS effects.

## Exact category flag correction

category-flags-550-663.png is the unmodified Figma 550:663 export (493 x 409,
RGBA). Its six heads are used as atlas regions at 0.75 scale: X offsets
0, 66.75, 133.5, 200.25, 267, 333.75; head size 36 x 31.5. The stem is
a 4.5 px tinted Border extending to the last category item. No badge icons
are clipped or substituted inside the heads. Existing category badge/glyph
files remain available for tooltips; they no longer construct list flags.
See ../shared/category-flags.css. Native UMG uses an atlas brush and Overlay
with no gutter or extra slot padding.

## Empty Melee icon (2026-09-22)

slot-melee.svg is the exact melee silhouette exported by the previously
inspected Figma 545:1887 frame. Existing Gear/Outfit silhouettes are reused.

## Common ammunition summary (2026-10-01)

`ammo-counter-556.png`, `ammo-counter-9mm.png`, `ammo-counter-762.png`,
`ammo-counter-blue.png`, and `ammo-counter-shells.png` are the original PNG
image fills from Figma nodes 616:920, 616:923, 616:926, 616:954, and 616:957.
They are rendered as passive 30 px icons in the one-row Inventory header.
