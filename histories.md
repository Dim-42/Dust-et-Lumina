---
permalink: /histories/
title: History
layout: default
collection_type: "histories"
---

<div class="timeline-container">
    <div class="timeline-line"></div>

    {% assign all_entries = site.histories %}

    {% for pair in site.data.timeline %}
        {% assign data_file_content = pair[1] %}
        {% assign all_entries = all_entries | concat: data_file_content %}
    {% endfor %}

    {% assign all_entries = all_entries | sort: "abs_time" | reverse %}

    {% for entry in all_entries %}
        <div class="timeline-item" data-type="{{ entry.type | replace: ',', ' ' | downcase | default: "None" }}">
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

<aside id="timeline-filter">
    <div class="filter-handle">
        <span class="handle-text">/ / / / / / /</span>
    </div>
    <div class="filter-container">
        <div class="filter-header">EVENT FILTER</div>
        <div class="filter-list">
            <button class="filter-btn active" onclick="filterLogix('all', this)">
                <span class="prompt">></span> 全部
            </button>
            
            {% assign raw_types = all_entries | map: 'type' | join: ',' | split: ',' %}
            {% assign cleaned_types = "" | split: "" %}
            
            {% for type in raw_types %}
                {% assign t = type | strip %}
                {% if t != "" and t != nil %}
                    {% assign cleaned_types = cleaned_types | push: t %}
                {% endif %}
            {% endfor %}
            
            {% assign final_types = cleaned_types | uniq | sort %}

            {% for type in final_types %}
                <button class="filter-btn" onclick="filterLogix('{{ type | slugify }}', this)">
                    <span class="prompt">></span> {{ type | upcase }}
                </button>
            {% endfor %}
        </div>
        <br>
        <div class = "sidebar-footer">STATUS: ACTIVE</div>
    </div>
</aside>

<script>
// 1. Immediately confirm the script file is being read
console.log("LOGIX_SYSTEM: Global Script identified.");

// 2. Attach the function directly to the Window (Global Scope)
window.filterLogix = function(targetType, btnElement) {
    console.log("SIGNAL_RECEIVED: Target -> " + targetType);
    
    // UI Update
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(b => b.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');

    // Filter Logic
    const cards = document.querySelectorAll('.timeline-item');
    let count = 0;

    cards.forEach(card => {
    // 1. Get the list of tags from the card (now a space-separated string)
        const cardTypes = (card.getAttribute('data-type') || "").toLowerCase().trim();
        const cleanTarget = targetType.toLowerCase().trim();

        // 2. Logic: Show if 'all' is selected OR if the card's tag list contains the target tag
        // We split by space and check if the array includes the tag to avoid partial matches (e.g., 'art' matching 'earth')
        const typeArray = cardTypes.split(/\s+/); 
        
        if (cleanTarget === 'all' || typeArray.includes(cleanTarget)) {
            card.classList.remove('hidden');
            card.style.display = "block"; 
            count++;
        } else {
            card.classList.add('hidden');
            card.style.display = "none";
        }
    });

    console.log("SYNC_COMPLETE: Matches found -> " + count);
    
    // Repair the layout
    realignTimeline();
};

// Layout repair function
function realignTimeline() {
    const visible = Array.from(document.querySelectorAll('.timeline-item')).filter(i => i.style.display !== "none");
    
    visible.forEach((item, index) => {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        
        item.style.marginTop = index === 0 ? "0" : "-5rem";
        
        if ((index + 1) % 2 !== 0) { 
            // ODD (Left Side)
            item.style.alignSelf = "flex-start";
            item.style.paddingRight = "35px";
            item.style.paddingLeft = "0";
            item.style.paddingTop = "0";

            // Position Dot
            if (dot) {
                dot.style.right = "-5px";
                dot.style.left = "auto";
                dot.style.top = "15px";
            }

            // Position Square (on the LEFT of the card)
            if (content) {
                content.style.setProperty('--square-left', '-4px');
                content.style.setProperty('--square-right', 'auto');
            }
        } else { 
            // EVEN (Right Side)
            item.style.alignSelf = "flex-end";
            item.style.paddingLeft = "35px";
            item.style.paddingRight = "0";
            
            // ONLY apply the 8rem offset if we are on Desktop
            if (window.innerWidth > 768) {
                item.style.paddingTop = "8rem";
                if (dot) {
                    dot.style.left = "-5px";
                    dot.style.right = "auto";
                    dot.style.top = "calc(8rem + 15px)";
                }
            } else {
                // MOBILE FIX: Reset padding and dot top
                item.style.paddingTop = "0";
                if (dot) {
                    dot.style.left = "-5px"; // On mobile, item is full width so dot is relative to item start
                    dot.style.top = "15px"; 
                }
            }

            // Square position remains the same
            if (content) {
                content.style.setProperty('--square-left', 'auto');
                content.style.setProperty('--square-right', '-4px');
            }
        }
    });
}
window.addEventListener('DOMContentLoaded', (event) => {
    console.log("LOGIX_SYSTEM: Initializing auto-calibration...");
    if (typeof window.filterLogix === 'function') {
        window.filterLogix('all');
    }
});
</script>