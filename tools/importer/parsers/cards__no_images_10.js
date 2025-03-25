export default function parse(element, { document }) {
  // Helper function to create a row for a card
  const createCardRow = (content) => {
    const contentCell = document.createElement('p');
    contentCell.innerHTML = content;
    return [contentCell];
  };

  // Verify element is valid and contains expected structure
  if (!element) {
    console.error('Invalid element provided');
    return;
  }

  const articleSections = element.querySelectorAll('awt-article-section ul');
  if (!articleSections.length) {
    console.error('No content found in the provided element');
    return;
  }

  // Extract content from awt-article-section elements
  const cards = [];
  articleSections.forEach((ul) => {
    const listItems = ul.querySelectorAll('li');
    listItems.forEach((li) => {
      // Handle edge case where list item might be empty
      if (li && li.innerHTML.trim()) {
        cards.push(createCardRow(li.innerHTML.trim()));
      }
    });
  });

  // Create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];

  // Build table rows
  const rows = [headerRow, ...cards];

  // Handle edge case where no valid cards are found
  if (rows.length === 1) { // Only header row exists
    console.error('No valid card content found to create table');
    return;
  }

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}