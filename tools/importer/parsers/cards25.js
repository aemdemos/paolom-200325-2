export default function parse(element, {document}) {
  const cards = element.querySelectorAll('awt-category-card');

  // Initialize the cells array with the header row matching the example
  const cells = [['Cards']];

  // Iterate through each card to extract content dynamically
  cards.forEach(card => {
    const image = card.querySelector('img');
    const title = card.querySelector('.awt-category-card__title div');
    const description = card.querySelector('p');

    // Handle missing data gracefully
    const imageElement = document.createElement('img');
    imageElement.src = image ? image.src : '';
    imageElement.alt = image ? image.alt : '';

    const titleElement = document.createElement('strong');
    titleElement.textContent = title ? title.textContent : '';

    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = description ? description.innerHTML : '';

    // Add rows with extracted elements to the cells array
    cells.push([
      imageElement,
      [titleElement, descriptionElement]
    ]);
  });

  // Create the table using the provided utility function
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element with the new table
  element.replaceWith(table);
}