# PUBG Console Inventory 2-b Second-Run Feature Specification

Status: second-run interactive prototype; browser visual and controller-navigation QA passed

Last updated: 2026-08-27

## 1. Purpose and authority

Inventory 2-b is the two-column grid-list companion to 2-a. Its visual
authority is Figma frame 487:698 (개선 2-b). Tooltip-state references are
Figma nodes 493:2623, 493:2866, 493:3111, 493:3419, and 493:3674.
The executable artifact is WBP_Inventory2B.html.

Unless this specification overrides a list rule, 2-b inherits the complete
2-a equipment, focus, attachment, Gear/Outfit, and item-mutation behavior.

## 2. Layout delta

| Region | Left | Top | Width | Height |
|---|---:|---:|---:|---:|
| Vicinity | 23 | 38 | 220 | 960 |
| Inventory | 251 | 38 | 220 | 963 |
| Vertical capacity bar | 477 | 91 | 30 | 251 |
| Weapon/secondary rack | 949 | 91 | 842 | 910 |
| Collapsed Gear | 1808 | 315 | 112 | 450 |
| Expanded Gear/Outfit | 1448 | 52 | 472 | 977 |

Each loose-item list is a two-column WrapBox. The 18 px category gutter leaves
84 px square tiles, a 6 px inter-tile gap, and a 174 px wide-item row. The
capacity meter is the vertical root-level bar shown by the Figma layout; its
210 / 350 binding remains available even though the compact bar does not
render the text.

## 3. Tooltip states

Grid-list tooltips are visible by default and remain toggleable with View/V.

- Normal list tooltip: X=470, Y=392.
- Attachment-slot tooltip: X=680, Y=392.
- Gear/Outfit tooltip: X=1191, Y=421.
- List-origin comparison panels: X=470, Y=297 and Y=529.
- Weapon-slot-origin comparison panels: X=680; vertical positions reflow from Y=297 according to panel content.

These anchors reproduce the five supplied Figma cases. The two comparison
panels stay in one vertical stack and follow the source attachment context.
Their heights are content-driven: images and text retain their standard size,
the stack keeps an 18 px gap, and it shifts upward only when required to remain
above the controller guide.

## 4. Grid focus and shared behavior

Left/Right moves across the visible row. Up/Down selects the closest tile in
the same visual column, with geometric fallback across partial category rows
and the wide weapon tile. List boundaries do not loop.

The weapon rack, collapsed one-column Gear rail, expanded drawer, connector
paths, socket collision avoidance, modal placement, comparison state, item
mutation, and hard directional boundaries are identical to 2-a.

## 5. Validation checklist

- 2-b opens with tooltips visible and Gear/Outfit collapsed.
- Both lists use two 84 px columns plus the shared 18 px category gutter.
- The capacity bar is vertical and remains outside the Inventory WrapBox.
- Tooltip states match all five supplied Figma nodes.
- Comparison position follows Vicinity, Inventory, or weapon-slot origin.
- Three vertical weapon cards and the lower secondary strip match 2-a.
- Collapsed Gear is a one-column rail and stops at both ends.
- Modal placement, X/A cues, socket connectors, empty-slot guidance, and all item mutations remain functional.
- Every data-umg-name is unique and all local assets resolve.
