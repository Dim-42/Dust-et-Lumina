---
layout: reference
title: Comprehensive article fixture
subtitle: Exhaustive current authored-content composition
permalink: /dev/reference/pages/article-comprehensive/
dev_only: true
reference_type: page
last-updated: 2099-01-01
link: "/characters/eloise,/organizations/minerva-observatory,/missing-fixture-target"
---

# Comprehensive article

This is artificial reference content designed to make future structural or Sass regressions visible. It deliberately uses current author-facing markup rather than proposing a new format.

## Text hierarchy and links

Paragraph with **strong text**, *emphasis*, `inline code`, [an internal reference]({{ '/dev/reference/' | relative_url }}), and 中文 English mixed content. The content below provides enough headings for the current automatic TOC.

### Wrapped heading with a deliberately long mixed-language phrase 中文 English reference architecture verification

> A quote creates a semantic block in normal Markdown.

## Lists and table

- First list item
  - Nested item
    - Deep nested item
- Second list item with an intentionally long description that should wrap inside the normal article column.

| Fixture field | Value |
| --- | --- |
| Long text | REFERENCE ENTITY WITH AN INTENTIONALLY LONG TITLE FOR WRAPPING TESTS |
| Mixed text | 中文标点、English words, and a long table cell for overflow checks. |

## Disclosure and media

<details open>
<summary>Open current-native disclosure</summary>

This disclosure has a list, table, and an [internal link]({{ '/dev/' | relative_url }}).

</details>

<div class="image-bracket-frame" style="max-width: 38rem; cursor: zoom-in;">
  <img src="{{ '/assets/images/titles/ad-astra.png' | relative_url }}" alt="Comprehensive fixture media" onclick="openModal(this)">
</div>

## Annotations and split passage

<div class="annotation-container"><div class="annotation">ANNOTATION: fixture-only note for the current authored HTML contract.</div></div>

<div class="split-passage">
  <div class="split-part">FIRST COLUMN: current split-passage content.</div>
  <div class="split-part">SECOND COLUMN: more artificial content with 中文。</div>
</div>

## Dialogue and redaction

{% capture comprehensive_dialogue %}A synthetic dialogue record tests the current include in a dense page composition.{% endcapture %}
{% include dialogue.html id="fixture-article" p="Test operator" time="2099-01-01" msg=comprehensive_dialogue %}

Click to reveal: <span class="redacted" onclick="this.classList.toggle('revealed')">NON-CANONICAL FIXTURE VALUE</span>.

## Related records

{% include linked-pages.html links=page.link %}

### Final TOC target

Enough nested structure remains after the component content to reveal generated heading and sidebar behavior.
