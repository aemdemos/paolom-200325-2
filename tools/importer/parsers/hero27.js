export default function parse(element, {document}) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const backgroundImg = element.querySelector('img[slot="background"]');
  const imageElement = document.createElement('img');
  if (backgroundImg) {
    imageElement.src = backgroundImg.getAttribute('src');
    imageElement.alt = backgroundImg.getAttribute('alt');
  }

  const standfirstSpan = element.querySelector('awt-article-section div[slot="paragraph"] span');
  const headingElement = document.createElement('h1');
  if (standfirstSpan) {
    headingElement.textContent = standfirstSpan.textContent.trim();
  }

  const ctaButton = element.querySelector('awt-btn[slot="cta_buttons"]');
  const ctaElement = document.createElement('a');
  if (ctaButton) {
    ctaElement.href = ctaButton.getAttribute('href') || '#';
    ctaElement.textContent = ctaButton.textContent.trim();
  }

  const cells = [
    headerRow,
    [imageElement, headingElement, ctaElement] // Only three elements in the second row
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}