# Interactive article outline

## Short lines and previews

On wide screens, short lines appear to the left of the article, with lengths reflecting heading depth. Moving over a line shifts and darkens it and shows a section preview. Moving away restores emphasis to the current reading section.

Click a line to jump to its section, or hold the left mouse button and move vertically for continuous navigation.

## Full outline

Pause on the same line to expand the full outline, or click the expand button. The panel is centered vertically on the left, with hovered entries and lines highlighted together.

A rounded dashed frame marks sections visible on screen. A section remains included while any of its body is visible, even after its heading scrolls away. Hold the left mouse button and move along entries to navigate quickly.

Click outside, use the close button, select a section or press Escape to close. After the pointer leaves, `hideDelay` controls automatic closing; focus inside the outline keeps it open.

## Configuration

Set `article.toc`:

```ts
toc: {
  enabled: true,
  minDepth: 2,
  maxDepth: 4,
  expandDelay: 1000,
  hideDelay: 800,
}
```

`minDepth` and `maxDepth` select a range within H1–H6, defaulting to H2–H4. `expandDelay` is the delay after the pointer stops; `hideDelay` is the delay after it leaves. Both use milliseconds.

An entry’s `toc: true` or `toc: false` overrides the global switch. Outline links use the body’s heading anchors.

## Narrow screens

On narrow screens, an outline button appears to the left of RSS. Click it to expand the panel from the top right, with the same visible-section frame and drag navigation.

The narrow-screen panel stays open until you click outside, the close button, the outline button or a section, or press Escape. The outline omits transitions when reduced motion is enabled.
