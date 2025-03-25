export default function parse(element, {document}) {
  // Extract content from the given element
  const backgroundImg = element.querySelector('img[slot="background-image"]');
  const badgeImg = element.querySelector('img[slot="badge"]');
  const heroText = element.querySelector('awt-hero-text[slot="content"]');

  const titleElement = heroText?.querySelector('span[slot="textTitle"]');
  const descriptionElement = heroText?.querySelector('p[slot="textDescription"]');

  // Helper function to resolve URLs safely
  function resolveURL(src) {
    try {
      return new URL(src, document.baseURI).href;
    } catch {
      return src; // Return the original src if URL resolution fails
    }
  }

  // Helper function to sanitize text content
  function sanitizeText(text) {
    // Remove unsupported superscripts and trim the text
    return text.replace(/<sup[^>]*>.*?<\/sup>/g, '').trim();
  }

  // Create the header row for the block type
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Create separate cells for each piece of content in the content row
  const contentRow = [];

  if (backgroundImg) {
    const imgElement = document.createElement('img');
    imgElement.src = resolveURL(backgroundImg.getAttribute('src'));
    imgElement.alt = backgroundImg.alt || '';
    contentRow.push(imgElement);
  } else {
    contentRow.push(''); // Add empty cell if background image is missing
  }

  if (titleElement) {
    const titleHeading = document.createElement('h1');
    titleHeading.textContent = sanitizeText(titleElement.innerHTML);
    contentRow.push(titleHeading);
  } else {
    contentRow.push(''); // Add empty cell if title is missing
  }

  if (descriptionElement) {
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = sanitizeText(descriptionElement.innerHTML);
    contentRow.push(descriptionParagraph);
  } else {
    contentRow.push(''); // Add empty cell if description is missing
  }

  if (badgeImg) {
    const badgeElement = document.createElement('img');
    badgeElement.src = resolveURL(badgeImg.getAttribute('src'));
    badgeElement.alt = badgeImg.alt || '';
    contentRow.push(badgeElement);
  } else {
    contentRow.push(''); // Add empty cell if badge image is missing
  }

  // Assemble the cells array
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}