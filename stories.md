---
permalink: /stories/
title: Record
layout: default
collection_type: "stories"
---

{% assign preferred_order = "Main,Branch,Change Log" | split: "," %}

{% assign ordered_items = site.stories 
    | where_exp: "item", "item.story_type != 'chapter'" | where_exp: "item", "item.order" 
    | where_exp: "item", "item.draft != true" 
    | sort: "order" %}

{% assign unordered_items = site.stories 
    | where_exp: "item", "item.story_type != 'chapter'" 
    | where_exp: "item", "item.order == nil" 
    |  where_exp: "item", "item.draft != true"  
    | sort: "title" %}

{% assign all_items = ordered_items | concat: unordered_items | where_exp: "item", "item.story_type != 'chapter'" %}

{% assign root_items = "" | split: "" %}
{% assign folder_items = "" | split: "" %}

{% for item in all_items %}
  {% assign path_parts = item.path | split: "/" %}
  {% if path_parts.size <= 2 %}
    {% assign root_items = root_items | push: item %}
  {% else %}
    {% assign folder_items = folder_items | push: item %}
  {% endif %}
{% endfor %}

{% comment %} 3. Group the folder items {% endcomment %}
{% assign story_groups = folder_items | group_by_exp: "item", "item.path | split: '/' | slice: 1 | first" %}

<div class="culture-archive">
  
  {% for folder_name in preferred_order %}
    {% assign group = story_groups | where: "name", folder_name | first %}
    {% if group %}
      <details class="class-section" open>
        <summary class="class-header">
          <span class="header-text">{{ group.name | replace: "-", " " | capitalize }}</span>
          <span class="entry-count">[{{ group.items | size }}]</span>
          <span class="ui-arrow"></span>
        </summary>

        <div class="class-description">
          {% case folder_name %}
            {% when 'Main' %}
              Main process traced by the system, integrating confirmed event sequences.
            {% when 'Branch' %}
              Parallel branches forked from main, logging interrelated events.
            {% when 'Change Log' %}
              Immutable log of raw data commits, ordered by overall relevance.
            {% else %}
              
          {% endcase %}
        </div>
        
        <ul class="entry-list">
          {% for item in group.items %}
            <li class="entry-item">
                <div class = "commit-main">
                    <a href="{{ item.url | relative_url }}" class="entry-link">
                        <span class="entry-title">{{ item.title }}</span>
                    </a>
                    {% if item.commit %}
                        <span class="commit-number">
                            [COMMIT] <span class="hash">{{ item.commit | slice: 0, 8 }}</span>
                        </span>
                    {% endif %}
                </div>
            </li>
          {% endfor %}
        </ul>
      </details>
    {% endif %}
  {% endfor %}

  {% comment %} 6. FINALLY: All Root Items as "Unclassified" {% endcomment %}
  {% if root_items.size > 0 %}
    <details class="class-section" open>
      <summary class="class-header">
        <span class="header-text">Unclassified</span>
        <span class="entry-count">[{{ root_items | size }}]</span>
        <span class="ui-arrow"></span>
      </summary>

      {% comment %} --- ADDED DESCRIPTION LINE --- {% endcomment %}
        <div class="class-description">
            
        </div>
        {% comment %} ----------------------------- {% endcomment %}

    {% assign sorted_root = root_items | sort: "order" %}
      <ul class="entry-list">
        {% for item in sorted_root %}
          <li class="entry-item">
            <a href="{{ item.url | relative_url }}" class="entry-link">
              <span class="entry-title">{{ item.title }}</span>
            </a>
          </li>
        {% endfor %}
      </ul>
    </details>
  {% endif %}
</div>