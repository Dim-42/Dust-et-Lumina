---
layout: default
title: Dust et Lumina
---

<p class = "main-header" style = "font-family: var(--font-serif);">尘与辉光</p>
<p class = "motto" style = "letter-spacing: 0.05rem;"> At the end of time, the stars are all but dust.
<br>时间的尽头，繁星若尘。</p>

---

<div class = "image-frame" style="cursor: zoom-in;">
    <img src="{{ '/assets/images/titles/main.png' | relative_url }}" onclick="openModal(this)">
</div>

<div id="imageModal" class="system-modal" onclick="closeModal()">
    <span class="close-modal">&times;</span>
    <img class="modal-content" id="fullImage">
    <!--<div id="modalCaption" class="modal-caption">{{ page.subtitle }}</div> -->
</div>

---

<div class="concept-grid">
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

<div markdown="0">
  <a href="{{ '/regions/' | relative_url }}" style="text-decoration: none; color: inherit;">
    <h2>星系地理</h2>
  </a>
</div>

{% include galaxy-map.html %}


<div markdown="0">
  <a href="{{ '/organizations/' | relative_url }}" style="text-decoration: none; color: inherit;">
    <h2>组织与势力</h2>
  </a>
</div>


<div class="org-carousel-container" id="orgCarousel">
  <div class="org-carousel-track">
    {% assign featured_orgs = site.organizations | where: "featured", true %}
    {% assign sorted_organ = featured_orgs | sort_natural: "order" %}
    {% for org in sorted_organ %}
        <div class="org-slide">
        <a class="org-inner" href="{{ org.url | relative_url }}">
            <div class="org-logo">
            {% if org.image %}
            <img src="{{ org.image | relative_url }}" alt="{{ organ.title }}">
            {% else %}
                <div class="no-portrait">NO_DATA</div>
            {% endif %}
            </div>
            <div class="org-content">
            <div class="org-title">{{ org.title }}</div>
            <div class="org-subtitle"> {{ org.subtitle }}</div> 
            <p class="org-description">{{ org.description }}</p>
            <div style = "text-align: right;"><span class="motto" style="margin: 0px; font-size: 16px">— {{ org.motto[0]}}</span><br><span class="motto" style="margin: 0px; color: var(--color-note); font-size: 16px">{{ org.motto[1]}}</span></div>
            </div>
        </a>
        </div>
    {% endfor %}
  </div>
</div>

<p class="system-msg-note" style="padding: 2px; margin: 0;">Scroll to view</p>

<div style="text-align: right; padding-right: 1rem;">
    <a href="{{ '/organizations/' | relative_url }}" style = "font-family: var(--font-mono); letter-spacing: 0.1rem;">
        ACCESS ORGANIZATION PROFILES >
    </a>
</div>


<div markdown="0">
  <a href="{{ '/characters/' | relative_url }}" style="text-decoration: none; color: inherit;">
    <h2>人物档案</h2>
  </a>
</div>

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
    <a href="{{ '/characters/' | relative_url }}" style = "font-family: var(--font-mono); letter-spacing: 0.1rem;">
        ACCESS PERSONNEL PROFILES >
    </a>
</div>