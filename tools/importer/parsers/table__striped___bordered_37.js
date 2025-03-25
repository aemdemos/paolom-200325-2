export default function parse(element, {document}) {
  // Extract the flag image, country name, and language link
  const flag = element.querySelector('.map-link-sections-row-flag img');
  const countryName = element.querySelector('.map-link-sections-row-country-name');
  const languageLink = element.querySelector('.map-link-sections-row-country-language a');

  // Validate extracted elements; handle missing data gracefully
  if (!flag || !countryName || !languageLink) {
    console.error('Missing data in the element');
    return;
  }

  // Create cells array for the table
  const cells = [];

  // Header row indicating block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (striped, bordered)';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Content row with the data
  const flagImg = document.createElement('img');
  flagImg.src = flag.getAttribute('src');
  flagImg.alt = flag.getAttribute('alt');

  const countryText = countryName.textContent.trim();

  const languageAnchor = document.createElement('a');
  languageAnchor.href = languageLink.getAttribute('href');
  languageAnchor.textContent = languageLink.textContent.trim();

  cells.push([
    flagImg, // Flag image
    countryText, // Country name (plain text)
    languageAnchor // Language link
  ]);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}