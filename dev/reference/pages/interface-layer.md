---
layout: reference
title: Interface-layer fixture
subtitle: Current shell overlays, loader, drawers, and modal
permalink: /dev/reference/pages/interface-layer/
dev_only: true
reference_type: page
access-level: RESTRICTED
---

# Interface-layer fixture

Use the real classification button above, top navigation, directory sidebar, generated TOC, footer, and image modal below. These systems are created by `default.html` and coordinated by the existing global `site.js`.

<div class="image-bracket-frame" style="max-width: 30rem; cursor: zoom-in;">
  <img src="{{ '/assets/images/titles/embers-ablaze.png' | relative_url }}" alt="Interface fixture image" onclick="openModal(this)">
</div>

<button type="button" class="terminal-button" onclick="document.getElementById('announcementModal').style.display = 'flex';">SHOW ANNOUNCEMENT MARKUP</button>

The development-only button exposes existing announcement markup for visual inspection; the automatic session-based behavior remains the source of truth.
