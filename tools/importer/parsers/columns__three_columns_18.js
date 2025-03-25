export default function parse(element, {document}) {
  // Helper to safely extract text content
  const getTextContent = (el) => el ? el.textContent?.trim() || '' : '';

  const createCard = (card) => {
    const titleElement = card.querySelector('.awt-category-card__title');
    const title = getTextContent(titleElement);

    const descriptionElement = card.querySelector('p[slot="cardDescription"]');
    const description = descriptionElement ? descriptionElement.innerHTML.trim() : '';

    const imageElement = card.querySelector('img');
    const image = imageElement ? (() => {
      const img = document.createElement('img');
      img.src = imageElement.src;
      img.alt = imageElement.alt || '';
      return img;
    })() : '';

    const linkElement = card.querySelector('awt-btn');
    const link = linkElement ? (() => {
      const a = document.createElement('a');
      a.href = linkElement.getAttribute('href');
      a.textContent = getTextContent(linkElement);
      return a;
    })() : '';

    return [image, (() => {
      const h2 = document.createElement('h2');
      h2.textContent = title;
      return h2;
    })(), description, link];
  };

  // Parse all cards
  const cards = Array.from(element.querySelectorAll('awt-category-card'));
  const cardCells = cards.map(createCard);

  // Add block type as header row
  const headerRow = [(() => {
    const strong = document.createElement('strong');
    strong.textContent = 'Columns';
    return strong;
  })()];

  // Create cells array for the table
  const cells = [
    headerRow,
    ...cardCells
  ];

  // Generate the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}