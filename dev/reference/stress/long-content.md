---
layout: reference
title: REFERENCE ARTICLE WITH AN INTENTIONALLY LONG TITLE FOR WRAPPING AND TOC TESTS
subtitle: Long document, repeated headings, tables, lists, and no canonical text
permalink: /dev/reference/stress/long-content/
dev_only: true
reference_type: stress
---

# Long-content stress fixture

This page provides a compact but varied long-document surface. Each paragraph is intentionally descriptive rather than lorem ipsum so failures can be identified by the feature under test.

## Repeated heading

The first repeated heading tests the generated anchor strategy.

### Dense subsection A

An extended paragraph tests reading width, vertical rhythm, and the interaction of the global content selectors with a document that has more than one screen of prose. The text is artificial and may be edited only when a fixture purpose changes.

## Repeated heading

The second identical heading tests duplicate heading handling in the TOC.

### Dense subsection B

- A long list item explains that list spacing must survive documents with repeated content blocks and nested semantic structure.
  - Nested item one
  - Nested item two
- Another long list item contains Chinese: 这是用于检查长页面滚动和段落节奏的测试内容。

## Table density

| Index | Artificial test condition | Expected visual observation |
| --- | --- | --- |
| 01 | Very long field value with a mixture of 中文 and English words | Wrap without losing cell borders or viewport containment. |
| 02 | REFERENCE-UNBROKEN-IDENTIFIER-FOR-OVERFLOW-TESTING-0000000001 | Make unavoidable overflow visible. |
| 03 | Missing optional datum | Preserve a readable empty/missing state. |

## More heading targets

### Heading that wraps because it deliberately contains a detailed explanation of the current regression purpose

Paragraph after a wrapping heading.

### Another heading

<details>
<summary>Long disclosure summary for a long document</summary>

The details block intentionally appears after many normal sections.

</details>

## Final section

The endpoint ensures footer and sidebar behavior can be tested after a long scroll.
