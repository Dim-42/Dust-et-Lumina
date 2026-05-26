# Phase 1 Style Ownership Audit

This note records the current styling ownership before any cleanup or class
renaming. Generated output directories are intentionally excluded:
`_site/`, `_site_tmp/`, and `_site_build_20260422_223432/`.

## Sass Import Ownership

The only stylesheet entry point is `assets/css/style.scss`, which imports all
Sass partials from `_sass/`.

### Tokens And Abstracts

Owned by `_sass/01-abstracts/`.

- `_fonts.scss`: font-face declarations and root font variables.
- `_colors.scss`: Sass color constants, CSS custom properties, and
  `--content-width`.
- `_font-sizes.scss`: root text sizing variables.
- `_cursor.scss`: global cursor variables and broad cursor rules.
- `_mixins.scss`: reusable visual behaviors such as `NO-IMAGE`,
  `HIDE-SCROLLBAR`, `HEADERS`, `SIDE-HANDLE`, `INTERACTIVE-CARD`, and
  `SYSTEM-MESSAGE`.

### Base Markdown And Element Styles

Owned by `_sass/02-base/`.

- `_animations.scss`: shared keyframes.
- `typography/_html-hyperlink.scss`: global anchor styling and `.entry-title`.
- `typography/_html-paragraph.scss`: global `p`, `u`, blockquote, inline code,
  `.main-header`, `.motto`, `.system-msg`, `.system-msg-warning`,
  `.system-msg-note`, and `.note`.
- `typography/_list.scss`: global `ul`, `ol`, and `li::before` markers.
- `typography/_md-divider.scss`: global `hr`.
- `typography/_footnote.scss`: footnote styling and highlight animation.
- `typography/_redacted-text.scss`: `.redacted` reveal behavior.
- `_detail.scss`: global `details` and `details.callout-file`.
- `_markdown-toc.scss`: `#markdown-toc`.
- `_table.scss`: global table elements.
- `_split-passage.scss`: `.split-passage` layout used inside article content.

### Layout Shell

Owned by `_sass/03-layout/`.

- `_body.scss`: global box sizing, `html/body`, `#obsidian-content`, and
  `.main-container`.
- `_navigation.scss`: top navigation and mobile nav toggle.
- `_header.scss`: markdown headings `h1` through `h4`, `.page-header`, and
  `.page-meta`.
- `_footer.scss`: footer navigation, footer metadata grid, and
  `.footer-credit`.

### Components And Page Modules

Owned by `_sass/04-components/`.

- `_loading-screen.scss`: boot/login/scanner loader.
- `_concept-card.scss`, `_character-card.scss`, `_organ-card.scss`: home page
  card families.
- `_image-bracket-frame.scss`: framed image presentation.
- `_canvas-bg.scss`: global animated network canvas.
- `_web-scrollbar.scss`: global hidden scrollbar behavior on `html`.
- `_sidebar.scss`: wiki infobox/sidebar used by character, organization, and
  region layouts.
- `_sidebar-toc.scss`: left fixed directory sidebar, despite the filename.
- `_side-markdown-toc.scss`: right fixed generated page TOC.
- `_galaxy-map.scss`: 3D galaxy map container.
- `_timeline.scss`: history timeline cards and filter drawer.
- `_encyclopedia.scss`: archive/list rows, commit-style rows, and chapter list
  patterns.
- `_preface.scss`: story preface layout, story metadata, image modal, and
  chapter list styling.
- `_image-hub.scss`: gallery viewport/sidebar interface.
- `_button.scss`: classified warning and classified access button.
- `_announcement.scss`: announcement modal content.
- `_dialogue.scss`: communication log/message transcript component.
- `_scripted-annotations.scss`: annotation callout component.

## Reused Class And Component Families

- Shell: `.nav-interface`, `.nav-link`, `.page-header`, `.page-meta`,
  `.footer-*`, `#obsidian-content`, `.main-container`.
- Infobox/sidebar pages: `.wiki-sidebar`, `.infobox-header`,
  `.infobox-image`, `.infobox-table`, `.infobox-section`, `.label`, `.value`.
- Side panels: `.sidebar-directory`, `.sidebar-toc`, `.sidebar-header`,
  `.sidebar-footer`, `.sidebar-content`, `.toc-container`, `.toc-link`.
- Modal layer: `.system-modal`, `.modal-content`, `.close-modal`,
  `.system-announcement`, `.announcement-*`.
