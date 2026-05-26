window.addEventListener('load', function() {
    const img = document.getElementById('cover-image');
    const wrapper = document.querySelector('.cover-wrapper');

    if (img && wrapper) {
        if (img.complete) { extractColor(); } 
        else { img.addEventListener('load', extractColor); }
    }

    // Helper: Convert RGB to HSL
    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h * 360, s * 100, l * 100];
    }

    function extractColor() {
        try {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 1;
            canvas.height = 1;

            context.drawImage(img, 0, 0, 1, 1);
            const d = context.getImageData(0, 0, 1, 1).data;

            let [h, s, l] = rgbToHsl(d[0], d[1], d[2]);

            s = Math.max(s, 30); 

            l = Math.min(Math.max(l, 40), 60);

            const dynamicColor = `hsl(${h}, ${s}%, ${l}%)`;
            wrapper.style.setProperty('--dynamic-hue', dynamicColor);
            
            console.log(`LOGIX_SATURATION_BOOST: ${dynamicColor}`);
        } catch (e) {
            console.error("LOGIX_IMG_ERR: Pixel read blocked.", e);
        }
    }
});
