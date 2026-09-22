'use strict';

;
window.addEventListener('load', () => {
    const gttButton = document.getElementById("totop");
    if (!gttButton) return;
    window.onscroll = () => {
        if (
            document.body.scrollTop > 300 ||
            document.documentElement.scrollTop > 300
        ) {
            gttButton.style.visibility = "visible";
            gttButton.style.opacity = "1";
        } else {
            gttButton.style.visibility = "hidden";
            gttButton.style.opacity = "0";
        }
    };
});

;
// Code Copy Functionality
// Adds a copy button to all code blocks

(function () {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCodeCopy);
    } else {
        initCodeCopy();
    }

    function initCodeCopy() {
        const codeBlocks = document.querySelectorAll('pre');

        codeBlocks.forEach((pre) => {
            // Skip if already processed
            if (pre.parentElement?.classList.contains('code-block')) {
                return;
            }

            // -----------------------------
            // Create wrapper
            // -----------------------------
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block';

            // Insert wrapper before <pre>
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);

            // -----------------------------
            // Create copy button
            // -----------------------------
            const button = document.createElement('button');
            button.className = 'code-copy-button';
            button.type = 'button';
            button.setAttribute('aria-label', 'Copy code to clipboard');

            button.innerHTML = `
                <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;

            button.addEventListener('click', function () {
                copyCode(pre, button);
            });

            // Insert button INSIDE wrapper (not inside <pre>)
            wrapper.appendChild(button);
        });
    }

    function copyCode(pre, button) {
        const code = pre.querySelector('code');
        if (!code) return;

        const text = code.textContent || code.innerText;

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showCopied(button);
            }).catch(() => {
                fallbackCopy(text, button);
            });
        } else {
            fallbackCopy(text, button);
        }
    }

    function fallbackCopy(text, button) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.opacity = '0';

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            document.execCommand('copy');
            showCopied(button);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }

        document.body.removeChild(textarea);
    }

    function showCopied(button) {
        button.classList.add('copied');
        setTimeout(() => {
            button.classList.remove('copied');
        }, 2000);
    }

    // Observe dynamic content (SPA-safe)
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(() => initCodeCopy());
        observer.observe(document.body, { childList: true, subtree: true });
    }
})();
;
(function () {
    'use strict';

    const controls = document.querySelector('[data-tts-controls]');
    const content = document.querySelector('[data-tts-content]');

    if (!controls || !content) {
        return;
    }

    const playButton = controls.querySelector('[data-tts-play]');
    const stopButton = controls.querySelector('[data-tts-stop]');
    const playIcon = playButton.querySelector('.tts-icon-play');
    const pauseIcon = playButton.querySelector('.tts-icon-pause');
    const playLabel = playButton.querySelector('[data-tts-play-label]');
    const maxChunkLength = 220;
    let chunks = [];
    let chunkIndex = 0;
    let isReading = false;
    let selectedVoice = null;

    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
        playButton.disabled = true;
        stopButton.disabled = true;
        playButton.title = 'Text-to-speech is not supported by this browser.';
        return;
    }

    function chooseIndianVoice() {
        const voices = window.speechSynthesis.getVoices();
        selectedVoice = voices.find(function (voice) {
            return voice.lang.toLowerCase() === 'en-in';
        }) || voices.find(function (voice) {
            return voice.lang.toLowerCase().startsWith('en-in');
        }) || voices.find(function (voice) {
            return voice.name.toLowerCase().includes('india');
        }) || voices.find(function (voice) {
            return voice.lang.toLowerCase().startsWith('en');
        }) || null;
    }

    function setButtonState(reading) {
        isReading = reading;
        playButton.disabled = false;
        stopButton.disabled = !reading;
        playButton.classList.toggle('is-reading', reading);
        playIcon.hidden = reading;
        pauseIcon.hidden = !reading;
        playLabel.textContent = reading ? 'Pause' : 'Play';
        playButton.setAttribute('aria-label', reading ? 'Pause article' : 'Play article');
    }

    function splitText(text) {
        const words = text.trim().split(/\s+/);
        const result = [];
        let current = '';

        words.forEach(function (word) {
            const candidate = current ? current + ' ' + word : word;
            if (current && candidate.length > maxChunkLength) {
                result.push(current);
                current = word;
            } else {
                current = candidate;
            }
        });

        if (current) {
            result.push(current);
        }

        return result;
    }

    function finishReading() {
        chunks = [];
        chunkIndex = 0;
        setButtonState(false);
    }

    function speakNextChunk() {
        if (!isReading || chunkIndex >= chunks.length) {
            finishReading();
            return;
        }

        const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
            utterance.lang = selectedVoice.lang;
        } else {
            utterance.lang = 'en-IN';
        }
        utterance.onend = function () {
            chunkIndex += 1;
            speakNextChunk();
        };
        utterance.onerror = function (event) {
            // "interrupted" is expected when the user presses Stop.
            if (event.error !== 'interrupted' && event.error !== 'canceled') {
                console.error('Text-to-speech failed:', event.error);
            }
            finishReading();
        };
        window.speechSynthesis.speak(utterance);
    }

    function startReading() {
        const text = content.innerText || content.textContent || '';
        chunks = splitText(text);

        if (!chunks.length) {
            return;
        }

        window.speechSynthesis.cancel();
        chunkIndex = 0;
        setButtonState(true);
        speakNextChunk();
    }

    function stopReading() {
        chunks = [];
        chunkIndex = 0;
        window.speechSynthesis.cancel();
        setButtonState(false);
    }

    playButton.addEventListener('click', function () {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            return;
        }
        if (isReading) {
            window.speechSynthesis.pause();
            return;
        }
        startReading();
    });

    stopButton.addEventListener('click', function () {
        if (isReading) {
            stopReading();
        }
    });

    window.speechSynthesis.addEventListener('voiceschanged', chooseIndianVoice);
    chooseIndianVoice();

    window.addEventListener('beforeunload', function () {
        window.speechSynthesis.cancel();
    });
})();
