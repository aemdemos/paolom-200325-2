export default function parse(element, {document}) {
  const cells = [];

  // Header Row - Block Name (EXACT MATCH to example header row)
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Validate and extract tab menu structure
  const tabMenu = element.querySelector('awt-tab-menu');
  if (!tabMenu) {
    console.error('awt-tab-menu not found in the provided element.');
    return;
  }

  const tabItems = tabMenu.querySelectorAll('awt-tab-item');
  if (!tabItems.length) {
    console.error('No awt-tab-item elements found inside awt-tab-menu.');
    return;
  }

  // Content Row - Extract tab data
  const contentRow = []; // Content row for columns

  tabItems.forEach((tabItem) => {
    const titleText = tabItem.querySelector('button')?.textContent || 'Untitled'; // Extract tab title dynamically and handle missing titles

    // Content extraction from the tab content
    const contentId = tabItem.getAttribute('contentid');
    const content = tabMenu.querySelector(`#${contentId}`);
    const image = content?.querySelector('awt-image');

    if (image) {
      const imgElement = document.createElement('img');
      imgElement.src = image.getAttribute('src');
      imgElement.alt = image.getAttribute('altimage') || 'No description available'; // Handle missing alt text

      const columnContent = [
        document.createTextNode(titleText), // Tab title dynamically extracted
        imgElement, // Image dynamically extracted
      ];

      contentRow.push(columnContent);
    } else {
      contentRow.push([document.createTextNode(titleText)]); // Handle empty image case
    }
  });

  cells.push(contentRow);

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}