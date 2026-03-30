---
permalink: /culture/
title: Encyclopedia
layout: default
collection_type: "culture"
---

<!-- <div class="concept-grid">
  {% assign selected_slugs = "星系,晶尘,超空间" | split: "," %}
  {% for slug in selected_slugs %}
    {% assign item = site.culture | where: "slug", slug | first %}
    {% if item %}
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
    {% endif %}
  {% endfor %}
</div>

<br> -->

{% assign items = site.culture | sort: "path" %}

<div class="culture-archive">
  {% assign culture_groups = items | group_by_exp: "item", "item.path | split: '/' | slice: 1 | first" %}
  {% assign sorted_groups = culture_groups | sort: "name" %}

  {% for group in sorted_groups %}
    
    {% comment %} 
       Check if the group name is a file (root item) or a folder.
    {% endcomment %}
    {% if group.name contains ".md" %}
      {% assign display_header = "Unclassified" %}
    {% else %}
      {% assign display_header = group.name | replace: "-", " " | capitalize %}
    {% endif %}

    <details class="class-section" open>
      <summary class="class-header">
        <span class="header-text">{{ display_header }}</span>
        <span class="entry-count">[{{ group.items | size }}]</span>
        <span class="ui-arrow"></span>
      </summary>

      <div class="subclass-container">
        {% comment %} Added | first to fix the brackets issue {% endcomment %}
        {% assign sub_groups = group.items | group_by_exp: "item", "item.path | split: '/' | slice: 2 | first" %}
        
        {% for sub in sub_groups %}
          <div class="subclass-group">
            {% unless sub.name contains ".md" or sub.name == nil or sub.name == "" %}
              <span class="subclass-header">{{ sub.name | replace: "-", " " | capitalize }}</span>
            {% endunless %}

            <ul class="entry-list">
              {% for item in sub.items %}
                <li class="entry-item">
                  <a href="{{ item.url | relative_url }}" class="entry-link">
                    <span class="entry-title">{{ item.title }}</span>
                  </a>
                </li>
              {% endfor %}
            </ul>
          </div>
        {% endfor %}
      </div>
    </details>
  {% endfor %}
</div>