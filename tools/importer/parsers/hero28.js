export default function parse(element, {document}) {
  const cells = [];

  // Header row with block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract content from the element
  const title = element.querySelector('.awt-error-page__title');
  const description = element.querySelector('.awt-error-page__description');
  const buttons = element.querySelectorAll('awt-btn');

  // Create content for the second row
  const contentRow = [];

  if (title) {
    const titleHeading = document.createElement('h1');
    titleHeading.textContent = title.textContent;
    contentRow.push(titleHeading);
  }

  if (description) {
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.innerHTML = description.innerHTML;
    contentRow.push(descriptionParagraph);
  }

  buttons.forEach((button) => {
    const buttonLink = document.createElement('a');
    buttonLink.href = button.getAttribute('href');
    buttonLink.textContent = button.textContent;
    buttonLink.className = 'cta-button';
    contentRow.push(buttonLink);
  });

  cells.push([contentRow]);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}