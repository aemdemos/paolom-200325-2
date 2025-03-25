export default function parse(element, {document}) {
  // Extract all awt-category-card elements
  const cards = Array.from(element.querySelectorAll('awt-category-card'));

  // Validate that cards exist
  if (cards.length === 0) return;

  // Header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  const cells = [headerRow];

  // Extract content dynamically from each card
  cards.forEach((card) => {
    const image = document.createElement('img');
    const imgElement = card.querySelector('img');
    if (imgElement) {
      image.src = imgElement.src;
      image.alt = imgElement.alt;
    }

    const title = document.createElement('h4');
    const titleElement = card.querySelector('h4');
    if (titleElement) {
      title.textContent = titleElement.textContent;
    }

    const description = document.createElement('p');
    const descriptionElement = card.querySelector('p');
    if (descriptionElement) {
      description.innerHTML = descriptionElement.innerHTML;
    }

    // Place each card's content in a separate row
    cells.push([image, title, description]);
  });

  // Create table using helper method
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new table
  element.replaceWith(table);
}