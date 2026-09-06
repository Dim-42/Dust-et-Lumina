---
layout: reference
title: Navigation component fixture
subtitle: Global shell navigation, directory, footer, and generated TOC
permalink: /dev/reference/components/navigation/
dev_only: true
reference_type: component
---

# Shell-owned navigation

The top navigation, directory sidebar, footer navigation, and table-of-contents sidebar are emitted by `default.html` for every reference page. They cannot be independently included without duplicating their globally unique IDs and global `site.js` dependencies.

## TOC target one

This heading is intentionally present for the generated `#auto-toc` output.

### TOC target two with a longer title that wraps at narrower widths

The shell script discovers headings from the document structure.

## Directory / footer verification

Use the live shell controls around this page. The directory and footer draw from global site data and page context; this page verifies their coexistence with dense reference content.
