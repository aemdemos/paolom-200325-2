export default function parse(element, {document}) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const parseInlineElements = (section) => {
    const container = document.createElement('div');
    if (section) {
      Array.from(section.childNodes).forEach((node) => {
        if (node.nodeType === 3) { // Text node
          const textNode = document.createElement('span');
          textNode.textContent = node.textContent;
          container.appendChild(textNode);
        } else if (node.nodeType === 1 && node.classList.contains('awt-tooltip')) { // Element node for tooltip
          const tooltip = document.createElement('span');
          tooltip.className = 'tooltip';
          tooltip.innerHTML = node.innerHTML;
          container.appendChild(tooltip);
        } else {
          container.appendChild(node.cloneNode(true));
        }
      });
    }
    return container;
  };

  const firstSection = element.querySelector('awt-article-section div[slot="paragraph"]');
  const paragraph1 = parseInlineElements(firstSection);

  const imageElement = element.querySelector('awt-image');
  const image = document.createElement('img');
  if (imageElement) {
    image.src = imageElement.getAttribute('src');
    image.alt = imageElement.getAttribute('altimage') || '';
  }

  const secondSection = element.querySelectorAll('awt-article-section div[slot="paragraph"]')[1];
  const paragraph2 = parseInlineElements(secondSection);

  const referenceText = document.createElement('span');
  referenceText.textContent = imageElement ? imageElement.getAttribute('references') || '' : '';

  const cells = [
    headerRow,
    [paragraph1, image],
    [paragraph2, referenceText]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}