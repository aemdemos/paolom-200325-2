export default function parse(element, {document}) {
  // Import the WebImporter.DOMUtils.createTable helper
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract navigation items from the provided element
  const navItems = element.querySelectorAll('awtcustom-header-nav-item');

  // Create the header row for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];

  // Create rows based on navigation items
  const rows = Array.from(navItems).map((navItem) => {
    const link = navItem.querySelector('a');

    // Extract content and combine title and description in a single cell
    const title = link ? link.textContent.trim() : '';
    const description = link ? `Navigate to ${link.href}` : '';

    const cellContent = [];

    if (title) {
      const heading = document.createElement('strong');
      heading.textContent = title;
      cellContent.push(heading);
    }

    if (description) {
      const paragraph = document.createElement('p');
      paragraph.textContent = description;
      cellContent.push(paragraph);
    }

    return [cellContent];
  });

  // Combine rows including the header
  const cells = [headerRow, ...rows];

  // Create the block table using createTable
  const block = createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}