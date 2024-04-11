// Send message to content script to get tables on the page
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'getTables'}, function(response) {
      const tableSelect = document.getElementById('tableSelect');
      
      // Add each table as an option in the select element
      response.tables.forEach((table, index) => {
        const option = document.createElement('option');
        option.text = `Table ${index + 1}`;
        option.value = index;
        tableSelect.appendChild(option);
      });
    });
  });
  
  // Add click event listener to copy button
  document.getElementById('copyButton').addEventListener('click', function() {
    const selectedTableIndex = document.getElementById('tableSelect').value;
    
    // Send message to content script to copy selected table content
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'copyTable', tableIndex: selectedTableIndex});
    });
  });
  