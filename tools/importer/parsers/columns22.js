export default function parse(element, {document}) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const beforeImage = element.querySelector(".awt-image-comparison__image-wrapper img[alt='before']");
  const afterImage = element.querySelector(".awt-image-comparison__image-wrapper img[alt='after']");
  const paragraphContent = element.querySelector("awt-article div[slot='paragraph']");

  // Validate extracted data
  const cells = [
    headerRow,
    [
      paragraphContent ? paragraphContent.innerHTML : 'No content available',
      beforeImage ? beforeImage.cloneNode(true) : 'No before image',
      afterImage ? afterImage.cloneNode(true) : 'No after image',
    ]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}