export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract content
  const diagnosisSection = element.querySelector('awt-article-section div[slot="paragraph"]');
  const diagnosisText = diagnosisSection ? diagnosisSection.textContent.trim() : 'No diagnosis text available';

  const videoThumbnail = element.querySelector('awt-wistia-video img[slot="thumbnail"]');
  const videoThumbnailElement = videoThumbnail ? videoThumbnail.cloneNode(true) : document.createTextNode('No video available');

  // Correctly structure the first cell with a list
  const list = document.createElement('ul');
  const listItem1 = document.createElement('li');
  listItem1.textContent = 'Diagnosis';
  const listItem2 = document.createElement('li');
  listItem2.textContent = diagnosisText;
  list.appendChild(listItem1);
  list.appendChild(listItem2);

  // Prepare the table header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Prepare the content row
  const contentRow = [
    list,
    videoThumbnailElement
  ];

  // Generate the table
  const cells = [headerRow, contentRow];
  const blockTable = createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}