const GOOGLE_ORIGIN = 'https://www.google.com';

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({
    path: 'sidepanel.html',
    enabled: true
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);

  if (url.origin === GOOGLE_ORIGIN) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: tru
    });
  } else {
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: "panel.html",
    type: "popup",
    width: Math.round(window.screen.width * 0.3),
    height: window.screen.height,
    left: Math.round(window.screen.width * 0.7),
    top: 0
  });
});