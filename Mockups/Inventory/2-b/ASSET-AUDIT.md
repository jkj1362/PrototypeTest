# Inventory 2-b asset audit

Source design: Figma node `393:917` (`개선 2-b`).

Status: final for the accepted Inventory 2-b HTML baseline.

The baseline is authored at 1920 × 1080. Measurements from the 2559 × 1439 Figma frame were normalized by approximately 0.75.

The outer `preview-stage` and its JavaScript `zoom` assignment are browser-preview infrastructure only. They uniformly fit and center the fixed 1920 × 1080 canvas inside the available browser viewport and must not generate into UMG.

## Imported visual references

- Gameplay background reference (retained in `assets/`, intentionally unused; the prototype canvas is solid black)
- Character preview
- M16, M249, and P1911 weapon renders, including pre-oriented exports that avoid forbidden runtime transforms
- 5.56mm and 9mm ammunition icons
- First Aid Kit, Med Kit, Molotov Cocktail, Frag Grenade, magazine, muzzle, scope, stock, angled-grip, and vicinity-weapon item icons
- Muzzle, grip, magazine, scope, and stock empty-slot silhouettes (weapon attachment rails only)
- M16, M249, and P1911 circular attachment-socket maps manually aligned over their matching weapon renders
- Xbox X-button layers exported from the Figma controller-key component, used for the held-weapon Quick Equip target; the A placement cue reuses its exported circle layers with a mockup-only vector A glyph
- Level 3 backpack and vest icons
- Schematic empty-slot silhouettes for helmet, face, jacket, gloves, pants, boots, and utility gear tooltips

The weapon, item, controller, socket, and occupied-gear files are exports supplied by the connected Figma file. The seven `slot-*.svg` gear/outfit silhouettes and `controller-a-letter.svg` are mockup-only schematic assets created for this interaction pass. The A glyph must be replaced by the approved production controller-key component before Unreal import. All references must be audited against the production PUBG asset library before Unreal import.

## Unreal decisions

