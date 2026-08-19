# PUBG Console Inventory 1-a Feature Specification

Status: first-pass interactive prototype; layout review and tooltip placement iteration pending

## 1. Purpose and authority

Inventory 1-a is the conservative layout variation requested after the active
prototype set. Its authoritative visual reference is:

- Figma file `etHQBgFlvTuESYLwgH5CuH`
- Frame `159:107` (`improvement 1 conservative improvement`)
- Executable artifact `WBP_Inventory1A.html`
- Design canvas 1920 x 1080

Only layout changes in 1-a. Unless this document explicitly overrides a visual
rule, all mechanics, controller input, focus recovery, item mutations,
stacking, compatibility, socket semantics, and production deferments remain
the accepted behavior recorded by `../2-a/IMPLEMENTATION-SPEC.md` and the
detailed baseline it inherits.

## 2. Layout translation

The Figma frame is 2559 x 1439. Its geometry is translated to the project's
1920 x 1080 canvas at approximately 75 percent scale.

| Region | Left | Top | Width | Height |
|---|---:|---:|---:|---:|
| Vicinity | 42 | 37 | 384 | 952 |
| Divider | 509 | 68 | 2 | 949 |
| Inventory list | 593 | 37 | 384 | 952 |
| Weapon rack | 989 | 90 | 518 | 899 |
| Gear/Outfit | 1540 | 38 | 347 | 970 |

Vicinity and Inventory remain linear ScrollBox-style lists. Their rows expand
from the 2-a width of 306 px to 364 px while retaining the same 90 px height,
icon/name/count structure, category lifecycle, and contained Up/Down behavior.
Vicinity begins its first row directly below the title, matching frame 159:107;
only Inventory retains a fixed header for the capacity bar.

The weapon rack changes from three side-by-side tall cards to three stacked
518 x 222 cards. Each card presents its five accepted socket positions in a
two-column flex-wrap rail and adds one disabled visual placeholder to complete
the 2 x 3 layout. Disabled placeholders never enter focus or compatibility
logic. Attachment focus follows that visible grid: Left/Right moves within the
current row, Up/Down moves within the current column, and vertical movement at
a card edge continues in the same column of the next stacked card. Disabled
cells are skipped vertically and block horizontal entry. Right from an enabled
right-column attachment enters the nearest Gear/Outfit slot. Down from either
lowermost enabled P1911 attachment enters Throwable. Up from either secondary
slot returns to the most recently focused P1911 attachment, with the last
enabled P1911 socket as the initial fallback. Right from Melee/Tool enters the
nearest Gear/Outfit slot.

M16, M249, and P1911 use their horizontal weapon exports, matching the live
PUBG-style relationship of a socket grid on the left and a horizontal weapon
silhouette on the right. Persistent socket markers and active connector
endpoints are mapped independently for each horizontal gun: M16 has Muzzle,
Grip, Magazine, Scope, and Stock; M249 has Muzzle, Magazine, Scope, and Stock;
P1911 has Muzzle, Magazine, and Scope. Unavailable sockets never create a
marker or connector. Each active connector begins at the focused slot's own
right edge. The root-level SVG is later in document order than the weapon rack,
so a connector from a left-column slot remains visible above its neighboring
right-column slot without introducing `z-index`. The P1911 render is deliberately
smaller than both main firearms, and its socket markers are remapped to that
smaller sidearm presentation.

Gear/Outfit moves to the right edge. Helmet, backpack, and vest occupy the
left rail; the six existing outfit slots occupy the right rail. Three disabled
visual placeholders complete the reference frame's third right-side group and
must not enter controller navigation.

## 3. Preserved interaction contract

The 1-a fork preserves the existing 2-a executable behavior:

- initial focus on the first Vicinity item;
- D-pad, right-stick, and keyboard directional navigation;
- contained Up/Down movement in list and equipment columns;
- geometric cross-region Left/Right movement;
- category-aware reflow and empty-list focus recovery;
- consumable and Throwable stacking by item name;
- replacing the equipped Throwable returns the previous Throwable to Inventory;
- ammunition stack limits of 30 per row;
- non-stacking loose attachments;
- green-only attachment compatibility and conditional quick-equip cues;
- Vicinity X always means pickup: with the Menu setting enabled, an attachment
  may route directly into an empty compatible slot on the held weapon; otherwise
  it enters Inventory and never replaces an equipped attachment;
- Inventory X remains explicit quick equip and may replace an attachment,
  returning the replaced attachment to Inventory;
- gamepad Menu toggles the Vicinity empty-slot convenience, which defaults on;
- A modal attachment placement with B as the only cancellation input;
- comparison tooltips during placement;
- corrected M16, M249, and P1911 socket semantics;
- the blocked Vicinity AUG equip simulation; and
- the existing pickup, use, equip, drop, detach, and weapon-drop simulations.

Layout placeholders are disabled and are not inventory or equipment data.

## 4. Tooltip first-pass rule

Tooltips are hidden by default. View/V toggles the complete tooltip layer
without moving focus or changing the placement state.

Tooltip coordinates in this first pass are provisional. The normal/comparison
layer begins at X=360, and Gear/Outfit focus moves the primary tooltip to
X=1309 so the focused gear controls remain visible. These values are not an
accepted design decision. They must be reviewed with the user after the first
working run before being treated as production layout.

## 5. UMG boundary

Layout belongs to this HTML and its reusable component files. Production
behavior belongs in a hand-written parent `UserWidget`; generated Widget
Blueprints must not be hand-edited.

The inherited binding surface remains stable. `Txt_InventoryCapacity` displays
the preview value `210 / 350` and must later bind to live current and maximum
capacity data. Its text remains centered on the complete capacity bar rather
than moving with the current-capacity fill.

## 6. Validation checklist

- The five major regions match the translated Figma coordinates above.
- Vicinity and Inventory rows are 364 x 90 and remain one-column lists.
- The capacity bar stays in the fixed Inventory header.
- The first Vicinity row aligns with the reference layout.
- Three weapon cards stack vertically and preserve all enabled socket actions.
- All three guns render horizontally, with socket markers attached to the
  corresponding horizontal gun parts.
- Compatibility and focused-slot connector lines begin at the actual source
  cell, remain above neighboring cells, and terminate on those same markers.
- Disabled socket and gear placeholders never receive focus.
- Gear/Outfit is right-aligned and existing enabled gear/outfit slots remain usable.
- Initial focus remains the first Vicinity item.
- Attachment Left/Right navigation follows rows; Up/Down follows columns across
  the vertically stacked cards. Right-edge attachments and Melee/Tool reach Gear,
  both lowermost P1911 attachments reach Throwable, and both secondary slots move
  Up to the most recently focused P1911 attachment.
- A left-column attachment with no enabled cell to its right also reaches Gear.
- Replacing an equipped Throwable returns the previous item to Inventory.
- Capacity text remains centered independently of the fill amount.
- A, B, X, Y, View, Menu, conditional Vicinity quick equip, Inventory quick
  equip, modal placement, and list mutations match the shared contract.
- Tooltips are hidden on entry and View restores them without moving focus.
- Tooltip coordinates remain documented as provisional for user iteration.
- Every `data-umg-name` is unique within its file.
- No media query, CSS grid, z-index, transform, or non-root absolute child is introduced.
- Browser console has no errors.
