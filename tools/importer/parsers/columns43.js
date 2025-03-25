export default function parse(element, {document}) {
  // Validate that the element is properly passed and exists
  if (!element || !document) {
    console.error('Invalid element or document provided.');
    return;
  }

  // Extract dynamic tab buttons (e.g., Male, Female)
  const tabButtons = Array.from(element.querySelectorAll('button.awt-tab__btn'));
  if (tabButtons.length === 0) {
    console.warn('No tab buttons found in the element.');
    return;
  }

  // Extract associated images dynamically from the corresponding tab content
  const tabContents = Array.from(element.querySelectorAll('div[slot="content"] awt-image'));
  if (tabContents.length === 0) {
    console.warn('No images found in the tab content sections.');
    return;
  }

  // Create header row dynamically and ensure it matches the example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Generate content row dynamically
  const contentRow = tabButtons.map((button, index) => {
    const container = document.createElement('div');

    // Add button text dynamically
    const buttonText = document.createElement('p');
    buttonText.textContent = button.textContent;
    container.appendChild(buttonText);

    // Add any associated image dynamically (if it exists)
    const imageElement = document.createElement('img');
    const imageData = tabContents[index];
    if (imageData) {
      imageElement.src = imageData.getAttribute('src') || '';
      imageElement.alt = imageData.getAttribute('altimage') || '';
      container.appendChild(imageElement);
    }

    return container;
  });

  // Assemble the cells array for the block structure
  const cells = [
    headerRow, // Header row must match the example exactly
    contentRow // Dynamically populated row with content
  ];

  // Generate the table block via WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly structured block
  element.replaceWith(block);
}