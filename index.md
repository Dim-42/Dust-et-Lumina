---
layout: default
title: Dust et Lumina
---

<p class = "main-header">尘与辉光</p>
<p class = "poetry" style = "letter-spacing: 0.05rem;"> At the end of time, the stars are but dust.
<br>时间的尽头，繁星若尘。</p>

---

## 核心概念 // CORE_CONCEPTS
<div class="concept-grid">
  {% assign concepts = site.concepts | where: "featured", true %}
  {% for item in concepts %}
  <a href="{{ item.url | relative_url }}" class="concept-card">
    <div class="concept-thumb">
        {% if item.image %}
            <img src="{{ item.image | relative_url }}" alt="{{ item.title }}">
        {% else %}
            <div class="no-image">NOT_FOUND</div>
        {% endif %}
    </div>
    <div class="concept-text">
        <span class="concept-title">{{ item.title }}</span>
    </div>
  </a>
  {% endfor %}
</div>

## 组织与势力 // KEY_PARTIES

<p class = "warning-text">404 Not Found</p>



%%
## 近期记录 // RECENT_LOGS
<ul class="data-list">
  {% comment %} This pulls the 3 most recent entries from all collections {% endcomment %}
  {% assign all_entries = site.characters | concat: site.concepts | sort: 'date' | reverse %}
  {% for entry in all_entries limit:3 %}
    <li>
        <a href="{{ entry.url | relative_url }}">
            <span class="entry-title">{{ entry.title }}</span>
        </a>
    </li>
  {% endfor %}
</ul>
%%