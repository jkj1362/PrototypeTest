# Inventory 1-b asset audit

Shared asset root: `../assets/`. This prototype does not own a separate asset copy.

Status: complete for the first-pass 1-b HTML prototype; visual acceptance pending.

## Asset decision

1-b reuses the complete 1-a image, silhouette, font, and socket-map set. No
weapon, item, character, Gear, or Outfit asset is regenerated.

The only added file is `../assets/controller-r3.png`, copied from the accepted
3-a prototype for the collapsed/expanded Gear control. Production should use
the approved shared controller-glyph system instead of importing a duplicate.

## Presentation decisions

- Secondary slots move into a CSS/UMG vertical column.
- The expanded drawer is a solid-color root overlay and needs no new material.
- The browser capacity gradient remains a preview of a native ProgressBar fill
  with a centered TextBlock overlay.
- Existing horizontal firearm images and the smaller P1911 presentation are
  unchanged from 1-a.

Generated Widget Blueprints remain layout artifacts; collapse state, focus
recovery, and item behavior belong in the hand-written parent UserWidget.
