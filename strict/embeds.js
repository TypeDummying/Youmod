(function YouModEmbeds() {
  // Detect if running inside an embedded YouTube player
  const isEmbed = location.pathname.startsWith('/embed/') || location.hostname === 'www.youtube-nocookie.com';

  if (!isEmbed) {
    console.warn('[YouMod] Not a YouTube embed. Skipping embed handler.');
    return;
  }

  console.log('[YouMod] Running inside an embedded YouTube player.');

  // Optional overlay for control or watermark
  function addOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'youmod-embed-overlay';
    overlay.style.cssText = `
      position: absolute;
      top: 8px;
      left: 8px;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-family: sans-serif;
      z-index: 9999;
      pointer-events: none;
    `;
    overlay.textContent = 'YouMod Embed';
    document.body.appendChild(overlay);
  }

  // Modify player styling if desired
  function customizePlayer() {
    const style = document.createElement('style');
    style.textContent = `
      body {
        background-color: #000 !important;
      }
      video {
        border-radius: 8px;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
  }

  // Future: Track events or play state
  function setupEventTracking() {
    const interval = setInterval(() => {
      const player = document.querySelector('video');
      if (player) {
        player.addEventListener('play', () => console.log('[YouMod] Video started'));
        player.addEventListener('pause', () => console.log('[YouMod] Video paused'));
        player.addEventListener('ended', () => console.log('[YouMod] Video ended'));
        clearInterval(interval);
      }
    }, 500);
  }

  // Run when DOM is ready
  const init = () => {
    addOverlay();
    customizePlayer();
    setupEventTracking();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
