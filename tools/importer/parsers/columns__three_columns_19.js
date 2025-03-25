export default function parse(element, {document}) {
  // Create the header row (fixing the issue with mismatched header)
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract data into structured columns
  const sections = element.querySelectorAll('awt-footer-section');
  const columns = Array.from(sections).map((section) => {
    const title = section.getAttribute('footertitle');
    const links = Array.from(section.querySelectorAll('a'));

    // Create elements for section title
    const titleElement = document.createElement('strong');
    titleElement.textContent = title;

    // Create a list for the links
    const list = document.createElement('ul');
    links.forEach((link) => {
      const listItem = document.createElement('li');
      listItem.appendChild(link);
      list.appendChild(listItem);
    });

    // Group title and links in a single cell
    return [titleElement, list];
  });

  // Ensure the cells array contains the header row and content rows
  const cells = [headerRow, columns.map(column => column)];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}