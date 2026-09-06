---
layout: reference
title: Narrow-layout inspection guide
subtitle: Current responsive behavior at constrained widths
permalink: /dev/reference/stress/narrow-layout/
dev_only: true
reference_type: stress
---

# Narrow-layout fixture

Resize the real site viewport rather than introducing a simulated device frame. This keeps current media queries, shell drawers, modal, TOC, and content width rules active.

## Inspection targets

- Top navigation and directory control coexistence.
- A heading with a deliberately long English phrase that should wrap rather than overlap the shell controls.
- 中文 English mixed text: 这是一个用于检查窄屏换行的人工说明。
- A table with long content.

| Field | Narrow-screen observation |
| --- | --- |
| Long label | REFERENCE VALUE WITH MANY WORDS THAT MUST REMAIN INSIDE THE AVAILABLE WIDTH |
| 中文 | 中文表格内容应该保持可读。 |

<div class="split-passage">
  <div class="split-part">Split-passage first part, inspected at narrow width.</div>
  <div class="split-part">Split-passage second part, inspected at narrow width.</div>
</div>

This page deliberately documents the expected manual test, instead of creating new viewport-specific application code.
