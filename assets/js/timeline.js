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
