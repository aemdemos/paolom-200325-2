export default function parse(element, {document}) {
  // Helper function to extract text content or return an empty string if not found
  const getText = (selector, context) => {
    const el = context.querySelector(selector);
    return el ? el.textContent.trim() : '';
  };

  // Helper function to extract the image element
  const getImage = (selector, context) => {
    const img = context.querySelector(selector);
    if (img) {
      const image = document.createElement('img');
      image.src = img.src;
      image.alt = img.alt || '';
      return image;
    }
    return null;
  };

  // Extract cards and convert them into table rows
  const rows = Array.from(element.querySelectorAll('awt-category-card')).map(card => {
    const image = getImage('img[slot="image-category"]', card);
    const titleText = getText('h4 > div', card);
    const descriptionText = getText('p[slot="cardDescription"] span', card);

    const title = document.createElement('strong');
    title.textContent = titleText;

    const description = document.createElement('p');
    description.innerHTML = descriptionText; // Use innerHTML to preserve markup (e.g., <sup>)

    return [image, [title, description]];
  });

  // Add header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  rows.unshift(headerRow);

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}