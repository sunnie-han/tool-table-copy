// Listen for clicks on the browser action
chrome.action.onClicked.addListener(function(tab) {
    // Send message to content script to copy table content
    chrome.tabs.sendMessage(tab.id, {action: 'copyTable'});
  });
  