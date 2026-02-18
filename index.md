---
layout: default
title: Dust et Lumina
---

<p class = "main-header">尘与辉光</p>
<p class = "motto" style = "letter-spacing: 0.05rem;"> At the end of time, the stars are but dust.
<br>时间的尽头，繁星若尘。</p>

---

<div class = "image-frame">
    <img src="{{ '/assets/image/title.png' | relative_url }}">
</div>


## 核心概念

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

## 星系地理

<div id="galaxy-3d-container" style="width: 95%; height: 70vh; min-height: 500px; position: relative; overflow: hidden;">
    <div id="sector-info" style="position: absolute; top: 20px; left: 20px; color: var(--color-text); font-family: var(--font-mono); letter-spacing: 0.1rem; pointer-events: none; z-index: 10;">
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(init3D, 150);

    function createSoftEdgeTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.5, 'white');
        gradient.addColorStop(1, 'black');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
        return new THREE.CanvasTexture(canvas);
    }

    function init3D() {
        const container = document.getElementById('galaxy-3d-container');
        const info = document.getElementById('sector-info');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const galaxyGeo = new THREE.CircleGeometry(12, 64); 
        const textureLoader = new THREE.TextureLoader();
        const colorTexture = textureLoader.load("{{ '/assets/image/Top-down_view_of_the_Milky_Way_annotated.jpg' | relative_url }}");
        const alphaMask = createSoftEdgeTexture();

        const galaxyMat = new THREE.MeshBasicMaterial({ 
            map: colorTexture, 
            alphaMap: alphaMask,
            transparent: true, 
            opacity: 1.0,
            side: THREE.DoubleSide,
            depthWrite: false, 
            blending: THREE.AdditiveBlending
        });

        const galaxy = new THREE.Mesh(galaxyGeo, galaxyMat);
        galaxy.rotation.x = -Math.PI / 2; 
        scene.add(galaxy);

        const starGeo = new THREE.BufferGeometry();
        const starCount = 4000;
        const starPos = new Float32Array(starCount * 3);
        for(let i=0; i < starCount * 3; i++) {
            starPos[i] = (Math.random() - 0.5) * 300; 
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({ size: 0.1, color: 0xffffff, transparent: true, opacity: 0.6 });
        const starfield = new THREE.Points(starGeo, starMat);
        scene.add(starfield);

        const clickableSectors = [];
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let hoveredSector = null;

        function addSector(x, y, z, r, name, url) {
            const group = new THREE.Group();
            group.position.set(x, y, z);

            const dot = new THREE.Mesh(
                new THREE.SphereGeometry(r, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0xffffff }) 
            );

            const hitbox = new THREE.Mesh(
                new THREE.SphereGeometry(0.8, 16, 16), 
                new THREE.MeshBasicMaterial({ 
                    transparent: true, 
                    opacity: 0, 
                    depthWrite: false 
                }) 
            );

            group.add(dot);
            group.add(hitbox);
            group.userData = { name: name, url: url };
            
            scene.add(group);
            clickableSectors.push(group);
        }

        addSector(0, 0.5, 0, 0.1, "星系核\nGalactic Core", "{{ '/regions/星系核' | relative_url }}");
        addSector(0, 0.5, 5, 0.15, "猎户大星区\nMegasector of Orion", "{{ '/regions/猎户大星区' | relative_url }}");
        addSector(2, 0.5, 4.3, 0.15, "慕洛里斯特别行政星区\nMeurloris District", "{{ '/regions/慕洛里斯特别行政星区' | relative_url }}");
        addSector(-6, 0.5, 2, 0.15, "拉文科尔星区\nLavencole Sector", "{{ '/regions/拉文科尔星区' | relative_url }}");
        addSector(1, 0.5, 4, 0.1, "奥德维克协和星区\nThe Aldwych Concordance", "{{ '/regions/奥德维克协和星区' | relative_url }}");
        addSector(7.5, 0.5, -0.5, 0.1, "埃尔泽兰独立星区\nEllzerand Independent Sector", "{{ '/regions/埃尔泽兰独立星区' | relative_url }}");

        camera.position.set(0, 15, 15);
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = -0.1;
        controls.minDistance = 10;       
        controls.maxDistance = 17;      
        controls.maxPolarAngle = Math.PI / 2 - 0.5; 

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(clickableSectors, true);

            if (intersects.length > 0) {
                const target = intersects[0].object.parent || intersects[0].object;
                hoveredSector = target;
                info.innerText = target.userData.name;
                container.style.cursor = 'pointer';
            } else {
                hoveredSector = null;
                info.innerText = null;
                container.style.cursor = 'default';
            }
        });

        container.addEventListener('click', () => {
            if (hoveredSector) {
                window.location.href = hoveredSector.userData.url;
            }
        });

        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });

        const colorCyan = new THREE.Color(0x00cccc);
        const colorWhite = new THREE.Color(0xffffff);

        function animate() {
            requestAnimationFrame(animate);
            starfield.rotation.y += 0.0001;
            
            clickableSectors.forEach(group => {
                const dot = group.children[0]; 
                const isHovered = (group === hoveredSector);
                
                // 1. Color Lerp
                const targetColor = isHovered ? colorCyan : colorWhite;
                dot.material.color.lerp(targetColor, 0.1);
                
                // 2. Scale Animation (Grows on hover)
                const targetScale = isHovered ? 1.5 : 1.0;
                dot.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
            });
            
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    }
});
</script>

## 组织与势力

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

## 人物档案

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
