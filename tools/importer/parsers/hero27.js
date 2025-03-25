export default function parse(element, {document}) {
  // Define the header row dynamically to match the example
  const tableHeader = [document.createElement('strong')];
  tableHeader[0].textContent = 'Hero';

  // Dynamically extract background image details
  const image = document.createElement('img');
  const backgroundImage = element.querySelector('img[slot="background"]');
  if (backgroundImage) {
    image.src = backgroundImage.src;
    image.alt = backgroundImage.alt || '';
  }

  // Extract title dynamically
  const titleElement = document.createElement('h1');
  const standfirst = element.querySelector('awt-article[standfirst]');
  if (standfirst) {
    titleElement.innerHTML = standfirst.getAttribute('standfirst');
  }

  // Extract description dynamically
  const descriptionParagraph = document.createElement('p');
  const description = element.querySelector('awt-article-section div[slot="paragraph"] span');
  if (description) {
    descriptionParagraph.innerHTML = description.innerHTML;
  }

  // Extract CTA button details dynamically
  const ctaButton = document.createElement('a');
  const ctaElement = element.querySelector('awt-btn[slot="cta_buttons"]');
  if (ctaElement) {
    ctaButton.textContent = ctaElement.textContent;
    ctaButton.href = '#'; // Placeholder since href is not provided in the sample HTML
  }

  // Create cells array dynamically
  const cells = [
    tableHeader, // Header row
    [image, titleElement, descriptionParagraph, ctaButton], // Content row
  ];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}