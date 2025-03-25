export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract the image
  const imageElement = element.querySelector('.awt-accordion-card__preview-image img');
  const image = document.createElement('img');
  image.src = imageElement?.src || '';

  // Extract the description
  const descriptionElement = element.querySelector('.awt-accordion-card__preview-description p');
  const description = document.createElement('p');
  description.textContent = descriptionElement?.textContent || '';

  // Extract the history text
  const historyElement = element.querySelector('.awt-accordion-card__history');
  const paragraphs = Array.from(historyElement?.querySelectorAll('p') || []).map((p) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = p.textContent;
    return paragraph;
  });

  // Prepare the table header
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Check for missing or empty elements and handle gracefully
  const mainContent = [];
  if (image.src || description.textContent) {
    mainContent.push([image, description]);
  }
  if (paragraphs.length > 0) {
    mainContent.push(paragraphs);
  } else {
    const emptyParagraph = document.createElement('p');
    emptyParagraph.textContent = 'No additional content available';
    mainContent.push([emptyParagraph]);
  }

  // Create the table content
  const cells = [
    // Header row
    headerRow,

    // Main content rows dynamically from extracted content
    ...mainContent,
  ];

  const table = createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}