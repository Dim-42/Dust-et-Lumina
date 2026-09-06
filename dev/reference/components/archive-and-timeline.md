---
layout: reference
title: Archive and timeline components
subtitle: Real data-driven includes and filter controls
permalink: /dev/reference/components/archive-and-timeline/
dev_only: true
reference_type: component
---

# Archive include

The archive below is the current `archive-culture.html` implementation using the live `site.culture` collection. Its folder grouping is intentionally not recreated with fixture data.

{% assign items = site.culture %}
{% include archive-culture.html items=items %}

# Timeline include

The timeline and filter drawer below are the current `timeline-archive.html` implementation using live histories and `_data/timeline`. It brings a script tag and fixed IDs (`timeline-filter`, `btn-default`, and related controls), so it must remain one instance per document.

{% include timeline-archive.html %}
