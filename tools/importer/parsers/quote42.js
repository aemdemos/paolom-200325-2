export default function parse(element, {document}) {
  // Extract the content from the input element
  const contentDiv = element.querySelector('awt-article-section div[slot="paragraph"]');
  if (!contentDiv) {
    console.error('No content found to process');
    return;
  }

  const textContent = contentDiv.innerHTML.trim();

  // Create the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Quote';

  // Create the content row
  const contentRow = [document.createElement('div')];
  contentRow[0].innerHTML = textContent;

  // Build the cells array
  const cells = [
    headerRow,
    contentRow,
  ];

  // Generate the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.parentElement.replaceChild(blockTable, element);
}