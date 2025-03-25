export default function parse(element, {document}) {
  // Create the header row using proper HTML elements
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract the "Previous events" text and dynamically build the list of links
  const previousEventsText = element.querySelector('awt-article[standfirst]')?.getAttribute('standfirst') || '';
  const links = Array.from(element.querySelectorAll('ul li a')).map((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.target = link.target;
    anchor.rel = link.rel;
    anchor.textContent = link.textContent;
    const listItem = document.createElement('li');
    listItem.appendChild(anchor);
    return listItem;
  });

  const linkList = document.createElement('ul');
  links.forEach((listItem) => linkList.appendChild(listItem));

  // Extract and dynamically handle the image
  const image = element.querySelector('awt-image');
  let imageElement = null;
  if (image && image.getAttribute('src')) {
    imageElement = document.createElement('img');
    imageElement.src = image.getAttribute('src');
    imageElement.alt = image.getAttribute('altimage') || '';
  }

  // Create structured content rows for the table
  const cells = [
    headerRow,
    [previousEventsText, imageElement],
    [linkList]
  ];

  // Use the helper function to create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}