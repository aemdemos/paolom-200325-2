export default function parse(element, {document}) {
  const slides = Array.from(element.querySelectorAll('awt-carousel-item'));
  const cells = [];

  // Add header row for the block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Carousel';
  cells.push([headerCell]);

  slides.forEach((slide) => {
    // Extract image
    const backgroundImage = element.querySelector('img[slot="background"]');
    let img = null;
    if (backgroundImage) {
      img = document.createElement('img');
      img.src = backgroundImage.src;
    }

    // Extract content
    const content = document.createElement('div');

    const titleText = slide.getAttribute('carouseltitle');
    if (titleText) {
      const title = document.createElement('h2');
      title.textContent = titleText;
      content.appendChild(title);
    }

    const descriptionText = slide.getAttribute('text');
    if (descriptionText) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = descriptionText;
      const paragraphs = tempDiv.querySelectorAll('p');
      paragraphs.forEach((p) => {
        content.appendChild(p);
      });
    }

    const ctaButton = slide.querySelector('div[slot="cta_buttons"] awt-btn');
    if (ctaButton) {
      const link = document.createElement('a');
      link.href = ctaButton.getAttribute('href');
      link.textContent = ctaButton.textContent.trim();
      content.appendChild(link);
    }

    cells.push([img || '', content]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}