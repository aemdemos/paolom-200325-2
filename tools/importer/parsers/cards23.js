export default function parse(element, {document}) {
  // Extract awt-resource-item elements
  const items = element.querySelectorAll('awt-resource-item');

  // Create cells array for table
  const cells = [];

  // Add header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  cells.push(headerRow);

  // Iterate over items to generate rows
  items.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.getAttribute('href');
    link.target = '_blank';
    link.textContent = 'PDF';

    const text = document.createElement('p');
    text.innerHTML = item.getAttribute('text');

    // Create row with icon and text
    const row = [link, text];
    cells.push(row);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}