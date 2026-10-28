---
name: Engineer's Notebook
description: A thumb-tabbed trade reference where every formula sits beside its live demo and a worked example on the reader's own values.
colors:
  ground: "#e8ebea"
  sheet: "#f6f7f6"
  ink: "#16181a"
  ink-2: "#4c5351"
  rule: "#16181a"
  hair: "#c3c9c7"
  tab: "#d2d8d6"
  tab-hover: "#c3cbc8"
  oxblood: "#b3261e"
  oxblood-tint: "#ecd8d4"
  on-oxblood: "#f6f7f6"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.75rem, 6vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  discipline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  lede:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.6
  section-label:
    fontFamily: "Archivo Narrow, Arial Narrow, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
  label:
    fontFamily: "Archivo Narrow, Arial Narrow, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.12em"
  legend:
    fontFamily: "Archivo Narrow, Arial Narrow, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
  caption:
    fontFamily: "Archivo Narrow, Arial Narrow, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.02em"
  status:
    fontFamily: "Archivo Narrow, Arial Narrow, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.1em"
  formula:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "clamp(1.75rem, 3.2vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1
  answer:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "1.625rem"
    fontWeight: 500
    lineHeight: 1.2
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "tnum"
rounded:
  none: "0px"
  tab: "10px"
  tab-mobile: "8px"
spacing:
  gutter: "clamp(16px, 5vw, 80px)"
  tabs-w: "72px"
  measure: "40rem"
  index-measure: "52rem"
  section: "3.5rem"
  column-gap: "clamp(32px, 5vw, 72px)"
  demo-pad: "18px 20px 20px"
  row: "11px 10px"
  step: "14px 0"
components:
  edge-tab:
    backgroundColor: "{colors.tab}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.tab}"
    width: "52px"
    height: "92px"
    padding: "12px 0"
  edge-tab-soon:
    backgroundColor: "{colors.tab}"
    textColor: "{colors.ink-2}"
  edge-tab-hover:
    backgroundColor: "{colors.tab-hover}"
    textColor: "{colors.ink}"
    width: "58px"
  edge-tab-current:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.on-oxblood}"
    width: "{spacing.tabs-w}"
  demo-box:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.none}"
    padding: "{spacing.demo-pad}"
  input-number:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: "7px 8px"
  input-number-invalid:
    backgroundColor: "{colors.oxblood-tint}"
  answer-box:
    textColor: "{colors.oxblood}"
    typography: "{typography.answer}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  discipline-status-live:
    textColor: "{colors.oxblood}"
    typography: "{typography.status}"
  discipline-status-soon:
    textColor: "{colors.ink-2}"
    typography: "{typography.status}"
  table-row-current:
    backgroundColor: "{colors.oxblood-tint}"
  table-cell:
    typography: "{typography.data}"
    padding: "{spacing.row}"
---

# Design System: Engineer's Notebook

## Overview

**Creative North Star: "The Tabbed Handbook"**

The site is a printed trade handbook made live: cool grey-white paper with a fine grain and a faint fibre layer that drifts very slowly, near-black ink, a double-ruled running head, and real thumb-tabs cut into the right edge of the page, one per discipline. Every topic page opens with its formula and the boxed demo side by side, then works a Given / Find / Solution / Answer example on the reader's own demo values, so changing an input recomputes the working in place. Density is that of a good reference book: generous measure for prose, tight ruled rows for data.

Three faces divide the work. A bold optical-size serif carries titles and reading text; a narrow grotesque in spaced capitals carries tabs, the running head, section labels and status words; a monospace carries every value, unit and formula. One oxblood is the only chromatic colour, and it marks where you are and what is live.

Depth comes from rules, not shadows. Hierarchy is drawn with line weight: a 4px double rule for the running head and pager, 2px for discipline blocks, the key result and the answer box, 1px ink for section heads, the equation block and the demo frame, hairlines between rows.

**Key Characteristics:**
- Cool grey-white paper (grain plus a slowly drifting fibre layer) with a lighter sheet for the demo box; never cream or beige.
- Right-edge discipline tabs as primary navigation, unpublished disciplines greyed; a horizontal tab bar on phones.
- Formula and demo side by side, then a worked example fed by the demo.
- Ruled tables and lists with tabular mono figures and serif-italic variables.
- Single oxblood accent for location, liveness and the key result.

