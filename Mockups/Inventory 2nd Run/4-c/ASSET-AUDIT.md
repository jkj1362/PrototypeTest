# Inventory 4-c asset audit

Shared asset root: `../assets/`.

Source design: Figma frame `493:2176`, with tooltip-state frames `506:3196`,
`506:3498`, `506:3760`, and `506:4025`.

Status: complete for the interactive HTML prototype; manual visual acceptance
pending.

## Asset delta from 4-a/4-b

4-c introduces no new image, vector, material, or controller asset. It reuses
the complete 4-a diagonal weapon and shared second-run item asset set. The new
2 x 3 attachment matrices, structural blank cells, compact list tiles,
category dividers, markers, and rails are CSS/UMG layout primitives.

## Reused assets

4-c reuses:

- the three baked diagonal weapon PNGs;
- all existing attachment silhouette and item PNGs;
- all Gear, Outfit, character, ammunition, and controller assets; and
- all five shared tooltip category icons.

Socket points continue to use image-relative maps. Their layout offsets are
updated for the larger, top-aligned 4-c weapon art so marker-only socket
highlights remain on weapon anatomy after the attachment rails move to the
lower-left grid. No connector-path asset or procedural line is used. The
external Inventory scrollbar and tooltip corridors are native layout
primitives and add no raster dependency.

## Unreal decisions

- Translate loose-item panels as two-column WrapBoxes.
- Translate `Box_AttachmentSockets` as a two-column WrapBox with one explicit
  nonfocusable spacer in row 1, column 2.
- Use native Border and layout widgets for category and attachment-grid
  primitives.
- Reuse the approved controller glyph and category-icon systems.
- Preserve the inherited asset provenance and production restrictions.
- Do not translate browser-only focus outlines, SVG marker generation,
  viewport fitting, or DOM mutation into generated Widget Blueprints.
