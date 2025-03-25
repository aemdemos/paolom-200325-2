export default function parse(element, {document}) {
  // Extracting the relevant elements within the hero section
  const imageElement = element.querySelector('[slot="background-image"]');
  const badgeElement = element.querySelector('[slot="badge"]');
  const heroTextElement = element.querySelector('awt-hero-text[slot="content"]');

  // Extracting the title and description text
  const titleElement = heroTextElement?.querySelector('[slot="textTitle"]');
  const descriptionElement = heroTextElement?.querySelector('[slot="textDescription"]');

  // Structuring the content for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const contentRow = [];

  if (imageElement) {
    const bgImage = document.createElement('img');
    bgImage.src = imageElement.src;
    bgImage.alt = imageElement.alt || '';
    contentRow.push(bgImage);
  }

  if (titleElement) {
    const title = document.createElement('h1');
    title.textContent = titleElement.textContent;
    contentRow.push(title);
  }

  if (descriptionElement) {
    const description = document.createElement('p');
    description.textContent = descriptionElement.textContent;
    contentRow.push(description);
  }

  if (badgeElement) {
    const badgeImage = document.createElement('img');
    badgeImage.src = badgeElement.src;
    badgeImage.alt = badgeElement.alt || '';
    contentRow.push(badgeImage);
  }

  const cells = [headerRow, contentRow];

  // Creating the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(block);
}