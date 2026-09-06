---
layout: character
title: 多语言 / MULTILINGUAL REFERENCE ENTITY WITH AN INTENTIONALLY LONG TITLE
subtitle: 中文 English punctuation and wrapping fixture
permalink: /dev/reference/stress/multilingual/
dev_only: true
reference_type: stress
name:
  - 多语言测试实体
  - MULTILINGUAL REFERENCE ENTITY
fullname:
  - 这是一个用于测试中文、English、标点符号，以及超长字段换行的非正史参考实体。
alias:
  - “Quoted Chinese punctuation”：TEST_ALIAS_WITH_LONG_ENGLISH_TOKEN
birthday: 2099 年 12 月 31 日 / 2099-12-31
homeland: 中文与EnglishMixedWithoutSpacesForOverflowTesting，后接可换行说明。
faction:
  - Reference-only / 仅供测试
  - LONG ENGLISH AFFILIATION LABEL FOR INFLECTION AND WRAPPING
---

## 中文标题与 English heading mix

这是用于检查中文字体、英文回退、标点（、，。：；！？）和空格策略的人工文本。 It is not canonical lore and should stay deterministic.

### Long English token

REFERENCEENTITYWITHANINTENTIONALLYLONGUNBROKENIDENTIFIERFOROVERFLOWOBSERVATION-2099-ALPHA.

### Table cells

| 测试项目 | Artificial value |
| --- | --- |
| 中文文本 | 这是一段很长的中文说明，用来检查狭窄宽度和表格单元格换行。 |
| English | A deliberately long English sentence should keep its words readable at intermediate widths. |

<details open>
<summary>中文 English mixed disclosure summary — 用于测试换行</summary>

Inside disclosure: 测试内容 / test content.

</details>
