function toggleFile() {
    const content = document.getElementById("classified-content");
    const btn = document.getElementById("reveal-btn");

    if (!content || !btn) return;

    const isHidden = content.style.display === "none" || content.style.display === "";

    if (isHidden) {
        content.style.display = "block";
        btn.innerText = "Lock";
        btn.classList.add("active");
    } else {
        content.style.display = "none";
        btn.innerText = "Access";
        btn.classList.remove("active");
    }
}
        // --- Loader Logic ---
        document.addEventListener("DOMContentLoaded", function() {
            const loader = document.getElementById('loading-screen');
            const passInput = document.getElementById('db-password');
            const p1 = document.getElementById('phase-login');
            const p2 = document.getElementById('phase-scan');
            const p3 = document.getElementById('phase-decrypt');
            const canvas = document.getElementById('network-canvas');

            const lastLoad = localStorage.getItem('last_boot_time');
            const now = Date.now();
            const refresh_threshold = 100*60*1000;

            // Check if we should skip the animation
            if (sessionStorage.getItem('hasLoaded') && (now - lastLoad) < refresh_threshold) {
                loader.style.display = 'none';
                canvas.classList.add('visible'); 
                canvas.style.opacity = "0.3";
                showDirectory();
                return;
            }
            
            // Phase 1 Logic: Password Entry
            /** passInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    // Add a "processing" feel
                    p1.style.opacity = '0.5';
                    passInput.disabled = true;

                    setTimeout(() => {
                        p1.style.display = 'none';
                        startPhase2();
                    }, 600);
                }
            }); **/

            startAutoLogin();

            // --- Updated Auto-Login Logic ---
            function startAutoLogin() {
                const passInput = document.getElementById('db-password');
                const authStatus = document.getElementById('auth-status');
                const p1 = document.getElementById('phase-login');
                
                const passwordLength = 12; // How many dots to "type"
                let typedCount = 0;

                // Simulate typewriter dots
                const typingInterval = setInterval(() => {
                    passInput.value += "•"; 
                    typedCount++;

                    if (typedCount >= passwordLength) {
                        clearInterval(typingInterval);
                        
                        // Wait a moment, then show "Granted"
                        setTimeout(() => {
                            authStatus.textContent = "ACCESS_GRANTED. VERIFYING IDENTITY...";
                            authStatus.style.color = "var(--accent-secondary)"; // Assuming accent is your theme color
                            
                            // Transition to Phase 2
                            setTimeout(() => {
                                p1.style.display = 'none';
                                startPhase2();
                            }, 1000);
                        }, 500);
                    }
                }, 150); // Speed of typing (ms per dot)
            }

            function startPhase2() {
                p2.style.display = 'flex';
                // Simulate a 2-second biometric scan
                setTimeout(() => {
                    p2.style.display = 'none';
                    startPhase3();
                }, 2500);
            }

            function startPhase3() {
                p3.style.display = 'flex';
                // Final decryption delay before entering site
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    showBackgroundNetwork();
                    showDirectory();
                    sessionStorage.setItem('hasLoaded', 'true');
                    localStorage.setItem('last_boot_time', Date.now());
                }, 1000);
            }
        });

        // --- Obsidian Comment Filter ---
        document.addEventListener("DOMContentLoaded", function() {
            const contentArea = document.getElementById('obsidian-content');
            if (contentArea) {
                const regex = /%%[\s\S]*?%%/g;
                contentArea.innerHTML = contentArea.innerHTML.replace(regex, '');
            }
        });

        // --- Clock Logic ---
        function updateClock() {
            const timeEl = document.getElementById('current-time');
            if (timeEl) {
                const now = new Date();
                const timeStr = now.getHours().toString().padStart(2, '0') + ":" + 
                                now.getMinutes().toString().padStart(2, '0') + ":" + 
                                now.getSeconds().toString().padStart(2, '0');
                timeEl.textContent = timeStr;
            }
        }
        setInterval(updateClock, 1000);
        updateClock();

        // --- Automatic TOC Extraction ---
        document.addEventListener("DOMContentLoaded", function() {
            const tocContainer = document.getElementById('auto-toc');
            const contentArea = document.getElementById('obsidian-content');
            const tocSidebar = document.getElementById('sidebar-toc');

            if (!contentArea || !tocContainer) return;

            // Grab H2 and H3 from your main content
            const headers = contentArea.querySelectorAll('h2, h3');

            // If no headers, hide the whole sidebar including handle
            if (headers.length === 0) {
                tocSidebar.style.display = 'none';
                return;
            }

            const list = document.createElement('ul');
            headers.forEach((header, index) => {
                if (!header.id) {
                    // Create a slug from text or use index
                    header.id = 'sec-' + index;
                }

                const li = document.createElement('li');
                li.className = 'toc-item ' + (header.tagName === 'H2' ? 'toc-h2' : 'toc-h3');

                // Indent H3s
                if(header.tagName === 'H3') 
                {
                    li.style.paddingLeft = "10px";
                    li.setAttribute('data-no-prompt', 'true');
                }

                const a = document.createElement('a');
                a.href = '#' + header.id;
                a.textContent = header.textContent.toUpperCase();
                a.className = 'toc-link';
                
                li.appendChild(a);
                list.appendChild(li);
            });
            
            tocContainer.appendChild(list);
        });

        document.addEventListener('click', function(event) {
            const toggles = [
                { wrapperId: 'sidebar-toc', checkboxId: 'toc-toggle' },
                { wrapperId: 'timeline-filter', checkboxId: 'timeline-filter-toggle' }
            ];

            toggles.forEach(({ wrapperId, checkboxId }) => {
                const wrapper = document.getElementById(wrapperId);
                const checkbox = document.getElementById(checkboxId);

                if (wrapper && checkbox && checkbox.checked && !wrapper.contains(event.target)) {
                    checkbox.checked = false;
                }
            });
        });

        // --- Canvas Background---
        const canvas = document.getElementById('network-canvas');
        const ctx = canvas.getContext('2d');
        let points = [];
        const maxDist = 150; // Distance at which lines appear
        const pointCount = 80; // Number of dots

        function initCanvas() {
            const dpr = window.devicePixelRatio || 1; // Get the screen's pixel density
            const width = window.innerWidth;
            const height = window.innerHeight;

            // 1. Scale the actual drawing surface
            canvas.width = width * dpr;
            canvas.height = height * dpr;

            // 2. Scale the CSS display size back down
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            // 3. Scale all drawing operations automatically
            ctx.scale(dpr, dpr);

            points = [];
            for (let i = 0; i < pointCount; i++) {
                points.push({
                    // Use width/height (not canvas.width/height) for coordinate math
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
            ctx.fillStyle = accentColor;
            ctx.strokeStyle = accentColor;

            for (let i = 0; i < points.length; i++) {
                let p = points[i];
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw point
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Check distances to draw lines
                for (let j = i + 1; j < points.length; j++) {
                    let p2 = points[j];
                    let dx = p.x - p2.x;
                    let dy = p.y - p2.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        ctx.beginPath();
                        ctx.lineWidth = 1 - (dist / maxDist); // Lines fade as they get further
                        ctx.globalAlpha = 1 - (dist / maxDist);
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', initCanvas);
        initCanvas();
        animate();
        
        function showBackgroundNetwork() {
            canvas.classList.add('visible');
        }

        // --- Announcement Modal (first load per tab) ---
        function initAnnouncementModal() {
            const modal = document.getElementById('announcementModal');
            if (!modal) return null;

            const storageKey = modal.getAttribute('data-announcement-key') || 'del_announcement_seen_v1';
            const closeButtons = modal.querySelectorAll('[data-announcement-close]');
            const panel = modal.querySelector('.announcement-panel');

            function setUiVisibility(hidden) {
                const uiElements = document.querySelectorAll('.nav-interface, .sidebar-toc, .sidebar-directory');
                uiElements.forEach(el => el.style.visibility = hidden ? 'hidden' : 'visible');
            }

            function openAnnouncement() {
                modal.style.display = "flex";
                modal.setAttribute('aria-hidden', 'false');

                document.body.style.overflow = 'hidden';
                setUiVisibility(true);

                const focusTarget = modal.querySelector('[data-announcement-close]');
                if (focusTarget) focusTarget.focus();
            }

            function closeAnnouncement(markSeen = true) {
                modal.style.display = "none";
                modal.setAttribute('aria-hidden', 'true');

                document.body.style.overflow = 'auto';
                setUiVisibility(false);

                if (markSeen) sessionStorage.setItem(storageKey, 'true');
            }

            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeAnnouncement(true);
            });

            if (panel) {
                panel.addEventListener('click', (e) => e.stopPropagation());
            }

            closeButtons.forEach(btn => {
                btn.addEventListener('click', () => closeAnnouncement(true));
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    closeAnnouncement(true);
                }
            });

            return { openAnnouncement, storageKey };
        }

        const announcementController = initAnnouncementModal();

        function maybeShowAnnouncement() {
            if (!announcementController) return;
            if (sessionStorage.getItem(announcementController.storageKey)) return;

            // Let the loader fade-out/UI settle before showing the overlay
            setTimeout(() => {
                if (sessionStorage.getItem(announcementController.storageKey)) return;
                announcementController.openAnnouncement();
            }, 650);
        }

        function showDirectory(){
            const sidebar = document.getElementById('sidebar-directory');
            sidebar.classList.add('visible');

            const toc = document.getElementById('sidebar-toc');
            if(toc) toc.classList.add('visible');

            maybeShowAnnouncement();
        }


        // --- Smooth Horizontal Mouse Scroll for Multiple Grids ---
        document.addEventListener("DOMContentLoaded", function() {
            // Select both grid classes (you can add more here separated by commas)
            const scrollableGrids = document.querySelectorAll('.org-carousel-track, .organ-grid, .char-grid');
            
            // --- CUSTOMIZATION ---
            const ease = 0.25; 
            const scrollSpeed = 1.5; 

            // Loop through every grid found on the page
            scrollableGrids.forEach(grid => {
                
                // These variables are kept private for EACH grid
                let targetScroll = grid.scrollLeft;
                let currentScroll = targetScroll;
                let isAnimating = false;

                grid.addEventListener('wheel', function(e) {
                    // Only take over if they are scrolling vertically
                    if (e.deltaY !== 0) {
                        e.preventDefault();
                        
                        // Update target based on wheel movement
                        targetScroll += (e.deltaY * scrollSpeed);
                        
                        // Keep target within the boundaries of this specific grid
                        const maxScroll = grid.scrollWidth - grid.clientWidth;
                        targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

                        // Start animation loop for this grid if not already running
                        if (!isAnimating) {
                            isAnimating = true;
                            requestAnimationFrame(smoothScroll);
                        }
                    }
                }, { passive: false });

                function smoothScroll() {
                    currentScroll += (targetScroll - currentScroll) * ease;
                    
                    if (Math.abs(targetScroll - currentScroll) < 0.5) {
                        currentScroll = targetScroll;
                        grid.scrollLeft = currentScroll;
                        isAnimating = false;
                    } else {
                        grid.scrollLeft = currentScroll;
                        requestAnimationFrame(smoothScroll);
                    }
                }
            });
        });

        // expand image
        function openModal(imgElement) {
            const modal = document.getElementById("imageModal");
            const modalImg = document.getElementById("fullImage");

            if (!modal || !modalImg) return;

            modal.style.display = "flex";
            modalImg.src = imgElement.src;
            
            // 1. Lock the screen scroll
            document.body.style.overflow = 'hidden';
            
            // 2. Hide problematic UI elements
            const uiElements = document.querySelectorAll('.nav-interface, .sidebar-toc, .sidebar-directory');
            uiElements.forEach(el => el.style.visibility = 'hidden');
        }

        function closeModal() {
            const modal = document.getElementById("imageModal");
            if (modal) modal.style.display = "none";
            
            // 1. Restore scroll
            document.body.style.overflow = 'auto';
            
            // 2. Restore UI elements
            const uiElements = document.querySelectorAll('.nav-interface, .sidebar-toc, .sidebar-directory');
            uiElements.forEach(el => el.style.visibility = 'visible');
        }
        document.addEventListener("DOMContentLoaded", function() {
            function collapseMetadata() {
                if (window.innerWidth <= 768) {
                    // Find all <details> elements in your hub sidebar
                    const categories = document.querySelectorAll('.toc-category');
                    categories.forEach(category => {
                        category.removeAttribute('open');
                    });
                }
            }

            // Run on load
            collapseMetadata();
            
            // Optional: Run on resize if you want it to snap shut when shrinking the window
            window.addEventListener('resize', collapseMetadata);
        });
    
