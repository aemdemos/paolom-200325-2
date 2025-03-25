export default function parse(element, {document}) {
  // Extract the title from the parent container
  const titleContainer = element.querySelector('awt-article[standfirst]');
  const titleText = titleContainer ? titleContainer.getAttribute('standfirst') : '';

  // Wrap the title in a div to preserve the structure
  const titleElement = document.createElement('div');
  titleElement.textContent = titleText;

  // Extract the list items from the paragraph section
  const listContainer = element.querySelector('awt-article-section > div[slot="paragraph"] ul');
  const listItems = listContainer ? Array.from(listContainer.querySelectorAll('li')).map(li => {
    const link = li.querySelector('a');
    const listItemElement = document.createElement('li');
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      listItemElement.append(linkElement);
    } else {
      listItemElement.textContent = li.textContent;
    }
    return listItemElement;
  }) : [];

  const listElement = document.createElement('ul');
  listElement.append(...listItems);

  // Extract the image if present
  const imageContainer = element.querySelector('awt-image');
  let imageElement = null;
  if (imageContainer) {
    const img = document.createElement('img');
    img.src = imageContainer.getAttribute('src');
    img.alt = imageContainer.getAttribute('altimage') || '';
    imageElement = img;
  }

  // Create a structured table using WebImporter.DOMUtils.createTable
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';

  const cells = [
    [headerCell], // Header row
    [titleElement, imageElement], // First content row
    [listElement, ''] // Second content row with list and placeholder
  ];

  const newBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(newBlock);
}