---
permalink: /histories/
title: History
layout: default
collection_type: "histories"
---

{% assign hidden_types_string = "次要" %}
{% assign hidden_types = hidden_types_string | split: "," %}
<div class="timeline-container">
    <div class="timeline-line"></div>

    {% assign all_entries = site.histories %}
    {% for pair in site.data.timeline %}
        {% assign data_file_content = pair[1] %}
        {% assign all_entries = all_entries | concat: data_file_content %}
    {% endfor %}

    {% assign all_entries = all_entries | sort: "abs_time" | reverse %}


    {% for entry in all_entries %}
        {% assign entry_types = entry.class | replace: ',', ' ' | downcase | split: ' ' %}
        
        {% assign is_default_hidden = false %}
        {% for h_type in hidden_types %}
            {% if entry_types contains h_type %}
                {% assign is_default_hidden = true %}
            {% endif %}
        {% endfor %}

        <div class="timeline-item" 
             data-type="{{ entry.type | replace: ',', ' ' | downcase | default: 'none' }}"
             {% if is_default_hidden %}data-default-hide="true" style="display:none;"{% endif %}>
            
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
                
                {% if entry.tag %}
                    <div class="timeline-tag">
                    {{ entry.tag | join: " " }}
                    </div>
                {% endif %}
            </div>
        </div>
    {% endfor %}
</div>

<aside id="timeline-filter">
    <input type="checkbox" id="timeline-filter-toggle" class="timeline-filter-toggle">
    <label for="timeline-filter-toggle" class="timeline-filter-btn">
        <span class="timeline-filter-label">Event Filter</span>
    </label>

    <div class="filter-handle">
        <span class="handle-text">/ / / / / / /</span>
    </div>
    <div class="filter-container">
        <div class="filter-header">EVENT_FILTER</div>
        <div class="filter-list">
    <button class="filter-btn active" id="btn-default" onclick="resetFilters(this)">
        <span class="prompt">></span> DEFAULT
            </button>

            <button class="filter-btn" id="btn-full" onclick="showFullStream(this)">
                <span class="prompt">></span> ALL EVENTS
            </button>
            
            {% assign raw_types = all_entries | map: 'type' | join: ',' | split: ',' %}
            {% assign cleaned_types = "" | split: "" %}
            {% for type in raw_types %}
                {% assign t = type | strip %}
                {% if t != "" and t != nil %}{% assign cleaned_types = cleaned_types | push: t %}{% endif %}
            {% endfor %}
            {% assign final_types = cleaned_types | uniq | sort %}

            {% for type in final_types %}
                <button class="filter-btn" 
                        data-filter="{{ type | slugify }}" 
                        onclick="toggleFilter('{{ type | slugify }}', this)">
                    <span class="prompt">></span> {{ type | upcase }}
                </button>
            {% endfor %}
        </div>
        <div class="filter-footer">STATUS: ENCRYPTED_STREAM</div>
    </div>
</aside>

<script>
let activeFilters = new Set();
let fullStreamMode = false;

window.toggleFilter = function(targetType, btnElement) {
    const defaultBtn = document.getElementById('btn-default');
    const fullBtn = document.getElementById('btn-full');
    
    fullStreamMode = false;

    if (activeFilters.has(targetType)) {
        activeFilters.delete(targetType);
        btnElement.classList.remove('active');
    } else {
        activeFilters.add(targetType);
        btnElement.classList.add('active');
    }

    fullBtn.classList.remove('active');
    if (activeFilters.size > 0) {
        defaultBtn.classList.remove('active');
    } else {
        defaultBtn.classList.add('active');
    }

    applyFilters();
};

window.resetFilters = function(allBtn) {
    activeFilters.clear();
    fullStreamMode = false;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    allBtn.classList.add('active');
    applyFilters();
};

window.showFullStream = function(fullBtn) {
    activeFilters.clear();
    fullStreamMode = true;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    fullBtn.classList.add('active');
    applyFilters();
};

function applyFilters() {
    const cards = document.querySelectorAll('.timeline-item');
    
    cards.forEach(card => {
        const cardTypes = (card.getAttribute('data-type') || "").toLowerCase().trim().split(/\s+/);
        const isDefaultHidden = card.getAttribute('data-default-hide') === "true";
        
        let shouldShow = false;

        if (fullStreamMode) {
            shouldShow = true;
        } else if (activeFilters.size === 0) {
            shouldShow = !isDefaultHidden;
        } else {
            shouldShow = Array.from(activeFilters).some(f => cardTypes.includes(f));
        }

        card.style.display = shouldShow ? "block" : "none";
    });

    realignTimeline();
}

function realignTimeline() {
    const visible = Array.from(document.querySelectorAll('.timeline-item'))
                         .filter(i => i.style.display !== "none");
    
    visible.forEach((item, index) => {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        item.style.marginTop = index === 0 ? "0" : "-5rem";
        
        if ((index + 1) % 2 !== 0) { 
            item.style.alignSelf = "flex-start";
            item.style.paddingRight = "35px";
            item.style.paddingLeft = "0";
            item.style.paddingTop = "0";
            if (dot) { dot.style.right = "-5px"; dot.style.left = "auto"; dot.style.top = "15px"; }
            if (content) { content.style.setProperty('--square-left', '-4px'); content.style.setProperty('--square-right', 'auto'); }
        } else { 
            item.style.alignSelf = "flex-end";
            item.style.paddingLeft = "35px";
            item.style.paddingRight = "0";
            if (window.innerWidth > 768) {
                item.style.paddingTop = "8rem";
                if (dot) { dot.style.left = "-5px"; dot.style.right = "auto"; dot.style.top = "calc(8rem + 15px)"; }
            } else {
                item.style.paddingTop = "0";
                if (dot) { dot.style.left = "-5px"; dot.style.top = "15px"; }
            }
            if (content) { content.style.setProperty('--square-left', 'auto'); content.style.setProperty('--square-right', '-4px'); }
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    applyFilters();
});
</script>
