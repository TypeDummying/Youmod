(function YouModYouTubeOnly() {
  const validHosts = [
    'www.youtube.com',
    'm.youtube.com',
    'youtube.com'
  ];

  const isYouTube = validHosts.includes(location.hostname);

  if (!isYouTube) {
    console.warn('[YouMod] Not on a valid YouTube domain. Blocking execution.');
    return;
  }

  console.log('[YouMod] Running on YouTube. Proceeding to load modules...');

  // Dynamically load other YouMod modules
  const scripts = [
    'inject.js',
    'JSON.js',
    'appmods.js',
    'renamewindow.js'
  ];

  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = chrome.runtime ? chrome.runtime.getURL(src) : src;
    script.type = 'text/javascript';
    document.head.appendChild(script);
  });
})();
