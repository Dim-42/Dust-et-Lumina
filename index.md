---
layout: default
title: Dust et Lumina
---

<p class = "main-header">尘与辉光</p>
<p class = "motto" style = "letter-spacing: 0.05rem;"> At the end of time, the stars are but dust.
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
        <span class="concept-title">{{ item.title }} <br> {{ item.subtitle }} </span>
    </div>
  </a>
  {% endfor %}
</div>

## 组织与势力 // KEY_PARTIES

<div class="featured-organ">
    <div class="organ-grid">
        {% assign featured_organ = site.organizations | where: "featured", true %}
        {% assign sorted_organ = featured_organ | sort_natural: "order" %}
        {% for organ in sorted_organ %}
        <a href="{{ organ.url | relative_url }}" class="organ-card">
            <div class="organ-portrait">
                {% if organ.image %}
                    <img src="{{ organ.image | relative_url }}" alt="{{ organ.title }}">
                {% else %}
                    <div class="no-portrait">NO_DATA</div>
                {% endif %}
            </div> <div class="organ-overlay">
                <span>{{ organ.title }} <br> {{ organ.subtitle }} </span>
            </div>
        </a>
        {% endfor %}
    </div>
</div>

<div style="text-align: right; padding-right: 1rem;">
    <a href="{{ '/organizations/' | relative_url }}" style = "font-family: var(--font-mono);">
        ACCESS ORGANIZATION PROFILES >
    </a>
</div>

## 人物档案 // PERSONNEL_PROFILES

<div class="featured-chars">
    <div class="char-grid">
        {% assign featured_chars = site.characters | where: "featured", true %}
        {% assign sorted_chars = featured_chars | sort_natural: "order" %}
        {% for char in sorted_chars %}
        <a href="{{ char.url | relative_url }}" class="char-card">
            <div class="char-portrait">
                {% if char.image %}
                    <img src="{{ char.image | relative_url }}" alt="{{ char.title }}">
                {% else %}
                    <div class="no-portrait">NO_DATA</div>
                {% endif %}
            </div> <div class="char-overlay">
                <span>{{ char.title }} <br> {{ char.subtitle }} </span>
            </div>
        </a>
        {% endfor %}
    </div>
</div>

<div style="text-align: right; padding-right: 1rem;">
    <a href="{{ '/characters/' | relative_url }}" style = "font-family: var(--font-mono);">
        ACCESS PERSONNEL PROFILES >
    </a>
</div>