## Colors

A near-monochrome cool grey system with one saturated oxblood.

### Primary
- **Oxblood** (`oxblood`): the current discipline tab, breadcrumb and in-page section links, the live load arrow and its label in the demo, the loads in load-case sketches, the key result value, the worked-example answer box, the "1 demo" / "Demo" status, list markers, focus ring, selection, slider accent and error text. It means "you are here" or "this is live".
- **Oxblood Tint** (`oxblood-tint`): the current-row highlight in topic tables, the fill of an invalid input, and the brief flash behind a worked-example value the demo has just changed.

### Neutral
- **Grey-White Ground** (`ground`): page background, under a grain and a fibre layer that together render it at about #dde0df on screen. Also the fill of input fields so they read as cut into the sheet.
- **Sheet** (`sheet`): the demo box; one step lighter than the ground.
- **Ink** (`ink`, `rule`): text, beam strokes and supports in drawings, and every structural rule.
- **Second Ink** (`ink-2`): ledes of discipline blocks, captions, units, legends, substituted working lines, unpublished topics and disciplines, input borders, dimension lines and the unloaded datum in drawings.
- **Hairline** (`hair`): row dividers, figcaption separator, link underlines inside tables.
- **Tab Grey** (`tab`, `tab-hover`): resting and hover fill of edge tabs.
- **On Oxblood** (`on-oxblood`): text on the current tab and on selection.

### Named Rules
**The Where-and-Live Rule.** Oxblood appears only where it marks location (current tab, breadcrumb, section links, current row), liveness (load arrows, "Demo" status, key result, answer, value flash) or attention (focus, error). It is never a decorative fill or a heading colour.

**The Cool Stock Rule.** Grounds stay cool grey-white. No cream, beige or warm paper; texture comes from grey grain and fibre, not tint.

## Typography

**Display Font:** Source Serif 4 (with Georgia), optical sizing on
**Label Font:** Archivo Narrow (with Arial Narrow)
**Mono Font:** JetBrains Mono (with ui-monospace)

**Character:** A sturdy bookish serif for reading, a condensed grotesque in tracked capitals for the handbook apparatus, and a mono for anything you might copy into a calculation.

### Hierarchy
- **Display** (700, clamp 2.75rem to 4.75rem, 0.98): the homepage site title only.
- **Headline** (700, clamp 2.5rem to 3.5rem, 1.04, balanced wrap): page titles.
- **Discipline** (700, 1.5rem, 1.2): discipline names on the homepage shelf; second ink when the discipline is unpublished.
- **Title** (600, 1.25rem, 1.3; 1.0625rem in load-case rows): sub-heads.
- **Body** (400, 1.125rem, 1.6; 1.0625rem under 760px): reading text, held to a 40rem measure. Lede is 1.1875rem; table row headers and discipline ledes are 1rem.
- **Section Label** (Archivo Narrow 700, 0.875rem, 0.14em, uppercase): h2 section heads under a 1px ink rule; the worked-example step labels (Given, Find, Solution, Answer) use the same tracking at 0.8125rem.
- **Label** (Archivo Narrow 700, 0.8125rem, 0.12em, uppercase): running head, tabs, the in-page section list, table header cells.
- **Legend** (Archivo Narrow 500, 0.875rem, second ink): one-line notes under a section head or under a shelf ("Topics in grey are in preparation.").
- **Caption** (Archivo Narrow 500, 0.8125rem): figure captions, footer. The figure number is set in tracked uppercase ink.
- **Status** (Archivo Narrow 500, 0.75rem, 0.1em, uppercase): "1 demo" / "In preparation" on discipline blocks, "Demo" after a live topic.
- **Formula** (JetBrains Mono 500, clamp 1.75rem to 2.25rem): the display equation block. Fractions are stacked with a 2px rule (1px in tables and load cases).
- **Answer** (JetBrains Mono 500, 1.625rem): the worked-example answer.
- **Data** (JetBrains Mono 400 to 500, 0.9375rem, tabular numerals): tables, Given values, working lines, inline formulas; inputs 0.875rem, units 0.75rem, shelf formulas 0.8125rem.

