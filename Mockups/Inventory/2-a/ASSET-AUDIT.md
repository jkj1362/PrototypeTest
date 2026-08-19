# Inventory 2-a asset audit

Shared asset root: `../assets/`. This prototype does not own a separate asset copy.

Source design: Figma frame `339:1503` (`2-a`).

Status: complete for the first-pass 2-a HTML prototype; visual acceptance pending.

## Asset decision

2-a changes list geometry and item presentation, not the represented inventory
content. It therefore forks the complete accepted 2-b asset set without adding
new image files. The authoritative source, licensing/reconstruction notes,
silhouette restrictions, and corrected M16/M249/P1911 socket semantics remain
those recorded in `../2-b/ASSET-AUDIT.md`.

## 2-a presentation changes

- Loose-item art is rendered in an icon cell at the left of each linear row.
- Text names are live text, not baked into raster assets.
- Stack counts are live text and remain visible at quantity one.
- Weapons in Vicinity use the same row height as all other item categories.
- Category bars, the fixed Vicinity header spacer line, and the horizontal
  inventory indicator are CSS/UMG primitives, not imported images.
- The browser gradient only previews the current fill while the capacity label
  stays centered. Unreal should use a native ProgressBar fill with a centered
  TextBlock overlay; do not create a gradient asset for it.

## Unreal handoff

`WBP_InventoryItemTile.html` is the 2-a reusable row source and exposes:

- `Panel_ItemTile`
- `Img_ItemIcon`
- `Txt_ItemName`
- `Txt_StackCount`

All other reusable widget bindings and asset paths remain inherited from 2-b.
Do not replace loose-item art with empty-slot silhouettes; silhouettes remain
reserved for equipment and attachment slots.
