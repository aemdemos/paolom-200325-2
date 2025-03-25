export default function parse(element, {document}) {
  // Import the WebImporter.DOMUtils.createTable function
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract footer sections dynamically
  const sections = element.querySelectorAll('awt-footer-section');

  // Map sections to table cells
  const cells = Array.from(sections).map(section => {
    const header = document.createElement('strong');
    header.textContent = section.getAttribute('footertitle') || 'Untitled';

    const links = Array.from(section.querySelectorAll('a')).map(link => {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.target = link.target;
      linkElement.innerHTML = link.innerHTML || 'Untitled link';
      return linkElement;
    });

    return [header, ...links];
  });

  // Add header row with exact match to the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const tableData = [headerRow, ...cells];

  // Create the table using createTable utility
  const table = createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(table);
}