export default function parse(element, {document}) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const cards = element.querySelectorAll('awt-category-card');

  const contentRow = Array.from(cards).map((card) => {
    const imgElem = document.createElement('img');
    const imageElement = card.querySelector('img');
    if (imageElement) {
      imgElem.src = imageElement.src;
      imgElem.alt = imageElement.alt || '';
    }

    const headingElem = document.createElement('h2');
    const headingElement = card.querySelector('h4');
    if (headingElement) {
      headingElem.textContent = headingElement.textContent.trim();
    } else {
      headingElem.textContent = '';
    }

    const descElem = document.createElement('p');
    const descElement = card.querySelector('p');
    if (descElement) {
      descElem.textContent = descElement.textContent.trim();
    } else {
      descElem.textContent = '';
    }

    const linkElem = document.createElement('a');
    const linkElement = card.querySelector('awt-btn');
    if (linkElement && linkElement.hasAttribute('href')) {
      linkElem.href = linkElement.getAttribute('href');
      linkElem.textContent = linkElement.textContent.trim();
    } else {
      linkElem.href = '#';
      linkElem.textContent = 'Read more';
    }

    return [imgElem, headingElem, descElem, linkElem];
  });

  const cells = [
    headerRow,
    contentRow.map((content) => content)
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}