### Named Rules
**The Variable Is Serif Italic Rule.** Inside mono formulas, tables and working, every algebraic variable and Greek symbol is set in the serif italic (500, about 1.12em); subscripts are upright serif at 0.6em. Numbers and operators stay mono.

**The Apparatus Is Narrow Rule.** Navigation, labels, captions, legends and status words use the narrow grotesque; reading text never does.

## Layout

Pages sit inside a left gutter (`gutter`) and a right margin of gutter plus the tab column (`tabs-w`), so the edge tabs never overlap content. The running head spans that frame: site name left, breadcrumb centred, section reference right in mono. Section heads open with 3.5rem above.

**Topic page order:** title, lede, equation block, symbols list (two pairs per row, including θ and w), worked example (Given / Find / Solution / Answer), other load cases, then Assumptions and Derivation folded. The grid is a text column of up to 40rem and a demo column of at least 340px, gap `column-gap`. The demo column spans the first two blocks (the opening block and the worked example) and is sticky at top 24px when the viewport is at least 961px wide and 720px tall. Under 960px the grid is one column and the demo follows the opening block (formula and symbols), before the worked example.

**Homepage:** title left and lede right on one line, then a shelf of six discipline blocks (three columns; two under 1180px; one under 760px) with one legend line under the shelf, then a single "Example · …" section pairing a formula with a sketch in a demo box (two columns, sketch column 280px to 26rem).

**Discipline index:** title, lede, legend, an in-page section list, then numbered sections each with a fixed 52rem topic table (4rem number, 26rem topic, 22rem inline formula).

Under 760px the tab column goes to zero width and the tabs become a sticky horizontal bar under the running head; topic tables reflow into grid rows, the symbols list drops to one pair per row, and worked-example labels stack above their content.

## Elevation & Depth

The system is flat. There are no shadows anywhere, including the demo box; depth comes from rules, one tonal step (ground to sheet) and the paper texture. Rule weight encodes rank: 4px double (running head, pager), 2px (discipline block top, key result, answer box, phone tab bar base), 1px ink (section head, equation block, demo frame, footer), hairline (rows, steps, load cases).

The paper is two layers, both attached to the page so they scroll with the content like a sheet: a fine grain on the body and a long-fibre layer on an absolutely positioned pseudo-element covering the whole body. The fibres drift 40px by 24px over 90s and back by shifting background-position in one-second steps, so the layer never overflows the page and repaints about once a second. The drift stops under reduced motion.

### Named Rules
**The Ruled Not Raised Rule.** Separate and rank with rules and the sheet tone, never with shadows or blur.

## Shapes

Square by default: the demo box, inputs, selects, tables and the answer box have no radius. The one rounded form is the thumb-tab, rounded only on its free edge (10px on the left corners on desktop; 8px on the top corners in the phone bar), like a die-cut tab. Live worked-example values carry a 2px rounding that only shows during their flash.

## Components

### Discipline Tabs (signature)
Die-cut thumb-tabs fixed to the right edge from 88px down, 6px apart, text vertical and reading bottom-to-top. One tab per discipline plus Contents.
- **Rest:** tab grey fill, ink label, 52px wide, at least 92px tall.
- **Unpublished:** same fill, label in second ink; still links to the discipline's shelf block.
- **Hover:** tab-hover fill, ink label, extends to 58px (width 0.25s, cubic-bezier(0.16, 1, 0.3, 1)).
- **Current:** oxblood fill, on-oxblood text, full 72px. Current is marked by extension as well as colour.
- **Focus:** ink outline inset 4px.
- **Phone:** horizontal sticky bar on the paper ground with a 2px ink base rule, tabs rounded on top, overflow fading out on the right.

### Running Head
Label capitals over a 4px double ink rule. Breadcrumb links are oxblood without underline; separators in second ink; the section reference in mono. Breadcrumbs live here, not above the page title.

### Equation Block
Display formula centred between 1px ink rules, 1.25rem vertical padding, no label under it. Left-aligned in the homepage example.

### Symbols List
Ruled definition list: serif-italic symbol, serif name, mono unit right-aligned in second ink; two pairs per row on desktop, hairline under each.

