export default function parse(element, {document}) {
  // Helper function to create cells array
  const createCarouselCells = (element, document) => {
    const rows = [];

    // Header Row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Carousel';
    const headerRow = [headerCell];
    rows.push(headerRow);

    // Process each carousel item
    const items = element.querySelectorAll('awt-carousel-item');
    items.forEach((item) => {
      const imageSrc = element.querySelector('img[slot="background"]')?.src;
      const image = document.createElement('img');
      image.src = imageSrc;

      const content = document.createElement('div');
      
      // Title
      const title = document.createElement('h2');
      title.textContent = item.getAttribute('carouseltitle');
      content.appendChild(title);

      // Text
      const textHtml = item.getAttribute('text');
      const textContainer = document.createElement('div');
      textContainer.innerHTML = textHtml;
      content.appendChild(textContainer);

      // CTA Button
      const ctaButton = item.querySelector('awt-btn');
      if (ctaButton) {
        const link = document.createElement('a');
        link.href = ctaButton.getAttribute('href');
        link.textContent = ctaButton.textContent.trim();
        content.appendChild(link);
      }

      rows.push([image, content]);
    });

    return rows;
  };

  // Create cells array
  const cells = createCarouselCells(element, document);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}