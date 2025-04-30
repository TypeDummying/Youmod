const AppMods = (function () {
  // Apply general styles from JSON config
  function applyGlobalCSS(cssString) {
    const style = document.createElement('style');
    style.id = 'appmods-global-css';
    style.textContent = cssString;
    document.head.appendChild(style);
  }

  // Apply element-specific animations
  function applyElementAnimations(animations) {
    const style = document.createElement('style');
    style.id = 'appmods-animation-css';
    let css = '';

    for (const selector in animations) {
      const { keyframes, duration = '0.5s', timing = 'ease', iteration = '1' } = animations[selector];
      const animationName = `appmod_${btoa(selector).replace(/[^a-z0-9]/gi, '')}`;

      css += `
        @keyframes ${animationName} {
          ${keyframes}
        }
        ${selector} {
          animation: ${animationName} ${duration} ${timing} ${iteration};
        }
      `;
    }

    style.textContent = css;
    document.head.appendChild(style);
  }

  // Dynamically change DOM structure/behavior
  function applyFunctionalMods(mods) {
    if (!Array.isArray(mods)) return;

    mods.forEach(mod => {
      if (!mod.selector || !mod.action) return;
      const elements = document.querySelectorAll(mod.selector);

      elements.forEach(el => {
        switch (mod.action) {
          case 'remove':
            el.remove();
            break;
          case 'hide':
            el.style.display = 'none';
            break;
          case 'setAttribute':
            if (mod.attribute && mod.value !== undefined) {
              el.setAttribute(mod.attribute, mod.value);
            }
            break;
          case 'addEventListener':
            if (mod.event && mod.handlerCode) {
              try {
                const handler = new Function('event', mod.handlerCode);
                el.addEventListener(mod.event, handler);
              } catch (err) {
                console.error('AppMods: Failed to bind event', err);
              }
            }
            break;
        }
      });
    });
  }

  // Observe and react to DOM changes
  function initMutationWatcher(callback, filterSelector = 'body') {
    const observer = new MutationObserver(callback);
    const target = document.querySelector(filterSelector);
    if (target) {
      observer.observe(target, {
        childList: true,
        subtree: true,
        attributes: true
      });
    }
  }

  // Main entry point
  function loadAppMods(config) {
    if (config.globalCSS) {
      applyGlobalCSS(config.globalCSS);
    }
    if (config.animations) {
      applyElementAnimations(config.animations);
    }
    if (config.mods) {
      applyFunctionalMods(config.mods);
    }
    if (config.watchDOM && typeof config.watchDOM === 'function') {
      initMutationWatcher(config.watchDOM);
    }
  }

  return {
    load: loadAppMods
  };
})();
