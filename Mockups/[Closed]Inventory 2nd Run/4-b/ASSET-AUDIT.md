# Inventory 4-b asset audit

Shared asset root: `../assets/`.

Source design: 4-a Figma frame `464:399`, with the established two-column
loose-item-list treatment used by second-run grid variants.

Status: complete for the interactive HTML prototype; manual visual acceptance
pending.

## Asset delta from 4-a

4-b introduces no new image, vector, material, or controller assets. It reuses
the complete 4-a asset set and changes only list layout primitives.

The two-column tiles, category dividers, 10 px markers, and 4 px rails are
CSS/UMG layout and color primitives. Item names remain available in tooltips,
so the grid does not require separate label art.

## Inherited 4-a assets

4-b reuses:

- the three baked diagonal weapon PNGs;
- the three diagonal socket-map SVG references;
- all item, ammunition, attachment, Gear, Outfit, character, and controller
  assets; and
- all five shared tooltip category icons.

The M16 and M249 PNGs retain the source export bars at their extreme right
edge. As in 4-a, the HTML shifts both images 24 px right so those bars crop
outside the card while the socket endpoints receive the same offset.
Production should use clean weapon re-exports without the bars.
Interactive socket markers are inherited from 4-a's image-relative diagonal
maps, keeping them attached to the weapon anatomy rather than card whitespace.

## Unreal decisions

- Translate the list panels as WrapBoxes with two 135 px tile columns.
- Use native Border and layout widgets for category rails, markers, and
  dividers.
- Reuse the approved controller glyph and category-icon systems when present.
- Preserve all 4-a asset provenance and production restrictions.
- Do not translate browser-only focus outlines, SVG connector generation,
  viewport fitting, or DOM mutation into generated Widget Blueprints.
