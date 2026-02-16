---
permalink: /histories/
title: History
layout: default
collection_type: "histories"
---

<div class="timeline-container">
    <div class="timeline-line"></div>

    {% assign collection_items = site.histories %}
    {% assign manual_items = site.data.timeline-events | default: Array.new %}
    {% assign all_entries = collection_items | concat: manual_items | sort: "abs_time" | reverse %}

    {% for entry in all_entries %}
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            
            <div class="timeline-content {% unless entry.url %}no-link{% endunless %}">
                
                {% if entry.url %}
                    <a href="{{ entry.url | relative_url }}" class="main-card-link" aria-label="Open {{ entry.title }}"></a>
                {% endif %}

                <div class="timeline-date">
                    <span class="label">[TIMESTAMP]</span> {{ entry.time }}
                </div>
                
                <div class="timeline-info">
                    <div class="timeline-title">{{ entry.title }}</div>
                    {% if entry.subtitle %}
                        <div class="timeline-subtitle">{{ entry.subtitle }}</div>
                    {% endif %}
                </div>

                {% if entry.excerpts %}
                    <div class="timeline-excerpts">{{ entry.excerpts }}</div>
                {% endif %}

                {% if entry.link %}
                    <div class="timeline-links">
                        {% assign linked_keys = entry.link | replace: " ", "" | split: "," %}
                        {% for key in linked_keys %}
                            {% assign linked_page = site.documents | where: "permalink", key | first %}
                            {% if linked_page == nil %}
                                {% assign linked_page = site.documents | where: "slug", key | first %}
                            {% endif %}
                            
                            {% if linked_page %}
                                <a href="{{ linked_page.url | relative_url }}" class="timeline-link-tag">
                                    <span class="tag-bracket">[</span>{{ linked_page.title | upcase }}<span class="tag-bracket">]</span>
                                </a>
                            {% else %}
                                <span class="timeline-link-tag unknown">
                                    <span class="tag-bracket">[</span>{{ key | upcase }}<span class="tag-bracket">]</span>
                                </span>
                            {% endif %}
                        {% endfor %}
                    </div>
                {% endif %}
            </div>
        </div>
    {% endfor %}
</div>