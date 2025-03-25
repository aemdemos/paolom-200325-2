export default function parse(element, {document}) {
  // Helper function to create table rows with content
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract content dynamically from the element
  const tabs = element.querySelectorAll('.tab');

  // Prepare rows for the table
  const rows = [];

  // Add the header row using exact matching from the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';

  const headerRow = [headerCell];
  rows.push(headerRow);

  // Handle missing or empty tabs
  if (!tabs || tabs.length === 0) {
    console.error('No tabs found in the given element.');
    const placeholderRow = [
      'Placeholder Tab',
      'No content available'
    ];
    rows.push(placeholderRow);
  } else {
    // Iterate over each tab to extract label and content
    tabs.forEach((tab) => {
      const label = tab.querySelector('.tab-label');
      const content = tab.querySelector('.tab-content');

      // Handle missing label or content
      if (!label || !content) {
        console.error('Missing label or content in a tab:', tab);
        rows.push([
          'Empty Tab',
          'Content not available'
        ]);
      } else {
        // Create a row for the tab
        const row = [
          label.textContent.trim(),
          content.cloneNode(true) // Clone content to preserve HTML structure
        ];
        rows.push(row);
      }
    });
  }

  // Create the table block
  const blockTable = createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}