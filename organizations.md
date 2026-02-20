---
permalink: /organizations/
title: Organization
layout: hub
collection_type: "organizations"
---

## 联邦与联邦机构

<div class="featured-organ">
    <div class="organ-grid">
        {% assign featured_organ = site.organizations | where: "class", "联邦" %}
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

## 政治势力

<div class="featured-organ">
    <div class="organ-grid">
        {% assign featured_organ = site.organizations | where: "class", "政治势力" %}
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


## 社会组织与企业

<div class="featured-organ">
    <div class="organ-grid">
        {% assign featured_organ = site.organizations |  where: "class", "社会组织" %}
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


## 学术机构

<div class="featured-organ">
    <div class="organ-grid">
        {% assign featured_organ = site.organizations |  where: "class", "学术机构" %}
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

---

## 势力一览