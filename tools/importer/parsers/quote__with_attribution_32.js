export default function parse(element, {document}) {
  // Helper function to create structured row data for the table
  function createRow(blockType, content, attribution) {
    const headerCell = document.createElement('strong');
    headerCell.textContent = blockType;
    const headerRow = [headerCell];

    return [
      headerRow, // Block type header
      [content], // Quote content
      [attribution || 'No attribution available'], // Attribution content with fallback
    ];
  }

  // Parse the relevant data from the element
  const quoteElement = element.querySelector('.awt-blockquote__title');
  const attributionElement = element.querySelector('.awt-blockquote__subtitle');

  const quoteText = quoteElement ? quoteElement.innerHTML : '';
  const attributionText = attributionElement ? attributionElement.innerHTML : 'No attribution available';

  // Create the table cells
  const cells = createRow('Quote', quoteText, attributionText);

  // Create the table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}