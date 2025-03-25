export default function parse(element, {document}) {
  // Check if the element contains the contentDiv
  const contentDiv = element.querySelector('awt-article-section > div[slot="paragraph"]');
  if (!contentDiv) return;

  // Extract the innerHTML of the content section
  const textContent = contentDiv.innerHTML;

  // Create header row with the block name "Quote"
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Quote';

  // Create content row and set its innerHTML to extracted content
  const contentRow = [document.createElement('div')];
  contentRow[0].innerHTML = textContent;

  // Arrange rows into a two-dimensional array of cells (header + content)
  const cells = [
    headerRow,   // First row holds the block name
    contentRow,  // Second row holds the quote content
  ];

  // Create the block using the WebImporter DOM utility function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}