export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Attempt to dynamically extract text from the article section
  const articleElement = element.querySelector('awt-article-section');
  const paragraph = articleElement?.querySelector('div[slot="paragraph"]') || document.createElement('div');
  
  // Create header row for the block (using HTML elements, not strings)
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Dynamically extract image element
  const imageElement = element.querySelector('awt-image');
  const image = document.createElement('img');
  image.src = imageElement?.getAttribute('src') || '';

  // Handle edge cases (text and image extraction)
  const rows = [
    headerRow, // Header row
    [paragraph, image] // Content row containing dynamically extracted text and image
  ];

  // Create the block table
  const blockTable = createTable(rows, document);

  // Replace the original element with the block table
  if (blockTable) {
    element.replaceWith(blockTable);
  }
}