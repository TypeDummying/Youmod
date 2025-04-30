(function() {
  'use strict';

  // Wait until YouTube is loaded
  function waitForYouTubeUI(callback) {
    const interval = setInterval(() => {
      if (document.querySelector('#masthead')) {
        clearInterval(interval);
        callback();
      }
    }, 500);
  }

  waitForYouTubeUI(() => {
    // Create YouMod panel
    const panel = document.createElement('div');
    panel.id = 'youmod-panel';
    panel.style.cssText = `
      position: fixed;
      top: 60px;
      right: 20px;
      width: 300px;
      height: auto;
      background: #111;
      color: white;
      padding: 10px;
      border-radius: 8px;
      z-index: 9999;
      display: none;
      box-shadow: 0 0 10px #000;
    `;

    panel.innerHTML = `
      <h3 style="margin-top: 0;">YouMod Panel</h3>
      <input type="file" id="json-import" accept=".json" />
      <p id="youmod-status" style="font-size: 0.9em; color: #aaa;"></p>
    `;

    document.body.appendChild(panel);

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'YouMod';
    toggleBtn.style.cssText = `
      position: fixed;
      top: 15px;
      right: 20px;
      z-index: 9999;
      background: #cc0000;
      color: white;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;

    toggleBtn.onclick = () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    };

    document.body.appendChild(toggleBtn);

    // Handle JSON import
    document.getElementById('json-import').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const json = JSON.parse(evt.target.result);
          applyYouModStyles(json);
          document.getElementById('youmod-status').textContent = 'Styles applied successfully!';
        } catch (err) {
          document.getElementById('youmod-status').textContent = 'Error parsing JSON.';
        }
      };
      reader.readAsText(file);
    });
  });

  // Apply styles based on JSON keys
  function applyYouModStyles(config) {
    if (config.styles) {
      for (const selector in config.styles) {
        const elements = document.querySelectorAll(selector);
        for (const el of elements) {
          Object.assign(el.style, config.styles[selector]);
        }
      }
    }
    if (config.customCSS) {
      const style = document.createElement('style');
      style.innerText = config.customCSS;
      document.head.appendChild(style);
    }
  }

})();
