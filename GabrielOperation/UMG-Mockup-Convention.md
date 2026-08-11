# UMG Mockup Convention

How to write an HTML mockup that converts cleanly into an Unreal UMG Widget
Blueprint.

**Using this with another tool:** paste this whole file into ChatGPT, Codex, or
any LLM as project instructions before asking for a mockup. It is written to be
read by a model as much as by a person.

The rules exist because HTML and UMG have different layout models. HTML that
ignores them still *looks* fine in a browser -- it just can't be expressed in
UMG without someone reinterpreting it, and reinterpretation is where design
intent gets lost.

---

## 1. Canvas

- Design at **1920 x 1080**. Every `px` value in the mockup is at this size.
- **Do not write responsive breakpoints.** UMG's DPI scaling handles other
  resolutions from the single design size. Media queries are ignored.
- One HTML file = **one Widget Blueprint**.

## 2. Naming -- the most important rule

Any element that gameplay code needs to touch gets a name:

```html
<p data-umg-name="Txt_PlayerName">Ada</p>
```

- `data-umg-name` becomes the **widget's variable name**, exposed to code via
  `BindWidget`. Without it, a widget is generated but not accessible from C++
  or Blueprint.
- Names must be **unique within the file** and use `Prefix_PascalCase`:

  | Prefix | For |
  |---|---|
  | `Txt_` | text |
  | `Btn_` | buttons |
  | `Img_` | images and icons |
  | `Box_` | layout containers |
  | `Bar_` | progress bars, sliders |
  | `Panel_` | bordered/background panels |

- Name what code touches, not everything. Pure layout scaffolding can stay
  unnamed.

**Why it matters:** the generator is re-run on every mockup change and
overwrites the widget's layout. Logic lives in a hand-written parent class that
binds to these names. Rename an element and you break that binding -- so treat
names as an API, not a label.

## 3. Layout

Use **flexbox only**.

| CSS | Becomes |
|---|---|
| `display:flex; flex-direction:row` | HorizontalBox |
| `display:flex; flex-direction:column` | VerticalBox |
| `flex: N` on a child | slot Size = Fill, ratio N |
| no flex value | slot Size = Auto |
| `padding` on a container | slot Padding |
| `gap` | trailing padding on each child except the last |
| `width` / `height` in px | SizeBox override |
| `align-items` / `justify-content` | slot alignment |
| `position:absolute` (direct child of root only) | CanvasPanelSlot + anchors |
| `overflow-y:auto` | ScrollBox |

**Forbidden -- these have no UMG equivalent:**

- `display:grid` (use nested flex, or `data-umg-type="UniformGridPanel"`)
- `float`, `position:sticky`, `position:fixed`
- `z-index` -- use DOM order, or `data-umg-type="Overlay"` for stacking
- `%` widths inside a flex row -- use `flex: N` ratios instead
- `min-width` / `max-width`, `transform`, `calc()`

## 4. Element mapping

| HTML | UMG widget |
|---|---|
| `<div>` with flex | Horizontal/VerticalBox |
| `<div>` with `background-color` | Border |
| `<p>`, `<span>`, `<h1>`-`<h6>` | TextBlock |
| `<button>` | Button containing a TextBlock |
| `<img>` | Image |
| `<progress>` | ProgressBar |
| `<input type="range">` | Slider |
| `<input type="checkbox">` | CheckBox |
| `<input type="text">` | EditableTextBox |

Override the inference when you need a specific widget:

```html
<div data-umg-type="ScrollBox">...</div>
```

Useful values: `ScrollBox`, `Overlay`, `SizeBox`, `WrapBox`, `UniformGridPanel`,
`ScaleBox`, `BackgroundBlur`, `NamedSlot`.

## 5. Reusable components

Don't build one enormous widget. A repeated card, row, or list item goes in its
own file and is referenced:

```html
<div data-umg-widget="WBP_InventoryCard"></div>
```

That generates a child Widget Blueprint and places an instance. Same rule as
components anywhere -- if it appears twice, it's its own file.

## 6. Text

- `font-size` in px maps 1:1 to UMG font size.
- `font-weight` selects a **typeface within an imported font family**
  (`400` -> Regular, `700` -> Bold). The family must be a font you'll actually
  import -- it goes in the asset audit.
- `color`, `text-align`, `line-height` map directly.
- **Avoid:** `text-shadow` (needs a material), `letter-spacing` (limited),
  `text-transform` (bake the casing into the text instead).

