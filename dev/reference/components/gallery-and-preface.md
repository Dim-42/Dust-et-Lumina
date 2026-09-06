---
layout: reference
title: Gallery and story preface
subtitle: Collection-bound layout behavior
permalink: /dev/reference/components/gallery-and-preface/
dev_only: true
reference_type: component
---

# Gallery and preface boundaries

`_layouts/gallery.html` and `_layouts/preface.html` are full page layouts, not portable includes. They depend on `site.gallery` or `site.stories`, page paths, and page metadata. The dedicated [gallery fixture]({{ '/dev/reference/pages/archive-gallery/' | relative_url }}) and [story fixture]({{ '/dev/reference/pages/story/' | relative_url }}) use these real layouts.

## Current gallery elements

<div class="image-bracket-frame" style="max-width: 36rem; cursor: zoom-in;">
  <img src="{{ '/assets/images/titles/embers-ablaze.png' | relative_url }}" alt="Reference gallery frame" onclick="openModal(this)">
</div>

The frame and modal invocation are the real authored-content and global-shell contracts. The surrounding gallery index cannot be isolated without using the full gallery layout.
