---
layout: reference
title: Tables and disclosure
subtitle: Table cells, details, and nested content
permalink: /dev/reference/foundations/tables/
dev_only: true
reference_type: foundation
---

# Tables

| Field | Short value | Long / mixed-language value |
| --- | --- | --- |
| Status | Active | 这是一个用于测试表格单元格换行与英文 token overflow 的说明。 |
| Identifier | REF-001 | REFERENCE-ENTITY-WITH-AN-INTENTIONALLY-LONG-UNBROKEN-IDENTIFIER-001 |
| Notes | None | Multiple words remain readable when the viewport narrows. |

<details>
<summary>Closed disclosure with a deliberately long summary label for wrapping behavior</summary>

This is real native `details` markup in the global shell.

| Nested field | Value |
| --- | --- |
| State | Open only after interaction |

</details>

<details open>
<summary>Open disclosure</summary>

- A list
- A [link]({{ '/dev/' | relative_url }})

</details>