- Cards and hubs: `.concept-*`, `.char-*`, `.org-*`, `.hub-interface`,
  `.hub-viewport`, `.hub-sidebar`, `.hub-toc`.
- Timeline: `.timeline-*`, `.filter-*`, `.main-card-link`,
  `.timeline-link-tag`, `.tag-bracket`.
- Markdown widgets: `details.callout-file`, `.annotation-container`,
  `.annotation`, `.signature`, `.comm-log`, `.msg-*`, `.split-passage`,
  `.image-bracket-frame`, `.redacted`.
- Article text: broad `p`, `a`, `ul`, `ol`, `li`, `table`, `details`,
  `blockquote`, `h1` through `h4`, `hr`, `code`.

## Overlap Risks

- Broad element rules for `p`, `a`, `ul`, `table`, `details`, and `h1-h4`
  affect markdown content and component internals unless each component opts
  out.
- `details` is globally styled in `_detail.scss`, but gallery categories also
  use `<details class="toc-category">`, so article/callout rules can leak into
  gallery navigation.
- `.sidebar-header` and `.sidebar-footer` are generic and are reused by the
  left directory sidebar, right TOC, and gallery sidebar.
- `.label` and `.value` appear in page metadata, footer metadata, infobox
  tables, and story stats; they are currently only safe where scoped by parent
  selectors.
- `.entry-title` is a global link decoration used outside a single component,
  including hub lists and gallery source links.
- `.system-modal` lives in `_preface.scss` but is used by the default layout,
  preface layout, home page image modal markup, and announcement modal.
- Several mobile fixes use `!important`, especially timeline, modal, body,
  footnotes, and concept card behavior. These are specificity pressure points.
- Inline styles exist in layouts, includes, and content, which can override the
  Sass layer and hide duplication.
- `_sidebar.scss`, `_sidebar-toc.scss`, and `_side-markdown-toc.scss` have
  confusing names relative to what they own.

## Inline Style Hotspots

- `_layouts/default.html`: loader text positions/sizes, classified warning
  layout, JS-driven display/visibility changes, generated TOC indentation,
  modal display, and canvas sizing.
- `_layouts/gallery.html`: image frame margins, gallery image max height, and
  story stats padding.
- `_layouts/preface.html`: cover cursor styling and dynamic color behavior.
- `_includes/linked-pages.html`: container padding/border and tag background.
- `_includes/galaxy-map.html`: absolute positioning for `#sector-info`.
- `index.md`: home page hero typography, image cursor, section links, carousel
  motto block, scroll hint, and CTA alignment.
- `histories.md`: hidden timeline item display and JS-driven timeline
  realignment.
- `_lore/**`: content-level summary and split-passage overrides. These should
  stay content-owned until replacement components exist.

## Safe First Refactor Candidates

1. Move inline styles from `_includes/linked-pages.html` into a small linked
   pages/tag partial, because it is isolated and reused.
2. Rename or reorganize sidebar Sass files without changing selectors:
   `_sidebar.scss` should become wiki infobox/sidebar ownership,
   `_sidebar-toc.scss` should become left directory ownership, and
   `_side-markdown-toc.scss` should become right page TOC ownership.
3. Move `.system-modal`, `.modal-content`, `.close-modal`, and `zoomIn` from
   `_preface.scss` into a dedicated modal partial, keeping existing selectors.
4. Scope gallery `<details>` rules so gallery navigation does not depend on or
   fight global article `details` behavior.
5. Convert easy layout inline styles in `_layouts/gallery.html` into classes
   after the modal and gallery ownership is clear.

## Files To Defer

- Generated output: `_site/`, `_site_tmp/`,
  `_site_build_20260422_223432/`.
- `_layouts/default.html`: too much shell markup and behavior to refactor until
  style ownership is stable.
- `_sass/04-components/_timeline.scss` and `histories.md`: CSS and JS currently
  cooperate through inline style mutation.
- `assets/js/galaxy-map.js`: behavior-heavy and outside Phase 1 CSS ownership.
- `_lore/**`: do not bulk-normalize content inline styles until stable
  components are available.
- Broad base files such as `_sass/02-base/_detail.scss`,
  `_sass/02-base/_table.scss`, and typography partials should be changed only
  after component-specific ownership is documented and baseline screenshots are
  available.

## Verification

Phase 1 should verify the audit with source-only searches for imported Sass
partials, reused selectors, unsafe globals, and inline style hotspots. No build
is required because this phase changes documentation only.
