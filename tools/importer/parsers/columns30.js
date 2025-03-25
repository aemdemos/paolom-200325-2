export default function parse(element, {document}) {
  // Step 1: Create a header for the table with the block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns'; // Matches the example block name
  const headerRow = [headerCell];

  // Step 2: Extract content dynamically from the element
  const titleParagraph = element.querySelector('.awt-error-page__title');
  const descriptionParagraph = element.querySelector('.awt-error-page__description');

  const titleContent = titleParagraph ? titleParagraph.textContent : '';
  const descriptionContent = descriptionParagraph ? descriptionParagraph.innerHTML : '';

  const buttons = element.querySelectorAll('awt-btn');
  const buttonLinks = Array.from(buttons).map(btn => {
    const link = document.createElement('a');
    link.href = btn.getAttribute('href');
    link.textContent = btn.textContent.trim();
    return link;
  });

  // Step 3: Combine extracted content and buttons into a single multi-column row
  const contentRow = [titleContent, descriptionContent, buttonLinks];

  // Step 4: Construct the cells array for the table
  const cells = [
    headerRow, // Header row indicating block type
    contentRow // Multi-column row with extracted text and buttons
  ];

  // Step 5: Use the helper function to create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Step 6: Replace the original element with the new block table
  element.replaceWith(blockTable);
}