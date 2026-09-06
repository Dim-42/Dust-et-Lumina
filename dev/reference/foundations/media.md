---
layout: reference
title: Media specimen
subtitle: Existing image framing and modal hook
permalink: /dev/reference/foundations/media/
dev_only: true
reference_type: foundation
---

# Media

The framed image below uses the existing authored-content class and the site-wide `openModal` hook. It reuses a real project asset only for visual dimensions; it does not describe canonical lore.

<div class="image-bracket-frame" style="max-width: 42rem; cursor: zoom-in;">
  <img src="{{ '/assets/images/titles/ad-astra.png' | relative_url }}" alt="Reference landscape media fixture" onclick="openModal(this)">
</div>

![Unframed Markdown image fixture]({{ '/assets/images/titles/ad-astra.png' | relative_url }})
