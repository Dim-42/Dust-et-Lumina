---
layout: reference
title: Legacy content markup contracts
subtitle: Current authored HTML classes and Liquid include hooks
permalink: /dev/reference/legacy/content-markup/
dev_only: true
reference_type: legacy
---

# Content-facing contracts

These examples are taken from patterns present in `_lore`; the text below is synthetic. They are compatibility specimens, not a preferred new authoring API.

## `split-passage` and `split-part`

Used in `_lore/_culture/02 World & Environment/星系.md` with optional inline flex sizing.

<div class="split-passage">
  <div class="split-part" style="flex: 1.5;">Legacy split-part with an inline flex override.</div>
  <div class="split-part" style="flex: 2;">Second legacy split-part.</div>
</div>

## `image-bracket-frame`

Used in multiple culture documents, sometimes with inline `cursor` or dimensions and `onclick="openModal(this)"` descendants.

<div class="image-bracket-frame" style="max-width: 30rem; cursor: zoom-in;">
  <img src="{{ '/assets/images/titles/ad-astra.png' | relative_url }}" alt="Legacy image frame fixture" onclick="openModal(this)">
</div>

## `annotation-container` / `annotation`

Used in region, culture, and organization Markdown documents.

<div class="annotation-container"><div class="annotation">LEGACY ANNOTATION: compatibility reference specimen.</div></div>

## `redacted` and inline reveal hook

Used in `_lore/_culture/History & Archaeology/时序之钥.md` and related authored material.

<p class="note">This <span class="redacted" onclick="this.classList.toggle('revealed')">REFERENCE REDACTION</span> preserves the current click-to-reveal contract.</p>

## `dialogue.html` include

The include receives `id`, `p`, `time`, and captured `msg` content. Existing source also uses Liquid captures for richer dialogue payloads.

{% capture legacy_dialogue %}Synthetic message content used to preserve the include parameter contract.{% endcapture %}
{% include dialogue.html id="legacy-01" p="Legacy fixture" time="2099-01-01" msg=legacy_dialogue %}

## Native details and inline styles

Archive includes and authored source rely on native `details` plus inline style attributes. Preserve these visibility rules before any cleanup changes.

<details open><summary>Legacy-compatible details</summary>Current details markup is intentionally direct and author-facing.</details>
