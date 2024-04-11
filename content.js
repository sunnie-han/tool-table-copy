// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'getTables') {
      // Find all tables on the page
      const tables = document.querySelectorAll('table');
      const tableData = [];
      
      // Loop through each table and collect its data
      tables.forEach(table => {
        const tableContent = [];
        
        // Loop through each row in the table
        table.querySelectorAll('tr').forEach(row => {
          const rowData = [];
          
          // Loop through each cell in the row
          row.querySelectorAll('td, th').forEach(cell => {
            // Get the text content of the cell
            rowData.push(cell.innerText.trim());
          });
          
          // Push the row data to the table content
          tableContent.push(rowData.join('\t'));
        });
        
        // Join the rows with newline character
        const tableText = tableContent.join('\n');
        
        // Push table text to tableData array
        tableData.push(tableText);
      });
      
      // Send table data back to the popup script
      sendResponse({tables: tableData});
    } else if (message.action === 'copyTable') {
      const selectedTableIndex = message.tableIndex;
      
      // Find the selected table and copy its content to clipboard
      const selectedTable = document.querySelectorAll('table')[selectedTableIndex];
      const tableContent = [];
      
      // Loop through each row in the selected table
      selectedTable.querySelectorAll('tr').forEach(row => {
        const rowData = [];
        
        // Loop through each cell in the row
        row.querySelectorAll('td, th').forEach(cell => {
          // Get the text content of the cell
          rowData.push(cell.innerText.trim());
        });
        
        // Push the row data to the table content
        tableContent.push(rowData.join('\t'));
      });
      
      // Join the rows with newline character
      const tableText = tableContent.join('\n');
      
      // Copy table text to clipboard
      navigator.clipboard.writeText(tableText)
        .then(() => {
          console.log('Selected table content copied to clipboard');
        })
        .catch(error => {
          console.error('Failed to copy selected table content to clipboard:', error);
        });
    }
  });
  