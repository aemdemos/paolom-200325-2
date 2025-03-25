export default function parse(element, {document}) {
  const cells = [];

  // Header Row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Second Row
  const videoCell = document.createElement('div');
  const video = element.querySelector('awt-wistia-video');

  if (video) {
    const videoClone = video.cloneNode(true);
    videoCell.appendChild(videoClone);
  } else {
    videoCell.textContent = 'Video not found';
  }

  const captionCell = document.createElement('div');
  const caption = element.querySelector('awt-article[standfirst]');

  if (caption) {
    const standfirstText = caption.getAttribute('standfirst');
    captionCell.textContent = standfirstText ? standfirstText : 'Caption not found';
  } else {
    captionCell.textContent = 'Caption not found';
  }

  cells.push([videoCell, captionCell]);

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}