- `PUBG Headline` and `PUBG Body` must resolve to existing licensed in-project font families.
- List and weapon-rack container fills are intentionally transparent; their light borders define the mockup structure over the solid-black root.
- The root background is solid black and does not render the gameplay screenshot.
- Focus, compatible-socket, held-weapon, and targeted-weapon states use brush tints/borders and require no new texture.
- Tooltip visibility is state-driven. Empty gear/outfit and available attachment sockets use a reduced version of the normal tooltip with the relevant silhouette. Empty gear/outfit slots have no action guide; empty weapon sockets retain only hold-Y for dropping the focused weapon.
- The HTML focus-navigation script is a browser preview only. Production navigation belongs in the hand-written parent `UserWidget`.
- The browser prototype reads a standard gamepad through the Gamepad API: D-pad/right stick navigate, A selects/uses or selects an attachment slot, X picks up/quick-equips/detaches, Y drops, hold-Y drops a weapon while any available attachment socket is focused, B cancels/backs out, and View toggles the tooltip layer. Keyboard V is the View preview equivalent. The tooltip toggle deliberately has no action guide.
- Secondary navigation is an explicit asymmetric focus graph: the bottom available socket of any weapon moves down to Throwable first; Throwable moves left to Inventory, right to Melee/Tool, and up to the previous weapon's bottom available socket. Inventory navigation never enters the secondary slots directly.
- Vertical navigation in Vicinity, Inventory, and each Gear/Outfit rail is column-contained. Reaching a column's top or bottom does not move focus into another column or external region; left/right remains the deliberate cross-column path.
- The Figma component names establish the rail order as `Muzzle → Handle/Grip → Magazine → Scope → Stock`. The baseline M249 Handle/Grip and the P1911 Handle/Grip and Stock positions are inactive; the other positions show their designated silhouette when empty.
- Socket identities were re-audited against the explicitly named layers in Figma baseline frame `393:917`: M16 group `404:3740` has Muzzle, Handle, Magazine, Scope, and Stock; M249 group `404:3768` has Muzzle, Magazine, Scope, and Stock; P1911 group `404:3797` has only Muzzle, Scope, and Magazine. Final browser alignment uses the accepted coordinate map in `IMPLEMENTATION-SPEC.md`, including the corrected P1911 Magazine/Scope assignment, the Magazine point shifted toward the pistol grip, and removal of the stale fourth marker. Raw SVG path order is not authoritative.
- Gray attachment silhouettes are empty-slot instructions and must never be used as inventory or vicinity item art.
- Every weapon rail always contains five positions. Each position is one of: occupied with the actual item icon, empty-and-available with its designated gray silhouette, or dimmed-and-unavailable.
- Attachment compatibility is two-dimensional: socket type plus weapon group (`main` or `sidearm`). The current magazine items target `main` only; future sidearm-compatible items should explicitly include `sidearm`.
- The held compatible slot receives the X-button Quick Equip cue over the same green availability state used by other compatible main-weapon slots. It does not receive a yellow border or outline; yellow is reserved for the actual navigation focus. The cue is state-driven and must be recomputed after every interaction; it is not a one-time tutorial prompt.
- Compatibility highlights and the held-weapon X cue are generated only while a loose attachment in Vicinity/Inventory is focused. Traversing weapon sockets without a pending attachment focuses only the current weapon/socket; A-based slot selection keeps compatible highlights, removes the Quick Equip X cue, and shows an A tap cue only on the currently focused valid destination. During that selection mode, focus is locked to compatible sockets of the selected type and weapon group, A confirms, and B is the only cancellation path; X and Y are unavailable.
- Tooltip action guides are context-driven. The footer separately retains B Back, the yellow system message, and controller status. Ammunition exposes only Pick Up in Vicinity or Y Drop in Inventory—never Use, Equip, or Attach.
- The vicinity weapon artwork and tile identify an AUG. Its guide reads X `빠른 장착` and A `장착 슬롯 선택`. Pressing either input shows the yellow `무기 장착 기능은 아직 구현되지 않았습니다` message and leaves the weapon tile untouched; full weapon-slot selection and weapon replacement remain outside the mockup.
- The empty gear socket directly above the backpack is identified as `헬멧 슬롯` in its tooltip.
- The top socket in the leftmost Outfit rail is identified as `모자 슬롯` and uses the Outfit-slot type, distinct from the Gear helmet socket above the backpack.
- Equipping consumes the source attachment tile in Vicinity/Inventory. Replacing an occupied socket first returns its displaced attachment as a separate attachment-category Inventory tile. Detaching also restores the attachment to Inventory, while dropping restores it to the attachment section of Vicinity. This prototype assumes Inventory capacity is always sufficient; a future capacity-aware pass may redirect failed restores to Vicinity.
- Inventory and Vicinity compact identically and independently inside each item-category segment after pickup, use, equip, detach, or drop. Divider nodes never move, but their visibility is recalculated: empty categories add no line, and exactly one line separates each pair of successive populated categories. An item leaving a list removes its tile widget entirely; an odd category count leaves only the natural unused half-row.
- When the final tile leaves Vicinity or Inventory, the empty list panel itself becomes the focus target and suppresses the tooltip. List panels are otherwise absent from the focus graph and stop being focusable as soon as an item is restored.
- Consumables and throwables merge into matching item stacks. Ammunition also merges by item type, with each tile capped at 30 and overflow creating another stack. Attachments never stack.
- Highlighted compatible slots and the currently focused weapon slot draw a Figma-style rounded orthogonal connector to the corresponding gun-part socket marker: short horizontal lead, vertical segment, then horizontal endpoint. In Unreal, reproduce this with a dedicated connector overlay/custom paint pass rather than generating the browser SVG.
- Tooltip panels use a darker gray treatment and fit entirely in the horizontal gap between Vicinity and Inventory. Normal focus shows one panel. A-based attachment slot selection stacks two panels in that gap so the selected loose attachment remains visible above the focused empty or occupied destination-slot tooltip for direct comparison.
- Player-facing prototype text is localized to Korean; HTML implementation metadata remains English for Unreal/UMG translation clarity.

## Reusable Widget Blueprints

- `WBP_InventoryItemTile`
- `WBP_GearSlot`
- `WBP_WeaponCard`
- `WBP_ItemTooltip`

The main screen should generate as `WBP_Inventory2B` and bind behavior through its hand-written parent class.
