export default function parse(element, {document}) {
  const cells = [];

  // Correct the header row to match the example exactly
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Extract the main content sections
  const article = element.querySelector('awt-article');
  const paragraphs = article ? article.querySelectorAll('awt-article-section div[slot="paragraph"] p') : [];
  const span = article ? article.querySelector('awt-article-section div[slot="paragraph"] span') : null;

  // Add the content from paragraphs into the second row
  const contentRow = [];
  paragraphs.forEach((paragraph) => {
    contentRow.push(paragraph.cloneNode(true));
  });
  if (span) {
    contentRow.push(span.cloneNode(true));
  }
  if (contentRow.length > 0) {
    cells.push(contentRow);
  }

  // Extract comparison images
  const imageComparison = element.querySelector('.awt-image-comparison');
  const beforeImage = imageComparison ? imageComparison.querySelector('figure:not(.awt-image-comparison__figure--overlay) img') : null;
  const afterImage = imageComparison ? imageComparison.querySelector('figure.awt-image-comparison__figure--overlay img') : null;

  const imageRow = [];
  if (beforeImage) {
    imageRow.push(beforeImage.cloneNode(true));
  }
  if (afterImage) {
    imageRow.push(afterImage.cloneNode(true));
  }
  if (imageRow.length > 0) {
    cells.push(imageRow);
  }

  // Create table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}