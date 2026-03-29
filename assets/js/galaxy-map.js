---
---
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
        const colorTexture = textureLoader.load("{{ '/assets/images/Top-down_view_of_the_Milky_Way_annotated.jpg' | relative_url }}");
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

        addSector(0, 0.5, 0, 0.1, "星系核\nGalactic Core", "{{ '/atlas/galactic-core' | relative_url }}");
        addSector(0, 0.5, 5, 0.15, "猎户大星区\nMegasector of Orion", "{{ '/atlas/megasector-of-orion' | relative_url }}");
        addSector(2, 0.5, 4.3, 0.15, "慕洛里斯特别行政星区\nMeurloris District", "{{ '/atlas/meurloris-district' | relative_url }}");
        addSector(-6, 0.5, 2, 0.15, "拉文科尔星区\nLavencole Sector", "{{ '/atlas/lavencole-sector' | relative_url }}");
        addSector(1, 0.5, 4, 0.1, "奥德维克协和星区\nThe Aldwych Concordance", "{{ '/atlas/aldwych-concordance' | relative_url }}");
        addSector(7.5, 0.5, -0.5, 0.1, "埃尔泽兰独立星区\nEllzerand Independent Sector", "{{ '/atlas/ellzerand-independent-sector' | relative_url }}");


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
                //container.style.cursor = 'pointer';
                container.style.cursor = 'url("{{ "/assets/icons/target-2-svgrepo-com.svg" | relative_url }}") 12 12, pointer';
            } else {
                hoveredSector = null;
                info.innerText = null;
                //container.style.cursor = 'default';
                container.style.cursor = 'url("{{ "/assets/icons/target-2-svgrepo-com.svg" | relative_url }}") 12 12, default';
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
                
                const targetColor = isHovered ? colorCyan : colorWhite;
                dot.material.color.lerp(targetColor, 0.1);
                
                const targetScale = isHovered ? 1.5 : 1.0;
                dot.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
            });
            
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    }
});