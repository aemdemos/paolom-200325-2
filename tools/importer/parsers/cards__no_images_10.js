export default function parse(element, {document}) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];

  const rows = [headerRow];

  const listItems = element.querySelectorAll('li');
  listItems.forEach(item => {
    const rowContent = document.createElement('div');

    // Extract the text content
    rowContent.textContent = item.textContent.trim();

    rows.push([rowContent]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}