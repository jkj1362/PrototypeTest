# Inventory 1-a asset audit

Shared asset root: `../assets/`. This prototype does not own a separate asset copy.

Source design: Figma frame `159:107`.

Status: complete for the first-pass 1-a HTML prototype; visual acceptance pending.

## Asset decision

1-a changes geometry and grouping only. It reuses the complete 2-a asset set
without adding, replacing, recoloring, or regenerating image assets.

The authoritative source, licensing and reconstruction notes, silhouette
restrictions, and corrected M16/M249/P1911 socket semantics remain inherited
from the accepted Inventory prototype artifacts.

## Presentation changes

- Linear loose-item rows widen to 364 px.
- Weapon cards become a vertical stack with wrapped socket rails.
- Weapon cards use the existing horizontal `weapon-m16.png`, `weapon-m249.png`,
  and `weapon-p1911.png` exports; the portrait-oriented exports are not used by
  the 1-a weapon rack.
- Horizontal socket markers and connector lines are browser/UMG drawing
  primitives driven by the accepted socket semantics, not new image assets.
- Gear/Outfit moves to the right and uses compact 75 px slots.
- New gray cells are disabled layout placeholders, not imported assets and not
  gameplay inventory locations.
- The capacity bar, divider, borders, and placeholders are CSS/UMG primitives.
  The browser gradient only previews the current fill while the label stays
  centered; Unreal should use a native ProgressBar fill with a centered
  TextBlock overlay, so no gradient texture or material is required.

## Unreal handoff

The reusable component files in this folder record the 1-a geometry. No new
production asset import is required for this variation. Generated Widget
Blueprints remain layout artifacts; interaction continues to belong in the
hand-written parent `UserWidget`.
