export default function parse(element, { document }) {
  const cards = element.querySelectorAll('awt-category-card');

  // Header row indicating the block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const cells = [[headerCell]];

  // Create content rows for each card
  const contentRow = Array.from(cards).map((card) => {
    const link = card.getAttribute('href');

    const titleElement = card.querySelector('h4');
    const descriptionElement = card.querySelector('div');
    const imageElement = card.querySelector('img');

    const title = document.createElement('h3');
    title.textContent = titleElement ? titleElement.textContent.trim() : '';

    const description = document.createElement('p');
    description.innerHTML = descriptionElement ? descriptionElement.innerHTML.trim() : '';

    const image = document.createElement('img');
    if (imageElement) {
      image.src = imageElement.src;
      image.alt = imageElement.alt || '';
    }

    const contentCell = document.createElement('a');
    contentCell.href = link || '#';
    contentCell.append(image, title, description);

    return [contentCell];
  });

  // Combine content rows
  cells.push(contentRow.flat());

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}