## 7. Color and fill

Solid colors map directly -- `background-color` becomes a Border brush tint,
`color` becomes text color. Use hex or `rgba()`.

## 8. Effects that require an asset

These are legal to use. They **do not map to UMG directly**, so each one becomes
a line in the asset audit with a decision attached:

| CSS | Resolution |
|---|---|
| `border-radius` | 9-slice texture, or a material |
| `box-shadow` | 9-slice texture |
| `linear-gradient` | material (preferred) or texture |
| `backdrop-filter: blur()` | `BackgroundBlur` widget -- no asset needed |
| `opacity` | maps directly, no asset |

Prefer materials over textures for anything procedural (rounded corners,
gradients, glows): they scale to any size, cost no texture memory, and stay
tweakable without regenerating art.

Hint the preferred resolution when you have an opinion:

```html
<div data-umg-asset-hint="material" style="border-radius:16px">...</div>
```

## 9. Interaction states

Buttons have Normal / Hovered / Pressed / Disabled styling in UMG. Declare
non-default states explicitly rather than with CSS pseudo-classes:

```html
<button data-umg-name="Btn_Confirm"
        data-umg-hover="#3A6FD8"
        data-umg-pressed="#2A55A8">Confirm</button>
```

`:hover` / `:active` CSS rules are **ignored** by the converter.

Animations and transitions are out of scope for the mockup -- UMG animations are
authored on a timeline. Note the intent in an HTML comment and it'll be handled
separately.

## 10. Game UI constraints

Three constraints that game UI has and web UI does not. They are here rather
than in a later pass because each one shapes layout, and layout is what a
mockup locks in -- retrofitting them means redrawing the design, not adjusting
a property.

**Text expands.** Localized strings commonly run 30-40% longer than English.
Never put a fixed width on a container whose child is text. Let it size to
content, or fill, and allow wrapping wherever a line could grow. A layout that
only fits in English gets redesigned later, not tweaked.

**Respect the safe zone.** TV and console output can clip the outer edge of the
screen. Keep anything essential -- text, buttons, readouts -- within a 5% inset
from all edges. Backgrounds and decorative art may bleed to the edge.

**Controller navigation follows document order.** Interactive elements become
focusable in the order they appear in the HTML, so order them such that
directional movement feels natural, and keep related controls inside the same
flex container. Mark the element that should hold focus when the screen opens:

```html
<button data-umg-name="Btn_Confirm" data-umg-focus-default>Confirm</button>
```

If a screen is mouse-only by design, say so in a comment so nobody adds
navigation later by guesswork.

## 11. Worked example

```html
<div data-umg-name="Panel_Root"
     style="display:flex; flex-direction:column; padding:48px; gap:24px;
            background-color:#14181F">

  <p data-umg-name="Txt_Title"
     style="font-family:Inter; font-size:42px; font-weight:700; color:#FFFFFF">
    Inventory
  </p>

  <div data-umg-type="ScrollBox" style="flex:1">
    <div data-umg-widget="WBP_InventoryCard"></div>
    <div data-umg-widget="WBP_InventoryCard"></div>
  </div>

  <div style="display:flex; flex-direction:row; gap:12px;
              justify-content:flex-end">
    <button data-umg-name="Btn_Cancel"
            style="padding:12px 24px; background-color:#2A2F3A; color:#FFFFFF">
      Cancel
    </button>
    <button data-umg-name="Btn_Confirm"
            data-umg-hover="#3A6FD8"
            style="padding:12px 24px; background-color:#2E5BBF; color:#FFFFFF;
                   border-radius:6px">
      Confirm
    </button>
  </div>
</div>
```

Note what this produces: `Btn_Confirm`'s `border-radius` lands in the asset
audit as a rounded-rect -- resolved as a material, since it's procedural.

## 12. Checklist before sending a mockup

- [ ] Design size is 1920 x 1080, no media queries
- [ ] Flexbox only -- no grid, float, or z-index
- [ ] Everything code touches has a unique `data-umg-name`
- [ ] Repeated elements extracted to `data-umg-widget` components
- [ ] Fonts named are fonts you're willing to license and import
- [ ] No fixed widths on text containers -- localized text runs longer
- [ ] Essential content sits inside a 5% safe-zone inset
- [ ] Interactive elements are in a sensible focus order, with one marked
      `data-umg-focus-default`
- [ ] Rounded corners / shadows / gradients are intentional -- each one is an
      asset decision, not a free CSS effect
