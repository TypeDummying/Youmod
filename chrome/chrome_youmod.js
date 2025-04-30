// chrome_youmod.js
(() => {
  if (!location.hostname.includes('youtube.com')) return;

  const injectYouMod = () => {
    if (document.getElementById('youmod-panel')) return; // Avoid duplication

    // --- PANEL ---
    const panel = document.createElement('div');
    panel.id = 'youmod-panel';
    panel.style.cssText = `
      position: fixed;
      top: 70px;
      right: 20px;
      width: 320px;
      background: #111;
      color: white;
      padding: 15px;
      border-radius: 10px;
      z-index: 10000;
      display: none;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      font-family: sans-serif;
    `;

    panel.innerHTML = `
      <h2 style="margin-top:0;">YouMod</h2>
      <input type="file" id="youmod-import" accept=".json" style="margin-bottom:10px;" />
      <p id="youmod-msg" style="color:lightgray; font-size:0.9em;"></p>
    `;
    document.body.appendChild(panel);

    // --- TOGGLE BUTTON ---
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'YouMod';
    toggleBtn.style.cssText = `
      position: fixed;
      top: 15px;
      right: 20px;
      background: #cc0000;
      color: white;
      border: none;
      padding: 8px 14px;
      border-radius: 6px;
      font-weight: bold;
      z-index: 10000;
      cursor: pointer;
    `;
    toggleBtn.onclick = () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    };
    document.body.appendChild(toggleBtn);

    // --- IMPORT HANDLER ---
    document.getElementById('youmod-import').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          if (!json.styles && !json.customCSS) {
            showMessage("Invalid JSON: Missing 'styles' or 'customCSS'.", true);
            return;
          }
          applyYouMod(json);
          showMessage("Styles applied!");
        } catch (err) {
          showMessage("Failed to parse JSON.", true);
        }
      };
      reader.readAsText(file);
    });

    const showMessage = (msg, isError = false) => {
      const msgEl = document.getElementById('youmod-msg');
      msgEl.textContent = msg;
      msgEl.style.color = isError ? 'tomato' : 'lightgreen';
    };

    // --- APPLY STYLES ---
    const applyYouMod = (config) => {
      if (config.styles) {
        for (const selector in config.styles) {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            Object.assign(el.style, config.styles[selector]);
          });
        }
      }
      if (config.customCSS) {
        const styleEl = document.createElement('style');
        styleEl.textContent = config.customCSS;
        document.head.appendChild(styleEl);
      }
    };
  };

  // Wait for DOM
  const waitInterval = setInterval(() => {
    if (document.readyState === 'complete' || document.querySelector('#masthead')) {
      clearInterval(waitInterval);
      injectYouMod();
    }
  }, 500);
})();