### Worked Example (signature)
Rows on a 7rem label column with 14px padding and hairlines between: Given (symbol, description in second ink, mono value), Find (one serif sentence), Solution (mono working; substituted lines in second ink), Answer (the answer box, then a second-ink note). Every value the demo drives is live: when an input changes, those values flash an oxblood-tint background that fades over 0.9s.
- **Answer box:** 2px oxblood border, oxblood answer type, 8px 16px, square.

### Load Cases
A ruled list in place of a cases table: each row is a 7rem SVG sketch (5rem on phones) beside a serif title and its δ, M and θ formulas in mono with stacked 1px fractions. Sketches draw the beam and supports in ink and the load in oxblood. One legend line under the section head defines M and θ.

### Discipline Shelf (homepage)
Each block opens on a 2px ink rule: discipline name and a status label (oxblood "1 demo" when published, second-ink "In preparation" otherwise), a one-line second-ink description, then hairline rows of topic name and mono formula. Published topics are ink with a 600 link; unpublished ones are second ink. One legend line under the shelf explains the grey.

### Topic Tables (discipline index)
Headless ruled tables at 52rem: mono section number, serif topic, inline mono formula. Unpublished rows in second ink with no per-row label; the current topic row in oxblood tint at 600 with an oxblood "Demo" status. An in-page section list in oxblood label capitals sits above the sections.

### Collapsible Sections
Assumptions and Derivation fold into `details` whose summary is the section head, with a 2px CSS chevron at the right that turns on open (0.25s); hover turns the head oxblood. The formula, symbols, demo, worked example and load cases always stay open.

### Demo Box
- **Frame:** sheet panel, 1px ink border, 18px 20px 20px padding (14px on phones; 14px 16px in the homepage example), square, no shadow.
- **Drawing:** SVG in the palette: ink 4px beam, second-ink dashed datum and dimension line, oxblood load arrow and mono value label, a note of the drawing scale.
- **Caption:** hairline above, "Fig. n.n-n" in tracked ink capitals then caption text.
- **Controls:** rows of label / range / number on a 7.5rem, 1fr, 6rem grid (6rem, 1fr, 5.5rem on phones), 5px padding, hairlines between; serif-italic variable before the label, unit in small mono.
- **Results:** mono rows, values right-aligned at 500; the key result row sits on a 2px ink rule with its value in oxblood. A serif readout sentence gives the text equivalent.

### Inputs
- **Style:** ground fill, 1px second-ink border, square, mono 0.875rem with tabular figures, 7px 8px padding. Range sliders use the oxblood accent.
- **Focus:** 2px oxblood outline, 3px offset (global).
- **Invalid:** oxblood border, oxblood-tint fill, oxblood error text below spanning the row.

### Links
Inherit text colour with a 1px underline offset 0.18em; oxblood on hover. Inside tables, the underline becomes a hairline bottom border that turns oxblood on hover.

## Do's and Don'ts

### Do:
- **Do** open every topic page with title, one-sentence lede, the ruled equation block and the symbols list, with the demo box beside them and the worked example.
- **Do** feed the worked example from the demo and flash each value it changes in oxblood tint.
- **Do** show other load cases as sketch-plus-formula rows, separate from the main formula.
- **Do** set values and formulas in mono with tabular figures and variables in serif italic.
- **Do** rank structure with rule weight: 4px double, 2px, 1px ink, hairline.
- **Do** mark the current tab by extension to the full tab width as well as the oxblood fill; grey the label of unpublished disciplines.
- **Do** mark unpublished topics in second ink with one legend line, not a label per row.
- **Do** give every demo a text readout and keep the formula and worked example usable without JavaScript.
- **Do** stop the fibre drift and the value flash under reduced motion.

### Don't:
- **Don't** use cream, beige or warm paper grounds.
- **Don't** place a label or eyebrow above the page title; section and breadcrumb belong in the running head.
- **Don't** use oxblood for headings, decorative fills or more than one meaning per element.
- **Don't** add shadows or blur for depth, the demo box included.
- **Don't** round the demo box, inputs, tables or the answer box; only tabs have radius.
- **Don't** put the main formula and the other load cases in one highlighted table.
- **Don't** use gears, cogs or blueprint clip-art as imagery.
