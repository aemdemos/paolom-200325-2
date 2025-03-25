export default function parse(element, {document}) {
  // Extract relevant content from the input HTML
  const mediaCaption = element.querySelector('awt-media-caption');
  const videoElement = mediaCaption.querySelector('awt-wistia-video');
  const videoSrc = videoElement ? videoElement.querySelector('video')?.getAttribute('src') : null;
  const thumbnail = videoElement ? videoElement.querySelector('img')?.getAttribute('src') : null;

  const articleElement = mediaCaption.querySelector('awt-article');
  const standfirst = articleElement?.getAttribute('standfirst');

  // Prepare the block table structure
  const headerRow = [
    (() => {
      const headerCell = document.createElement('strong');
      headerCell.textContent = 'Columns';
      return headerCell;
    })()
  ];

  const contentRow = [
    videoSrc && thumbnail ? (() => {
      const img = document.createElement('img');
      img.src = thumbnail;
      img.alt = 'Video Thumbnail';
      return img;
    })() : null,
    standfirst ? (() => {
      const caption = document.createElement('div');
      caption.textContent = standfirst;
      return caption;
    })() : null
  ];

  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block
  element.replaceWith(block);
}