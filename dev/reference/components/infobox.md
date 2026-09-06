---
layout: character
title: Infobox component fixture
subtitle: Actual character-layout specimen
permalink: /dev/reference/components/infobox/
dev_only: true
reference_type: component
name:
  - REFERENCE ENTITY
  - WITH AN INTENTIONALLY LONG SECOND LINE
fullname:
  - Reference Entity With An Intentionally Long Full Name For Wrapping Tests
alias:
  - SHORT ALIAS
  - 中文别名 / LONG ENGLISH ALIAS FOR WRAPPING
birthday: 2099-12-31
homeland: A deliberately long homeland description with 中文 mixed text
faction:
  - Reference-only test group
  - No canonical affiliation
---

## Actual character infobox

This is a regular development page rendered through `_layouts/character.html`, not copied infobox markup. It exercises a no-image state, multi-value fields, an intentionally long title, and mixed-language values.

### Minimal-state caveat

The present layout always emits several table rows and has hard-coded label text. A truly minimal field state is covered by the default values in the live layout rather than by a fake alternate infobox. Future work should retain this fixture when changing the layout schema.
