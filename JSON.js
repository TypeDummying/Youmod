const YouModJSON = (function () {
  function validateJSONStructure(json) {
    if (typeof json !== 'object' || json === null) return false;

    if (json.styles && typeof json.styles !== 'object') return false;
    if (json.customCSS && typeof json.customCSS !== 'string') return false;

    return true;
  }

  function parseJSONFile(file, callback, errorCallback) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      try {
        const json = JSON.parse(evt.target.result);
        if (validateJSONStructure(json)) {
          callback(json);
        } else {
          errorCallback("Invalid JSON structure.");
        }
      } catch (e) {
        errorCallback("Error parsing JSON: " + e.message);
      }
    };
    reader.readAsText(file);
  }

  function exportJSON(config) {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "youmod-config.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  return {
    parse: parseJSONFile,
    export: exportJSON,
    validate: validateJSONStructure
  };
})();
