# Inventory 2-b active asset audit

Status: complete for the selected active 2-b design.

## Asset decision

The selected design changes CanvasPanel placement, Gear/Outfit slot sizing, and
the capacity-indicator orientation. It reuses the existing asset set without
adding, replacing, recoloring, or regenerating any image asset.

All provenance, production cautions, silhouette restrictions, and corrected
M16/M249/P1911 socket semantics remain authoritative in
`../2-b [Deprecated]/ASSET-AUDIT.md`.

## Unreal handoff

Reusable widget files and bindings are unchanged. UMG layout deltas include the
Gear/Outfit slot sizing, Vicinity/Inventory placement, in-list horizontal
capacity indicator, fixed Vicinity alignment line, and contextual-tooltip
positions recorded in `IMPLEMENTATION-SPEC.md`.
