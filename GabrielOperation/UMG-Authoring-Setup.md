# UMG Authoring Setup

How to make Unreal's UMG widget trees editable from script, and how to set that
up in a new project or on a new machine.

**Read this when:** starting a new Unreal project that needs generated UI,
moving to a new machine, upgrading engine version, or extending what the
generator can do to widgets.

---

## 1. The short version

Out of the box, **script cannot author UMG widget trees.** Not through Python,
not through the MCP toolsets. The `UMGAuthoring` plugin fixes it with five
functions.

To set up a new project:

1. Copy `Plugins/UMGAuthoring/` into the new project's `Plugins/` folder
2. Add it to the `.uproject` plugin list (or rely on project-plugin auto-enable)
3. Launch the editor -- it compiles the plugin on startup
4. Run `Plugins/UMGAuthoring/Scripts/verify_umg_authoring.py` from the Python
   console; expect `PASS`

That's the whole thing. **No engine rebuild is involved** -- this compiles a
project plugin, roughly a minute, not the hours an engine source build takes.

## 2. Why it's needed

Worth understanding rather than taking on faith, because it determines whether
the plugin is still needed after an engine upgrade.

The blocker is a property-access problem, not a missing feature:

| Thing script needs | Why it's refused |
|---|---|
| `UWidgetBlueprint.WidgetTree` | Declared on `UBaseWidgetBlueprint` as a bare `UPROPERTY()` inside `WITH_EDITORONLY_DATA` -- no `EditAnywhere`, no `BlueprintReadWrite`, so Python's `get_editor_property` won't find it |
| `UWidgetTree.RootWidget` | Bare `UPROPERTY(Instanced)` -- same problem |
| `UWidgetTree::ConstructWidget` | A C++ template, and `UWidgetTree` declares no `UFUNCTION`s at all |

Three access paths were tried and all refuse:

- `get_editor_property("widget_tree")` -> *"Failed to find property"*
- direct attribute access -> `AttributeError`
- `unreal.ToolsetLibrary.get_object_properties` (the C++ reflection path the
  MCP ObjectTools use) -> *"the following properties could not be read:
  WidgetTree"*. It **can enumerate** the property with
  `list_struct_properties(cls, False)` but won't marshal a `UObject*`
  subobject reference out to JSON.

The MCP EditorToolset has **no UMG coverage at all** -- no `WidgetBlueprint`,
`WidgetTree`, `UserWidget` or panel classes anywhere in its toolsets. And its
`ProgrammaticToolset` sandbox allows only `json, math, datetime, copy, re,
time`, so `import unreal` is unavailable there. MCP is excellent for assets,
textures, materials and scene work -- it is not a path to UMG authoring.

## 3. What already works without the plugin

Do not rebuild these -- they were verified working:

- creating the `WidgetBlueprint` asset (`WidgetBlueprintFactory` + `create_asset`)
- constructing widgets (`unreal.new_object` for any `UWidget` subclass)
- parenting (`UPanelWidget::AddChild` is `BlueprintCallable`, returns a real slot)
- slot layout (`set_anchors`, `set_offsets` on `CanvasPanelSlot`)
- content properties (`set_editor_property` for text, font, padding)
- `compile_blueprint`, `save_loaded_asset`

The plugin only closes the gap around reaching and rooting the tree.

## 4. What the plugin provides

`unreal.UMGAuthoringLibrary` -- all `BlueprintCallable`, so Python and Blueprint
both see them:

| Function | Purpose |
|---|---|
| `get_widget_tree(bp)` | The unlock -- returns the tree pointer script can't reach |
| `construct_widget(tree, cls, name)` | Creates a widget with `RF_Transactional`, resolving name collisions |
| `get_root_widget(tree)` | Reads `RootWidget` |
| `set_root_widget(tree, widget)` | Sets `RootWidget` |
| `mark_widget_blueprint_modified(bp)` | Refreshes an open designer, flags for save |

Two behaviours worth knowing:

