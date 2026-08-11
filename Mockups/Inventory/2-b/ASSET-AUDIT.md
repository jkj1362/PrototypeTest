# Inventory 2-b asset audit

Source design: Figma node `393:917` (`개선 2-b`).

The baseline is authored at 1920 × 1080. Measurements from the 2559 × 1439 Figma frame were normalized by approximately 0.75.

The outer `preview-stage` and its JavaScript `zoom` assignment are browser-preview infrastructure only. They uniformly fit and center the fixed 1920 × 1080 canvas inside the available browser viewport and must not generate into UMG.

## Imported visual references

- Gameplay background reference (retained in `assets/`, intentionally unused; the prototype canvas is solid black)
- Character preview
- M16, M249, and P1911 weapon renders, including pre-oriented exports that avoid forbidden runtime transforms
- 5.56mm and 9mm ammunition icons
- First Aid Kit, Med Kit, Molotov Cocktail, Frag Grenade, magazine, muzzle, scope, stock, angled-grip, and vicinity-weapon item icons
- Muzzle, grip, magazine, scope, and stock empty-slot silhouettes (weapon attachment rails only)
- M16, M249, and P1911 circular attachment-socket maps positioned approximately over their matching weapon renders
- Xbox X-button layers exported from the Figma controller-key component, used for the held-weapon Quick Equip target
- Level 3 backpack and vest icons
- Schematic empty-slot silhouettes for helmet, face, jacket, gloves, pants, boots, and utility gear tooltips

The weapon, item, controller, socket, and occupied-gear files are exports supplied by the connected Figma file. The seven `slot-*.svg` gear/outfit silhouettes are mockup-only schematic assets created for this interaction pass. All references must be audited against the production PUBG asset library before Unreal import.

## Unreal decisions

- `PUBG Headline` and `PUBG Body` must resolve to existing licensed in-project font families.
- List and weapon-rack container fills are intentionally transparent; their light borders define the mockup structure over the solid-black root.
- The root background is solid black and does not render the gameplay screenshot.
- Focus, compatible-socket, held-weapon, and targeted-weapon states use brush tints/borders and require no new texture.
- Tooltip visibility is state-driven. Empty gear/outfit and available attachment sockets use a reduced version of the normal tooltip with the relevant silhouette. Empty gear/outfit slots have no action guide; empty weapon sockets retain only hold-Y for dropping the focused weapon.
- The HTML focus-navigation script is a browser preview only. Production navigation belongs in the hand-written parent `UserWidget`.
- The browser prototype reads a standard gamepad through the Gamepad API: D-pad/right stick navigate, A selects/uses or selects an attachment slot, X picks up/quick-equips/detaches, Y drops, hold-Y drops a weapon while any available attachment socket is focused, and B cancels/backs out. Tooltip visibility is a settings option and has no controller binding.
- Secondary navigation is an explicit asymmetric focus graph: the bottom available socket of any weapon moves down to Throwable first; Throwable moves left to Inventory, right to Melee/Tool, and up to the previous weapon's bottom available socket. Inventory navigation never enters the secondary slots directly.
- The Figma component names establish the rail order as `Muzzle → Handle/Grip → Magazine → Scope → Stock`. The baseline M249 Handle/Grip and the P1911 Handle/Grip and Stock positions are inactive; the other positions show their designated silhouette when empty.
- The current circular gun-part markers and connector endpoints are sufficient for focus-flow testing but are not production-calibrated. Before Unreal handoff, align them against the final weapon renders: muzzle at the barrel opening, handle/grip at the forward support area, magazine at the magazine well, scope along the upper rail, and stock at the rear of the weapon.
- Gray attachment silhouettes are empty-slot instructions and must never be used as inventory or vicinity item art.
- Every weapon rail always contains five positions. Each position is one of: occupied with the actual item icon, empty-and-available with its designated gray silhouette, or dimmed-and-unavailable.
- Attachment compatibility is two-dimensional: socket type plus weapon group (`main` or `sidearm`). The current magazine items target `main` only; future sidearm-compatible items should explicitly include `sidearm`.
- The held compatible slot receives the X-button Quick Equip cue. Other compatible main-weapon slots receive the standard compatible highlight only. The cue is state-driven and must be recomputed after every interaction; it is not a one-time tutorial prompt.
- Compatibility highlights and the held-weapon X cue are generated only while a loose attachment in Vicinity/Inventory is focused. Traversing weapon sockets without a pending attachment focuses only the current weapon/socket; A-based slot selection keeps compatible highlights but removes the Quick Equip X cue.
- Tooltip and footer action guides are context-driven. Ammunition exposes only Pick Up in Vicinity or Y Drop in Inventory—never Use, Equip, or Attach.
- Equipping consumes the source attachment tile in Vicinity/Inventory. Detaching restores the attachment to an available attachment-category Inventory tile; dropping restores it to the attachment section of Vicinity. The prototype assumes sufficient Inventory capacity, with a Vicinity fallback when capacity is insufficient.
- Inventory and Vicinity compact identically and independently inside each item-category segment after pickup, use, equip, detach, or drop. Divider nodes never move, and an item leaving a list removes its tile widget entirely; an odd category count leaves only the natural unused half-row.
- Consumables and throwables merge into matching item stacks. Ammunition also merges by item type, with each tile capped at 30 and overflow creating another stack. Attachments never stack.
- Highlighted compatible slots and the currently focused weapon slot draw a Figma-style rounded orthogonal connector to the corresponding gun-part socket marker: short horizontal lead, vertical segment, then horizontal endpoint. In Unreal, reproduce this with a dedicated connector overlay/custom paint pass rather than generating the browser SVG.
- The tooltip is intentionally wider and uses a darker gray panel than the earlier white treatment; it remains the topmost DOM/UMG overlay.
- Player-facing prototype text is localized to Korean; HTML implementation metadata remains English for Claude/UMG handoff clarity.

## Reusable Widget Blueprints

- `WBP_InventoryItemTile`
- `WBP_GearSlot`
- `WBP_WeaponCard`

The main screen should generate as `WBP_Inventory2B` and bind behavior through its hand-written parent class.
