export default function parse(element, {document}) {
  // Extract the title
  const title = element.querySelector('.awt-error-page__title');
  const titleElement = document.createElement('h1');
  titleElement.textContent = title ? title.textContent : '';

  // Extract the description
  const description = element.querySelector('.awt-error-page__description');
  const descriptionElement = document.createElement('p');
  descriptionElement.innerHTML = description ? description.innerHTML : '';

  // Extract the buttons
  const buttons = element.querySelectorAll('awt-btn');
  const buttonElements = Array.from(buttons).map((button) => {
    const link = document.createElement('a');
    link.href = button.getAttribute('href');
    link.textContent = button.textContent;
    return link;
  });

  // Create the table rows
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const cells = [
    headerRow,
    [titleElement, descriptionElement, ...buttonElements],
  ];

  // Create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}