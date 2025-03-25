export default function parse(element, {document}) {
  // Helper function to extract text content from an element
  function getTextContent(el) {
    return el ? el.textContent.trim() : '';
  }

  // Define the header row for the block with a strong element
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';
  const headerRow = [headerCell];

  // Extract tab labels and tab contents dynamically
  const tabs = element.querySelectorAll('[role="tab"]');
  const tabContents = element.querySelectorAll('[role="tabpanel"]');

  const rows = [];

  if (tabs.length > 0 && tabContents.length > 0) {
    tabs.forEach((tab, index) => {
      const tabLabel = document.createElement('p');
      tabLabel.textContent = getTextContent(tab);

      const tabContent = tabContents[index];
      const contentContainer = document.createElement('div');
      if (tabContent) {
        contentContainer.innerHTML = tabContent.innerHTML.trim();
      }

      rows.push([tabLabel, contentContainer]);
    });
  } else {
    // Handle missing tabs by extracting meaningful context from the original element
    const extractedLabel = document.createElement('p');
    extractedLabel.textContent = getTextContent(element.querySelector('h1')) || 'No tabs found';

    const extractedContent = document.createElement('p');
    extractedContent.textContent = getTextContent(element.querySelector('p')) || 'No content available';

    rows.push([extractedLabel, extractedContent]);
  }

  // Combine header and rows into cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}