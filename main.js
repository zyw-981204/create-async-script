const defaultOptions = {
  timeout: 10000,
  charset: "utf-8",
  async: true,
};

function createTimeoutScript(scriptOptions = {}) {
  const mergedOptions = {
    ...defaultOptions,
    ...scriptOptions,
  };

  if (!mergedOptions.src) {
    return null;
  }

  const script = document.createElement("script");

  Object.keys(mergedOptions).forEach((key) => {
    script[key] = mergedOptions[key];
  });

  const { timeout, src, delay, onLoad, onError } = mergedOptions;

  // onload
  script.onload = onScriptLoad;
  script.onerror = onScriptError;
  const timer = setTimeout(
    onScriptFinish,
    Number(timeout) + Number(delay || 0)
  );

  function onScriptFinish() {
    window.stop(src);
    script.onload = script.onerror = null;
    clearTimeout(timer);
  }

  function onScriptLoad() {
    onScriptFinish();
    onLoad && onLoad();
  }

  function onScriptError() {
    onScriptFinish();
    onError && onError();
  }

  return script;
}

function appendScriptToHead(script) {
  if (!script) {
    return;
  }

  let head = document.querySelector("head");
  if (!head) {
    head = document.createElement("head");
    document.appendChild(head);
  }
  head.appendChild(script);
}

export default function (scriptOptions) {
  if (!Array.isArray(scriptOptions) || scriptOptions.length === 0) {
    console.error("scriptOptions 请传入数组");
    return;
  }

  scriptOptions.map((scriptOption) => {
    const script = createTimeoutScript(scriptOption);

    const delay = scriptOption.delay || 0;

    // 支持延迟加载
    setTimeout(() => {
      appendScriptToHead(script);
    }, delay);
  });
}
