const YouModRename = (function () {
  let defaultTitle = document.title;

  function setTitle(newTitle) {
    if (typeof newTitle === 'string' && newTitle.trim()) {
      document.title = newTitle;
    }
  }

  function resetTitle() {
    document.title = defaultTitle;
  }

  function injectRenamePanel() {
    if (document.getElementById('youmod-title-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'youmod-title-panel';
    panel.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #111;
      color: white;
      padding: 12px;
      border-radius: 8px;
      z-index: 10000;
      font-family: sans-serif;
      box-shadow: 0 0 8px rgba(0,0,0,0.5);
    `;

    panel.innerHTML = `
      <label style="font-size: 0.9em;">Window Title:</label><br/>
      <input type="text" id="youmod-title-input" style="width: 200px; padding: 5px; margin-top: 5px; border-radius: 4px;" />
      <div style="margin-top: 8px;">
        <button id="youmod-title-apply" style="margin-right: 5px;">Apply</button>
        <button id="youmod-title-reset">Reset</button>
      </div>
    `;

    document.body.appendChild(panel);

    document.getElementById('youmod-title-apply').onclick = () => {
      const newTitle = document.getElementById('youmod-title-input').value;
      setTitle(newTitle);
    };

    document.getElementById('youmod-title-reset').onclick = resetTitle;
  }

  function loadFromConfig(config) {
    if (config && config.windowTitle) {
      setTitle(config.windowTitle);
    }
  }

  return {
    init: injectRenamePanel,
    load: loadFromConfig,
    set: setTitle,
    reset: resetTitle
  };
})();
