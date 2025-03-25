export default function parse(element, {document}) {
  // Utility function to create a formatted header row
  const createHeaderRow = (headerText) => {
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = headerText;
    return headerRow;
  };

  // Extracting and structuring content
  const quoteElement = element.querySelector('.awt-blockquote__title em');
  const attributionElement = element.querySelector('.awt-blockquote__subtitle');

  // Handle cases where elements might be missing
  const quote = quoteElement ? quoteElement.cloneNode(true) : document.createTextNode('');
  const attribution = attributionElement ? attributionElement.cloneNode(true) : document.createTextNode('');

  // Define cells for the block table
  const cells = [
    createHeaderRow('Quote'), // Block name as header
    [quote],                 // Quote content
    [attribution],           // Attribution content
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}