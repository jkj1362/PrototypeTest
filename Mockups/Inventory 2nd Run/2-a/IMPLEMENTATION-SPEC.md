# PUBG Console Inventory 2-a Second-Run Feature Specification

Status: second-run interactive prototype; browser visual and controller-navigation QA passed

Last updated: 2026-08-27

## 1. Purpose and authority

Inventory 2-a is the one-column loose-item-list version of the second-run 2
layout. Its visual authority is Figma frame 468:1535 (개선 2-a). The executable
artifact is WBP_Inventory2A.html on a 1920 x 1080 canvas.

The prototype uses the complete shared second-run interaction contract:
item mutation, attachment placement and comparison, contextual tooltips,
socket connectors, lower-right X/A cues, invalid-slot dimming, hard focus
boundaries, and Gear/Outfit opening collapsed.

## 2. Layout

The Figma frame is scaled from 2559 x 1439 to 1920 x 1080.

| Region | Left | Top | Width | Height |
|---|---:|---:|---:|---:|
| Vicinity | 18 | 60 | 324 | 962 |
| Inventory | 351 | 59 | 324 | 962 |
| Weapon/secondary rack | 949 | 109 | 842 | 910 |
| Collapsed Gear | 1808 | 315 | 112 | 450 |
| Expanded Gear/Outfit | 1448 | 52 | 472 | 977 |

The equipment rack has three equal vertical weapon cards in a 710 px upper
row and a two-cell, 192 px Throwable/Melee strip below. The deliberate empty
middle corridor is reserved for normal and comparison tooltips.

## 3. Weapon presentation

M16, M249, and P1911 use the shared oriented exports and preserve their natural
aspect ratios. The long guns fill the available vertical body height without
horizontal stretching. P1911 uses 56% of its body height and sits lower in the
card. Each card uses a 75 px one-column attachment chain.

Connector paths and socket markers are generated from the rendered image
bounds. Socket circles are displaced beyond the attachment rail whenever
their collision envelope would overlap the rail.

## 4. Lists and tooltips

Vicinity and Inventory are 324 px one-column ScrollBoxes using the shared
10 px category marker and disconnected 4 px rail treatment. Tooltips start
hidden and View/V toggles them without changing focus.

- Normal list tooltip: X=680, Y=392.
- Attachment-slot tooltip: X=680, Y=392.
- Gear/Outfit tooltip: X=1191, Y=421.
- List-origin comparison panels: X=680, Y=297 and Y=529.
- Weapon-slot-origin comparison panels: X=680; vertical positions reflow from Y=297 according to panel content.

Tooltip shells use content-driven height. Images, typography, metadata, and
action rows retain their standard sizes; the panel grows instead of clipping
or compressing them. Comparison panels maintain an 18 px gap and shift upward
only when needed to remain above the controller guide.

Comparison placement follows the source item that initiated attachment
placement. Empty-slot tooltips omit the category badge.

## 5. Gear/Outfit and focus

The collapsed Gear rail is one vertical column: Helmet, Backpack, Vest, and
the R3 toggle. Up/Down follows that visible order and stops at both ends.
Left enters the closest focusable sidearm attachment; Right is contained.

R3 expands the 472 px drawer with Gear, character preview, and all nine Outfit
slots. The drawer dims the covered weapon rack. Existing second-run focus
recovery, modal-placement restrictions, and Outfit navigation remain intact.

## 6. Validation checklist

- 2-a opens with tooltips hidden and Gear/Outfit collapsed.
- Loose items use one-column rows and shared category rails.
- Three vertical weapon cards and the lower secondary strip match the Figma composition.
- Weapon art is never horizontally stretched.
- Socket UI never overlaps an attachment-slot rail.
- X/A cues remain 24 px lower-right indicators.
- Modal placement dims every invalid destination and restores normal state on confirmation or cancellation.
- Tooltip and comparison positions follow their source context.
- All empty equipment slots, including Melee/Tool, show guidance tooltips.
- Every Outfit slot remains focusable.
- Every data-umg-name is unique and all local assets resolve.
