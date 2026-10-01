# Inventory Prototype 1 asset audit

Date: 2026-09-21

Source: Figma frame 545:1887 ("개선 1").

This prototype reuses the existing weapon and item assets:

- The plain (non-oriented) weapon renders `weapon-m16.png`, `weapon-m249.png`,
  and `weapon-p1911.png` -- the same files the second-run `1-b`/`1-a`/`1-c`
  used -- contained without stretching inside the wide/short card rather than
  the "2-series" oriented portrait crops, since this prototype's cards are
  wide, not narrow.
- Every asset already audited for `2-a`, including the six-category rail
  markers and glyphs from Figma `550:663` (see `../2-a/ASSET-AUDIT.md`) and
  the Gear slot renders (`slot-helmet.svg`, `gear-backpack.png`,
  `gear-vest.png`).
- The shared controller-cue and attachment-connector assets used for the
  X/A badges and on-weapon socket markers.

Attachment cells reuse attachment-muzzle.png, attachment-grip.png,
attachment-mag.png, attachment-scope.png, and attachment-stock.png. Occupied
slots show the same item art as 2-a/2-c.

## Exact category flag correction

category-flags-550-663.png is the unmodified Figma 550:663 export (493 x 409,
RGBA). Its six heads are used as atlas regions at 0.75 scale: X offsets
0, 66.75, 133.5, 200.25, 267, 333.75; head size 36 x 31.5. The stem is
a 4.5 px tinted Border extending to the last category item. No badge icons
are clipped or substituted inside the heads. Existing category badge/glyph
files remain available for tooltips; they no longer construct list flags.
See ../shared/category-flags.css. Native UMG uses an atlas brush and Overlay
with no gutter or extra slot padding.

## 2026-09-22 1-b-only correction

No new image assets. A triangular alpha mask removes the dark empty area
from the atlas flag head without changing its exported glyph. M16 retains
the original transparent PNG and scales by width, with matching socket math.
Socket circles remain procedural; connector lines are no longer rendered.

## Empty Melee icon (2026-09-22)

slot-melee.svg is the exact melee silhouette exported by the previously
inspected Figma 545:1887 frame. Existing Gear/Outfit silhouettes are reused.

The three weapon-*-tilted-1b.svg files embed the unchanged local PNG bytes
with a -12 degree vector rotation and trimmed transparent canvas bounds.
They introduce no new drawn weapon art. For UMG, rasterize these audited
vector wrappers at import; socket transforms use the matching asset bounds.
