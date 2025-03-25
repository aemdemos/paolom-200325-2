export default function parse(element, {document}) {
  // Ensure the header row exactly matches the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];

  // Extract dynamic content from the element
  const titleElement = element.querySelector('p');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Create content cell dynamically (empty for this example)
  const contentCell = document.createElement('div');
  contentCell.textContent = ''; // Placeholder for content

  // Handle edge cases for missing title or content
  if (!title) {
    console.warn('Title is missing from element:', element);
  }

  // Structure rows dynamically
  const rows = [
    headerRow,
    [title || 'Untitled Accordion', contentCell] // Use default if title is missing
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the new block
  element.replaceWith(block);
}