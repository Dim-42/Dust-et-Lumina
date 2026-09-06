---
layout: reference
title: Content-structure components
subtitle: Authored HTML contracts and related-record include
permalink: /dev/reference/components/content-structures/
dev_only: true
reference_type: component
link: "/characters/eloise,/culture/Science & Technology/LogiX系统,/intentionally-missing-reference"
---

# Content structures

## Dialogue include

{% capture reference_dialogue %}This message is artificial fixture text. It verifies the current dialogue include accepts rendered content, long English labels, and 中文。{% endcapture %}
{% include dialogue.html id="fixture-07" p="Reference operator" time="2099-01-01 00:00" msg=reference_dialogue %}

## Scripted annotation

<div class="annotation-container">
  <div class="annotation">ANNOTATION: current authored markup with a deliberately long English explanation to reveal its width and wrapping behavior.</div>
</div>

## Redacted inline content

This span is interactive through the legacy inline class hook: <span class="redacted" onclick="this.classList.toggle('revealed')">REFERENCE-ONLY REDACTED VALUE</span>.

## Split passage

<div class="split-passage">
  <div class="split-part"><strong>LEFT PART</strong><br>Artificial narrow-column prose. 中文 mixed with English.</div>
  <div class="split-part"><strong>RIGHT PART</strong><br>Second artificial column for current flex behavior.</div>
</div>

<div class="split-passage reverse">
  <div class="split-part">Reverse first source part</div>
  <div class="split-part">Reverse second source part</div>
</div>

## Related records include

The tag group below is rendered by the real `linked-pages.html` include. Its lookup is globally coupled to `site.documents`; the intentionally missing key exercises the existing unknown state.

{% include linked-pages.html links=page.link %}
