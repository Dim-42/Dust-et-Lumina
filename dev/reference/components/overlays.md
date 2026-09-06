---
layout: reference
title: Overlay and gate fixture
subtitle: Global shell overlays and classification gate
permalink: /dev/reference/components/overlays/
dev_only: true
reference_type: component
access-level: TOP SECRET
---

# Classification gate

This page deliberately uses the default layout's existing `access-level` gate. Activate its current “access file” button to reveal the protected fixture content; no separate test implementation exists.

## Revealed reference content

<button type="button" class="terminal-button" onclick="document.getElementById('announcementModal').style.display = 'flex';">OPEN CURRENT ANNOUNCEMENT MARKUP</button>

<p>The button is a development-only harness control. It reveals the real shell-owned announcement DOM but does not replace its private `site.js` lifecycle; reload after clearing the announcement session state to exercise the normal automatic flow.</p>

<div class="image-bracket-frame" style="max-width: 32rem; cursor: zoom-in;">
  <img src="{{ '/assets/images/titles/ad-astra.png' | relative_url }}" alt="Reference modal control" onclick="openModal(this)">
</div>

The loader, image modal, announcement, and canvas are all emitted by `default.html`. They use fixed IDs and global functions, so they are tested here through the real shell rather than re-included independently.
