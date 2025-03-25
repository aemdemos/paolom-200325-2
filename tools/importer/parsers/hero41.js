export default function parse(element, {document}) {
  // Extract data from the element
  const heading = element.querySelector('awt-article')?.getAttribute('standfirst');
  const subheading = element.querySelector('awt-article-section div[slot="paragraph"]')?.innerHTML;
  const ctaButton = element.querySelector('awt-btn');
  const ctaText = ctaButton ? ctaButton.textContent.trim() : '';
  const ctaLink = ctaButton ? ctaButton.getAttribute('href') : '';
  const imageElement = element.querySelector('awt-image');
  const imageUrl = imageElement ? imageElement.getAttribute('src') : '';

  // Construct the table rows
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const contentElements = [];

  // Add the image if available
  if (imageUrl) {
    const image = document.createElement('img');
    image.setAttribute('src', imageUrl);
    contentElements.push(image);
  }

  // Add heading styled as a heading
  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = heading;
    contentElements.push(headingElement);
  }

  // Add subheading styled as strong text
  if (subheading) {
    const subheadingElement = document.createElement('strong');
    subheadingElement.innerHTML = subheading;
    contentElements.push(subheadingElement);
  }

  // Add CTA styled as a link
  if (ctaText && ctaLink) {
    const ctaElement = document.createElement('a');
    ctaElement.setAttribute('href', ctaLink);
    ctaElement.setAttribute('target', '_blank');
    ctaElement.textContent = ctaText;
    contentElements.push(ctaElement);
  }

  const contentRow = [contentElements];

  // Create block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}