- **Always create the root yourself.** A Widget Blueprint created from script
  has an *empty* tree with no root, unlike the editor's New Widget flow.
  `set_root_widget` is required, not optional.
- **Prefer `construct_widget` over `unreal.new_object`.** It applies
  `RF_Transactional`, which `new_object` omits -- without it, generated widgets
  don't participate in undo and don't behave like hand-made ones.

## 5. Setting up a new project

```
1. Copy Plugins/UMGAuthoring/ into <NewProject>/Plugins/
2. In <NewProject>.uproject, add to "Plugins":
       { "Name": "UMGAuthoring", "Enabled": true }
3. Launch the editor.
   It reports "Incompatible or missing module" and offers to rebuild -- accept.
   Compiles in about a minute; no engine rebuild.
4. In Output Log, set the console dropdown to Cmd and run:
       py "<NewProject>/Plugins/UMGAuthoring/Scripts/verify_umg_authoring.py"
5. Expect the printed hierarchy to end with:
       PASS: UMG authoring from script works in this project.
```

If the editor won't offer the rebuild, build from the command line:

```
"<Engine>/Engine/Build/BatchFiles/Build.bat" <Project>Editor Win64 Development -Project="<abs path>/<Project>.uproject" -WaitMutex
```

**Check the plugin before assuming it's needed.** Run step 4 first on a new
engine version -- if Epic exposes `WidgetTree` to script in a future release,
the plugin becomes dead weight and should be dropped rather than carried
forward.

## 6. Also needed for the wider pipeline

Not part of this plugin, but required alongside it:

- **Python** -- already enabled in UE 5.8 via the `Engine.Python.IsEnabledByDefault`
  CVar; `PythonScriptPlugin` mounts automatically. Nothing to install.
- **MCP server** (for asset/texture/material work) -- enable the
  `ModelContextProtocol` plugin, then in the console:
  `ModelContextProtocol.StartServer`, followed by
  `ModelContextProtocol.GenerateClientConfig ClaudeCode` to write `.mcp.json`.
  Set `Auto Start Server` in Project Settings so it survives restarts.

## 7. Scripting pitfalls

Things that fail silently or produce visibly wrong output rather than raising.

**Never construct a bare `SlateFontInfo`.** This looks reasonable and is wrong:

```python
widget.set_editor_property("font", unreal.SlateFontInfo(size=42, typeface_font_name="Bold"))
```

It leaves `FontObject` null, and every character renders as a missing-glyph box
showing its Unicode block (`BASIC LATIN`, `0000-007F`). Read, modify, write
instead -- this keeps whatever font asset is already assigned:

```python
font = widget.get_editor_property("font")
font.set_editor_property("size", 42)
font.set_editor_property("typeface_font_name", "Bold")
widget.set_editor_property("font", font)
```

The same read-modify-write rule applies to any struct property holding an
object reference -- brushes especially. Constructing a fresh `SlateBrush` drops
the texture reference the same way.

To use a non-default font, load the asset explicitly and assign it to
`font_object` before setting size or typeface.

**`typeface_font_name` must exist in that font family.** An invalid name falls
back silently rather than erroring, so a mockup asking for a weight the
imported font doesn't have will look subtly wrong instead of failing loudly.

## 8. Extending the plugin

Add a function when script genuinely cannot reach something -- not as a
convenience wrapper. The test is whether the underlying member is a bare
`UPROPERTY()`, is private, or is only reachable through a C++ template.

Anything already `BlueprintCallable` or flagged `EditAnywhere` should be called
directly from Python instead. Every function added here is one more thing to
maintain across engine upgrades.

After changing the plugin, re-run the verification script.

## 9. Caveats

- **Engine-version coupled.** The plugin depends on `UnrealEd` and `UMGEditor`
  internals. Expect to recompile, possibly to adjust, on a major engine bump.
- **Makes a project C++.** A Blueprint-only project gains a compile step by
  adding this plugin. Fine for C++ projects; a real change for BP-only ones.
- **Editor-only.** `"EditorOnly": true` and module type `Editor` -- it never
  ships in a packaged game.
