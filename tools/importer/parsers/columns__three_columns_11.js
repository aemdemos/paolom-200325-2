export default function parse(element, {document}) {
  const sections = Array.from(element.querySelectorAll('awt-footer-section'));

  const cells = [];

  // Create the header row
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Create the content rows
  const contentRow = sections.map((section) => {
    const columnContent = document.createElement('div');

    // Add the title
    const title = document.createElement('h2');
    title.textContent = section.getAttribute('footertitle');
    columnContent.appendChild(title);

    // Add the links
    const links = section.querySelectorAll('a');
    links.forEach((link) => {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      columnContent.appendChild(linkElement);
      columnContent.appendChild(document.createElement('br'));
    });

    return columnContent;
  });

  cells.push(contentRow);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}