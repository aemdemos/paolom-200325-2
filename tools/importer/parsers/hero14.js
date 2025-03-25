export default function parse(element, {document}) {
  // Extracting elements from the original HTML structure
  const container = element?.querySelector('awt-container');
  if (!container) return; // Early exit if container is not found

  const backgroundImage = container.querySelector('img[slot="background"]');
  const article = container.querySelector('awt-article');
  const standfirst = article?.getAttribute('standfirst');
  const button = article?.querySelector('awt-btn');

  // Creating structured content
  const cells = [];

  // Adding block name as header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Adding content row
  const contentRow = [];

  // Background image
  if (backgroundImage) {
    const imageElement = document.createElement('img');
    imageElement.src = backgroundImage.src;
    imageElement.alt = backgroundImage.alt || '';
    contentRow.push(imageElement);
  }

  // Title (standfirst as heading)
  if (standfirst) {
    const titleElement = document.createElement('h1');

    // Safely parse and append inline HTML content manually
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = standfirst;
    Array.from(tempContainer.childNodes).forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE || child.nodeType === Node.TEXT_NODE) {
        titleElement.appendChild(child.cloneNode(true));
      }
    });

    contentRow.push(titleElement);
  }

  // Call-to-action button
  if (button) {
    const buttonElement = document.createElement('a');
    buttonElement.href = button.getAttribute('href');
    buttonElement.textContent = button.textContent.trim();
    contentRow.push(buttonElement);
  }

  // Avoid creating empty rows
  if (contentRow.length > 0) {
    cells.push(contentRow);
  }

  // Creating the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(blockTable);
}