function openPositionedWindow(position) {
  chrome.system.display.getInfo((displays) => {
    const display = displays[0].workArea;
    const width = 600;
    const height = 400;

    let top = 0;
    let left = 0;

    switch (position) {
      case 1: left = 0; top = 0; break;
      case 2: left = display.width / 2 - width / 2; top = 0; break;
      case 3: left = display.width - width; top = 0; break;
      case 4: left = 0; top = display.height - height; break;
      case 5: left = display.width / 2 - width / 2; top = display.height - height; break;
      case 6: left = display.width - width; top = display.height - height; break;
    }

    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "popup",
      width,
      height,
      top: Math.round(top),
      left: Math.round(left),
      focused: true
    });
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'openAndPosition') {
    chrome.storage.local.get('position', ({ position }) => {
      if (position) openPositionedWindow(position);
    });
  }
});

// 👇 Automatically launch on install or startup
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get('position', ({ position }) => {
    if (position) openPositionedWindow(position);
  });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get('position', ({ position }) => {
    if (position) openPositionedWindow(position);
  });
});
