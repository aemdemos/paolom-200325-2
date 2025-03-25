export default function parse(element, {document}) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const tabElements = element.querySelectorAll('awt-tab-item');
  const tabContents = Array.from(tabElements).map(tab => {
    const buttonText = tab.querySelector('button').textContent.trim();
    const contentId = tab.getAttribute('contentid');
    const tabContent = element.querySelector(`#${contentId}`);
    const image = tabContent.querySelector('awt-image');
    let imageElement = null;
    let descriptionElement = null;

    if (image) {
      imageElement = document.createElement('img');
      imageElement.src = image.getAttribute('src');

      descriptionElement = document.createElement('p');
      descriptionElement.innerHTML = image.getAttribute('references');
    }

    return [buttonText, imageElement && descriptionElement ? [imageElement, descriptionElement] : ''];
  });

  const cells = [headerRow, ...tabContents];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}