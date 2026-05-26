        // --- MathJax (LaTeX) Rendering ---
        document.addEventListener("DOMContentLoaded", function() {
            const contentArea = document.getElementById('obsidian-content');
            if (!contentArea) return;

            function normalizeLegacyBracketMath(container) {
                const paragraphs = container.querySelectorAll('p');

                paragraphs.forEach((p) => {
                    if (p.querySelector('a')) return;

                    const raw = (p.textContent || '').trim();
                    if (!raw.startsWith('[') || !raw.endsWith(']')) return;

                    const inner = raw.slice(1, -1).trim();
                    if (!inner) return;

                    const looksLikeMath = /\\[a-zA-Z]+|=|\\frac|\\sqrt|\\sum|\\int|\^|_/.test(inner);
                    if (!looksLikeMath) return;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'math-display';
                    wrapper.textContent = `\\[${inner}\\]`;
                    p.replaceWith(wrapper);
                });
            }

            function typesetWhenReady() {
                if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
                    normalizeLegacyBracketMath(contentArea);
                    window.MathJax.typesetPromise([contentArea]).catch(() => { });
                    return;
                }

                if (typesetWhenReady.attempts >= 200) return; // ~10s @ 50ms
                typesetWhenReady.attempts += 1;
                setTimeout(typesetWhenReady, 50);
            }
            typesetWhenReady.attempts = 0;

            typesetWhenReady();
        });
